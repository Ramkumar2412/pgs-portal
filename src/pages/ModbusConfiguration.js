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
const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));
  

export default function ModbusConfiguration () {
  const [viewModbusConf , setviewModbusConf] = useState([]);
  const isMinWidth400px = useMediaQuery("(max-width:400px)");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();


  useEffect(() => {
    setLoading(true);
    modbusConfiguration();
  }, []);
  

  useEffect(() => {
    setLoading(true);
    modbusConfiguration();
  }, []);
  
  const modbusConfiguration = async() => {
    try{
        const response = await Auth_API.getmodbusconf();
        console.log("response",response);
        setviewModbusConf(response.channels);
    }
    catch(error){
        console.error(error);
    }
}

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
    
        navigate('/dashboard/modbus_config',{
     
    })
    }, 1000);
};



console.log("viewModbusConf",viewModbusConf);

    return(


        <Page title="Modbus Configuration">
              <Container>
            <ContentStyle>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Welcome
              </Typography>
            </ContentStyle>

    


    

        <Card>
        <CardContent
                  sx={{
                    height: "300px",
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                >
                  {viewModbusConf &&
                  viewModbusConf.map((modbus , index) => (
                    <Card key={index} sx={{ width: "100%", marginTop: 1 }}>
                      <CardContent
                          sx={{
                            height: "250px",
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
                                Address :  {modbus ? modbus.address : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Port :  {modbus ? modbus.port : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Method :  {modbus ? modbus.method : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Baudrate :  {modbus ? modbus.baudrate : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Scanrate :  {modbus ? modbus.full_scan_time : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Number Of Sensors :  {modbus ? modbus.number_of_sensors : ""}
                              </Box>
                            </Typography>
                          </Stack>
               
                        </CardContent>
                    </Card>            
                  ))}
                  </CardContent>
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
                  
    
                  
    
             

        </Card>
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
    )
}