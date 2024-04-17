import { useEffect, useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
} from "@mui/material";
// components
import MenuPopover from "../../../components/MenuPopover";
import { IconButtonAnimate } from "../../../components/animate";
import AuthService from "../../../services/authService";
import { get } from "lodash";
import Auth_API from "../../../services/auth";
import ObjectStorage from "../../../modules/ObjectStorage";
import { StorageConstants } from "../../../constants/StorageConstants";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const userDetails = AuthService.getUserDetails()
  const { firstname,lastname } = userDetails;
  const employeeName = `${firstname} ${lastname}`

  console.log("userDetails", userDetails);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      const options = {
        token: AuthService._getAccessToken(),
      };
      const response = await Auth_API.logout(options);
      AuthService.logout();
    } catch (error) {
      console.error(error);
    }
  };

  const initials = employeeName
    ? employeeName
        .split(" ")
        .map((n) => n[0])
        .join("")
    : "";

  console.log('initials',initials);
  
  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="">{initials}</Avatar>
      </IconButtonAnimate>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuPopover>
    </>
  );
}
