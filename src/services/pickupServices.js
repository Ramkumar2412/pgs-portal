import APIService from "./apiService";
import AuthService from "./authService";


const API = AuthService.getRemoteURL();

const PICKUP_SERVICES = {
  getPickupServices(options) {
    return new Promise((resolve, reject) => {
      APIService.request(
        {
          url: `${API}/find_nearest_parking_spaces`,
          method: 'POST',
          data: options,
        },
        (error, data) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(data);
        }
      );
    });
  },
  
};
export default PICKUP_SERVICES;
