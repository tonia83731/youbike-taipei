export const getNewsData = async () => {
  try {
    const response = await fetch("/api/news");
    if (response.ok) {
      const data = await response.json();
      const { news } = data;
      return news
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export const getNewsDataById = async (id) => {
  const news = await getNewsData()
  const newsById = news.find((data) => data._id === id)
  console.log(newsById)
  return newsById
}