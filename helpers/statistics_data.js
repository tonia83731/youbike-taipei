const baseUrl = process.env.STATISTICS_URL;
// console.log(baseUrl)

export const getPopularStopData = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/c7a076dd-8aa6-4129-9c8a-e04cbf18694f?scope=resourceAquire`
    );
    // console.log(res)
    const data = await res.json()
    return data
  } catch (error) {
    console.error('[Get popular stop data failed]:', error)
    return null
  }
} 

export const getMonthlyUseData = async () => {
  try {
    const res = await fetch(
      `${baseUrl}/8f690548-61bc-4bff-8baa-01d465eb672c?scope=resourceAquire&limit=50`
    );
    const data = await res.json()
    // console.log(data)
    return data
  } catch (error) {
    console.error('[Get Monthy user data failed]:', error)
    return null
  }
}