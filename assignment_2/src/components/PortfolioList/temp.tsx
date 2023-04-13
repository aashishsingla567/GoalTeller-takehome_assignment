import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useContext, useMemo, memo } from "react";

import { PortfolioContext } from "../../contexts/PortfolioContext";
import { MutualFund } from "../../types";

import styles from "./PortfolioList.styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface PortfolioListProps {
  onMutualFundClick: (
    mutualFund: MutualFund,
    changeFundUnits: Function
  ) => void;
}

function PortfolioList({ onMutualFundClick }: PortfolioListProps) {
  const { allFunds, unitsOwned, changeFundUnits } =
    useContext(PortfolioContext);

  debugger;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Funds</TableCell>
            <TableCell>Units Owned</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!allFunds &&
            allFunds.map((fund, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <Typography
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        onMutualFundClick(fund, changeFundUnits(index))
                      }
                    >
                      {fund.schemeName || "name not found"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{`${unitsOwned[index]} units owned`}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(PortfolioList);
