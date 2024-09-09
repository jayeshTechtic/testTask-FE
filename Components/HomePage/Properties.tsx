"use client";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import CustomTypography from "../Custom/CustomTypography";
import React from "react";
import { PropertyType } from "./types";

interface PropertiesProps {
  properties: PropertyType[];
}

const Properties: React.FC<PropertiesProps> = ({ properties }) => {
  return properties?.map((property: PropertyType) => (
    <Card key={property.id} sx={{ maxWidth: 380, borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="200"
        image={property.image}
        alt="Property Image"
        sx={{
          minHeight: 200,
          objectFit: "cover",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/300x200";
        }}
      />
      <CardContent>
        <CustomTypography variant="h6" gutterBottom>
          {property.title}
        </CustomTypography>
        <CustomTypography variant="body2" color="text.secondary">
          {property.description}
        </CustomTypography>
        <CustomTypography variant="body2" color="text.secondary">
          <strong>Rooms:</strong> {property.rooms}
        </CustomTypography>
        <CustomTypography variant="body2" color="text.secondary">
          <strong>Type:</strong> {property.type}
        </CustomTypography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          sx={{
            padding: { xs: "6px 10px", sm: "8px 20px" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  ));
};

export default React.memo(Properties);
