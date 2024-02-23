import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Pagination(props) {
  const { pages, currentPage, totalPage, onPageClick } = props
  return (
    <div className="flex items-center text-slate-400 text-lg">
      <div>
        <button
          className="mr-2 hover:text-slate-500 disabled:text-slate-200"
          id="first-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <button
          className="mr-2 hover:text-slate-500 disabled:text-slate-200"
          id="prev-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {pages.map((page) => {
          return (
            <button
              className={`w-9 h-9 rounded-full hover:text-slate-500 ${
                currentPage === page ? "bg-lime-100 text-white" : ""
              }`}
              key={page}
              id={page}
              onClick={(event) => onPageClick(event)}
            >
              {page}
            </button>
          );
        })}
        <button
          className="ml-2 hover:text-slate-500 disabled:text-slate-200"
          id="next-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === totalPage}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button
          className="ml-2 hover:text-slate-500 disabled:text-slate-200"
          id="last-btn"
          onClick={(event) => onPageClick(event)}
          disabled={currentPage === totalPage}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
      <div className="ml-4">
        共<span className="">{totalPage}</span>頁
      </div>
    </div>
  );
}
