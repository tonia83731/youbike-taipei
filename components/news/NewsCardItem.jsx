import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import DefaultNewsImg from "@/public/images/events/default-bike.jpg";

export default function NewsCardItem(props) {
  const { newsData } = props;
  //   console.log(newsData);
  const { _id, image, title, updateAt } = newsData;
  const updateAt_date = dayjs(updateAt).format("YYYY/MM/DD");
  return (
    <div className="bg-white shadow-md rounded-md">
      {image === "" ? (
        <Image
          src={DefaultNewsImg}
          alt="default-img"
          width={400}
          height={200}
          className="w-full h-48 object-cover object-center rounded-t-md opacity-50"
        />
      ) : (
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover object-center rounded-t-md"
        />
      )}
      <div className="px-4 py-2">
        <Link
          href={`/news/${_id}`}
          className="text-olive-100 text-xl font-bold cursor-pointer hover:text-lime-100"
        >
          {title}
        </Link>
        <p className="text-slate-400 text-lg">活動時間: {updateAt_date}</p>
      </div>
    </div>
  );
}
