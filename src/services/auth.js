import APIService from "./apiService";
import AuthService from "./authService";
import handleCallback from "./Callback";
import { get } from "lodash";

const API = AuthService.getRemoteURL();
const AuthCode = AuthService.getAuthCode();
const accessToken = AuthService._getAccessToken();
const AdminAuthCode = AuthService.getAdminAuthCode();

console.log(API);

const Auth_API = {

  login(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/login_phone_number`,
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            AuthCode: AuthService.getAuthCode(),
            "Content-Type": "application/json",
          },
        },
        handleCallback(resolve, reject)
      );
    });
  },

  logout(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            AccessToken: AuthService._getAccessToken(),
            AuthCode: AuthService.getAuthCode(),
          },
          body: JSON.stringify(options),
        },
        handleCallback(resolve, reject)
      );
    });
  },

  adminlogin(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/login`,
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },
        handleCallback(resolve, reject)
      );
    });
  },

  getmodbusconf(){
    return new Promise((resolve , reject) => {
      APIService.request(
        {
          url : `${API}/modbus_config`,
          method: "GET",
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },

        handleCallback(resolve, reject)
      )
    })
  },

  writemodbusconf(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/modbus_config`,
        {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },
        handleCallback(resolve, reject)
      );
    });
  },

  mobileVerification(options) {
    return new Promise((resolve, reject) => {
      console.log("Access Token:", accessToken);
      APIService.request(
        {
          url: `${API}/verify_mobile`,
          method: "POST",
          data:options,
        },
        handleCallback(resolve, reject)
      );
    });
  },

  otpVerification(options) {
    return new Promise((resolve, reject) => {
      console.log("Access Token:", accessToken);
      APIService.request(
        {
          url: `${API}/confirm_mobile`,
          method: "POST",
          data:options,
        },
        handleCallback(resolve, reject)
      );
    });
  },

  userDetailUpdate(options) {
    return new Promise((resolve, reject) => {
      console.log("Access Token:", accessToken);
      APIService.request(
        {
          url: `${API}/user_edit`,
          method: "POST",
          data:options,
        },
        handleCallback(resolve, reject)
      );
    });
  },

  Booking(options) {
    return new Promise((resolve, reject) => {
      console.log("Access Token:", accessToken);
      APIService.request(
        {
          url: `${API}/create_booking`,
          method: "POST",
          data:options,
        },
        handleCallback(resolve, reject)
      );
    });
  },

  parkingSpace(mallId) {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/malls?mall_id=${mallId}`,
          method: "GET",
        },
        handleCallback(resolve, reject)
      );
    });
  },

  viewBooking() {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/current_booking`,
          method: "GET",
        },
        handleCallback(resolve, reject)
      );
    });
  },

  cancelBooking(bookingRef) {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/cancel_booking/${bookingRef}`,
          method: "PUT",
        },
        handleCallback(resolve, reject)
      );
    });
  },

  bookingHistory() {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/history_booking`,
          method: "GET",
        },
        handleCallback(resolve, reject)
      );
    });
  },

  vehicleDetail() {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/vehicles`,
          method: "GET",
          headers: { "Content-Type": "application/json", authCode: AuthCode },
        },
        handleCallback(resolve, reject)
      );
    });
  },
  mallDetails() {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/malls?mall_id=22`,
          method: "GET",
        },
        handleCallback(resolve, reject)
      );
    });
  },
};
export default Auth_API;
