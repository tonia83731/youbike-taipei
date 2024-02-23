import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "@/styles/globals.css";

import Header from "@/components/navigation/Header";
import Footer from "@/components/navigation/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="container relative">
      <Header />
      <main className="pt-[120px] lg:pt-[90px]">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}
