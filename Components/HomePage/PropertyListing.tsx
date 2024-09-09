"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Pagination,
  IconButton,
  Typography,
} from "@mui/material";
import SearchSection from "./SearchSection";
import Properties from "./Properties";
import { PropertyType } from "./types";

const PropertyListing: React.FC = () => {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getProperties = useCallback(async (filters = "", page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://45.79.111.106:3000/api/properties?${filters}&page=${page}&limit=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch properties");
      }
      const data = await response.json();
      setProperties(data.data);
      setTotalPages(data.pagination.totalPages);
      setCurrentPage(data.pagination.page);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProperties();
  }, [getProperties]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown> | null,
    value: number
  ) => {
    setCurrentPage(value);
    getProperties("", value);
  };

  return (
    <>
      {/* Search Form Section */}
      <SearchSection getProperties={getProperties} />

      {/* Property Listing Cards */}
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          p: 2,
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
              width: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
              "@media (max-width: 1200px)": {
                gridTemplateColumns: "repeat(2, 1fr)",
              },
              "@media (max-width: 600px)": {
                gridTemplateColumns: "1fr",
              },
            }}
          >
            <Properties properties={properties} />
          </Box>
        )}
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <IconButton
          onClick={() => handlePageChange(null, currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous"
        ></IconButton>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={1}
          boundaryCount={1}
        />
        <IconButton
          onClick={() => handlePageChange(null, currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next"
        ></IconButton>
      </Box>
    </>
  );
};

export default React.memo(PropertyListing);
