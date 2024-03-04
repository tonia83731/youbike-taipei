import Link from "next/link"
import Image from "next/image"
import ManRideBike from '@/public/assets/Man-ride-Bike.png'

export default function Error () {
    return (
        <section className="w-full h-max flex justify-center items-center">
            <div className="my-6 flex flex-col items-center">
                <Image src={ManRideBike} alt="Man ride bike" width={300} height={300}/>
                <div className="mt-6 font-patrick-hand flex justify-center items-center">
                    <p className="font-patrick-hand text-4xl">Error 404</p>
                    <span className="mx-4">|</span>
                    <p className="">找不到頁面</p>
                </div>
                <div className="mt-4 flex flex-col justify-center items-center">
                    <Link href="/" className="bg-mustard-100 shadow-md px-2 py-1 rounded">回到首頁</Link>
                </div>
            </div>
        </section>
    )
}