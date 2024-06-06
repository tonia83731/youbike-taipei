import { getName } from "@/helpers/handleName";
import { useState } from "react";
import Link from "next/link";
import {
  PaginationState,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
const REALTIMETABLEMAP = [
  ["StationUID", "ID"],
  ["StationName", "站點名稱"],
  ["AvailableRentBike_general", "可借車輛(一般)"],
  ["AvailableRentBike_electric", "可借車輛(電動)"],
  ["AvailableReturnBikes", "可選空位"],
];
export default function StopTable(props) {
  const { tableData } = props;

  const [sourceSorting, setSourceSorting] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });
  const columnHelper = createColumnHelper();
  const columns = REALTIMETABLEMAP.map((title) => {
    columnHelper.accessor(title[0], {
      header: () => <span className="">{title[1]}</span>,
      cell: (info) => <span className="">{info.getValue()}</span>,
    });
  });
  const table = useReactTable({
    data: tableData,
    columns: columns,
    state: {
      sorting: sourceSorting,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSourceSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    debugTable: true,
  });
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-lime-100 text-white font-bold">
          {theadData.map((data, index) => {
            return (
              <th
                className={`h-12 ${
                  index === 2 && screenWidth.width < 900 ? "hidden" : ""
                }`}
                key={data}
              >
                {data}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="text-xl">
        {totalPage === 0 ? (
          <tr className="h-16 bg-white">
            <td
              className="px-2 text-center text-olive-100"
              colSpan={screenWidth.width < 900 ? 3 : 4}
            >
              沒有任何資訊
            </td>
          </tr>
        ) : (
          tbodyData.map((data, index) => {
            const name = getName(data.sna);
            return (
              <tr
                className={`h-16 ${
                  index % 2 === 0 ? "bg-white " : "bg-slate-200"
                }`}
                key={data.sno}
              >
                <td className="px-2 text-center text-olive-100">
                  {data.sarea}
                </td>
                <td className="px-2 text-olive-100">
                  <Link href={`/realtime/${data.sno}`}>{name}</Link>
                </td>
                <td className="hidden px-2 text-center text-mustard-100 font-bold 900:h-16 900:flex 900:justify-center 900:items-center">
                  {data.tot}
                </td>
                <td className="px-2 text-center text-mustard-100 font-bold">
                  {data.sbi}
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
