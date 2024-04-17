// @mui
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
// hooks
import useSettings from "../hooks/useSettings";
// components
import Page from "../components/Page";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Auth_API from "src/services/auth";
import { ErrorCodes } from "src/constants/ErrorConstants";
import { get } from "lodash";
import { toast } from "react-hot-toast";
import Loader from "src/components/Loader";

// ----------------------------------------------------------------------

export default function PageFive() {
  const { themeStretch } = useSettings();
  const [viewHistory, setViewHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMinWidth400px = useMediaQuery("(max-width:400px)");

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString("en-US", options);
  };

  const bookingHistoryDetails = async () => {
    try {
      const response = await Auth_API.bookingHistory();
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          setViewHistory(response);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    bookingHistoryDetails();
  }, []);

  const navigate = useNavigate();
  const goToPrev = () => {
    navigate("/dashboard/page1");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <Loader width={50} />
      </div>
    );
  }

  return (
    <Page title="Recent Booking">
      <Container maxWidth={themeStretch ? false : "xl"}>
        <Stack position={"column"}>
          <Stack direction="row" alignItems="center" spacing={1}>
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
              sx={{
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                flex: 0.75,
              }}
              variant="h3"
              component="h1"
              paragraph
            >
              Booking History
            </Typography>
          </Stack>
          <Typography
            sx={{
              mt: 1,
              fontSize: "19px",
              flex: 0.75,
            }}
            variant="h3"
            component="h1"
            paragraph
          >
            Recent Booking
            {console.log("viewHistory", viewHistory)}
          </Typography>
          {viewHistory && viewHistory[0]?.booking_ref !== undefined ? (
            <Stack>
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
                  {viewHistory &&
                    viewHistory.map((booking, index) => (
                      <Card key={index} sx={{ width: "100%", marginTop: 1 }}>
                        <CardContent
                          sx={{
                            height: "125px",
                            bgcolor: "#ECECEC",
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                fontSize: isMinWidth400px ? "10px" : "13px",
                                display: "flex",
                                justifyContent: "center",
                                fontWeight: "Bold",
                              }}
                              variant="body1"
                            >
                              {booking.mall_name}
                            </Typography>
                            <Typography
                              sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                background:
                                  "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                                color: "white",
                                fontWeight: "bold",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                fontSize: isMinWidth400px ? "13px" : "16px",
                                px: 3.5,
                                pr: 3.5,
                              }}
                            >
                              {booking ? booking.current_booking_status : ""}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography variant="contained">
                              <Box
                                sx={{
                                  fontSize: isMinWidth400px ? "10px" : "13px",
                                  color: "#b7b7b7",
                                }}
                              >
                                Reference number
                              </Box>
                              <Box
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  mr: 2,
                                  fontWeight: "Bold",
                                }}
                              >
                                {booking ? booking.booking_ref : ""}
                              </Box>
                            </Typography>
                            <Stack>
                              <Typography
                                sx={{
                                  fontSize: isMinWidth400px ? "10px" : "13px",
                                  display: "flex",
                                  alignItems: "right",
                                  justifyContent: "right",
                                }}
                                variant="body1"
                              >
                                Booking ID: {booking.booking_id}
                              </Typography>

                              <Typography
                                sx={{
                                  marginBottom: 1,
                                  marginTop: 1,
                                  display: "flex",
                                  alignItems: "right",
                                  justifyContent: "right",
                                  fontWeight: "Bold",
                                }}
                                variant="body1"
                              >
                                {booking ? formatTime(booking.book_date) : ""}
                              </Typography>
                            </Stack>
                          </Stack>
                          <Stack
                            direction="row"
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: isMinWidth400px ? "10px" : "13px",
                                color: "#b7b7b7",
                              }}
                              variant="body1"
                            >
                              {booking ? formatDate(booking.book_date) : ""}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: isMinWidth400px ? "10px" : "13px",
                                color: "#b7b7b7",
                              }}
                              variant="body1"
                            >
                              Reg No:{" "}
                              {booking.vehicle_number !== undefined || null
                                ? booking.vehicle_number
                                : "-"}
                            </Typography>
                          </Stack>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            </Stack>
          ) : (
            <Paper
              elevation={3}
              style={{
                padding: 20,
                maxWidth: 400,
                margin: "auto",
                marginTop: 50,
                height: "calc(100vh - 21rem)",
              }}
            >
              <Typography variant="body1">
                Booking history data is not available. Kindly check with the
                administrator.
              </Typography>
            </Paper>
          )}
        </Stack>
      </Container>
    </Page>
  );
}
