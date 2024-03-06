import Head from "next/head";

export default function HeadSettings(props) {
  const { pageName, pageDescription } = props;
  return (
    <Head>
      <title>{pageName} | YouBike2.0</title>
      <meta name="description" value={pageDescription} />
    </Head>
  );
}
