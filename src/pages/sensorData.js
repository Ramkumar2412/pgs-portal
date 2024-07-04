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
    useMediaQuery
  } from "@mui/material";
  // hooks
  import useSettings from "../hooks/useSettings";
  import { useEffect, useState } from "react";
  import axios from 'axios';
  import * as Yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useNavigate , useLocation } from "react-router-dom";
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
import {delay} from "../utils/delay";
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));
  
export default function SensorData () {

    const [viewSensor , setviewSensor] = useState([]);
    const isMinWidth400px = useMediaQuery("(max-width:400px)");
    const [loading, setLoading] = useState(false);
    const [requestBody, setRequestBody] = useState([]);



      useEffect(() => {
        setLoading(true);
        
        liveData();
       const interval = setInterval(() => liveData() ,1000);
        return () => clearInterval(interval);
      }, []);


    const liveData = async() => {
      try{
       

        const response = await Auth_API.LiveData();
        console.log("sensor_data from Live" , response);
        setviewSensor(response.data);


      }
      catch(error){
        console.error('Error fetching data:', error);
      }
   
    }

   // console.log("Sensor Data from react" , viewSensor);

    return(
        <Page title="Sensor">
            <Container>
            <ContentStyle>
            <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Sensor Data
              </Typography>
                </ContentStyle>
                <Card>
                    <CardContent
                  sx={{
                    height: isMinWidth400px ? "calc(100vh - 15rem)":"calc(100vh - 19rem)",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >{viewSensor &&
                    viewSensor.map((sensor , index) => ( 
                    <Card key={index} sx={{ width: "30%", marginTop: 1 }}>
                        <CardContent
                          sx={{
                            height: "150px",
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
                                Sensor Id :  {sensor ? sensor.external_slot_id : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Height :  {sensor ? sensor.height : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Status :  {sensor ? sensor.status_name : ""}
                              </Box>
                             </Typography>
                             </Stack>
                        </CardContent>
                    </Card>))}
                    </CardContent>
                </Card>
            </Container>
        </Page>
    )
}