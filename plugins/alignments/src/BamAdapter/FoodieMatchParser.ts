import { Mismatch } from './MismatchParser'

export interface FoodieMatch {
  start: number
  base: string
}

export function getFoodieMatches(
  mismatches: Mismatch[],
  seq: string,
  xg: string,
) {
  const seqArr = seq.split('')
  const len = seqArr.length
  const foodieMatchRecords: FoodieMatch[] = []
  const mismatchesPos = []
  for (let i = 0; i < mismatches.length; i++) {
    mismatchesPos.push(mismatches[i].start)
  }
  let base = ''
  for (let start = 0; start < len; start++) {
    base = seq[start]
    if (start === mismatchesPos[0]) {
      mismatches.shift()
      continue
    } else if (
      (base === 'G' && xg === 'GA') ||
      (base === 'C' && xg === 'CT') ||
      (mismatches.length > 0 &&
        ((base === 'T' && mismatches[0].altbase === 'C') ||
          (base === 'A' && mismatches[0].altbase === 'G')))
    ) {
      foodieMatchRecords.push({ start, base })
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
  const CProbability = Number((Ccount / arr.length).toFixed(1))
  const TProbability = Number((Tcount / arr.length).toFixed(1))
  const GProbability = Number((Gcount / arr.length).toFixed(1))
  const AProbability = Number((Acount / arr.length).toFixed(1))
  if (xg === 'CT') {
    return [CProbability, TProbability]
  } else {
    return [GProbability, AProbability]
  }
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

export function getFoodieCluster(
  xg: string,
  foodieRange1: string[],
  foodieRange2: string[],
) {
  if (xg === 'CT') {
    const CProbability1 = getBaseProbability(xg, foodieRange1)[0]
    const CProbability2 = getBaseProbability(xg, foodieRange2)[0]

    // const TProbability = getBaseProbability(xg, foodieRange)[1]
    if (CProbability1 >= 0.5 && CProbability2 >= 0.5) {
      return true
    }
  }
  if (xg === 'GA') {
    const GProbability1 = getBaseProbability(xg, foodieRange2)[0]
    const GProbability2 = getBaseProbability(xg, foodieRange2)[0]

    // const AProbability = getBaseProbability(xg, foodieRange)[1]
    if (GProbability1 >= 0.5 && GProbability2 >= 0.5) {
      return true
    }
  }
  return false
}
