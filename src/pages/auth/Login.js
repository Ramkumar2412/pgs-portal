import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  Stack,
  Link,
  Alert,
  Tooltip,
  Container,
  Typography,
} from "@mui/material";
// routes
import { PATH_AUTH } from "../../routes/paths";
// hooks
// import useAuth from "../../hooks/useAuth";
import useResponsive from "../../hooks/useResponsive";
// components
import Page from "../../components/Page";
import Logo from "../../components/Logo";
import Image from "../../components/Image";
// sections
import LoginForm from "../../sections/auth/login/LoginForm";
import AdminLogin from "src/sections/auth/login/AdminForm";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: 'center',
    height: '100vh'
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  // marginBottom: "3rem",
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
  minHeight: 'calc(100vh - 40rem)',
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
}));

// ----------------------------------------------------------------------

export default function Login() {
  // const { method } = useAuth();

  // const smUp = useResponsive("up", "sm");

  // const mdUp = useResponsive("up", "md");

  return (
    <Page title="Login">
      <RootStyle>
        <Stack sx={{ display:"flex", justifyContent: 'space-between', height: '100vh'   ,  '@media (max-width: 600px)': {
                    flexDirection: 'column',
                },}}>
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
          <Stack sx={{ ml: "45px" }}>
            <Image
              visibleByDefault
              disabledEffect
              src="/assets/Frame.jpg"
              alt="login"
            />
          </Stack>
          <Container>
            <ContentStyle>
              <Typography
                variant="h3"
                sx={{ mt: 2, mb: 2, textAlign: "center", fontWeight: "bold" }}
              >
                Welcome Back
              </Typography>
              {/* <LoginForm  /> */}
              <AdminLogin />
            </ContentStyle>
            <Box sx={{ mt: 5,}}>
              <Image
                visibleByDefault
                disabledEffect
                src="/assets/Group.png"
                alt="theme"
              />
            </Box>
          </Container>
        </Stack>
      </RootStyle>
    </Page>
  );
}
