import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { deleteComment, setReplay } from "../Services/commentSlice";
import Counter from "./Counter";
import toast from "react-hot-toast";

const replayIco = (
  <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
      fill="#5357B6"
    />
  </svg>
);

const deleteIco = (
  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
      fill="#ED6368"
    />
  </svg>
);

function Card({ comment, replay }) {
  const isComment = !replay;
  const { user, content, createdAt, id, replies, score, replyingTo } =
    comment || replay;

  const { currentUser } = useSelector((store) => store.comment);

  const dispatch = useDispatch();

  function handelDelete() {
    dispatch(deleteComment({ id, replyingTo }));
    toast.success(`Comment has been deleted sucessfuly!`);
  }

  function handelReplay() {
    if (replay) dispatch(setReplay({ id, replyingTo }));
    else dispatch(setReplay(id));
  }

  return (
    <>
      <motion.li
        className={`bg-white py-4 px-7 rounded-xl w-[300px] sm:min-w-[400px] sm:min-h-[166px] lg:flex lg:items-center lg:w-full lg:gap-4 lg:px-10 duration-500
       `}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <div className="flex items-center gap-3 sm:gap-5 lg:flex-col">
          <img
            className="h-[30px] w-[30px] sm:w-[40px] sm:h-[40px]"
            src={user.image.webp}
            alt="userImage"
          />
          <h1 className={`font-bold text-[0.7rem] sm:text-[0.9rem] capitalize`}>
            {user.username}
          </h1>
          {user.username === currentUser.username && (
            <span
              className={`bg-moderateBlue py-1 px-2 text-sm text-white rounded scale-[0.7] sm:scale-100
              `}
            >
              you
            </span>
          )}
          <h3 className="text-grayishBlue text-nowrap text-[0.7rem]">
            {createdAt}
          </h3>
        </div>

        <p
          className={`text-grayishBlue leading-normal my-4 text-[0.7rem] text-balance sm:text-[0.8rem] lg:text-[0.9rem] lg:ml-5 ${
            isComment ? "lg:w-2/3" : "lg:min-w-[470px]"
          }`}
        >
          {content}
        </p>

        <div className="flex justify-between items-center lg:flex-col lg:gap-7">
          <Counter score={score} commentInfo={{ replyingTo, id }} />
          <div className="flex items-center gap-3">
            {user.username === currentUser.username && (
              <button
                onClick={handelDelete}
                className="flex items-center gap-1 sm:gap-3 text-softRed font-bold text-[0.7rem] sm:text-[0.9rem]"
              >
                {deleteIco} Delete
              </button>
            )}
            <button
              onClick={handelReplay}
              className="flex items-center gap-1 sm:gap-3 text-[0.7rem] text-moderateBlue font-bold sm:text-[0.9rem]"
            >
              {replayIco} Replay
            </button>
          </div>
        </div>
      </motion.li>
      {replies?.length > 0 && (
        <ul className="replay-container before:-left-3 sm:before:-left-[30px] lg:full">
          {replies.map((replay) => (
            <Card replay={replay} key={replay.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default Card;
