"use client"

import React, { useState } from "react";
// import FeedbackForm from "./FeedbackForm";
// import { useAppDispatch } from "@store/store";
// import FeedbackPrompt from "./FeedbackPrompt";
// import * as Dialog from "@radix-ui/react-dialog";
// import { FiX } from "react-icons/fi";
import * as Dialog from "@radix-ui/react-dialog";
import EmojiSelection from "./EmojiSelection";

const recommendJourneyArray = [
    { id: 1, color: "bg-[#FF0000]" },
    { id: 2, color: "bg-[#FF0000]" },
    { id: 3, color: "bg-[#FF0000]" },
    { id: 4, color: "bg-[#FF0000]" },
    { id: 5, color: "bg-[#FF0000]" },
    { id: 6, color: "bg-[#FF0000]" },
    { id: 7, color: "bg-[#FFD500]" },
    { id: 8, color: "bg-[#FFD500]" },
    { id: 9, color: "bg-[#12872A]" },
    { id: 10, color: "bg-[#12872A]" },
  ];
  
  interface SatisfactionQuestion {
    question: string;
    uuid: string;
    type: string[];
    answer: number | undefined;
  }
  
  // keep the uuid as is. This is used to identify the question in the backend
  const satisfactionQuestions: SatisfactionQuestion[] = [
    {
      question: "Website look and feel",
      uuid: "fa3625f2-be38-4610-bae3-aa20d175ea5a",
      type: ["old", "new"],
      answer: undefined,
    },
    {
      question: "Booking experience",
      uuid: "eefe6f17-de48-4bc2-a75d-4c8dfa715f6d",
      type: ["old", "new"],
      answer: undefined,
    },
    {
      question: "Payment & Invoice",
      uuid: "9eda791d-ff82-4d74-9e3f-0a8e11e71276",
      type: ["old", "new"],
      answer: undefined,
    },
    {
      question: "Ease of navigation",
      uuid: "b4d9c81d-bb01-4774-ac24-33fbbf680033",
      type: ["new"],
      answer: undefined,
    },
    {
      question: "Clarity of information",
      uuid: "b6a8e431-8a50-417c-ab40-2271f0be4829",
      type: ["new"],
      answer: undefined,
    },
    {
      question: "Keycard Management",
      uuid: "d3b2bf08-2091-480a-9ba9-2e99dddbb8ad",
      type: ["old"],
      answer: undefined,
    },
    {
      question: "Printing Experience",
      uuid: "8cc7c03c-870d-40c7-9ea1-424f86c4663e",
      type: ["old"],
      answer: undefined,
    },
  ];
  
  const satisfactionQuestionsOld = satisfactionQuestions.filter(({ type }) =>
    type.includes("old")
  );
  
  const satisfactionQuestionsNew = satisfactionQuestions.filter(({ type }) =>
    type.includes("new")
  );
  
  const numScaleUuid = "209a4590-6acf-4a2d-af7e-0fa892303439"; // for recommend journey
  
  const feedbackUuid = "03bce524-4ca8-4396-8b1a-b6775da6bcf7";

const FeedbackOD = () => {
  const [step, setStep] = useState(0);
  const [recommendJourney, setRecommendJourney] = useState<undefined | number>(
    undefined
  );
  const [satisfactionDrivers, setSatisfactionDrivers] = useState<
    typeof satisfactionQuestions
  >(
    satisfactionQuestionsOld
  );
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const setSatisfactionAnswer = (questionNumber: number, answer: number) => {
    setSatisfactionDrivers((prevSatisfactionDrivers) => {
      const newSatisfactionDrivers = [...prevSatisfactionDrivers];
      newSatisfactionDrivers[questionNumber].answer = answer;
      return newSatisfactionDrivers;
    });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(recommendJourney);
    // console.log(satisfactionDrivers);
    // console.log(feedback);
    try {
      setIsSubmitted(true);
      const satisfactionDriversAnswered = satisfactionDrivers.filter(
        ({ answer }) => answer !== undefined
      );
      const body = [
        {
          uuid: feedbackUuid,
          type: "text",
          answer: feedback,
        },
        ...(recommendJourney !== undefined
          ? [
              {
                uuid: numScaleUuid,
                type: "numScale",
                answer: recommendJourney,
              },
            ]
          : []),
        ...(satisfactionDriversAnswered.length > 0
          ? satisfactionDriversAnswered.map(({ uuid, answer }) => {
              const answerPayload = (answer as number) + 1;
              return {
                uuid,
                type: "emoji",
                answer: answerPayload,
              };
            })
          : []),
      ];
    } catch (error: any) {
      // console.log(error);
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-black opacity-70" />
        <Dialog.Content
          title="Feedback Modal"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
          className="fixed left-1/2 top-1/2 z-10 h-[100vh] w-full min-w-min -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-sm bg-white p-4 shadow sm:h-fit sm:w-[40rem] sm:p-8"
          >
          <div className="flex items-center justify-end">
            <Dialog.Close
              className="pt-8 text-black opacity-50"
              aria-label="Close">
              x
            </Dialog.Close>
          </div>
          <form className="p-4 pt-8" onSubmit={submitHandler}>
      <section aria-label="How likely are you to recommend OD purchase journey on WWI website?">
        <h2 className="text-bold mb-4 block text-center font-serif text-sm font-bold sm:text-base">
          How likely are you to recommend OD purchase journey on WWI website?
          {/* (1 being the lowest and 10 the highest ) */}
        </h2>
        <span className="block font-sans text-sm sm:hidden">
          Very dissatisfied
        </span>
        {/* ... radio buttons for rating ... */}
        <fieldset
          className="grid grid-cols-5 gap-2 text-sm sm:grid-cols-10 sm:text-base"
          role="group"
          aria-labelledby="ratingGroup"
          aria-label="Rating: How likely are you to recommend OD purchase journey on WWI website?">
          {recommendJourneyArray.map(({ id, color }) => (
            <div key={id} className="mr-2 flex items-center">
              <input
                type="radio"
                id={`rating ${id}`}
                name="rating"
                className="hidden"
                value={id}
                checked={recommendJourney === id}
                onClick={() => {
                  setRecommendJourney((prevValue) =>
                    prevValue === id ? undefined : id
                  );
                }}
                tabIndex={0}
              />
              <label
                htmlFor={`rating ${id}`}
                className={`w-full cursor-pointer rounded-md p-1 text-center ${
                  recommendJourney === id
                    ? color
                    : recommendJourney === undefined
                      ? color
                      : "bg-gray-300"
                }`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setRecommendJourney((prevValue) =>
                      prevValue === id ? undefined : id
                    );
                  }
                }}>
                {id}
              </label>
            </div>
          ))}
        </fieldset>
        <div className="font-small flex justify-end font-sans text-sm sm:justify-between sm:text-base">
          <span className="hidden sm:block">Very dissatisfied</span>
          <div>Very satisfied</div>
        </div>
      </section>

      <section aria-label="feedback satisfaction drivers">
        <h2 className="text-bold my-4 block text-center font-serif text-sm font-bold sm:text-base">
          Satisfaction drivers:
        </h2>
        {/* ... satisfaction drivers questions ... */}
        <div role="group" aria-labelledby="satisfactionGroup">
          {/* change the questions array based on number of bookings - get this from BE */}
          {satisfactionDrivers.map(({ question }, index) => {
            return (
              <div
                key={question}
                className="block justify-center text-center text-sm sm:flex sm:text-base">
                <p className="w-auto self-center font-sans sm:w-72">
                  {question}
                </p>
                <fieldset>
                  <legend className="sr-only">Satisfaction Levels</legend>
                  <EmojiSelection
                    questionNumber={index}
                    value={satisfactionDrivers[index]?.answer}
                    setAnswer={setSatisfactionAnswer}
                  />
                </fieldset>
              </div>
            );
          })}
        </div>
      </section>

      <section aria-label="feedback text area">
        <h2 className="text-bold my-4 block text-center font-serif text-sm font-bold sm:text-base">
          How can we improve the experience{" "}
          <span className="text-red-400">*</span>
        </h2>
        <textarea
          className="h-40 w-full resize-none rounded-md border border-gray-300 p-2 font-sans text-base sm:text-base"
          id="feedback-text"
          name="feedback-text"
          placeholder="Please share your feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </section>

      <div className="text-center font-sans ">
        <button
          role="button"
          aria-label="to submit feedback form"
          className="ml-4 rounded-[0.25rem] bg-blue-600 px-5 py-4 text-white disabled:text-opacity-50 disabled:opacity-40"
          disabled={feedback === "" || isSubmitted}
          type="submit">
          {isSubmitted ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FeedbackOD;
