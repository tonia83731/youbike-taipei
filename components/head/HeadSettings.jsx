import Head from "next/head";
import YoubikeFavicon from '@/public/YouBikeFav.ico'


export default function HeadSettings (props) {
  const {pageName, pageDescription} = props
  return (
    <Head>
      <title>{pageName} | YouBike</title>
      <meta name="description" value={pageDescription} />
      {/* <link rel="icon" href="@/public/YouBikeFav.ico" sizes="any" /> */}
    </Head>
  );
}