import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function BackStageFooter() {
  const { data: session, status } = useSession();

  // const handleLogoutClick = () => {
  //   signOut();
  // };

  return (
    <footer className="w-full text-center items-center text-lg md:text-xl xl:text-2xl grid grid-cols-3 gap-2 lg:grid-cols-4">
      <div className="w-full h-full bg-lime-100 col-span-2 lg:col-span-3"></div>
      {/* {showLink} */}
      {!session && status !== "loading" && (
        <Link
          href="/"
          className="h-16 py-2 px-1 bg-olive-100 text-white flex justify-center items-center"
        >
          回到前台
        </Link>
      )}
      {session && (
        <button
          href="/admin/login"
          className="h-16 py-2 px-1 bg-olive-100 text-white flex justify-center items-center"
          onClick={handleLogoutClick}
        >
          登出
        </button>
      )}
    </footer>
  );
}
