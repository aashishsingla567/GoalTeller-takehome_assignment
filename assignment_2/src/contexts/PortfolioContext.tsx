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
}

export const PortfolioContext = createContext<Portfolio>({
  selectedFund: null,
  setSelectedFund: () => {},
  allFunds: [],
  setAllFunds: () => {},
  unitsOwned: [],
  setUnitsOwned: () => {},
  changeFundUnits: () => {},
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

  const changeFundUnits = useCallback(
    (fundIndex: number) => (changetype: "increase" | "decrease") => {
      setUnitsOwned((oldUnits: number[]) => {
        switch (changetype) {
          case "increase":
            ++oldUnits[fundIndex];
            break;
          case "decrease":
            --oldUnits[fundIndex];
            break;
        }
        return oldUnits;
      });
    },
    [setUnitsOwned]
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
