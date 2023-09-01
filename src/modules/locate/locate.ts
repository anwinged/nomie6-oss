// consts
import { SideStorage, SideStorageKey } from '../../domains/side-storage/side-storage';

type LocationLookupResponse = {
  time: number;
  latitude: number;
  longitude: number;
};

const locationCache = new SideStorage(SideStorageKey.LocationCache);

export default (): Promise<LocationLookupResponse> => {
  let getRealLocation = (): Promise<LocationLookupResponse> => {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            let payload = {
              time: new Date().getTime(),
              latitude: pos.coords.latitude,
              lat: pos.coords.latitude,
              longitude: pos.coords.longitude,
              lng: pos.coords.longitude,
            };
            locationCache.put(payload);
            resolve(payload);
          },
          (e) => {
            // console.error(e);
            reject(e);
          },
          {
            timeout: 3000,
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  };

  return new Promise((resolve, reject) => {
    let cachedRaw = locationCache.get();
    try {
      if (cachedRaw) {
        if (new Date().getTime() - cachedRaw.time < 1000 * 60 * 2) {
          resolve({
            time: cachedRaw.time,
            latitude: cachedRaw.latitude,
            longitude: cachedRaw.longitude,
          });
        } else {
          if (!navigator.geolocation) {
            reject({ message: 'No geolocation service found' });
          } else {
            getRealLocation().then(resolve).catch(reject);
          } // end if have geo lookup
        } // end if cache exists
      } else {
        getRealLocation().then(resolve).catch(reject);
      }
    } catch (e) {
      reject(e);
    }
  });
};
