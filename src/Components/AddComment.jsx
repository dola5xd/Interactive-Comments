import { useDispatch, useSelector } from "react-redux";
import { createComment, createReplay } from "../Services/commentSlice";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function AddComment() {
  const { currentUser, isReplay, replayID } = useSelector(
    (store) => store.comment
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const inputEl = useRef(null);

  useEffect(() => inputEl.current.focus(), [isReplay]);

  function handelComment() {
    if (comment.length <= 2) return;

    const randomID = Math.ceil(Math.random() * 1000);

    const newComment = {
      id: randomID,
      content: comment,
      createdAt: "a few moments ago",
      replies: [],
      score: 0,
      user: currentUser,
    };

    dispatch(createComment(newComment));
    toast.success(`Comment has been added sucessfuly!`);
    setComment("");
  }

  function handelReplay() {
    if (comment.length <= 2) return;

    const randomID = Math.ceil(Math.random() * 1000);

    const newReplay = {
      id: randomID,
      content: comment,
      createdAt: "a few moments ago",
      score: 0,
      replyingTo: replayID,
      user: currentUser,
    };

    dispatch(createReplay(newReplay));
    toast.success(`Replay has been added sucessfuly!`);
    setComment("");
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white py-[25px] px-[25px] flex flex-col gap-5 lg:w-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:rounded-lg lg:bottom-4">
      {!isReplay ? (
        <textarea
          type="text"
          placeholder="Add comment..."
          className="w-full h-[60px] sm:h-[75px] p-[10px] rounded outline outline-2 outline-lightGray focus:outline-moderateBlue resize-none placeholder:text-[0.8rem] text-[0.8rem]  lg:text-[0.9rem]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={inputEl}
        />
      ) : (
        <textarea
          type="text"
          placeholder="Add Replay..."
          className="w-full h-[60px] sm:h-[75px] p-[10px] rounded outline outline-2 outline-grayishBlue focus:outline-moderateBlue resize-none placeholder:text-[0.8rem] text-[0.8rem]  lg:text-[0.9rem]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={inputEl}
        />
      )}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-3 text-darkBlue font-semibold text-[0.8rem]  capitalize">
          <img
            className="w-[30px] h-[30px]"
            src={currentUser.image.webp}
            alt="userImage"
          />{" "}
          {currentUser.username}
        </span>
        {!isReplay ? (
          <button
            onClick={handelComment}
            className="bg-moderateBlue text-white px-4 py-2 rounded-lg  text-[0.8rem]"
          >
            Sent
          </button>
        ) : (
          <button
            onClick={handelReplay}
            className="bg-moderateBlue text-white px-4 py-2 rounded-lg text-[0.8rem]"
          >
            Replay
          </button>
        )}
      </div>
    </div>
  );
}

export default AddComment;
