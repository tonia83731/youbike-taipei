import Image from "next/image";
import Link from "next/link";
import Youbike from "@/public/images/Youbike2.0-green.png";

export default function NewsCard(props) {
  const { title, subtitle, updateDate } = props;
  return (
    <div className="w-full h-full bg-white shadow-md rounded-md px-4 py-6">
      <Image
        src={Youbike}
        alt="news"
        width={1200}
        height={600}
        className="h-60 object-center object-cover"
      />
      <div className="">
        <Link href={`/news/${title}`}>
          <h4 className="font-bold text-2xl text-olive-100">{title}</h4>
        </Link>
        <h5 className="text-xl text-lime-100">{subtitle}</h5>
        <p className="text-slate-400 text-sm mt-2">更新時間: {updateDate}</p>
      </div>
    </div>
  );
}
