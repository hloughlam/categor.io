import type { CategoryScore, Game, RoundScore, ScoreReason } from './types';

export function normalizeAnswer(answer: string): string {
  return answer.trim().toLowerCase().replace(/\s+/g, ' ');
}

export function isValidForLetter(answer: string, letter: string): boolean {
  const normalized = normalizeAnswer(answer);
  return normalized.length > 0 && normalized.startsWith(letter.toLowerCase());
}

export function scoreRound(game: Game): RoundScore {
  const breakdown: CategoryScore[] = [];
  const totals: Record<string, number> = Object.fromEntries(game.players.map((player) => [player.id, 0]));

  for (const category of game.categories) {
    const entries = game.players.map((player) => {
      const answer = game.answers[player.id]?.[category.id] ?? '';
      return {
        playerId: player.id,
        answer,
        normalized: normalizeAnswer(answer),
        valid: isValidForLetter(answer, game.letter),
      };
    });

    const counts = new Map<string, number>();
    for (const entry of entries) {
      if (!entry.valid) continue;
      counts.set(entry.normalized, (counts.get(entry.normalized) ?? 0) + 1);
    }

    for (const entry of entries) {
      let points = 0;
      let reason: ScoreReason = 'empty';

      if (!entry.answer.trim()) {
        reason = 'empty';
      } else if (!entry.valid) {
        reason = 'invalid';
      } else if ((counts.get(entry.normalized) ?? 0) === 1) {
        points = 2;
        reason = 'unique';
      } else {
        points = 1;
        reason = 'shared';
      }

      totals[entry.playerId] = (totals[entry.playerId] ?? 0) + points;
      breakdown.push({
        categoryId: category.id,
        playerId: entry.playerId,
        answer: entry.answer,
        points,
        reason,
      });
    }
  }

  return { breakdown, totals };
}
