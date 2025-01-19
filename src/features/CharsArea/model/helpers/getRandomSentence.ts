import {
  sentence100words,
  sentence15words,
  sentence30words,
  sentence50words,
} from "../constants/sentences";

export function getRandomSentence(wordCount: 15 | 30 | 50 | 100): string[] {
  let selectedSentence: string[];

  switch (wordCount) {
    case 15:
      selectedSentence =
        sentence15words[Math.floor(Math.random() * sentence15words.length)];
      break;
    case 30:
      selectedSentence =
        sentence30words[Math.floor(Math.random() * sentence30words.length)];
      break;
    case 50:
      selectedSentence =
        sentence50words[Math.floor(Math.random() * sentence50words.length)];
      break;
    case 100:
      selectedSentence =
        sentence100words[Math.floor(Math.random() * sentence100words.length)];
      break;
    default:
      throw new Error("Invalid word count, please provide 15, 30, 50, or 100.");
  }

  return selectedSentence;
}
