import React from "react";
import { Typography, TypographyProps } from "@mui/material";

interface CustomTypographyProps extends TypographyProps {
  children: React.ReactNode;
}

const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant="h6" gutterBottom align="left" {...props}>
      {children}
    </Typography>
  );
};

export default CustomTypography;
