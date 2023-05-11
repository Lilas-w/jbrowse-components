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
  const mismatchMap = new Map(mismatches.map(m => [m.start, m]))
  for (let i = 0; i < seq.length; i++) {
    const base = seq[i]
    const mismatch = mismatchMap.get(i)
    if (
      (base === 'G' && xg === 'GA') ||
      (base === 'C' && xg === 'CT') ||
      (mismatch && ((base === 'T' && mismatch.altbase === 'C') ||
          (base === 'A' && mismatch.altbase === 'G')))
    ) {
      foodieMatchRecords.push({ start: i, base })
    }
  }
  return foodieMatchRecords
}

function getBaseProbability(xg: string, arr: string[]): number[] {
  let Ccount = 0
  let Tcount = 0
  let Gcount = 0
  let Acount = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 'C') {
      Ccount += 1
    } else if (arr[i] === 'T') {
      Tcount += 1
    } else if (arr[i] === 'G') {
      Gcount += 1
    } else if (arr[i] === 'A') {
      Acount += 1
    }
  }
  const CProbability = Number((Ccount / arr.length).toFixed(2))
  const TProbability = Number((Tcount / arr.length).toFixed(2))
  const GProbability = Number((Gcount / arr.length).toFixed(2))
  const AProbability = Number((Acount / arr.length).toFixed(2))
  return xg === 'CT'
    ? [CProbability, TProbability]
    : [GProbability, AProbability]
}
export function getFoodieRangeOne(
  mismatches: Mismatch[],
  start: number,
  seq: string,
  xg: string,
  left1: number,
  right1: number,
) {
  let base = ''
  // 从符合featureInCenterLine的单条read中取至少含有4个红蓝base的区域
  const foodieRangeOne = []
  for (let i = left1 - start; i < right1 - start; i++) {
    base = seq[i]
    if (
      (base === 'G' && xg === 'GA') ||
      (base === 'C' && xg === 'CT') ||
      (mismatches.length > 0 &&
        ((base === 'T' && mismatches[0].altbase === 'C') ||
          (base === 'A' && mismatches[0].altbase === 'G')))
    ) {
      foodieRangeOne.push(base)
    }
  }
  return foodieRangeOne
}

export function getFoodieRange(
  mismatches: Mismatch[],
  start: number,
  seq: string,
  xg: string,
  left1: number,
  right1: number,
  left2: number,
  right2: number,
) {
  let base = ''
  // 从符合featureInCenterLine的单条read中取至少含有4个红蓝base的区域
  const foodieRange1 = []
  const foodieRange2 = []
  for (let i = left1 - start; i < right1 - start; i++) {
    base = seq[i]
    if (
      (base === 'G' && xg === 'GA') ||
      (base === 'C' && xg === 'CT') ||
      (mismatches.length > 0 &&
        ((base === 'T' && mismatches[0].altbase === 'C') ||
          (base === 'A' && mismatches[0].altbase === 'G')))
    ) {
      foodieRange1.push(base)
    }
  }
  for (let i = left2 - start; i < right2 - start; i++) {
    base = seq[i]
    if (
      (base === 'G' && xg === 'GA') ||
      (base === 'C' && xg === 'CT') ||
      (mismatches.length > 0 &&
        ((base === 'T' && mismatches[0].altbase === 'C') ||
          (base === 'A' && mismatches[0].altbase === 'G')))
    ) {
      foodieRange2.push(base)
    }
  }
  return [foodieRange1, foodieRange2]
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
