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
