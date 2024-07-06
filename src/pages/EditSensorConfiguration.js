import get from "lodash/get";
import { useState } from "react";
//import { useNavigate } from "react-router";
import { useNavigate , useLocation } from "react-router-dom";
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
  Grid,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

import { RHFTextField, FormProvider } from "src/components/hook-form";
import Auth_API from "src/services/auth";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

import { Toaster, toast } from "react-hot-toast";
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));


export default function EditSensorConfiguration () {

    const { themeStretch } = useSettings();
    const [containerRunning, setContainerRunning] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location",location);
    let defaultValues;
    const sensorSchema = Yup.object().shape({
        slave_id: Yup.number().required("Slave Id is required"),
        parked_color:Yup.number().required("Parked Color sis required"),
        free_color: Yup.number().required("Free Color Id is required"),
        offset:Yup.number().required("Offset is required"),
        parked_min: Yup.number().required("Parked Minimum is required"),
        parked_max:Yup.number().required("Parked Maximum is required"),
        free_min:Yup.number().required("Free Minimum is required"),
        free_max: Yup.number().required("Free Maximum is required"),
        timeout:Yup.number().required("Time Out is required"),
       //configure:Yup.number().required("Configure is required"),
      });

      if(location.state == null){
        defaultValues = {
          slave_id: "",
          parked_color:"",
          free_color: "",
          offset:"",
          parked_min: "",
          parked_max:"",
          free_min:"",
          free_max:"",
          timeout:"",
          //configure:""
        };
  
      }
      else{
        defaultValues = {
          slave_id : location.state.slaveID,
          parked_color:location.state.parked_color,
          free_color: location.state.Free_colour,
          offset:location.state.offset,
          parked_min:location.state.parked_min,
          parked_max:location.state.parked_max,
          free_min:location.state.free_min,
          free_max:location.state.free_max,
          timeout:location.state.Timeout,
          //configure:location.state.configure
        }
     }
     
      const methods = useForm({
        resolver: yupResolver(sensorSchema),
        defaultValues,
      });//


      const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = methods;
    
     
      
      const goToPrev = () => {
        navigate("/dashboard/sensor");
      };

      const handleToggle = async () => {
        try{
          if(containerRunning){
            const response = await Auth_API.stopDocker();
            console.log("stop docker response",response);
            setContainerRunning(false);
            toast(response.ErrDesc);
          }else{
            const response = await Auth_API.restartDocker();
            console.log("else docker response",response);
            setContainerRunning(true);
            toast(response.ErrDesc);
          }
        }
        catch(error){
          console.error('Error toggling container state:', error);
        }
      }
    

      const onSubmit = async (data) => {
        try {
          const options = {
            slave_id: data.slave_id,
            parked_color:data.parked_color,
            free_color: data.free_color,
            offset:data.offset,
            parked_min: data.parked_min,
            parked_max:data.parked_max,
            free_min: data.free_min,
            free_max:data.free_max,
            timeout: data.timeout,
            configure:data.configure
          };
          const response = await Auth_API.writeSensorconf(options);
          console.log("response", response);
          if (response) {
              navigate("/dashboard/sensor", {
                replace: true,
              });
            
            console.log(response);
          }
        } catch (error) {
          console.error(error);
          toast(error);
        }
      };  

  return (
    <Page title="Sensor">
    <Container maxWidth={themeStretch ? false : "xl"}>
      <Stack position={"column"}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.afterSubmit && (
          <Alert severity="error">
            {get(
              errors,
              "afterSubmit.0.ErrDesc",
              get(errors, "afterSubmit.message")
            )}
          </Alert>
        )} <Grid container spacing={2} width='200%' >
          <Grid item xs={12} md={6}>
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
                Sensor Configuration
              </Typography>
            </ContentStyle>
          </Grid>
          <Grid item xs={12} md={6}>
                            <Typography variant="h4" gutterBottom
                            sx={{
                              textAlign: "left",
                              fontWeight: "normal",
                              fontSize: "8px",
                            }}>
                              Docker Container Control
                            </Typography>
                            <FormControlLabel
                              control={<Switch checked={containerRunning} onChange={handleToggle} />}
                              label={containerRunning ? 'Running' : 'Stopped'}
                            />
                          </Grid>
        </Grid>
         
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
            Slave Id
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 5 }}
            name="slave_id"
            label="Enter the Slave_id"
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
            Parked Color
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="parked_color"
            label="Enter the Parked Color"
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
            Free Color
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="free_color"
            label="Enter the Free Color"
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
            Offset
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="offset"
            label="Enter the Offset"
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
            Parked Minimum Height
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="parked_min"
            label="Enter the Parked Minimum"
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
            Parked Maximum Height
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="parked_max"
            label="Enter the Parked Maximum"
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
            Free Minimum Height
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="free_min"
            label="Enter the Free Minimum"
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
            Free Maximum Height
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="free_max"
            label="Enter the Free Maximum"
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
            Timeout
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="timeout"
            label="Enter the Timeout"
          />
        </Stack>
        {/* <Stack spacing={1}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: "8px",
            }}
          >
            Configure
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="configure"
            label="Enter the Parked Maximum"
          />
        </Stack> */}
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