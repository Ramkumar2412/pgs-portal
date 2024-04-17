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
import VendorUploadService from "../services/API/VendorUploadService";
import VendorRatingService from "../services/API/VendorRatingService";
import { useNavigate } from "react-router";
import Rating from "@mui/material/Rating";

export default function VendorListCard({ vendor }) {
  const navigate = useNavigate();

  const [imageURL, setImageURL] = useState("");
  const [vendorRating, setVendorRating] = useState(0);

  const fetchVendorRating = async () => {
    try {
      const response = await VendorRatingService.getVendorRating(
        get(vendor, "id")
      );
      setVendorRating(get(response, "data.averageRating"));
    } catch (err) {
      console.log(err);
    }
  };

  function handleOnClickVendor(vendorId) {
    NavigationService.gotoVendorDetails(navigate, vendorId);
  }

  function fetchVendorImage() {
    VendorUploadService.fetchVendorImages(get(vendor, "id"))
      .then((vendorDetails) => setImageURL(get(vendorDetails, "data.0.URL")))
      .catch(console.log);
  }


  useEffect(() => {
    fetchVendorImage();
    fetchVendorRating();
  }, []);

  return (
    <Card onClick={() => handleOnClickVendor(vendor?.id)}>
      <CardMedia
        component="img"
        height="150"
        image={imageURL || ""}
        alt="Vendor sample image"
      />
      <Stack padding={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2
          }}
        >
          <Typography variant="h5" >
            {get(vendor, "firstName") + " " + get(vendor, "lastName")}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Typography>{`(${vendorRating})`}</Typography>
            <Rating readOnly value={vendorRating} precision={0.1} />
          </Stack>
        </Box>
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
              {get(vendor, "location")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={0.5}
            color="text.secondary"
            sx={{ ml: 1 }}
          >
            <WorkIcon fontSize="small" />
            <Typography variant="caption">{`${get(
              vendor,
              "experience"
            )} years of experience`}</Typography>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}
