import jsSHA from "jssha";
export const getAuthorizationHeader = async () => {
  let AppID = process.env.NEXT_PUBLIC_CLIENT_ID;
  let AppKey = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
};
const baseURL = "https://tdx.transportdata.tw/api/basic";

export const getYoubikeRealtimeDataByCity = async (city) => {
  try {
    const res = await fetch(`${baseURL}/v2/Bike/Availability/City/${city}`, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("[Get youbike realtime data failed]:", error);
  }
};
export const getYoubikeStationData = async (city) => {
  try {
    const res = await fetch(`${baseURL}/v2/Bike/Station/City/${city}`, {
      headers: getAuthorizationHeader(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("[Get youbike realtime data failed]:", error);
  }
};
export const getYouBikeRealtimeData = async () => {
  try {
    const res = await fetch(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    );

    const data = res.json();
    return data;
  } catch (error) {
    console.error("[Failed to get YouBike realtime data!]:", error);
  }
};

export const getYouBikeRealtimeDataById = async (id) => {
  try {
    const allData = await getYouBikeRealtimeData();
    const data = allData.find((data) => data.sno === id);

    return data;
  } catch (error) {
    console.error("[Failed to get YouBike realtime data by id]:", error);
  }
};

export const getYouBikeRealtimeDataBySlice = async (
  firstIndex,
  lastIndex,
  distArr
) => {
  try {
    // const allData = await getYouBikeRealtimeData()
    const resultData = await getYouBikeRealtimeDatafilter(distArr);
    // console.log(resultData)
    return {
      data: resultData.slice(firstIndex, lastIndex),
      length: resultData.length,
    };
  } catch (error) {
    console.error("[Failed to get YouBike realtime data by slice]:", error);
  }
};

// export const getYouBikeRealtimeDataLength = async (distArr) => {
//   try {
//     const resultData = await getYouBikeRealtimeDatafilter(distArr)
//     return resultData.length
//   } catch (error) {
//     console.error("[Failed to get YouBike realtime data length]:", error);
//   }
// }

export const getYouBikeRealtimeDatafilter = async (distArr) => {
  try {
    const allData = await getYouBikeRealtimeData();
    const filterData = allData.filter((data) => distArr.includes(data.sarea));
    return distArr.length === 12 ? allData : filterData;
  } catch (error) {
    console.error("[Failed to get YouBike realtime data filter]:", error);
  }
};
