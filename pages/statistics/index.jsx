import HeadSettings from "@/components/head/HeadSettings";
import StatisticsTable from "@/components/statistics/StatisticsTable";
import {
  getPopularStopData,
  getMonthlyUseData,
} from "@/library/statistics_data";
import { formattedDate, getMonthlyLabels, getMonthlyDatas } from "@/library/handleDate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import zhTW from "date-fns/locale/zh-TW";
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
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels,
  Legend,
  Title,
  Tooltip
);

import { useEffect, useState } from "react";

// registerLocale("zh-TW", zhTW);

export default function StatisticsPage(props) {
  const { popular, updateDate, month, monthly, m_updateDate } = props;
  // console.log(monthly)

  const m_length = monthly.length - 1;

  const minDate = new Date(monthly[0].date)
  const maxDate = new Date(monthly[m_length].date)
  
  const defaultMonthlyData = monthly.slice(-10)
  const defaultStartDate = new Date(defaultMonthlyData[0].date)

  const defaultLabels = getMonthlyLabels(defaultMonthlyData)
  const defaultDatas = getMonthlyDatas(defaultMonthlyData)
  const [selectDate, setSelectDate] = useState({
    start: defaultStartDate,
    end: maxDate,
  });
  const [chartLabels, setChartLabels] = useState(defaultLabels)
  const [chartDatas, setChartDatas] = useState(defaultDatas)

  const handleResetClick = () => {
    // console.log('click')
    setSelectDate({
      start: defaultStartDate,
      end: maxDate,
    });
    setChartLabels(defaultLabels)
    setChartDatas(defaultDatas)
  }

  useEffect(() => {
    const filterDatas = monthly.filter((data) => {
      const dataDate = new Date(data.date).getTime()
      const selectStart = new Date(selectDate.start).getTime();
      const selectEnd = new Date(selectDate.end).getTime();
      // console.log(dataDate, selectStart, selectEnd)
      return dataDate >= selectStart && dataDate <= selectEnd
    })
    const newLabels = getMonthlyLabels(filterDatas)
    const newDatas = getMonthlyDatas(filterDatas)
    setChartLabels(newLabels)
    setChartDatas(newDatas)

  }, [selectDate, monthly])

  const datasets = [
    {
      type: "bar",
      label: "每月使用數量(次)",
      data: chartDatas,
      borderColor: "#F7AD19",
      backgroundColor: ["#FFE27C", "#E8B634"],
      datalabels: {
        color: "#758650",
        anchor: 'end',
        align: 'top'
      },
      yAxisID: "y-axias",
    },
  ];
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 20,
        },
      },
    },
    plugins: [ChartDataLabels],
    // xy軸調整
    scales: {
      x: {
        begineAtZero: true,
        border: {
          display: false,
        },
        grid: {
          drawTicks: false,
          display: false,
        },
      },
      "y-axias": {
        type: "linear",
        position: "left",
        alignToPixels: true,
        begineAtZero: false,
        title: {
          display: false,
          text: "流量",
        },
        grid: {
          drawTicks: false,
        },
      },
    },
  };

  return (
    <>
      <HeadSettings
        pageName="數據統計"
        pageDescription="This is YouBike statistics page."
      />
      <section className="">
        <div className="mb-6">
          <div className="grid grid-rows-2 gap-1 text-xl font-bold md:grid-cols-4 md:grid-rows-1">
            <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
              臺北市youbike每月使用量
            </div>
            <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
              更新時間: {m_updateDate}
            </div>
          </div>
          <div className="my-4">
            <div className="flex items-center">
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
                    start: dates[0],
                    end: dates[1],
                  });
                }}
                className="w-full h-12 border border-slate-300 rounded py-1 px-4 placeholder:text-slate-300 focus:shadow-outline focus:outline-slate-500"
                wrapperClassName="w-5/12"
              />
              <button
                className="h-10 px-4 py-2 ml-2 bg-olive-100 text-white rounded"
                onClick={handleResetClick}
              >
                重置
              </button>
            </div>

            <Bar
              data={{
                labels: chartLabels,
                datasets: datasets,
              }}
              options={options}
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
  // 十大熱門站點
  const popularData = await getPopularStopData();
  const popular = popularData.result.results;
  const { date } = popular[0]._importdate;
  const updateDate = new Date(date).toLocaleString();
  const month = popular[0]["時間"];
  // 每月使用量
  const monthlyData = await getMonthlyUseData();
  const monthly = monthlyData.result.results;
  const m_date = monthly[0]._importdate.date; // get update date
  const m_updateDate = new Date(m_date).toLocaleString();

  monthly.map((data) => {
    // console.log(data["臺北市youbike每月使用量"]);
    // const date = data["臺北市youbike每月使用量"]
    const date = formattedDate(data["臺北市youbike每月使用量"]).formatted
    const formatDate = formattedDate(data["臺北市youbike每月使用量"]).formattedDate.toJSON()
    data.date = date
    data.formatDate = formatDate
  })

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
