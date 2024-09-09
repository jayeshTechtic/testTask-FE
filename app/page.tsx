import CustomTypography from "@/Components/Custom/CustomTypography";
import PropertyListing from "@/Components/HomePage/PropertyListing";
import { Box } from "@mui/material";

export default async function HomePage() {
  return (
    <main>
      {/* Header Section */}
      <Box sx={{ p: 5, textAlign: "center" }}>
        <CustomTypography variant="h4" gutterBottom align="center">
          Welcome to Fylpi Real Estate
        </CustomTypography>
        <CustomTypography variant="body1" align="center">
          Find your dream property with ease
        </CustomTypography>

        <PropertyListing />
      </Box>
    </main>
  );
}
