import {
  Paper,
  Box,
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
import { MutualFund } from "../../types";

import { SearchContext } from "../../contexts/SearchContext";
import { PortfolioContext } from "../../contexts/PortfolioContext";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface ResultRowProps {
  fundData: MutualFund;
  index: number;
  onMutualFundClick: Function;
}

const ResultRow = ({ fundData, index, onMutualFundClick }: ResultRowProps) => {
  const { changeFundUnits, unitsOwned, allFunds } =
    useContext(PortfolioContext);

  const unitsOwnedByThisFund = useMemo(() => {
    const index = allFunds.findIndex(
      (element) => element.schemeCode === fundData.schemeCode
    );
    return unitsOwned[index];
  }, [unitsOwned]);

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
          onClick={() => onMutualFundClick(fundData, changeFundUnits(index))}
        >
          {fundData.schemeName || "name not found"}
        </Typography>
      </TableCell>
      <TableCell>
        <>{unitsOwnedByThisFund} units owned</>
      </TableCell>
    </TableRow>
  );
};

interface SearchResultProps {
  onMutualFundClick: Function;
}

function SearchResults({ onMutualFundClick }: SearchResultProps) {
  const { searchResults } = useContext(SearchContext);

  if (!searchResults) {
    return <></>;
  }

  return (
    <Box marginY={"1rem"}>
      <Typography variant="h5" pb={"1rem"}>Search Results</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Funds</TableCell>
              <TableCell>Units Owned</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!searchResults &&
              searchResults.map((fund, index) => (
                <ResultRow
                  fundData={fund}
                  index={index}
                  onMutualFundClick={onMutualFundClick}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(SearchResults);
