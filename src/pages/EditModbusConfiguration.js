import get from "lodash/get";
import { useState } from "react";
import { useNavigate , useLocation} from "react-router";
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

import { RHFTextField, FormProvider ,RHFSelect} from "src/components/hook-form";
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
    const location = useLocation();
    const modbusSchema = Yup.object().shape({
        address: Yup.string().required("Address Id is required"),
        port:Yup.string().required("Port is required"),
        method: Yup.string().required("Method Id is required"),
        baudrate:Yup.number().required("Baurdrate is required"),
        full_scan_time: Yup.number().required("Scanrate is required"),
        number_of_sensors:Yup.number().required("Sensor is required")
      });
      const defaultValues = {
        address: location.state[0].address,
        port:"/dev/ttySC0",
        method: "rtu",
        baudrate:"115200",
        full_scan_time: location.state[0].full_scan_time,
        number_of_sensors:location.state[0].number_of_sensors,

      };
    console.log("LOCATION",location);
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
            full_scan_time: data.full_scan_time,
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


     const communicationPort = [{
       value : '/dev/ttySC0',
       label : '/dev/ttySC0',
     },{
       value : '/dev/ttySC1',
       label : '/dev/ttySC1',
     },{
       value : '/dev/ttyS0',
       label : '/dev/ttyS0',
     },{
       value : '/dev/ttyS1',
       label : 'dev/ttyS1',
     }];

   const CommunicationBaurdrate = [{
       value: 115200,
       label: '115200',
     },{
       value : 9600,
       label : '9600',
     },{
       value : 14400,
       label : '14400',
    }];
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
          <RHFSelect
            sx={{ borderRadius: 10 }}
            name="port"
            //label="select valid port"
            options={communicationPort}
            //defaultValue={'/dev/ttySC0'}
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
          <RHFSelect
            sx={{ borderRadius: 10 }}
            name="baudrate"
            label="Enter the Valid Password"
            options={CommunicationBaurdrate}
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
            name="full_scan_time"
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