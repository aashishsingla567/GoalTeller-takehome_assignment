import React, { createContext, useState } from "react";

import { useQuery } from "react-query";
import { SearchParams, MutualFund } from "../types";

import { searchMutualFunds } from "../services/apiEndpoints";

interface SearchContextValues {
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
  searchResults: MutualFund[] | null | undefined;
}

export const SearchContext = createContext<SearchContextValues>({
  searchParams: {
    query: "",
    filters: {},
  },
  setSearchParams: () => {},
  searchResults: [],
});

interface SearchContextProviderProps {
  children: React.ReactNode;
}

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    filters: {},
  });

  const {
    data: searchResults,
    isLoading,
    error,
  } = useQuery(
    ["searchMutualFunds", searchParams],
    () => searchMutualFunds(searchParams.query),
    {
      staleTime: Infinity,
      enabled: !!searchParams?.query,
    }
  );

  return (
    <SearchContext.Provider
      value={{ searchParams, setSearchParams, searchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
