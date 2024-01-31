import React from "react";
const emojiArray = ["😠", "🙁", "😐", "🙂", "😀"];

interface EmojiSelectionProps {
  questionNumber: number;
  value: number | undefined;
  setAnswer: (questionNumber: number, answer: number) => void;
}

const EmojiSelection = ({
  questionNumber,
  value,
  setAnswer,
}: EmojiSelectionProps) => {
  return (
    <span
      className="flex justify-center gap-4 "
      role="group"
      aria-labelledby="emojiGroup">
      {emojiArray.map((item) => {
        const itemNum = emojiArray.findIndex((emoji) => emoji === item);
        return (
          <div key={item} className="mr-2 flex items-center">
            <input
              type="radio"
              id={`emoji ${questionNumber}-${item}`}
              name="emojiGroup"
              className="hidden"
              value={item}
              checked={value === itemNum}
              onClick={() => setAnswer(questionNumber, itemNum)}
              tabIndex={0}
            />
            <label
              htmlFor={`emoji ${questionNumber}-${item}`}
              className={
                "cursor-pointer select-none rounded-md p-2 text-center font-sans hover:grayscale-0"}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setAnswer(questionNumber, itemNum);
                }
              }}>
              {item}
            </label>
          </div>
        );
      })}
    </span>
  );
};

export default EmojiSelection;
