import BackHeadSettings from "../head/BackHeadSettings";

export default function BackStageLayout(props) {
  const { pageName, children } = props;
  return (
    <>
      <BackHeadSettings pageName={pageName} />
      <section className="">
        <h3 className="font-bold text-2xl text-center mb-6 text-olive-100">
          {pageName}
        </h3>
        <div className="">{children}</div>
      </section>
    </>
  );
}
