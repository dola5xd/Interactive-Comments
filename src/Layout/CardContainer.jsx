import { useSelector } from "react-redux";
import Card from "../Components/Card";

function CardContainer() {
  const { comments } = useSelector((store) => store.comment);
  return (
    <ul className="flex items-center flex-col gap-7 px-[15%] ">
      {comments.map((comment) => (
        <Card comment={comment} key={comment.id} />
      ))}
    </ul>
  );
}

export default CardContainer;
