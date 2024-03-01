

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

export const getYouBikeRealtimeDataBySlice = async (firstIndex, lastIndex) => {
  try {
    const allData = await getYouBikeRealtimeData()
    return allData.slice(firstIndex, lastIndex)
  } catch (error) {
    console.error("[Failed to get YouBike realtime data by slice]:", error);
  }
}