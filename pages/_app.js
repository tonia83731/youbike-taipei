import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/styles/globals.css";
import { registerLocale } from "react-datepicker";
import zhTW from "date-fns/locale/zh-TW";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { useRouter } from "next/router";
import BackStageHeader from "@/components/navigation/BackstageHeader";
import BackStageFooter from "@/components/navigation/BackstageFooter";

registerLocale("zh-TW", zhTW);

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const {route} = router
  const condition = route.includes('/backstage')
  const showHeader = !condition ? <Header /> : <BackStageHeader />
  const showFooter = !condition ? <Footer /> : <BackStageFooter />

  return (
    <div className="container">
      {/* <Header /> */}
      {/* <BackStageHeader /> */}
      {showHeader}
      <main className="pt-[140px] lg:pt-[110px] h-full">
        <Component {...pageProps} />
      </main>
      <div className="mt-auto mx-0">{showFooter}</div>
      {/* <Footer /> */}
      {/* <BackStageFooter /> */}
    </div>
  );
}
