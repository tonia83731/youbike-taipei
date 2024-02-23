

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