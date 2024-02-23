export const formatDate = (monthly, num) => {
  const string = monthly[num]["臺北市youbike每月使用量"];
  const numOnly = string.match(/\d+/g).map(Number);
  const formatted = numOnly[0] + 1911 + "/" + numOnly[1];
  const formattedDate = new Date(formatted);
  return formattedDate;
};
export const getDateLabels = (startDate, endDate) => {
  const months = []
  const currentDate = new Date(startDate)

   while (currentDate <= endDate) {
     let year = currentDate.getFullYear();
     let month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
     months.push(`${year}/${month < 10 ? "0" : ""}${month}`);
     currentDate.setMonth(currentDate.getMonth() + 1);
   }

   return months;
}