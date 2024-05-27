import get from "lodash/get";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import useSettings from "../hooks/useSettings";
// components
import Page from "../components/Page";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Container,
  Box,
  Typography,
} from "@mui/material";

import { RHFTextField, FormProvider } from "src/components/hook-form";
import Auth_API from "src/services/auth";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));


export default function EditModbusConfiguration () {
  const { themeStretch } = useSettings();
    const navigate = useNavigate();
    const modbusSchema = Yup.object().shape({
        address: Yup.string().required("Address Id is required"),
        port:Yup.string().required("Port is required"),
        method: Yup.string().required("Method Id is required"),
        baudrate:Yup.number().required("Baurdrate is required"),
        scanrate: Yup.number().required("Scanrate is required"),
        number_of_sensors:Yup.number().required("Sensor is required")
      });
      const defaultValues = {
        address: "",
        port:"",
        method: "",
        baudrate:"",
        scanrate: "",
        number_of_sensors:"",

      };
    
      const methods = useForm({
        resolver: yupResolver(modbusSchema),
        defaultValues,
      });
    
      const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = methods;
      
      const goToPrev = () => {
        navigate("/dashboard/modbus");
      };


      const onSubmit = async (data) => {
        try {
          const options = {
            address: data.address,
            port:data.port,
            method: data.method,
            baudrate:data.baudrate,
            scanrate: data.scanrate,
            number_of_sensors:data.number_of_sensors
          };
          const response = await Auth_API.writemodbusconf(options);
          console.log("response", response);
          if (response) {
            const modbusConf = await Auth_API.getmodbusconf();
              console.log(modbusConf);
              navigate("/dashboard/modbus", {
                replace: true,
                state:modbusConf,
              });
            
            console.log(response);
          }
        } catch (error) {
          console.error(error);
        }
      };  

  return (
    <Page title="Modbus">
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Stack position={"column"}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ContentStyle>
              <Box
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: 2,
                    backgroundColor: "#FFFFFF",
                    border: 1,
                    borderColor: "#b7b7b7",
                    color: "black",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={goToPrev}
                >
                  <ArrowBackIosNewIcon sx={{ color: "#08B4B4" }} fontSize="small" />
                </Box>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Modbus Configuration
              </Typography>
            </ContentStyle>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">
            {get(
              errors,
              "afterSubmit.0.ErrDesc",
              get(errors, "afterSubmit.message")
            )}
          </Alert>
        )}
       <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Address
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 5 }}
            name="address"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Port
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="port"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Method
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="method"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Baudrate
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="baudrate"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Scanrate
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="scanrate"
            label="Enter the Valid Password"
          />
        </Stack>
        <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Sensors
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="number_of_sensors"
            label="Enter the Valid Password"
          />
        </Stack>
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
            Update
          </Typography>
        </LoadingButton>
      </Stack>
    </FormProvider>
    </Stack>  
    </Stack>
      </Container>
    </Page>
  );
}  