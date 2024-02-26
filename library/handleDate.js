// export const formatDate = (monthly, num) => {
//   const string = monthly[num]["臺北市youbike每月使用量"];
//   const numOnly = string.match(/\d+/g).map(Number);
//   const formatted = numOnly[0] + 1911 + "/" + numOnly[1];
//   const formattedDate = new Date(formatted);
//   return formattedDate;
// };

export const formattedDate = (date) => {
  const numOnly = date.match(/\d+/g).map(Number);
  const formatted = numOnly[0] + 1911 + "/" + numOnly[1];
  const formattedDate = new Date(formatted)

  return {formatted, formattedDate}
}


export const getMonthlyLabels = (datas) => {
  const months = []
  
  datas.map((data) => {
    months.push(data.date)
  })

  return months;
}

export const getMonthlyDatas = (datas) => {
  const monthly_datas = []
  datas.map((data) => {
    monthly_datas.push(data["數量（次數）"]);
  })
  return monthly_datas
}