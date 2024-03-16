import Link from "next/link";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import NewsCardItem from "./NewsCardItem";

export default function NewsCard(props) {
  const { newsDatas } = props;
  //   console.log(newsDatas);

  return (
    <div className="grid grid-cols-1 gap-4 600:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {newsDatas.map((data) => {
        return <NewsCardItem newsData={data} key={data._id} />;
      })}
    </div>
  );
}
