import { createSlice, current } from "@reduxjs/toolkit";
import data from "./data.json";
import toast from "react-hot-toast";

function saveData(state) {
  localStorage.setItem("data", JSON.stringify(current(state)));
}

const initialState = JSON.parse(localStorage.getItem("data")) || {
  currentUser: data.currentUser,
  comments: data.comments,
  isReplay: false,
  replayID: null,
  showModal: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    createComment(state, action) {
      state.comments = [...state.comments, action.payload].sort(
        (a, b) => b.score - a.score
      );
      saveData(state);
    },
    createReplay(state, action) {
      const replayTo = current(state.comments).filter(
        (comment) => comment.id === action.payload.replyingTo
      );
      const replay = {
        ...action.payload,
        replyingTo: replayTo.at(0).user.username,
      };

      const commentReplaied = {
        ...replayTo[0],
        replies: [...replayTo[0].replies, replay],
      };

      state.comments = [
        ...current(state.comments).filter(
          (comment) => comment.id !== action.payload.replyingTo
        ),
        commentReplaied,
      ].sort((a, b) => b.score - a.score);
      saveData(state);

      state.isReplay = false;
      state.replayID = null;
    },
    setReplay(state, action) {
      state.isReplay = true;

      if (action.payload.replyingTo) {
        state.replayID = current(state.comments)
          .filter(
            (comment) => comment.user.username === action.payload.replyingTo
          )
          .at(0).id;
        toast.success(`Replay has been added sucessfuly!`);
      } else state.replayID = action.payload;
      saveData(state);
    },
    deleteComment(state, action) {
      if (!action.payload.replyingTo) {
        // This means this comment is main comment and not replay

        state.comments = state.comments
          .filter((comment) => comment.id !== action.payload.id)
          .sort((a, b) => b.score - a.score);
      } else {
        // This means this Replay

        const [parentComment] = current(state.comments).filter(
          (comment) => comment.user.username === action.payload.replyingTo
        );
        const replies = parentComment.replies.filter(
          (replay) => replay.id !== action.payload.id
        );

        const editComment = { ...parentComment, replies: replies };

        state.comments = [
          ...state.comments.filter(
            (comment) => comment.id !== parentComment.id
          ),
          editComment,
        ].sort((a, b) => b.score - a.score);
      }
      saveData(state);
    },
    uptadeComment(state, action) {
      if (!action.payload.replyingTo) {
        const [uptadeComment] = current(state.comments).filter(
          (comment) => comment.id === action.payload.id
        );

        state.comments = [
          ...current(state.comments).filter(
            (comment) => comment.id !== action.payload.id
          ),
          {
            ...uptadeComment,
            score:
              action.payload.action === "inc"
                ? uptadeComment.score + 1
                : uptadeComment.score - 1,
          },
        ].sort((a, b) => b.score - a.score);
        saveData(state);
      } else {
        const [comment] = current(state.comments).filter(
          (comment) => comment.user.username === action.payload.replyingTo
        );

        const [replay] = comment.replies.filter(
          (replay) => replay.id === action.payload.id
        );

        const uptadeReplay = {
          ...replay,
          score:
            action.payload.action === "inc"
              ? replay.score + 1
              : replay.score - 1,
        };

        const uptadedComment = {
          ...comment,
          replies: [
            ...comment.replies.filter(
              (replay) => replay.id !== action.payload.id
            ),
            uptadeReplay,
          ].sort((a, b) => b.score - a.score),
        };

        state.comments = [
          ...state.comments.filter(
            (comment) => comment.user.username !== action.payload.replyingTo
          ),
          uptadedComment,
        ].sort((a, b) => b.score - a.score);
        saveData(state);
      }
    },
  },
});

export default commentSlice.reducer;
export const {
  createComment,
  createReplay,
  setReplay,
  deleteComment,
  uptadeComment,
} = commentSlice.actions;
