import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import get from "lodash/get";
import NavigationService from "../services/NavigationService";
import { useNavigate } from "react-router";
import VendorUploadService from "../services/API/VendorUploadService";

export default function ShortlistedVendorCard({ details }) {
  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState("");

  function handleVendorDetails(vendorId) {
    NavigationService.gotoVendorDetails(navigate, vendorId);
  }

  function fetchVendorImage() {
    VendorUploadService.fetchVendorImages(get(details, "id"))
      .then((vendorDetails) => setImageURL(get(vendorDetails, "data.0.URL")))
      .catch(console.log);
  }

  useEffect(() => fetchVendorImage(), []);

  return (
    <Card
      sx={{ marginBottom: 2 }}
      onClick={() => handleVendorDetails(get(details, "id"))}
    >
      <CardMedia
        component="img"
        height="150"
        image={imageURL || ""}
        alt="Vendor sample image"
      />
      <Stack padding={2}>
        <Typography variant="h5" paddingBottom={1}>
          {`${get(details, "firstName")}  ${get(details, "lastName")}`}
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Stack
            direction="row"
            spacing={0.5}
            marginRight={2}
            color="text.secondary"
            sx={{ width: "5rem" }}
          >
            <LocationOnIcon fontSize="small" />
            <Typography variant="caption" noWrap="true">
              {get(details, "location")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={0.5}
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            <WorkIcon fontSize="small" />
            <Typography variant="caption">
              {get(details, "experience")} years of experience
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
