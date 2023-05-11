import { Mismatch } from '../MismatchParser'

export interface FoodieMatch {
  start: number
  base: string
}

export function getFoodieMatches(
  mismatches: Mismatch[],
  seq: string,
  xg: string,
): FoodieMatch[] {
  const foodieMatchRecords: FoodieMatch[] = []
  const mismatchMap = buildMismatchMap(mismatches)
  for (let i = 0; i < seq.length; i++) {
    const base = seq[i]
    const mismatch = mismatchMap.get(i)
    if (isFoodieMatch(base, xg, mismatch)) {
      foodieMatchRecords.push({ start: i, base })
    }
  }
  return foodieMatchRecords
}

function buildMismatchMap(mismatches: Mismatch[]): Map<number, Mismatch> {
  return new Map(mismatches.map(m => [m.start, m]))
}

function isFoodieMatch(base: string, xg: string, mismatch?: Mismatch) {
  return (
    (base === 'G' && xg === 'GA') ||
    (base === 'C' && xg === 'CT') ||
    (mismatch &&
      mismatch.altbase &&
      ((base === 'T' && mismatch.altbase === 'C') ||
      (base === 'A' && mismatch.altbase === 'G')))
  );
}

type BaseCounts = { [key in 'C' | 'T' | 'G' | 'A']: number };

function getBaseProbability(xg: string, arr: string[]): number[] {
  const counts: BaseCounts = { C: 0, T: 0, G: 0, A: 0 };
  for (let i = 0; i < arr.length; i++) {
    counts[arr[i] as keyof BaseCounts]++;
  }
  const total = arr.length;
  const CProbability = counts.C / total;
  const TProbability = counts.T / total;
  const GProbability = counts.G / total;
  const AProbability = counts.A / total;
  return xg === 'CT'
    ? [CProbability, TProbability]
    : [GProbability, AProbability]
}

export function getFoodieRange(
  mismatches: Mismatch[],
  start: number,
  seq: string,
  xg: string,
  left: number,
  right: number,
) {
  // get all foodie matches in the footprint range
  const foodieRangeOne = []
  for (let i = left - start; i < right - start; i++) {
    const base = seq[i]
    const mismatch = buildMismatchMap(mismatches).get(i)
    if (isFoodieMatch(base, xg, mismatch)) {
      foodieRangeOne.push(base)
    }
  }
  return foodieRangeOne
}

export function getFoodieClusterOne(
  xg: string,
  foodieRange1: string[],
  probability: number,
) {
  if (xg === 'CT') {
    const CProbability1 = getBaseProbability(xg, foodieRange1)[0]

    if (CProbability1 >= probability) {
      return true
    }
  }
  if (xg === 'GA') {
    const GProbability1 = getBaseProbability(xg, foodieRange1)[0]

    if (GProbability1 >= probability) {
      return true
    }
  }
  return false
}

export function getFoodieCluster1(
  xg: string,
  foodieRange1: string[],
  foodieRange2: string[],
  probability1: number,
  probability2: number,
) {
  if (xg === 'CT') {
    const CProbability1 = getBaseProbability(xg, foodieRange1)[0]
    const CProbability2 = getBaseProbability(xg, foodieRange2)[0]

    // const TProbability = getBaseProbability(xg, foodieRange)[1]
    if (CProbability1 >= probability1 && CProbability2 >= probability2) {
      return true
    }
  }
  if (xg === 'GA') {
    const GProbability1 = getBaseProbability(xg, foodieRange2)[0]
    const GProbability2 = getBaseProbability(xg, foodieRange2)[0]

    // const AProbability = getBaseProbability(xg, foodieRange)[1]
    if (GProbability1 >= probability1 && GProbability2 >= probability2) {
      return true
    }
  }
  return false
}

export function getFoodieCluster2(
  xg: string,
  foodieRange1: string[],
  foodieRange2: string[],
  probability1: number,
  probability2: number,
) {
  if (xg === 'CT') {
    const CProbability1 = getBaseProbability(xg, foodieRange1)[0]

    // const TProbability = getBaseProbability(xg, foodieRange)[1]
    if (CProbability1 >= probability1) {
      return true
    }
  }
  if (xg === 'GA') {
    const GProbability1 = getBaseProbability(xg, foodieRange2)[0]

    // const AProbability = getBaseProbability(xg, foodieRange)[1]
    if (GProbability1 >= probability2) {
      return true
    }
  }
  return false
}

export function getFoodieCluster3(
  xg: string,
  foodieRange1: string[],
  foodieRange2: string[],
  probability1: number,
  probability2: number) {
  if (xg === 'CT') {
    const CProbability2 = getBaseProbability(xg, foodieRange1)[0]

    // const TProbability = getBaseProbability(xg, foodieRange)[1]
    if (CProbability2 >= probability1) {
      return true
    }
  }
  if (xg === 'GA') {
    const GProbability2 = getBaseProbability(xg, foodieRange2)[0]

    // const AProbability = getBaseProbability(xg, foodieRange)[1]
    if (GProbability2 >= probability2) {
      return true
    }
  }
  return false
}
