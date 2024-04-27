import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Dialog,
    Grid,
    MenuItem,
    Paper,
    Select,
    Typography,
    Item,
    FormControl,
    FormControlLabel,
    InputLabel,
  } from "@mui/material";
  // hooks
  import useSettings from "../hooks/useSettings";
  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { Toaster, toast } from "react-hot-toast";
  import Page from "../components/Page";
  import Image from "../components/Image"
  import { styled } from "@mui/material/styles";
  import { LoadingButton } from "@mui/lab";
  import { useForm } from "react-hook-form";
  import { RHFTextField, FormProvider } from "src/components/hook-form";
import { Stack } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ErrorCodes } from "src/constants/ErrorConstants";
import Loader from "src/components/Loader";
import Auth_API from "src/services/auth";
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));
  

export default function ModbusConfiguration () {

  const defaultValues = {
    mobileNo: "",
  };


  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;


  const onSubmit =async() => {
   const response = await Auth_API.getmodbusconf();
  console.log(response);
  } 


    return(
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Page title="Modbus Configuration">
              <Container>
            <ContentStyle>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Welcome Back
              </Typography>
            </ContentStyle>
            <LoadingButton
          fullWidth
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            background:
              "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
            minHeight: "60px",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Login
          </Typography>
        </LoadingButton>
            <Box sx={{ mt: 5,}}>
              <Image
                visibleByDefault
                disabledEffect
                src="/assets/Group.png"
                alt="theme"
              />
            </Box>
          </Container>
      </Page>
      </FormProvider>
    )
}