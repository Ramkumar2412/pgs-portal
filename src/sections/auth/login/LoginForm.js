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
} from "@mui/material";
import ObjectStorage from "src/modules/ObjectStorage";
import RouteConstants from "src/constants/RouteConstants";
import { RHFTextField, FormProvider } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import { StorageConstants } from "src/constants/StorageConstants";
import { minHeight } from "@mui/system";
import Auth_API from "src/services/auth";
import { toast } from "react-hot-toast";
import { ErrorCodes } from "src/constants/ErrorConstants";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    mobileNo: Yup.string().required("Mobile no is required"),
  });

  const defaultValues = {
    mobileNo: "",
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
        phone_no: data.mobileNo,
      };
      const response = await Auth_API.login(options);
      console.log("response", response);
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          ObjectStorage.setItem(StorageConstants.USER_DETAILS, {
            data: get(response, "0"),
          });
          ObjectStorage.setItem(StorageConstants.ACCESS_TOKEN, {
            token: get(response, "0.token"),
          });
          const mobileVerificationResponse =
            await Auth_API.mobileVerification();
          // if (get(mobileVerificationResponse, "0.ErrCode") === "0") {
            navigate("/modbus", {
              replace: true,
              state: {
                existingCustomer:
                  get(response, "0.registration") === "existing" ? true : false,
              },
            });
          // } else {
          //   toast.error(get(mobileVerificationResponse, "0.ErrDesc"));
          // }
        }
      }
    } catch (error) {
      console.error(error);
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
            variant="h2"
            sx={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Mobile Number
          </Typography>
          <RHFTextField
            sx={{ borderRadius: 10 }}
            name="mobileNo"
            label="Enter the registered mobile number"
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