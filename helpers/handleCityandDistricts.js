import { twCityDistricts } from "@/data/twCityDistricts";

export const getDistrictsFromCity = (city) => {
  const data = twCityDistricts.filter((item) => item.city === city);
  return data[0].districts;
};
