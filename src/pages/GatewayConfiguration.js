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
import { useEffect, useState ,startTransition } from "react";
import Auth_API from "src/services/auth";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";

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


    useEffect(() => {
      setLoading(true);
      gatewayConfiguration();
    }, []);

    const gatewayConfiguration = async() => {
      try{
          const response = await Auth_API.readGatewayConf();
          setviewGatewayConf(response.result);
      }
      catch(error){
          console.error(error);
      }
  }

    const handleClick = () => {
        setLoading(true);
    
        setTimeout(() => {
        
            navigate('/dashboard/gateway_config',{
              replace: true,
              state:viewGatewayConf
            }); // Provide the path to the target page
            setLoading(false);
        }, 1000);
    };



    //const gateway = JSON.parse(viewGatewayConf);
  console.log("viewGatewayConf",viewGatewayConf);

  //console.log("serial_terminal " , _.get(viewGatewayConf ,'serial_terminal','default'));


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
                             <CardContent
                          sx={{
                            height: "375px",
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
                                Webserver Host :  {viewGatewayConf ? viewGatewayConf.webserver_host : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Webserver Port :  {viewGatewayConf ? viewGatewayConf.webserver_port : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Webserver Protocol :  {viewGatewayConf ? viewGatewayConf.webserver_protocol : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Localserver Host :  {viewGatewayConf ? viewGatewayConf.localserver_host : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Localserver Port :  {viewGatewayConf ? viewGatewayConf?.localserver_port : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Localserver Protocol :  {viewGatewayConf ? viewGatewayConf.localserver_protocol : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Communication :  {viewGatewayConf ? viewGatewayConf.conf : ""}
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Webserver Authcode :  {viewGatewayConf ? viewGatewayConf.webserver_authcode : ""}
                              </Box>

                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                Verified :  {viewGatewayConf ? viewGatewayConf.key_verify : ""}
                              </Box>

                            </Stack>
                           
                        </CardContent>
                        <LoadingButton
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                              background:
                                "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                              minHeight: "50px",
                              borderRadius: 1,
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
    )
}