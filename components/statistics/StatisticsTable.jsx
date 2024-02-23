export default function StatisticsTable(props) {
  const { popular, updateDate, month } = props;

  return (
    <div className="shadow-md">
      <div className="grid grid-cols-4 gap-1 text-xl font-bold">
        <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
          臺北市YouBike站位{month}十大熱門站點
        </div>
        <div className="col-span-2 h-12 bg-lime-100 text-white flex items-center px-2">
          更新時間: {updateDate}
        </div>
        {popular.map((data) => {
          return (
            <>
              <div key={data._id} className="h-12 bg-white flex justify-center items-center">
                {data["序號（排序）"]}
              </div>
              <div className="col-span-3 h-12 bg-white px-2 flex items-center">
                {data["站位名稱"]}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}