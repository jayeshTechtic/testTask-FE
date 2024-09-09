"use client";

import {
  Button,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const SearchSection: FC<any> = ({ getProperties }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [room, setRoom] = useState<number | string>("");
  const [propertyType, setPropertyType] = useState<string>("");

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleRoomChange = (event: SelectChangeEvent<number | string>) => {
    setRoom(event.target.value as number | string);
  };

  const handlePropertyTypeChange = (event: SelectChangeEvent<string>) => {
    setPropertyType(event.target.value as string);
  };

  const handleSearchClick = async () => {
    const params = `searchQuery=${encodeURIComponent(
      searchQuery
    )}&room=${room}&propertyType=${propertyType}`;
    getProperties(params);
  };

  const isSearchDisabled =
    searchQuery.trim() === "" && room === "" && propertyType === "";

  useEffect(() => {
    if (isSearchDisabled) {
      getProperties();
    }
  }, [searchQuery, room, propertyType]);

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ flex: 3, minWidth: { xs: "100%", sm: "auto" } }}>
        <TextField
          fullWidth
          label="Search by State, city or zip code"
          variant="outlined"
          placeholder="Search by State, city or zip code"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          sx={{ height: 56 }}
        />
      </Box>

      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}>
        <FormControl fullWidth variant="outlined" sx={{ height: 56 }}>
          <InputLabel>Room</InputLabel>
          <Select
            label="Room"
            value={room}
            onChange={handleRoomChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
            sx={{ height: "100%" }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value={1}>1 Room</MenuItem>
            <MenuItem value={2}>2 Rooms</MenuItem>
            <MenuItem value={3}>3 Rooms</MenuItem>
            <MenuItem value={4}>4+ Rooms</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}>
        <FormControl fullWidth variant="outlined" sx={{ height: 56 }}>
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            value={propertyType}
            onChange={handlePropertyTypeChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 300,
                },
              },
            }}
            sx={{ height: "100%" }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="apartment">Apartment</MenuItem>
            <MenuItem value="house">House</MenuItem>
            <MenuItem value="villa">Villa</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{
            height: 56,
            padding: { xs: "10px 20px", sm: "10px 30px" },
          }}
          onClick={handleSearchClick}
          disabled={isSearchDisabled}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(SearchSection);
