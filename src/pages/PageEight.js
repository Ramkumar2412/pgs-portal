import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Divider,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import Page from "src/components/Page";
import get from "lodash/get";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import QRCode from "react-qr-code";
import CloseIcon from "@mui/icons-material/Close";
import Image from "src/components/Image";
import AuthService from "src/services/authService";
import Auth_API from "src/services/auth";
import ObjectStorage from "src/modules/ObjectStorage";
import { StorageConstants } from "src/constants/StorageConstants";
import { toast } from "react-hot-toast";
import { spacing } from "@mui/system";
import { ErrorCodes } from "src/constants/ErrorConstants";
import RefreshIcon from "@mui/icons-material/Refresh";
import { LoadingButton } from "@mui/lab";
import Loader from "src/components/Loader";

const PageEight = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [viewBooking, setViewBooking] = useState(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const date = viewBooking ? viewBooking.book_date : "";
  const formattedDate = date ? new Date(date).toLocaleDateString() : "";
  const formattedTime = date ? new Date(date).toLocaleTimeString() : "";
  const arriveTime = viewBooking ? viewBooking.arrive_before : "";
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const formattedArrivalTime = arriveTime
    ? new Date(arriveTime).toLocaleTimeString()
    : "";
  const vehicleType = viewBooking ? viewBooking.vehicle_type : "";
  let formattedVehicleType = "";

  if (vehicleType === "fourwheeler") {
    formattedVehicleType = "Four Wheeler";
  } else if (vehicleType === "twowheeler") {
    formattedVehicleType = "Two Wheeler";
  }

  const viewBookingDetails = async () => {
    try {
      const response = await Auth_API.viewBooking();
      setViewBooking(response[0]);
      if (response) {
        if (get(response, "0.ErrCode") === "600") {
          toast.error(get(response, "0.ErrDesc"));
        }
      }
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  const CancelBookingApiCall = async () => {
    try {
      const bookingRef = get(viewBooking, "booking_ref");
      const response = await Auth_API.cancelBooking(bookingRef);
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          viewBookingDetails();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelBooking = async () => {
    try {
      await CancelBookingApiCall();
      setOpen(false);
      navigate("/dashboard/page1", { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelBooking = () => {
    setOpen(true);
  };

  useEffect(() => {
    viewBookingDetails();
  }, []);

  const goToPrev = () => {
    navigate("/dashboard/page1", { replace: true });
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
    <Page title="View Booking">
      <Container>
        <Stack position={"column"}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Box
              sx={{
                width: "3rem",
                height: "3rem",
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
                border: 1,
                borderColor: "b7b7b7",
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
                flex: 1.5,
              }}
              variant="h3"
              component="h1"
              paragraph
            >
              View
            </Typography>
            <LoadingButton sx={{ color: "#009797" }}>
              <RefreshIcon
                onClick={viewBookingDetails}
                sx={{
                  ml: 2,
                }}
              />
            </LoadingButton>
          </Stack>
          <Stack
            sx={{
              color: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            direction="row"
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              variant="h3"
            >
              Allotted Parking Slot
            </Typography>
            <Box
              sx={{
                width: "3rem",
                height: "3rem",
                borderRadius: 1,
                backgroundColor: "#FFFFFF",
                border: 1,
                borderColor: "#b7b7b7",
                color: "black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {viewBooking && (
                <QRCode
                  size={32}
                  onClick={() => setOpenQRDialog(true)}
                  value={JSON.stringify({
                    qr_text: viewBooking.qr_text,
                  })}
                />
              )}
            </Box>

            {viewBooking && viewBooking.booking_ref !== undefined && (
              <Dialog
                open={openQRDialog}
                onClose={() => setOpenQRDialog(false)}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: 2,
                  }}
                  direction="row"
                >
                  <Typography sx={{ fontSize: "18px", fontWeight: "Bold" }}>
                    {"Parking Slot QR"}
                  </Typography>
                  <CloseIcon onClick={() => setOpenQRDialog(false)} />
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Paper
                  sx={{
                    p: 2,
                  }}
                >
                  <Box>
                    {viewBooking && (
                      <QRCode
                        value={JSON.stringify({
                          qr_text: viewBooking.qr_text,
                        })}
                      />
                    )}
                  </Box>
                </Paper>
              </Dialog>
            )}
          </Stack>
          {viewBooking && viewBooking.booking_ref !== undefined ? (
            <Box>
              <Stack>
                <Typography
                  variant="contained"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 1,
                    marginTop: 1,
                    background: alpha("#22CFCF", 0.5),
                    borderRadius: "12px",
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: 2,
                      marginTop: 2,
                      ml: 2,
                      fontSize: "13px",
                      color: "#08B4B4",
                    }}
                  >
                    Reference number
                  </Box>
                  <Box
                    sx={{
                      marginBottom: 2,
                      marginTop: 2,
                      mr: 2,
                    }}
                  >
                    {viewBooking ? viewBooking.booking_ref : ""}
                  </Box>
                </Typography>
              </Stack>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 2,
                  marginTop: 2,
                  marginBottom: 2,
                  minHeight: "calc(20vh - 2rem)",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/date 1.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>{formattedDate}</Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Booking Date</Box>
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/time 1-2.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>{formattedTime}</Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Booking Time</Box>
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/time 1.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>
                        {formattedArrivalTime}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Arrive Before</Box>
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/floor-tiles-icon 1.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>
                        {viewBooking ? viewBooking.current_booking_status : ""}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Parking Status</Box>
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/car-front 1.png"
                        alt="theme"
                      />
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/Line 1.png"
                        alt="theme"
                      />
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/Vector-2.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>
                        {formattedVehicleType}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Vehicle Type</Box>
                    </Typography>
                  </CardContent>
                </Card>
                <Card
                  sx={{
                    width: "100%",
                    Height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ mt: 1 }}>
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/car-front 1.png"
                        alt="theme"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 1,
                        marginBottom: 1,
                      }}
                    >
                      <Box sx={{ minHeight: "1.5em" }}>
                        {viewBooking && viewBooking.vehicle_number
                          ? viewBooking.vehicle_number
                          : "-"}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px",
                        color: "#b7b7b7",
                      }}
                    >
                      <Box>Vehicle Number</Box>
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Box>
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
                Current booking has expired. Kindly go back to the previous page
                and book again.
              </Typography>
            </Paper>
          )}
          {get(viewBooking, "has_arrived") === "0" &&
            viewBooking.booking_ref !== undefined && (
              <Box>
                <Button
                  sx={{
                    marginTop: 1,
                    background:
                      "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                    minHeight: "70px",
                    borderRadius: 2,
                    fontSize: "20px",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    width: "100%",
                  }}
                  onClick={cancelBooking}
                >
                  Cancel Booking
                </Button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <Paper
                    sx={{
                      p: 2,
                    }}
                  >
                    <Typography
                      sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                    >
                      Are you sure you want to cancel this Booking?
                    </Typography>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => setOpen(false)}
                        sx={{ mr: 2, color: "#11D6D6" }}
                        variant="outlined"
                      >
                        No
                      </Button>
                      <Button
                        onClick={handleCancelBooking}
                        sx={{
                          mr: 2,
                          background:
                            "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                        }}
                        variant="contained"
                      >
                        Yes
                      </Button>
                    </div>
                  </Paper>
                </Dialog>
              </Box>
            )}
        </Stack>
      </Container>
    </Page>
  );
};

export default PageEight;
