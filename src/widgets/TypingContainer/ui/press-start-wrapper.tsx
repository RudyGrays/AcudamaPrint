import { SetStateAction } from "react";

export const PressStartWrapper = ({
  setFocus,
}: {
  setFocus: (value: SetStateAction<boolean>) => void;
}) => {
  return (
    <div
      onClick={() => setFocus(true)}
      className="absolute select-none cursor-pointer top-0 rounded-xl flex items-center justify-center z-[5] left-0 right-0 bottom-0 bg-[rgba(5,5,5,0.9)] border border-[rgba(46,46,46,0.9)]"
    >
      Press to start
    </div>
  );
};
