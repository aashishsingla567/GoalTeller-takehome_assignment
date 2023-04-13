import React, { useState, useCallback, createContext } from "react";
import { MutualFund } from "../types";

interface Portfolio {
  selectedFund: MutualFund | null;
  setSelectedFund: Function;
  allFunds: MutualFund[];
  setAllFunds: Function;
  unitsOwned: number[];
  setUnitsOwned: Function;
  changeFundUnits: Function;
  totalUnitsOwned: number;
}

export const PortfolioContext = createContext<Portfolio>({
  selectedFund: null,
  setSelectedFund: () => {},
  allFunds: [],
  setAllFunds: () => {},
  unitsOwned: [],
  setUnitsOwned: () => {},
  changeFundUnits: () => {},
  totalUnitsOwned: 0,
});

interface ProtfolioContextProviderProps {
  children: React.ReactNode;
}

const PortfolioContextProvider = ({
  children,
}: ProtfolioContextProviderProps) => {
  const [selectedFund, setSelectedFund] = useState(null);
  const [allFunds, setAllFunds] = useState<MutualFund[]>([]);
  const [unitsOwned, setUnitsOwned] = useState<number[]>([]);
  const [totalUnitsOwned, setTotalUnitsOwned] = useState(0);

  const changeFundUnits = useCallback(
    (fundIndex: number) => (changetype: "increase" | "decrease") => {
      switch (changetype) {
        case "increase":
          setUnitsOwned((oldUnits: number[]) => {
            ++oldUnits[fundIndex];
            return oldUnits;
          });
          setTotalUnitsOwned((oldTotalUnits: number) => ++oldTotalUnits);
          break;
        case "decrease":
          setUnitsOwned((oldUnits: number[]) => {
            --oldUnits[fundIndex];
            return oldUnits;
          });
          setTotalUnitsOwned((oldTotalUnits: number) => --oldTotalUnits);
          break;
      }
    },
    [unitsOwned]
  );

  return (
    <PortfolioContext.Provider
      value={{
        selectedFund,
        setSelectedFund,
        allFunds,
        setAllFunds,
        unitsOwned,
        setUnitsOwned,
        changeFundUnits,
        totalUnitsOwned,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
