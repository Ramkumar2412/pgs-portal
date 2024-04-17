import React, { useEffect, useState } from "react";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Dialog, Paper, Stack, Typography } from "@mui/material";
import { get } from "lodash";
import { LoadingButton } from "@mui/lab";
import Auth_API from "src/services/auth";
import { ErrorCodes } from "src/constants/ErrorConstants";
import { toast } from "react-hot-toast";

export default function UserDetails() {
  const [openDialog, setOpenDialog] = useState(false);

  const LoginSchema = Yup.object().shape({
    firstname: Yup.string().required("first name is required"),
    lastname: Yup.string().required("last name is required"),
  });

  const navigate = useNavigate();

  const defaultValues = {
    firstname: "",
    lastname: "",
  };

  console.log("openDialog", openDialog);

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
        firstname: data.firstname,
        lastname: data.lastname,
      };
      const response = await Auth_API.userDetailUpdate(options);
      console.log("response", response);
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          const mobileVerificationResponse =
            await Auth_API.mobileVerification();
          navigate("/auth/mobileVerification", {
            replace: true,
            state: {
              existingCustomer:
                get(response, "0.registration") === "existing" ? true : false,
            },
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOpenDialog(true);
  }, []);
  return (
    <div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Paper sx={{ padding: 2, borderRadius: 1 }}>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  First name
                </Typography>
                <RHFTextField
                  sx={{ borderRadius: 10 }}
                  name="firstname"
                  label="Enter the first name"
                />
              </Stack>
              <Stack spacing={1}>
                <Typography
                  variant="h2"
                  sx={{
                    textAlign: "left",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Last name
                </Typography>
                <RHFTextField
                  sx={{ borderRadius: 10 }}
                  name="lastname"
                  label="Enter the last name"
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
              Submit
            </Typography>
          </LoadingButton>
            </Stack>
          </Paper>

         
        </FormProvider>
      </Dialog>
    </div>
  );
}
