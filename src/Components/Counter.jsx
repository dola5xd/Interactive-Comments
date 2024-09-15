import { useState } from "react";
import { uptadeComment } from "../Services/commentSlice";
import { useDispatch } from "react-redux";

const minus = (
  <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
      fill="#C5C6EF"
    />
  </svg>
);

const plus = (
  <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
      fill="#C5C6EF"
    />
  </svg>
);

function Counter({ score, commentInfo }) {
  const [currentScore, setCurrentScore] = useState(score ?? 0);
  const [incscored, setIncscored] = useState(false);
  const [decscored, setDecscored] = useState(false);
  const dispatch = useDispatch();

  function handelInc() {
    if (incscored) return;
    setCurrentScore((prev) => prev + 1);
    setIncscored(true);
    setDecscored(false);
    dispatch(uptadeComment({ ...commentInfo, action: "inc" }));
  }
  function handelDec() {
    if (decscored) return;
    setCurrentScore((prev) => (prev > 0 ? prev - 1 : 0));
    setIncscored(false);
    setDecscored(true);
    dispatch(uptadeComment({ ...commentInfo, action: "dec" }));
  }

  return (
    <div className="flex items-center bg-Very_LightGray w-[40%] sm:w-[30%] justify-between px-2 sm:px-3 py-2 sm:py-3 rounded-xl lg:min-w-[150px]">
      <button
        className={` min-h-[25px] min-w-[10px] sm:min-w-[20px] ${
          decscored ? "cursor-not-allowed" : ""
        }`}
        onClick={handelDec}
        disabled={decscored}
      >
        {minus}
      </button>
      <p className="text-moderateBlue font-bold text-[0.8rem] ">
        {currentScore}
      </p>
      <button
        className={` min-h-[25px] min-w-[10px] sm:min-w-[20px] ${
          incscored ? "cursor-not-allowed" : ""
        }`}
        onClick={handelInc}
        disabled={incscored}
      >
        {plus}
      </button>
    </div>
  );
}

export default Counter;
