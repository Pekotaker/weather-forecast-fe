import React from "react";
import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const SearchedCityDropdown = ({ searchedHistory, handleSearchHistory }) => {
  return (
    searchedHistory.length > 0 && (
      <div>
        <FormControl fullWidth>
          <InputLabel id="searched-city-dropdown-label">
            Search History
          </InputLabel>
          <Select
            labelId="searched-city-dropdown-label"
            id="searched-city-dropdown"
            label="Search History"
            fullWidth
          >
            {searchedHistory.map((city, index) => (
              <MenuItem
                key={index}
                value={city}
                onClick={() => handleSearchHistory(index)}
              >
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    )
  );
};

export default SearchedCityDropdown;
