import {
    Box,
    Card,
    CardContent,
    Container,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
  } from "@mui/material";
import { styled } from "@mui/material/styles";
import Page from "../components/Page";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Auth_API from "src/services/auth";
import { LoadingButton } from "@mui/lab";

const ContentStyle = styled("div")(({ theme }) => ({
    maxWidth: 480,
    margin: "auto",
    minHeight: 'calc(100vh - 40rem)',
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  }));

export default function GatewayConfiguration () {
    const [viewGatewayConf , setviewGatewayConf] = useState([]);
    const isMinWidth400px = useMediaQuery("(max-width:400px)");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        //setLoading(true);
    
        setTimeout(() => {
        
            navigate('/dashboard/modbus_config',{
              replace: true
            }); // Provide the path to the target page
            setLoading(false);
        }, 1000);
    };

    const gatewayConfiguration = async() => {
        try{
            const response = await Auth_API.readGatewayConf();
            setviewGatewayConf(response.result);
        }
        catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        setLoading(true);
        gatewayConfiguration();
      }, []);

    console.log("viewGatewayConf",viewGatewayConf);


    return(
        <Page title="Gateway Configuration">
            <Container>
            <ContentStyle>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Gateway Configuration
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
                >
                    {/* {viewGatewayConf &&
                    viewGatewayConf.map((gateway, index) => {
                        <Card key={index} sx={{ width: "100%", marginTop: 1 }}>
                             <CardContent
                          sx={{
                            height: "300px",
                            bgcolor: "#ECECEC",
                          }}
                        >
                            <Stack>
                            <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                serial_terminal :  {gateway ? gateway.serial_terminal : ""}
                              </Box>
                            </Stack>
                        </CardContent>
                        </Card>
                    })} */}
                             <CardContent
                          sx={{
                            height: "900px",
                            bgcolor: "#ECECEC",
                          }}
                        >
                            <Stack>
                            <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                serial_terminal :  {viewGatewayConf ? viewGatewayConf.serial_terminal : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                ap_mode :  {viewGatewayConf ? viewGatewayConf.ap_mode : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                conf :  {viewGatewayConf ? viewGatewayConf.conf : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                controller_communication :  {viewGatewayConf ? viewGatewayConf.controller_communication : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                database :  {viewGatewayConf ? viewGatewayConf.database : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                display :  {viewGatewayConf ? viewGatewayConf.display : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                display_7_segment :  {viewGatewayConf ? viewGatewayConf.display_7_segment : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                display_refresh_timeout :  {viewGatewayConf ? viewGatewayConf.display_refresh_timeout : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                display_source :  {viewGatewayConf ? viewGatewayConf.display_source : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                display_timeout :  {viewGatewayConf ? viewGatewayConf.display_timeout : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                floor_sensor :  {viewGatewayConf ? viewGatewayConf.floor_sensor : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                gateway_connections :  {viewGatewayConf ? viewGatewayConf.gateway_connections : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                height_refresh_timeout :  {viewGatewayConf ? viewGatewayConf.height_refresh_timeout : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                hi_timeout :  {viewGatewayConf ? viewGatewayConf.hi_timeout : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                is_proxy :  {viewGatewayConf ? viewGatewayConf.is_proxy : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                is_unauthorized_at_start :  {viewGatewayConf ? viewGatewayConf.is_unauthorized_at_start : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                local_print :  {viewGatewayConf ? viewGatewayConf.local_print : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                webserver_host :  {viewGatewayConf ? viewGatewayConf.webserver_host : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                webserver_port :  {viewGatewayConf ? viewGatewayConf.webserver_port : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                conf :  {viewGatewayConf ? viewGatewayConf.conf : ""}
                              </Box>

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
                </CardContent>
            </Card>

            </Container>
        </Page>
    )
}