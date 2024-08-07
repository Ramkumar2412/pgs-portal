import {
  Alert,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Switch,
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
    useMediaQuery
  } from "@mui/material";
  // hooks
  import useSettings from "../hooks/useSettings";
  import * as Yup from "yup";
  import get from "lodash/get";
  import { useEffect, useState } from "react";
  import { useNavigate , useLocation } from "react-router-dom";
  import { Toaster, toast } from "react-hot-toast";
  import Page from "../components/Page";
  import { yupResolver } from "@hookform/resolvers/yup";
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
// import { toasts } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));

export default function SensorConfiguration () {
  const { themeStretch } = useSettings();

  //const [viewSensorCount , setviewSensorCount] = useState([]);
  const [sensorConfig, setsensorConfig] = useState([]);
  const [containerRunning, setContainerRunning] = useState(true);
  const [sensor , setSensor] = useState(false);
  const isMinWidth400px = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const sensorSchema = Yup.object().shape({
    slave_id: Yup.number().required("Address Id is required")
    });
    const defaultValues = {
      slave_id: "",
     
    };
  
    const methods = useForm({
      resolver: yupResolver(sensorSchema),
      defaultValues,
    });
  
    const {
      handleSubmit,
      formState: { errors, isSubmitting },
    } = methods;


    const handleClick = () => {
      setLoading(true);
  
      setTimeout(() => {
      
          navigate('/dashboard/sensor_config',{
            replace: true,
            state:sensorConfig
          }); // Provide the path to the target page
          setLoading(false);
      }, 1000);
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
      const slaveId = data.slave_id
      const response = await Auth_API.readSensor(slaveId);
      setsensorConfig(response);
      console.log("Sensor Configuration",sensorConfig);
      console.log("response", response);
      if (Object.keys(response).includes('message')) {
         
        console.log(response);
        toast(response.message);
      }
    } catch (error) {
      console.error(error);
      toast(error.message);
    }
  }; 
  
    return (
      <Page title="Sensor">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Stack position={"column"}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <ContentStyle>
       
                <Typography
                  variant="h3"
                  sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
                >
                  Sensor
                </Typography>
              </ContentStyle>
              <Container maxWidth={themeStretch ? false : "xl"}>
                <Stack spacing={3}>
                  {!!errors.afterSubmit && (
                    <Alert severity="error">
                      {
                        get(errors, "afterSubmit.message")
                      }
                    </Alert>
                  )}
                    <Grid container spacing={2} width='200%' >
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h4"
                            sx={{
                              textAlign: "left",
                              fontWeight: "normal",
                              fontSize: "8px",
                            }}
                          >
                            Sensor
                          </Typography>
                          <RHFTextField
                            sx={{ borderRadius: 2 }}
                            name="slave_id"
                            label="Enter the Valid sensor"
                          />

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
                              Read
                            </Typography>
                          </LoadingButton>
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
                 </Stack>
               </Container>
               </FormProvider>
          </Stack>  
      </Stack>


      <Card sx={{ width: "100%", minHeight: "calc(100vh - 24rem)" }}>
        <CardContent
                          sx={{
                            height: "500px",
                            bgcolor: "#ECECEC",
                          }}
                        >

             <Stack>
                             <Typography>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Sensor Id :  {sensorConfig ? sensorConfig.slaveID : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Parked Color :  {sensorConfig ? sensorConfig.parked_color : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Free Colour :  {sensorConfig ? sensorConfig.Free_colour : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Offset :  {sensorConfig ? sensorConfig.offset : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Parked Minimum :  {sensorConfig ? sensorConfig.parked_min : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Parked Maximium :  {sensorConfig ? sensorConfig.parked_max : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Free Minimum :  {sensorConfig ? sensorConfig.free_min : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Free Maximium :  {sensorConfig ? sensorConfig.free_max : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Timeout :  {sensorConfig ? sensorConfig.Timeout : ""}
                              </Box>
                              {/* <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Configure :  {sensorConfig ? sensorConfig.Configure : ""}
                              </Box> */}
                            </Typography>
                          </Stack>
                          <LoadingButton
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                              background:
                                "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                              minHeight: "60px",
                              borderRadius: 2,
                                }}
                              >
                              <Typography variant="body1" fontWeight="bold">
                                Edit
                              </Typography>
                            </LoadingButton>
    
     
          </CardContent>
        </Card>
        </Container>
      </Page>
    );
}