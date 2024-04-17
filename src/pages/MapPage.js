// import React, { useCallback, useState } from "react";
// import Map, { Marker, NavigationControl } from "react-map-gl";
// import Pin from "./Pin";
// import { Stack } from "@mui/material";

// export default function MapPage() {
//   const [selectedLocation, setSelectedLocation] = useState({
//     latitude: 40,
//     longitude: -100,
//   });
//   const initialViewState = {
//     latitude: 40,
//     longitude: -100,
//     zoom: 1,
//   };

//   const onMarkerDragEnd = useCallback((event) => {
//     setSelectedLocation({
//       longitude: event.lngLat.lng,
//       latitude: event.lngLat.lat,
//     });
//     // setValue('longitude', event.lngLat.lng);
//     // setValue('latitude', event.lngLat.lat);
//   }, []);
//   return (
//     <Stack sx={{ height: "100vh", width: "100vw" }}>
//       <Map
//         style={{ height: "100%", width: "100%" }}
//         initialViewState={initialViewState}
//         mapStyle="mapbox://styles/mapbox/light-v9"
//         mapboxAccessToken={
//           "pk.eyJ1IjoiZmFyYWFuZ28iLCJhIjoiY2xueWgyb3J2MHJ5cDJrb3Z1dnY3cDlybiJ9.D46LGyZP6Q8FeJe9irRPVQ"
//         }
//       >
//         <Marker
//           longitude={selectedLocation.longitude}
//           latitude={selectedLocation.latitude}
//           anchor="left"
//           draggable
//           offsetLeft={40}
//           offsetTop={40}
//           onDragEnd={onMarkerDragEnd}
//         >
//           <Pin size={20} />
//         </Marker>

//         <NavigationControl />
//       </Map>
//     </Stack>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Drawer,
  InputAdornment,
  Stack,
  SwipeableDrawer,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleMap, Marker, LoadScript, Circle } from "@react-google-maps/api";
import LocationService from "src/services/LocationService";
import SearchIcon from "@mui/icons-material/Search";
import LocationSettingEnable from "src/services/LocationSettingEnable";
import Pin from "./Pin";
import { isEmpty, map } from "lodash";
import Image from "src/components/Image";
import { LoadingButton } from "@mui/lab";
import PICKUP_SERVICES from "src/services/pickupServices";
import { toast } from "react-hot-toast";

let clearSetTimeOut = null;
const MapContainer = () => {
  const [center, setCenter] = useState({ lat: 12.7849, lng: 80.1328 });
  const [address, setAddress] = useState({});
  const [nearesMallDetails, setNearesMallDetails] = useState([]);
  const [darwerDetails, setDrawerDetails] = useState({});
  const [open, setOpen] = useState(false);
  const [liveLocation, setLiveLocation] = useState({});
  const [radius, setRadius] = useState(2000);
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const handleMarkerDragEnd = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setCenter({ lat, lng });
    // setEditOption(true);
  };

  const handleMapClick = (event) => {
    setCenter(event.latLng.toJSON());
  };

  const bounce = (callback) => {
    clearTimeout(clearSetTimeOut);
    clearSetTimeOut = setTimeout(() => {
      callback();
    }, 500);
  };
  console.log("liveLocation", liveLocation);
  const getAccountDetails = async () => {
    // setIsLoading(true);
    try {
      bounce(async () => {
        try {
          const currentLocation = await LocationService.getLocation();
          setLiveLocation({
            lat: Number(currentLocation.latitude),
            lng: Number(currentLocation.longitude),
          });
          // const response = await BookingServices.getAccountDetails({
          //   tagName: 'address',
          //   distance: kmRange,
          //   location: currentLocation,
          // });
          // setDropLocations(response.data.dropLocation);
          // response.data.dropLocation.map((details) => {
          //   location.push({ lat: details.lat, lng: details.lon });
          // });
          // setDropMarkers(location);
          // setIsLoading(false);
        } catch (e) {
          console.log("err", e.message);
          setLiveLocation({
            lat: 12.9749,
            lng: 80.1328,
          });
          // setIsLoading(false);
        }
      });
    } catch (e) {
      console.log("errr", e);
      // setIsLoading(false);
    }
  };

  const handleLocationEnable = () => {
    LocationSettingEnable.enableLocation({
      filename: "roy-exchange",
    });
  };

  // const bounce = (callback) => {
  //   clearTimeout(clearSetTimeOut);
  //   clearSetTimeOut = setTimeout(() => {
  //     callback();
  //   }, 2000);
  // };

  const handleMarkerClick = (marker) => {
    setOpen(true)
    setDrawerDetails(marker)
  }

  const handleGeocode = (_address) => {
    bounce(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: _address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setCenter({ lat: lat(), lng: lng() });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    });
    setAddress({
      sendAddress: _address,
      viewAddress: _address,
    });
  };

  const editOnClick = () => {
    // setEditOption(false);
    setAddress({
      sendAddress: address.sendAddress,
      viewAddress: address.sendAddress,
    });
  };

  // const getNearestParking = () => {

  // }

  const getNearestParking = async (data) => {
    try {
      const options = {
        lat: center.lat,
        lng: center.lng,
      };
      const response = await PICKUP_SERVICES.getPickupServices(options);
      // console.log('oooooooo', response?.parking);
      // let arrayData = []
      // const dataWithLatLong = response?.parking?.map((item) => {

      //   arrayData.push(item)
      //   console.log(item)

      // });
      setNearesMallDetails(response?.parking);
      // console.log("dataWithLatLong", dataWithLatLong);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getAccountDetails();
  }, []);
  useEffect(() => {
    getNearestParking();
  }, [center]);

  const defaultCenter = {
    lat: 40.712776,
    lng: -74.005974,
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (darwerDetails) => {
    const destination = `${darwerDetails.lat},${darwerDetails.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    window.open(url, "_blank");
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "labels.icon",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  console.log("nearesMallDetails", nearesMallDetails);
  return (
    <Stack width="100vw" gap={1} height={"100vh"}>
      <Stack p={2} pt={0} pb={0}>
        <TextField
          multiline
          minRows={1}
          maxRows={1}
          sx={{
            textAlign: "center",
            width: "100%",
            backgroundColor: "#F9F9F9",
            borderRadius: "30px",
            ".MuiOutlinedInput-notchedOutline": { border: 0 },
          }}
          // value={address.viewAddress}
          placeholder="Search Parking Places"
          onChange={(e) => handleGeocode(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#11D6D6" }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <LoadScript
        googleMapsApiKey={"AIzaSyBIOI2ao_XwhjkS2FkySjHmlytdsG4jcok"} // Replace with your own Google Maps API key
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={15}
          options={mapOptions}
          center={center}
        >
          <Marker
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            position={center}
          />

          {map(nearesMallDetails, (marker, index) => (
            <Marker
              position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
              onClick={()=>handleMarkerClick(marker)}
              icon={{
                url: "/assets/location-parking.png",
                scaledSize: new window.google.maps.Size(60, 60) // Adjust size as needed
              }}
            />
          ))}
          <Marker
            // draggable={true}
            // onDragEnd={handleMarkerDragEnd}
            position={liveLocation}
          >
            {/* <Pin size={20} /> */}
          </Marker>

          <Circle
            center={center}
            radius={radius}
            options={{
              strokeColor: "#4EADFE",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#4EADFE",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: radius,
            }}
          />
        </GoogleMap>
      </LoadScript>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        <Stack p={2} gap={2} pt={0}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography variant={"h6"}>Parking Spaces</Typography>
            <Stack onClick={()=>handleClick(darwerDetails)}>
              <Image
                alt="navigateIcon"
                src="/assets/Navigate-icon.png"
                height={200}
              />
            </Stack>
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            width={"100%"}
            gap={2}
          >
            <Image
              alt="locationIcon"
              src="/assets/location-icon.png"
              sx={{ height: "14%", width: "14%" }}
            />
            <Stack>
              <Typography variant={"h7"}>
                {darwerDetails?.address}
              </Typography>
              {/* <Typography variant={"h7"}>
                Mall Name..Mall Name..Mall Name..
              </Typography> */}
            </Stack>
          </Stack>
          <Stack
            border={"1px solid gray"}
            p={2}
            flexDirection={"row"}
            justifyContent={"space-between"}
            borderRadius={"10px"}
          >
            <Stack alignItems={"center"}>
              <Typography variant={"h6"}>Car Parking</Typography>
              <Image
                alt="locationIcon"
                src="/assets/car-icon.png"
                // height={"40%"}
                sx={{ width: "34%", height: "25px" }}
                // width={40}
              />
              <Typography variant={"h6"} sx={{ color: "#11D6D6" }}>
                Available
              </Typography>
            </Stack>

            <Stack alignItems={"center"}>
              <Typography variant={"h6"}>Bike Parking</Typography>
              <Image
                alt="locationIcon"
                src="/assets/bike-icon.png"
                sx={{ width: "20%", height: "50%" }}
              />
              <Typography variant={"h6"} sx={{ color: "#11D6D6" }}>
                Available
              </Typography>
            </Stack>
          </Stack>
          <LoadingButton
            fullWidth
            variant="contained"
            // loading={isSubmitting}
            sx={{
              background:
                "linear-gradient(135.96deg, #11D6D6 0%, #009797 101.74%)",
              minHeight: "60px",
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Book Now
            </Typography>
          </LoadingButton>
        </Stack>
      </Drawer>
    </Stack>
  );
};

export default MapContainer;

// import React from 'react';
// import MapGL from 'react-map-gl';

// const Map = () => {
//   const viewport = {
//     width: '100%',
//     height: 400,
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   };

//   return (
//     <MapGL
//       {...viewport}
//       mapStyle="mapbox://styles/mapbox/streets-v11"
//       mapboxAccessToken={"pk.eyJ1IjoiZmFyYWFuZ28iLCJhIjoiY2xueWgyb3J2MHJ5cDJrb3Z1dnY3cDlybiJ9.D46LGyZP6Q8FeJe9irRPVQ"}
//       // mapboxApiAccessToken={} // Replace with your Mapbox API token
//     />
//   );
// };

// export default Map;
