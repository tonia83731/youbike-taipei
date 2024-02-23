

export const getPopularStopData = async () => {
  try {
    const res = await fetch(
      "https://data.taipei/api/v1/dataset/c7a076dd-8aa6-4129-9c8a-e04cbf18694f?scope=resourceAquire&limit=50"
    );
    const data = res.json()
    return data
  } catch (error) {
    console.error('[Get popular stop data failed]:', error)
  }
} 

export const getMonthlyUseData = async () => {
  try {
    const res = await fetch ("https://data.taipei/api/v1/dataset/8f690548-61bc-4bff-8baa-01d465eb672c?scope=resourceAquire&limit=50")
    const data = res.json()
    return data
  } catch (error) {
    console.error('[Get Monthy user data failed]:', error)
  }
}