"use client";
import { useTimer } from "@/shared/hooks/useTimer";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { PageAnimationContainer } from "@/widgets/PageAnimationContainer/ui/page-animation-container";
import { TypingContainer } from "@/widgets/TypingContainer/ui/typing-container";

export const SettingsPage = () => {
  const WorkTime = 10;
  const { pauseTimer, seconds, startTimer, clearTimer } = useTimer(0, WorkTime);

  return (
    <PageAnimationContainer>
      <div className="h-full  w-full flex items-center justify-center ">
        В разработке...
      </div>
    </PageAnimationContainer>
  );
};
