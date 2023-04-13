import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
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
    maxWidth: 345,
    margin: "auto",
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Fund House: {data.meta.fund_house}
        </Typography>
        <Typography variant="h5" component="h2">
          Scheme Name: {data.meta.scheme_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Scheme Category: {data.meta.scheme_category}
        </Typography>
        <Typography variant="body2" component="p">
          Scheme Type: {data.meta.scheme_type}
        </Typography>
        <Typography variant="body2" component="p">
          Scheme Code: {data.meta.scheme_code}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => changeFundUnits("increase")}>
          Buy
        </Button>
        <Button size="small" onClick={() => changeFundUnits("decrease")}>
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
  const handleButtonClick = () => {
    // TODO ::
  };

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
