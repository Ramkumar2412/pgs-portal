// @mui
import { Stack, Typography } from "@mui/material";
// components
import ObjectStorage from "../../../modules/ObjectStorage";
import { StorageConstants } from "../../../constants/StorageConstants";
import { useEffect, useState } from "react";
import { get } from "lodash";
import { toast } from "react-hot-toast";
import Auth_API from "../../../services/auth";
import AuthService from "../../../services/authService";

// ----------------------------------------------------------------------

export default function UserName() {
const userDetails = AuthService.getUserDetails()
const {firstname, lastname} =userDetails;
const employeeName = `${firstname} ${lastname}`
  return (
    <>
    <Stack
       sx={{
         display: "flex",
         justifyContent: "left",
         alignItems:"flex-start",
         fontSize: "13px",
         color: "#b7b7b7",
         direction:"column",
       }}
    >
       <Typography
         sx={{
           display: "flex",
           justifyContent: "center",
           fontSize: "13px",
           color: "#b7b7b7",
         }}
       >
         {"Welcome"}
       </Typography>
   
       <Typography
         sx={{
           display: "flex",
           justifyContent: "space-around",
           color: "black",
           fontSize: "16px",
         }}
       >
         {employeeName}
       </Typography>
    </Stack>
   </>
   
  );
}
