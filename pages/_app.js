import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/styles/globals.css";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  // const router = useRouter()
  // const {route} = router
  // const showFooter = route.includes('/backstage') ? "" : <Footer />

  // console.log(router)
  return (
    <div className="container relative">
      <Header />
      <main className="pt-[120px] lg:pt-[90px]">
        <Component {...pageProps} />
      </main>
      {/* {showFooter} */}
      <Footer />
    </div>
  );
}
