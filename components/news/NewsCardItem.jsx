import Link from "next/link";
import dayjs from "dayjs";
import { ThreeDots } from "react-loader-spinner";
import Image from "next/image";

export default function NewsCardItem(props) {
  const { newsData } = props;
  //   console.log(newsData);
  const { _id, image, title, updateAt } = newsData;

  return (
    <div className="bg-white shadow-md rounded-md">
      <Image
        src={image}
        alt={title}
        width={400}
        height={200}
        className="w-full h-48 object-cover object-center rounded-t-md"
      />
      <div className="px-4 py-2">
        <Link
          href={`/news/${_id}`}
          className="text-olive-100 text-xl font-bold cursor-pointer hover:text-lime-100"
        >
          {title}
        </Link>
        <p className="text-slate-400 text-lg">活動時間: {updateAt}</p>
      </div>
    </div>
  );
}
