import {
  Box,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "src/components/Image";
import Logo from "src/components/Logo";
import Page from "src/components/Page";
import { LoadingButton } from "@mui/lab";
import React, { createRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthService from "src/services/authService";
import Auth_API from "src/services/auth";
import { toast } from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ErrorCodes } from "src/constants/ErrorConstants";
import get from "lodash/get";
import ObjectStorage from "src/modules/ObjectStorage";
import { StorageConstants } from "src/constants/StorageConstants";
import { RHFTextField, FormProvider } from "src/components/hook-form";

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  marginTop: "3rem",
  justifyContent: "center",
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 464,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "calc(100vh - 40rem)",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

const MobileVerification = () => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const location = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();
  // const updateUserDetail,

  console.log("location",location)

  const LoginSchema = Yup.object().shape({
    mobileNo: Yup.string().required("Mobile no is required"),
  });

  const defaultValues = {
    mobileNo: "",
  };
  console.log("otp", parseInt(otp.join("")));
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const inputRefs = [createRef(), createRef(), createRef(), createRef()];
  const otpOnChange = (value) => {
    setOTP(value);
  };

  const handleOTPChange = (index, event) => {
    const inputValue = event.target.value;

    const sanitizedValue = inputValue.replace(/\D/g, "");

    if (sanitizedValue.length <= 1) {
      const newValue = [...otp];
      newValue[index] = sanitizedValue;
      otpOnChange(newValue);

      if (index < inputRefs.length - 1 && sanitizedValue !== "") {
        inputRefs[index + 1].current.focus();
      }
    }
  };
  const isAllValuesPresent = otp.every((value) => value !== "");

  const handleBackspace = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  //   const handleResendOtp = async () => {
  //     try {
  //       setTimer(59);
  //       await AuthService.sendSignIn({
  //         email: state?.email,
  //         password: state?.password,
  //       });
  //       toast.success("OTP sent successfully");
  //     } catch (error) {
  //       toast.error(error.message || "something went wrong");
  //     }
  //   };

  useEffect(() => {
    let intervalId;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer <= 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timer]);

  const handleSubmitOTP = async (data) => {
    try {
      const options = {
        code: parseInt(otp.join("")),
      };
      const response = await Auth_API.otpVerification(options);
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          if(location.state.existingCustomer === true){
            navigate("/dashboard/mapPage", { replace: true });
          }else{
            console.log("running");
            navigate("/dashboard/userDetails", { replace: true });
          }
          navigate("/dashboard/mapPage", { replace: true });
        }
      }
    } catch (error) {
      toast.error(error.message || "OTP is invalid");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(handleSubmitOTP)}>
      <Stack
        flexDirection={"column"}
        justifyContent={"space-between"}
        sx={{ height: "100vh", backgroundColor: "#FCFCFC" }}
      >
        <Stack>
          {/* <ArrowBackIcon
        fontSize="medium"
        sx={{ color: "#fff" }}
        onClick={() =>
          navigationPage(
            `/${RouteConstants.ROOT_AUTH}/${RouteConstants.LOGIN}`
          )
        }
      /> */}

          <HeaderStyle>
            <Logo
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabledLink
            />
          </HeaderStyle>
        </Stack>
        <Stack justifyContent={"space-between"} flexGrow={1}>
          <Stack alignItems={"center"} pt={10}>
            <Stack pt={3} gap={2}>
              <Typography
                variant="h2"
                sx={{
                  mt: 2,
                  mb: 6,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                Mobile Number Verification
              </Typography>
              <Stack pr={4} pl={4}>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 6,
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#b7b7b7",
                  }}
                >
                  We have sent an OTP to your mobile number
                </Typography>
              </Stack>
            </Stack>
            <Stack flexDirection={"row"} pl={5} pr={5} pt={2}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  variant="outlined"
                  autoComplete="off"
                  value={digit}
                  type="number"
                  onChange={(event) => handleOTPChange(index, event)}
                  onKeyDown={(event) => handleBackspace(index, event)}
                  inputProps={{ maxLength: 1 }}
                  inputRef={inputRefs[index]}
                  style={{ marginRight: "8px" }}
                />
              ))}
            </Stack>
            {/* <Stack flexDirection={"row"} gap={1} pt={2} justifyContent={"center"}>
          <Typography variant="subtitle2">Did not get the OTP ?</Typography>
          <Typography
            onClick={timer === 0 ? handleResendOtp : ""}
            variant="subtitle2"
            sx={{
              textDecoration: `${timer !== 0 ? "" : "underline"}`,
              color: `${
                timer === 0 ? theme.palette.primary.main : "#B5B5B5"
              }`,
            }}
          >
            Resend {timer === 0 ? "" : `(${timer})`}
          </Typography>
        </Stack> */}

            <Stack alignItems={"center"} pb={3}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleSubmitOTP}
                disabled={!isAllValuesPresent}
                sx={{
                  width: "350px",
                  height: "60px",
                  marginTop: "3.7rem",
                  background:
                    "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                  borderRadius: "20px",
                }}
              >
                <Typography variant="body1" fontWeight="bold" color={"white"}>
                  Verify
                </Typography>
              </LoadingButton>
            </Stack>
            <Typography
              variant="h2"
              sx={{
                mt: 6,
                textAlign: "center",
                fontSize: "14px",
                color: "#b7b7b7",
              }}
            >
              Didn't receive a code? Resend
            </Typography>
          </Stack>
          <Box sx={{ mt: 5 }}>
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/Group.png"
              alt="theme"
            />
          </Box>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default MobileVerification;
