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
  readGatewayConf(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/gateway_config`,
        {
          method: "GET",
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

  writeGatewayConf(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/gateway_config`,
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

  readSensor(slaveId) {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/sensor?slave_id=${slaveId}`,
          method: "GET",
          headers: {
            //AuthCode: AdminAuthCode,
            "Content-Type": "application/json",
          },
        },
        handleCallback(resolve, reject)
      );
    });
  },
  writeSensorconf(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/sensor_config`,
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

  SensorData(options) {
    return new Promise((resolve, reject) => {
      APIService.fetch(
        `${API}/slot_status_bulk_update`,
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

};
export default Auth_API;
