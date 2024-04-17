import get from 'lodash/get';
import { StorageConstants } from 'src/constants/StorageConstants';
import ObjectStorage from 'src/modules/ObjectStorage';
import Navigation from './NavigationService';
const AuthService = {
  _getAccessToken() {
    return get(ObjectStorage.getItem(StorageConstants.ACCESS_TOKEN), 'token');
  },
  _getRefreshToken() {
    return get(ObjectStorage.getItem(StorageConstants.REFRESH_TOKEN), 'token');
  },
  logout() {
    ObjectStorage.removeItem(StorageConstants.USER_DETAILS);
    ObjectStorage.removeItem(StorageConstants.ACCESS_TOKEN);
    ObjectStorage.removeItem(StorageConstants.REFRESH_TOKEN);
    Navigation.navigateToLogin();
  },

  goto404() {
    window.location.href = '*';
  },

  getRemoteURL() {
    return process.env.REACT_APP_REMOTE_URL;
  },

  getAuthCode() {
    return process.env.REACT_APP_AUTH_CODE;
  },
  getUserDetails(){
    return get(ObjectStorage.getItem(StorageConstants.USER_DETAILS),'data',{})
  }
};



export default AuthService;
