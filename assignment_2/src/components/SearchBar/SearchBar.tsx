import { TextField } from "@mui/material";
import { useContext, useCallback } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { SearchParams } from "../../types";
// interface SearchBarProps {
//   onChange: (value: string) => void;
// }

export default function SearchBar() {
  const { searchParams, setSearchParams } = useContext(SearchContext);

  const onChange = useCallback((searchQuery: string) => {
    setSearchParams({
      ...searchParams,
      query: searchQuery,
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      label="Search"
      variant="outlined"
      onChange={handleInputChange}
      fullWidth
      style={{
        marginBottom: "1rem",
      }}
    />
  );
}
