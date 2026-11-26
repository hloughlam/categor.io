import { WORD_BANK } from './catalog';
import { isValidForLetter, normalizeAnswer } from './scoring';
import type { Answers, Category, Player } from './types';

function hashSeed(value: string): number {
  return Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pickFromBank(categoryId: string, letter: string, seed: string): string {
  const options = (WORD_BANK[categoryId] ?? []).filter((word) => isValidForLetter(word, letter));
  if (options.length === 0) return '';
  return options[hashSeed(seed) % options.length] ?? '';
}

export function generateNpcAnswers(
  players: Player[],
  categories: Category[],
  letter: string,
  yourAnswers: Record<string, string>,
): Answers {
  const npcs = players.filter((player) => player.isNpc);
  const answers: Answers = {};

  for (const npc of npcs) {
    answers[npc.id] = {};
    for (const category of categories) {
      const yours = yourAnswers[category.id] ?? '';
      const copyYours =
        yours.trim().length > 0 &&
        isValidForLetter(yours, letter) &&
        hashSeed(`${npc.id}-${category.id}-copy`) % 5 === 0;

      if (copyYours) {
        answers[npc.id][category.id] = yours.trim();
        continue;
      }

      const skip = hashSeed(`${npc.id}-${category.id}-skip`) % 7 === 0;
      answers[npc.id][category.id] = skip ? '' : pickFromBank(category.id, letter, `${npc.id}-${category.id}-${letter}`);
    }
  }

  // If two NPCs landed on the same invented blank, leave it. Shared scoring needs at least
  // one duplicate somewhere, so copy one user answer if none were copied.
  const copied = Object.values(answers).some((playerAnswers) =>
    Object.entries(playerAnswers).some(
      ([categoryId, answer]) => normalizeAnswer(answer) === normalizeAnswer(yourAnswers[categoryId] ?? '') && answer.trim(),
    ),
  );

  if (!copied && npcs[0]) {
    const match = categories.find((category) => isValidForLetter(yourAnswers[category.id] ?? '', letter));
    if (match) {
      answers[npcs[0].id][match.id] = yourAnswers[match.id]?.trim() ?? '';
    }
  }

  return answers;
}
