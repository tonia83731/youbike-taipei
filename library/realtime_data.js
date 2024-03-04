

export const getYouBikeRealtimeData = async () => {
  try {
    const res = await fetch(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    )

    const data = res.json()
    return data
  } catch (error) {
    console.error('[Failed to get YouBike realtime data!]:', error)
  }
}


export const getYouBikeRealtimeDataById = async (id) => {
  try {
    const allData = await getYouBikeRealtimeData()
    const data = allData.find((data) => data.sno === id)
    
    return data
  } catch (error) {
    console.error('[Failed to get YouBike realtime data by id]:', error)
  }
}

export const getYouBikeRealtimeDataBySlice = async (firstIndex, lastIndex, distArr) => {
  try {
    // const allData = await getYouBikeRealtimeData()
    const resultData = await getYouBikeRealtimeDatafilter(distArr)
    // console.log(resultData)
    return {data: resultData.slice(firstIndex, lastIndex), length: resultData.length}
  } catch (error) {
    console.error("[Failed to get YouBike realtime data by slice]:", error);
  }
}

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
    const allData = await getYouBikeRealtimeData()
    const filterData = allData.filter((data) => distArr.includes(data.sarea))
    return distArr.length === 12 ? allData : filterData
  } catch (error) {
    console.error("[Failed to get YouBike realtime data filter]:", error);
  }
}