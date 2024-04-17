import NativeService from './NativeService';

const LocationService = {
  getLocation() {
    return new Promise((resolve, reject) => {
      const nativeRequest = [
        {
          name: 'LOCATION',
          data: {},
        },
      ];
      NativeService.sendAndReceiveNativeData(nativeRequest)
        .then((response) => {
          const nativeItem = response.filter(
            (responseItem) => responseItem.name === 'LOCATION'
          );
          const nativeData = nativeItem[0].data;
          console.log('Location Result', nativeData.message);
          if (nativeData.location) {
            resolve(nativeData.location);
          } else {
            reject(nativeData.error);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default LocationService;
