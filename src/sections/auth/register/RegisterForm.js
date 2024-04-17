import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack, IconButton, InputAdornment, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// hooks
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
// components
import Iconify from "../../../components/Iconify";
import { FormProvider, RHFTextField } from "../../../components/hook-form";

import { PATH_AUTH } from "../../../routes/paths";


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const contactNumberRegx = /^[6-9]\d{9}$/;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(30, "First name should not exceed 30 characters")
      .required("First name required"),
    lastName: Yup.string()
      .max(30, "Last name should not exceed 30 characters")
      .required("Last name required"),
    contactNumber: Yup.string()
      .matches(contactNumberRegx, "Enter a valid contact number")
      .required("Contact number is required"),
    eventName: Yup.string()
      .max(30, "Event name should not exceed 30 characters")
      .required("Event name is required"),
    eventDate: Yup.string().required("Event date is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm password and password must be same"
      )
      .required("Confirm password is required"),
    email: Yup.string().email().required("Email is required"),
  });

  const defaultValues = {
    firstName: "",
    lastName: "",
    contactNumber: "",
    eventName: "",
    eventDate: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        contactNumber: data.contactNumber,
        eventName: data.eventName,
        eventDate: data.eventDate,
        password: data.password,
        email: data.email,
      });
      navigate(PATH_AUTH.login, { replace: true });
    } catch (error) {
      console.error(error);
      // reset();
      if (isMountedRef.current) {
        setError("afterSubmit", { ...error, message:'Something went wrong' });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="eventName" label="Event name" />
          <RHFTextField
            name="eventDate"
            label="Event date"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Stack>

        <RHFTextField
          name="contactNumber"
          label="Contact number"
          type="number"
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Iconify
                      icon={
                        showConfirmPassword
                          ? "eva:eye-fill"
                          : "eva:eye-off-fill"
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <RHFTextField name="id" label="ID" />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
