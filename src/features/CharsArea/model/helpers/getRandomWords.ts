export function getRandomWords(
  wordCount: 15 | 30 | 50 | 100,
  words: string[]
): string[] {
  const randomWords: string[] = [];

  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    randomWords.push(words[randomIndex]);
  }

  return randomWords;
}
