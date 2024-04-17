// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  Grid,
  MenuItem,
  Paper,
  Select,
  Typography,
  Item,
  FormControl,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
// hooks
import useSettings from "../hooks/useSettings";
import { useEffect, useState } from "react";
// components
import Page from "../components/Page";
import { useNavigate } from "react-router-dom";
import ObjectStorage from "src/modules/ObjectStorage";
import { StorageConstants } from "src/constants/StorageConstants";
import { LoadingButton } from "@mui/lab";
import Image from "src/components/Image";
import { filter, get, isEmpty, map, values } from "lodash";
import axios from "axios";
import AuthService from "src/services/authService";
import Auth_API from "src/services/auth";
import { Toaster, toast } from "react-hot-toast";
import { Stack } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ErrorCodes } from "src/constants/ErrorConstants";
import Loader from "src/components/Loader";

// ----------------------------------------------------------------------

export default function PageSix() {
  const { themeStretch } = useSettings();
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const navigate = useNavigate();
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookParkingSlot, setBookParkingSlot] = useState(false);
  const [viewBooking, setViewBooking] = useState(null);
  const [mallDetails, setMallDetails] = useState(null);
  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("2");
  const userDetails = AuthService.getUserDetails();
  const [vehicleNumber, setVehicleNumber] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectVehicleNumber, setSelectVehicleNumber] = useState(null);
  const [loading, setLoading] = useState(true);

  const BookingApiCall = async () => {
    try {
      const options = {
        mall_id: get(parkingSpaces, "mall_id"),
        city_id: get(parkingSpaces, "city_id"),
        vehicle_type_id: selectedVehicleType,
        ...(selectVehicleNumber ? { vehicle_id: selectVehicleNumber } : {}),
      };
      setOpenBookingDialog(false);
      const response = await Auth_API.Booking(options);
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else if (get(response, "0.booking_ref")) {
          navigate("/dashboard/Views", { replace: true });
        }
      }
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };
  const goToBookings = async () => {
    setLoading(true);
    setBookParkingSlot(true);
    setIsSlotBooked(true);
    await BookingApiCall();
  };

  const handleVehicleType = (e) => {
    setSelectVehicleNumber(null);
    setSelectedVehicleType(e.target.value);
  };

  const handleVehicleNumber = (e) => {
    setSelectVehicleNumber(e.target.value);
  };

  const goToViewBookings = () => {
    setLoading(true);
    navigate("/dashboard/Views", {
      replace: true,
      state: { parkingSpaces, selectedVehicleType: selectedVehicleType },
    });
  };

  const parkingSpaceData = async () => {
    try {
      const mallId = get(userDetails, "mall_data.0.mall_id", 0);
      const response = await Auth_API.parkingSpace(mallId);
      const mallResponse = get(response, `${mallId}`);
      setParkingSpaces(mallResponse);
      ObjectStorage.setItem(StorageConstants.VEHICLE_TYPES, {
        types: values(get(mallResponse, "numbers")),
      });
      setVehicleTypes(values(get(mallResponse, "numbers")));
    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false);
    }
  };

  const handleBookingCancel = async () => {
    setOpenBookingDialog(false);
  };
  const viewBookingDetails = async () => {
    try {
      const response = await Auth_API.viewBooking();
      setViewBooking(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleMallDetails = async () => {
    try {
      const response = await Auth_API.mallDetails();
      setMallDetails(response);
      console.log("response", response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectedVehicleType = () => {
    const filteredVehicles = filter(vehicles || [], (e) =>
      Number(get(e, "vehicle_type_id") === Number(selectedVehicleType))
    );
    setVehicleNumber(filteredVehicles);
  };
  const vehicleDetails = async () => {
    try {
      const response = await Auth_API.vehicleDetail();
      if (response) {
        if (ErrorCodes.includes(get(response, "0.ErrCode"))) {
          toast.error(get(response, "0.ErrDesc"));
        } else {
          setVehicles(response || []);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (selectedVehicleType) handleSelectedVehicleType();
  }, [selectedVehicleType, vehicles]);
  useEffect(() => {
    parkingSpaceData();
    vehicleDetails();
  }, []);

  useEffect(() => {
    // viewBookingDetails();
    handleMallDetails();
  }, []);

  useEffect(() => {
    setBookParkingSlot(false);
  }, []);

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
    <Page title="Parking spaces">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          minHeight: "calc(100vh - 12rem)",
        }}
      >
        <Stack justifyContent="space-between" direction="row">
          <Typography
            sx={{
              backgroundColor: "#FFFFFF",
              zIndex: 1,
              paddingTop: 1,
              position: "sticky",
              top: 0,
            }}
            variant="h3"
            component="h1"
            paragraph
          >
            Parking Spaces
          </Typography>
          <LoadingButton sx={{ color: "#009797" }}>
            <RefreshIcon onClick={parkingSpaceData} />
          </LoadingButton>
        </Stack>
        <Card sx={{ width: "100%", minHeight: "calc(100vh - 24rem)" }}>
          <CardContent>
            <Stack>
              <Typography
                sx={{ width: "100%", minHeight: "calc(50vh - 25rem)" }}
                variant="h6"
                component="div"
              >
                {get(parkingSpaces, "mall_name", "")}
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 60,
                  background:
                    "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                  color: "white",
                  fontWeight: "bold",
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                  fontSize: "22px",
                  px: 4,
                  pr: 4,
                }}
              >
                {get(parkingSpaces, "city", "")}
              </Typography>
              {!isEmpty(vehicleNumber) &&
                viewBooking &&
                get(viewBooking, "0.booking_ref") === undefined && (
                  <Stack>
                    <Select
                      onChange={handleVehicleNumber}
                      value={selectVehicleNumber}
                      sx={{
                        border: "2px solid #11D6D6",
                        borderRadius: 2,
                        position: "absolute",
                        top: 50,
                        right: 25,
                        width: "40%",
                        height: "10%",
                      }}
                    >
                      {map(vehicleNumber, (e) => (
                        <MenuItem value={get(e, "vehicle_id")}>
                          {get(e, "vehicle_number")}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                )}
            </Stack>
            <Grid container spacing={2} sx={{ marginTop: 5, marginBottom: 2 }}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 1,
                        background:
                          "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                        color: "white",
                        fontWeight: "bold",
                        borderBottomRightRadius: 50,
                        fontSize: "18px",
                        px: 4,
                        pr: 4,
                      }}
                    >
                      Bike
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        mb: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/Vector.png"
                        alt="theme"
                      />
                    </Box>
                    <Stack>
                      <Stack justifyContent="space-between" direction="row">
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "Bold",
                            mb: 1,
                          }}
                        >
                          Premium available space
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "13px",
                            fontWeight: "Bold",
                            mb: 1,
                          }}
                        >
                          {get(vehicleTypes, "1.premium_available_space")}
                        </Typography>
                      </Stack>
                      <Stack justifyContent="space-between" direction="row">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#b7b7b7",
                          }}
                        >
                          Total space
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#b7b7b7",
                          }}
                        >
                          {get(vehicleTypes, "1.total_space")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{
                    width: "100%",
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        left: 0,
                        top: 1,
                        background:
                          "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                        color: "white",
                        fontWeight: "bold",
                        borderBottomRightRadius: 50,
                        fontSize: "18px",
                        px: 4,
                        pr: 4,
                      }}
                    >
                      Car
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Image
                        visibleByDefault
                        disabledEffect
                        src="/assets/Group-2.png"
                        alt="theme"
                      />
                    </Box>
                    <Stack>
                      <Stack justifyContent="space-between" direction="row">
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "Bold",
                            mb: 1,
                          }}
                        >
                          Premium available space
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            fontSize: "13px",
                            fontWeight: "Bold",
                            mb: 1,
                          }}
                        >
                          {get(vehicleTypes, "0.premium_available_space")}
                        </Typography>
                      </Stack>
                      <Stack justifyContent="space-between" direction="row">
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#b7b7b7",
                          }}
                        >
                          Total Space
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#b7b7b7",
                          }}
                        >
                          {get(vehicleTypes, "0.total_space")}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            {viewBooking && get(viewBooking, "0.booking_ref") !== undefined && (
              <LoadingButton
                fullWidth
                type="submit"
                variant="outlined"
                onClick={goToViewBookings}
                sx={{
                  border: "2px solid #11D6D6",
                  minHeight: "70px",
                  borderRadius: 2,
                }}
              >
                <Typography
                  sx={{ color: "#11D6D6", marginTop: 2, marginBottom: 2 }}
                  variant="body1"
                  fontWeight="bold"
                >
                  View Active Booking
                </Typography>
              </LoadingButton>
            )}
          </CardContent>
        </Card>
        {!isEmpty(vehicleTypes) &&
          viewBooking &&
          get(viewBooking, "0.booking_ref") === undefined && (
            <Stack>
              <Select
                onChange={handleVehicleType}
                defaultValue={get(vehicleTypes, "0.vehicle_type_id")}
                value={selectedVehicleType}
                sx={{
                  mt: 2,
                  border: "2px solid #11D6D6",
                  minHeight: "50px",
                  borderRadius: 2,
                  "&:focus": {
                    borderColor: "#11D6D6",
                    boxShadow: "none",
                    outline: "none",
                  },
                  "&.Mui-focused": {
                    borderColor: "#11D6D6",
                    boxShadow: "none",
                    outline: "none",
                  },
                }}
              >
                {map(vehicleTypes, (e) => (
                  <MenuItem value={get(e, "vehicle_type_id")}>
                    {get(e, "vehicle_type_display")}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          )}

        {viewBooking && get(viewBooking, "0.booking_ref") === undefined && (
          <Box>
            <Button
              sx={{
                mt: 1,
                background:
                  "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
                minHeight: "70px",
                borderRadius: 2,
                fontSize: "20px",
                fontWeight: 700,
                color: "#FFFFFF",
                width: "100%",
              }}
              onClick={() => {
                const isReservable = get(mallDetails, "is_reservable");
                const premiumAvailableSpace = get(
                  parkingSpaces,
                  "22.numbers.2.premium_available_space"
                );
                if (isReservable === "0") {
                  toast.error(" Parking space is not reservable ");
                } else if (premiumAvailableSpace === "0") {
                  toast.error(" Parking space not available ");
                } else {
                  setOpenBookingDialog(true);
                }
              }}
            >
              Book Parking Slot
            </Button>
            <Dialog
              open={openBookingDialog}
              onClose={() => setOpenBookingDialog(false)}
            >
              <Paper
                sx={{
                  p: 2,
                }}
              >
                <Typography
                  sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}
                >
                  Are you sure you want to book parking slot?
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    onClick={() => handleBookingCancel()}
                    sx={{ mr: 2, color: "#11D6D6" }}
                    variant="outlined"
                  >
                    No
                  </Button>
                  <Button
                    onClick={goToBookings}
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
      </Container>
    </Page>
  );
}
