import { addReaction, reactionType } from "@/app/features/post/postSlice";
import { FC } from "react";
import { Button } from "./ui/button";
import { useAppDispatch } from "@/app/features/hooks";

interface ReactionsCardProps {
  reaction: reactionType;
  id: string;
}

const icons = [
  ["thumbsUp", "👍"],
  ["heart", "❤️"],
  ["good", "🙌"],
];
const ReactionsCard: FC<ReactionsCardProps> = ({ reaction, id }) => {
  const dispatch = useAppDispatch();
  const keys: [string, number][] = Object.entries(reaction);
  console.log(keys);

  return (
    <>
      {keys.map((it, index) => (
        <div key={it[0]}>
          <Button
            variant={"ghost"}
            onClick={() => {
              dispatch(
                addReaction({
                  _id: id,
                  reactionKey: it[0] as keyof reactionType,
                })
              );
            }}
          >
            {icons[index][1]}: {it[1]}
          </Button>
        </div>
      ))}

      {/* {reaction.good + " " + reaction.heart + " " + reaction.thumbsUp} */}
    </>
  );
};

export default ReactionsCard;
