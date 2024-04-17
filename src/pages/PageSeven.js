// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Container,
//   Dialog,
//   Divider,
//   Paper,
//   Stack,
//   Typography,
//   alpha,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import Page from "src/components/Page";
// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { useNavigate } from "react-router";
// import QRCode from "react-qr-code";
// import Image from "src/components/Image";
// import CloseIcon from "@mui/icons-material/Close";

// const PageSeven = () => {
//   const [bookingDetails, setBookingDetails] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [openQRDialog, setOpenQRDialog] = useState(false);
//   const date = bookingDetails ? bookingDetails.book_date : "";
//   const formattedDate = date ? new Date(date).toLocaleDateString() : "";
//   const formattedTime = date ? new Date(date).toLocaleTimeString() : "";
//   const arriveTime = bookingDetails ? bookingDetails.arrive_before : "";
//   const formattedArrivalTime = arriveTime
//     ? new Date(arriveTime).toLocaleTimeString()
//     : "";

//   const BookingApiCall = async () => {
//     try {
//       const headers = new Headers();
//       headers.append(
//         "AccessToken",
//         "684477675866636476794957506e7155744a4e334a6f79614a6b366e36726270576e44384a70425190c"
//       );
//       headers.append("AuthCode", "627a734965665a78616442554334716a");
//       headers.append("Content-Type", "application/json");

//       const body = JSON.stringify({
//         mall_id: 22,
//         city_id: 9,
//         vehicle_id: 5310,
//         vehicle_type_id: 2
//       });

//       const response = await fetch(
//         "http://13.234.180.189:9000/ops/create_booking",
//         // "https://test-api.random-mouse.com/ops/create_booking",
//         {
//           method: "POST",
//           headers: headers,
//           body: body,
//         }
//       );

//       const data = await response.json();
//       setBookingDetails(data[0]);
//       console.log("data", data);
//       console.log("bookingDetails", bookingDetails);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     BookingApiCall();
//   }, []);

//   const navigate = useNavigate();

//   const goToPrev = () => {
//     navigate("/dashboard/page1");
//   };

//   return (
//     <Page title="Booking">
//       <Container>
//         <Stack position={"column"}>
//           <Stack direction="row" alignItems="center" spacing={1}>
//             <Box
//               sx={{
//                 width: "3rem",
//                 height: "3rem",
//                 borderRadius: 2,
//                 backgroundColor: "#FFFFFF",
//                 border: 1,
//                 borderColor: "#b7b7b7",
//                 color: "black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
        
//               }}
//               onClick={goToPrev}
//             >
//               <ArrowBackIosNewIcon sx={{ color: "#08B4B4" }} fontSize="small" />
//             </Box>
//             <Typography
//               sx={{
//                 color: "black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "20px",
//                 flex: 0.75,
//               }}
//               variant="h3"
//               component="h1"
//               paragraph
//             >
//               View
//             </Typography>
//           </Stack>

//           <Stack
//             sx={{
//               color: "black",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//             direction="row"
//           >
//             <Typography
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//               variant="h3"
//             >
//               Allotted Parking Slot
//             </Typography>
//             <Box
//               sx={{
//                 width: "3rem",
//                 height: "3rem",
//                 borderRadius: 1,
//                 backgroundColor: "#FFFFFF",
//                 border: 1,
//                 borderColor: "#b7b7b7",
//                 color: "black",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {bookingDetails && (
//                 <QRCode
//                   size={32}
//                   onClick={() => setOpenQRDialog(true)}
//                   value={JSON.stringify(bookingDetails)}
//                 />
//               )}
//             </Box>
//             {console.log('bookingDetails',bookingDetails)}

//             <Dialog open={openQRDialog} onClose={() => setOpenQRDialog(false)}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   margin: 2,
                  
//                 }}
//                 direction="row"
//               >
//                 <Typography sx={{fontSize:"18px", fontWeight:"Bold"}}>{"Parking Slot QR"}</Typography>
//                 <CloseIcon onClick={() => setOpenQRDialog(false)} />
//               </Box>
//               <Divider sx={{ mb: 2 }} />
//               <Paper
//                 sx={{
//                   p: 2,
//                 }}
//               >
//                 <Box>{bookingDetails && <QRCode value={JSON.stringify(bookingDetails)} />}</Box>
//               </Paper>
//             </Dialog>
//           </Stack>

//           <Stack>
//             <Typography
//               variant="contained"
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 marginBottom: 1,
//                 marginTop: 1,
//                 background: alpha("#22CFCF", 0.5),
//                 borderRadius: "12px",
//               }}
//             >
//               <Box
//                 sx={{
//                   marginBottom: 2,
//                   marginTop: 2,
//                   ml: 2,
//                   fontSize: "13px",
//                   color: "#08B4B4",
//                 }}
//               >
//                 Reference number
//               </Box>
//               <Box
//                 sx={{
//                   marginBottom: 2,
//                   marginTop: 2,
//                   mr: 2,
//                 }}
//               >
//                 {bookingDetails ? bookingDetails.booking_ref : ""}
//               </Box>
//             </Typography>
//           </Stack>
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "repeat(2, 1fr)",
//               gap: 2,
//               marginTop: 2,
//               marginBottom: 2,
//               minHeight: "calc(20vh - 2rem)",
//             }}
//           >
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/date 1.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>{formattedDate}</Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Booking Date</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/time 1-2.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>{formattedTime}</Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Booking Time</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/time 1.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>{formattedArrivalTime}</Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Arrive Before</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/floor-tiles-icon 1.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>
//                     {bookingDetails ? bookingDetails.floor_id : ""}
//                   </Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Floor ID</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/floor-tiles-icon 1-2.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>
//                     {bookingDetails ? bookingDetails.floor_no : ""}
//                   </Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Floor Number</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//             <Card
//               sx={{
//                 width: "100%",
//                 Height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//               }}
//             >
//               <CardContent
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <Box sx={{ mt: 1 }}>
//                   <Image
//                     visibleByDefault
//                     disabledEffect
//                     src="/assets/car-front 1.png"
//                     alt="theme"
//                   />
//                 </Box>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginTop: 1,
//                     marginBottom: 1,
//                   }}
//                 >
//                   <Box sx={{ minHeight: "1.5em" }}>
//                     {bookingDetails ? bookingDetails.vehicle_id : ""}
//                   </Box>
//                 </Typography>
//                 <Typography
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     fontSize: "13px",
//                     color: "#b7b7b7",
//                   }}
//                 >
//                   <Box>Vehicle Number</Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Box>
//         </Stack>
//       </Container>
//     </Page>
//   );
// };

// export default PageSeven;
