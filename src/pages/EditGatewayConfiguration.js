import get from "lodash/get";
import { useState } from "react";
//import { useNavigate } from "react-router";
import * as Yup from "yup";
import useSettings from "../hooks/useSettings";
import { useNavigate , useLocation } from "react-router-dom";
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

import { RHFTextField, FormProvider ,RHFSelect } from "src/components/hook-form";
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


export default function EditGatewayConfiguration () {
  const { themeStretch } = useSettings();
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location",location);
    let defaultValues;
    const gatewaySchema = Yup.object().shape({
      webserver_host: Yup.string().required("Address Id is required"),
      webserver_port:Yup.string().required("Port is required"),
      localserver_host: Yup.string().required("Address Id is required"),
      localserver_port:Yup.string().required("Port is required"),
        conf: Yup.string().required("Method Id is required")
      }); 
      if(location.state == null)
      {
        defaultValues = {
          webserver_host: "",
          webserver_port:"",
          webserver_protocol:"",
          localserver_host:"",
          localserver_port:"",
          localserver_protocol:"",
          conf: "modbus",
          key_verify:""
  
        };
      }
      else{
        defaultValues = {
          webserver_host: location.state.webserver_host,
          webserver_port:location.state.webserver_port,
          webserver_protocol:"http",
          localserver_host:location.state.localserver_host,
          localserver_port:location.state.localserver_port,
          localserver_protocol:"http",
          conf: "modbus",
          key_verify : 'yes'
  
        };
      }


      const configuration = [   {
      value : 'modbus',
      label : 'modbus',
    },{
      value : 'serial',
      label : 'serial',
    }];

    const protocol = [ {
      value:'http',
      label:'http',
    },{
      value:'https',
      label:'https'
    }];

    const verification = [{
      value : 'yes',
      label : 'yes'
    },{
      value : 'no',
      label : 'no'
    }];
    
      const methods = useForm({
        resolver: yupResolver(gatewaySchema),
        defaultValues,
      });
    
      const {
        handleSubmit,
        formState: { errors, isSubmitting },
      } = methods;
      
      const goToPrev = () => {
        navigate("/dashboard/gateway");
      };


      const onSubmit = async (data) => {
        console.log("submit clicked");
        try {
          const options = {
            webserver_host: data.webserver_host,
            webserver_port:data.webserver_port,
            webserver_protocol: data.webserver_protocol,
            localserver_host: data.localserver_host,
            localserver_port:data.localserver_port,
            localserver_protocol: data.localserver_protocol,
            conf: data.conf,
            key_verify: data.key_verify
          };
          const response = await Auth_API.writeGatewayConf(options);
          console.log("response", response);
          if (response) {
              navigate("/dashboard/gateway", {
                replace: true
              });
            
            console.log(response);
          }
        } 
        catch (error) {
          console.error(error);
        }
      };  

  return (
    <Page title="Gateway Configuration">
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
                Gateway Configuration
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
           Web Host
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 5 }}
            name="webserver_host"
            label="Enter the Valid Web host"
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
            Web Port
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="webserver_port"
            label="Enter the Valid Web port"
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
           Web Protocol
          </Typography>
          <RHFSelect
            sx={{ borderRadius: 5 }}
            name="webserver_protocol"
            label="Enter the Valid Protocol"
            options={protocol}
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
           Local Host
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 5 }}
            name="localserver_host"
            label="Enter the Valid Local host"
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
            Local Port
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="localserver_port"
            label="Enter the Valid Local Port"
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
           Local Protocol
          </Typography>
          <RHFSelect
            sx={{ borderRadius: 5 }}
            name="localserver_protocol"
            label="Enter the Valid Protocol"
            options={protocol}
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
            Communication
          </Typography>
          <RHFSelect
            sx={{ borderRadius: 10 }}
            name="conf"
            label=""
            options={configuration}
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
            Verify
          </Typography>
          <RHFSelect
            sx={{ borderRadius: 10 }}
            name="key_verify"
            label=""
            options={verification}
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