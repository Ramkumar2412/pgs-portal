import get from "lodash/get";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
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
  Typography,
  TextField
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import { RHFTextField, FormProvider } from "src/components/hook-form";
import ObjectStorage from "src/modules/ObjectStorage";
import Auth_API from "src/services/auth";
import { toast } from "react-hot-toast";
import { ErrorCodes } from "src/constants/ErrorConstants";
import { StorageConstants } from "src/constants/StorageConstants";



export default function AdminLogin () {


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
    const LoginSchema = Yup.object().shape({
        emailId: Yup.string().required("username is required"),
        password:Yup.string().required("password is required")
      });

    
  const defaultValues = {
    emailId: "",
    password:"",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const options = {
        username: data.emailId,
        password:data.password
      };
      const response = await Auth_API.adminlogin(options);
      const ErrCode = response.ErrCode;
      console.log("ErrCode",ErrCode);
      console.log("response", response);
      if (response) {
        ObjectStorage.setItem(StorageConstants.USER_DETAILS,{
          data:response,
        });
        if (response.result == true) {
          console.log("The password Matches");
              const modbusConf = await Auth_API.getmodbusconf();
              console.log(modbusConf);
           
         console.log()
          navigate("/dashboard/modbus", {
            replace: true,
            state:modbusConf,
          });
        } 
       
        console.log(response.result);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.detail);
    }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              fontSize: "10px",
            }}
          >
            Username
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="emailId"
            label="Enter the Username"
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
            Password
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="password"
            label="Enter the Valid Password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
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
            Login
          </Typography>
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}