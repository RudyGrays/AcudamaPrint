import { customCreate } from "@/shared/libs/store/custom-create";

export interface HistoryElement {
  date: Date;
  value: number;
}

export interface TestsInfo {
  avgAccuracy: number[];
  avgWPM: number[];
  avgCPM: number[];
  problemChars: string[];

  wpmHistory: HistoryElement[];
  accuracyHistory: HistoryElement[];
}

export interface CurrentTestResult {
  accuracy: number;
  problemChars: string[];
  wpm: number;
  cpm: number;
}

export interface IStore {
  info: TestsInfo;

  setInfo: (info: CurrentTestResult) => void;
}

export const useUserTestsInfo = customCreate<IStore>(
  (set) => ({
    info: {
      avgAccuracy: [],
      avgWPM: [],
      avgCPM: [],
      problemChars: [],
      wpmHistory: [],
      accuracyHistory: [],
    },
    setInfo: (info) =>
      set((state) => {
        if (state.info.accuracyHistory.length > 15) {
          state.info.avgAccuracy = [
            ...state.info.avgAccuracy.slice(1),
            info.accuracy,
          ];
          state.info.accuracyHistory = [
            ...state.info.accuracyHistory.slice(1),
            { value: Math.floor(info.accuracy * 100), date: new Date() },
          ];
        } else {
          state.info.avgAccuracy.push(info.accuracy);
          state.info.accuracyHistory.push({
            value: Math.floor(info.accuracy * 100),
            date: new Date(),
          });
        }

        if (state.info.wpmHistory.length > 15) {
          state.info.avgWPM = [...state.info.avgWPM.slice(1), info.wpm];
          state.info.wpmHistory = [
            ...state.info.wpmHistory.slice(1),
            { value: Math.floor(info.wpm), date: new Date() },
          ];
        } else {
          state.info.avgWPM.push(info.wpm);
          state.info.wpmHistory.push({
            value: Math.floor(info.wpm),
            date: new Date(),
          });
        }

        if (state.info.avgCPM.length > 15) {
          state.info.avgCPM = [...state.info.avgCPM.slice(1), info.cpm];
        } else {
          state.info.avgCPM.push(info.cpm);
        }

        state.info.problemChars = info.problemChars;
      }),
  }),
  "userTestsInfo"
);
