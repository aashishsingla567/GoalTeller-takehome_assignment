import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import { useQuery } from "react-query";
import { makeStyles } from "@mui/styles";

import { getFundDetails } from "../../services/apiEndpoints";
import { MutualFund, MutualFundDetails } from "../../types";

interface MutualFundCardWrapperProps {
  mutualFund: MutualFund;
  changeFundUnits: Function;
}

interface MutualFundCardProps {
  data: MutualFundDetails;
  changeFundUnits: Function;
}

const useStyles = makeStyles({
  card: {
    margin: "auto",
    // paddingBlock: "2rem",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const MutualFundCard = ({ data, changeFundUnits }: MutualFundCardProps) => {
  const classes = useStyles();

  const latestData = useMemo(() => {
    const latest = data.data.reduce((acc, curr) => {
      const { accDate, currDate } = {
        accDate: new Date(acc.date),
        currDate: new Date(curr.date),
      };
      return accDate > currDate ? acc : curr;
    });
    return latest;
  }, [data]);

  return (
    <Card className={classes.card}>
      <CardContent>
        {/* <Typography variant="h6" component="h2">
          Scheme Name: {data.meta.scheme_name}
        </Typography> */}
        <Typography className={classes.pos} color="textSecondary">
          Fund House: {data.meta.fund_house}
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Scheme Category: {data.meta.scheme_category}
        </Typography>
        <Typography variant="body2" component="p">
          Scheme Type: {data.meta.scheme_type}
        </Typography>
        <Typography variant="body2" component="p">
          Scheme Code: {data.meta.scheme_code}
        </Typography>
        <Typography>Nav : {latestData.nav}</Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-around",
          paddingInline: "10rem",
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={() => changeFundUnits("increase")}
        >
          Buy
        </Button>
        <Button
          size="small"
          variant="outlined"
          onClick={() => changeFundUnits("decrease")}
        >
          Sell
        </Button>
      </CardActions>
    </Card>
  );
};

export default function MutualFundCardWrapper({
  mutualFund,
  changeFundUnits,
}: MutualFundCardWrapperProps) {
  const {
    data: fundDetails,
    isLoading,
    error,
  } = useQuery(
    "fundDetails",
    useCallback(() => getFundDetails(mutualFund.schemeCode), [mutualFund])
  );

  if (isLoading) {
    return <div> Loading... </div>;
  }

  if (!fundDetails) {
    return (
      <div>
        <h1> Fund not found </h1>
      </div>
    );
  }

  return (
    <MutualFundCard data={fundDetails} changeFundUnits={changeFundUnits} />
  );
}
