import NativeService from './NativeService';

const LocationSettingEnable = {
  enableLocation({filename}) {
    const nativeRequest = [
      {
        name: 'ENABLE_LOCATION',
        data: {
            filename,
          },
      },
    ];

    return NativeService.sendAndReceiveNativeData(nativeRequest)
      .then((response) => {
        console.log('res', response);
        const nativeItem = response.filter(
          (responseItem) =>
            responseItem.name === 'ENABLE_LOCATION'
        );
        return nativeItem[0].data.message;
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  },
};

export default LocationSettingEnable;
