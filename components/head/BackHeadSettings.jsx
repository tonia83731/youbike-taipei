import Head from "next/head";

export default function BackHeadSettings(props) {
  const { pageName } = props;
  return (
    <Head>
      <title>後台-{pageName} | YouBike2.0</title>
    </Head>
  );
}
