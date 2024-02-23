import HeadSettings from "@/components/head/HeadSettings";
import StatisticsTable from "@/components/statistics/StatisticsTable";
import {
  getPopularStopData,
  getMonthlyUseData,
} from "@/library/statistics_data";
import { formatDate, getDateLabels } from "@/library/handleDate";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import zhTW from "date-fns/locale/zh-TW";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";


import { useState } from "react";

registerLocale("zh-TW", zhTW);

export default function StatisticsPage(props) {
  const { popular, updateDate, month, monthly, m_updateDate } = props;
  const m_length = monthly.length;
  const minDate = formatDate(monthly, 0);
  const maxDate = formatDate(monthly, m_length - 1);
  const calc_six = formatDate(monthly, m_length - 1).setMonth(
    formatDate(monthly, m_length - 1).getMonth() - 6
  );
  const beforeSixMonth = new Date(calc_six)

  const [selectDate, setSelectDate] = useState({
    start: beforeSixMonth,
    end: maxDate,
  });
  const labelArr = getDateLabels(selectDate.start, selectDate.end)
  const [chartLabels, setChartLabels] = useState(labelArr)
  

  return (
    <>
      <HeadSettings
        pageName="數據統計"
        pageDescription="This is YouBike statistics page."
      />
      <section className="">
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-1 text-xl font-bold">
            <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
              臺北市youbike每月使用量
            </div>
            <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
              更新時間: {m_updateDate}
            </div>
          </div>
          <div className="my-4">
            <DatePicker
              showIcon
              showMonthYearPicker
              icon={
                <div className="h-full leading-8">
                  <FontAwesomeIcon icon={faCalendar} />
                </div>
              }
              selectsRange={true}
              startDate={selectDate.start}
              endDate={selectDate.end}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="yyyy/MM"
              locale="zh-TW"
              placeholderText="選擇日期"
              onChange={(dates) => {
                console.log(dates);
                setSelectDate({
                  start:dates[0],
                  end:dates[1]
                });
              }}
              className="w-5/12 h-12 border border-slate-300 rounded py-1 px-4 placeholder:text-slate-300 focus:shadow-outline focus:outline-slate-500"
              wrapperClassName="w-full"
            />
          </div>
        </div>
        <div className="mb-6">
          <StatisticsTable
            popular={popular}
            updateDate={updateDate}
            month={month}
          />
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const popularData = await getPopularStopData();
  const monthlyData = await getMonthlyUseData();
  const popular = popularData.result.results;
  const { date } = popular[0]._importdate;
  const updateDate = new Date(date).toLocaleString();
  const month = popular[0]["時間"];
  const monthly = monthlyData.result.results;
  const m_date = monthly[0]._importdate.date;
  const m_updateDate = new Date(m_date).toLocaleString();
  return {
    props: {
      popular: popular,
      updateDate: updateDate,
      month: month,
      monthly: monthly,
      m_updateDate: m_updateDate,
    },
    revalidate: 1800,
  };
}
