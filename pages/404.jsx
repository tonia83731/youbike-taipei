import Link from "next/link"
export default function Error () {
    return (
        <section className="w-full h-full ">
            <div className="font-patrick-hand">
                <p className="font-patrick-hand text-4xl">Error 404</p>
                <span className="mx-4">|</span>
                <p className="">哎呀!出了點問題</p>
            </div>
            <div className="mt-2 flex flex-col justify-center items-center">
                <Link href="/" className="bg-mustard-100 shadow-md px-2 py-1 rounded">回到首頁</Link>
            </div>
        </section>
        
        
    )
}