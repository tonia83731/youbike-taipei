export default function CarouselNumbersItem(props) {
  const { page, directionPage } = props;
  return (
    <div
      className={`w-6 h-6 border border-slate-300 rounded-full flex justify-center items-center text-slate-300 hover:border-slate-600 hover:text-slate-600 ${
        directionPage === page
          ? "border-slate-600 text-slate-600"
          : "border-slate-300 text-slate-300"
      }`}
    >
      {page}
    </div>
  );
}
