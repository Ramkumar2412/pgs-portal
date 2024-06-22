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

    // const sensorSchema = Yup.object().shape({
    //   external_slot_id: Yup.string(),
    //   status:Yup.number(),
    //   height: Yup.number()
    //   });
 


    //   const defaultValues = {
    //     external_slot_id: "",
    //     status:"",
    //     height: ""
    //   };
    
    //   const methods = useForm({
    //     resolver: yupResolver(sensorSchema),
    //     defaultValues,
    //   });
    
    


      useEffect(() => {
        setLoading(true);
        sensorData();
       const interval = setInterval(() => sensorData() ,1000);
        return () => clearInterval(interval);
      }, []);


    const sensorData = async () => {
        try{
  
            const response = await Auth_API.SensorData();

        console.log("sensor_data from react" , response);
     //   setRequestBody(response.data);
        setviewSensor(response.result);
        }
        catch(error){
            console.error(error);
        }
        
    }


    console.log("Sensor Data from react" , viewSensor);

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
                    <Card key={index} sx={{ width: "25%", marginTop: 1 }}>
                        <CardContent
                          sx={{
                            height: "100px",
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