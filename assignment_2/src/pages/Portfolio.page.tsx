import { useState, useContext, useEffect, FC } from "react";
import { useQuery } from "react-query";

import MutualFundCard from "../components/MutualFundCard/MutualFundCard";
import Popup from "../components/Popup/Popup";
import PortfolioList from "../components/PortfolioList/PortfolioList";
import SearchBar from "../components/SearchBar/SearchBar";
import SearchResults from "../components/SearchResults/SearchResults";
import Header from "./components/Header";

import PortfolioContextProvider, {
  PortfolioContext,
} from "../contexts/PortfolioContext";
import SearchContextProvider, {
  SearchContext,
} from "../contexts/SearchContext";

import { getMutualFundsList } from "../services/apiEndpoints";
import { MutualFund } from "../types";

import { Box, Typography } from "@mui/material";

const PortfolioPage: FC = () => {
  const [popupOpen, setPopupOpen] = useState(false);

  const {
    selectedFund,
    setSelectedFund,
    setAllFunds,
    setUnitsOwned,
    totalUnitsOwned,
  } = useContext(PortfolioContext);

  const [changeSelectedFundUnits, setChangeSelectedFundUnits] =
    useState<Function>(() => (changeType: "increase" | "decrease") => {});

  const {
    data: mutualFundsList,
    isLoading: isLoadingFundsList,
    error: errorListFetch,
  } = useQuery("FundsList", getMutualFundsList, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!!mutualFundsList) {
      setAllFunds(mutualFundsList);
      setUnitsOwned(new Array(mutualFundsList.length).fill(0));
    }
  }, [mutualFundsList]);

  useEffect(() => {
    console.log({ changeSelectedFundUnits });
  }, [changeSelectedFundUnits]);

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  const handleMutualFundSelected = async (
    selectedFund: MutualFund,
    changeFundUnits: Function
  ) => {
    await setSelectedFund(selectedFund);
    await setChangeSelectedFundUnits(() => changeFundUnits);
    handlePopupOpen();
  };

  return (
    <>
      <Header />
      <Box
        sx={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        <SearchBar />
        <SearchResults onMutualFundClick={handleMutualFundSelected} />
        <PortfolioList onMutualFundClick={handleMutualFundSelected} />
        {!!selectedFund && (
          <Popup
            open={popupOpen}
            title={`Fund details - ${selectedFund.schemeName}`}
            onClose={handlePopupClose}
          >
            <MutualFundCard
              mutualFund={selectedFund}
              changeFundUnits={changeSelectedFundUnits}
            />
          </Popup>
        )}
        <Typography variant="body2" fontSize={"2rem"} color="textPrimary" align="right" paddingY={"1rem"} paddingX={"1rem"}>
          Total units owned = {totalUnitsOwned}
        </Typography>
      </Box>
    </>
  );
};

export default () => {
  return (
    <PortfolioContextProvider>
      <SearchContextProvider>
        <PortfolioPage />
      </SearchContextProvider>
    </PortfolioContextProvider>
  );
};
