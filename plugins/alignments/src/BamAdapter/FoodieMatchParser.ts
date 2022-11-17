export interface FoodieMatch {
  start: number
  base: string
}
export function getFoodieMatches(mdstring: string, seq: string, xg: string) {
  const mdRegex = new RegExp(/(\d+|\^[a-z]+|[a-z])/gi)
  const md = mdstring.match(mdRegex) || []
  let base = '';
  let pos = 0;
  const foodieMatchRecords: FoodieMatch[] = []
  for (let i = 0; i < md.length; i++) {
    const token = md[i]
    const num = +token
    if (!Number.isNaN(num)) {
      // 当前token是数字
      for (let j = 0; j < num; j++) {
        const s = pos
        const start = s + j
        base = seq[start]
        if ((base === 'G' && xg === 'GA') || (base === 'C' && xg === 'CT')) {
          foodieMatchRecords.push({ start, base })
        }
      }
      pos += num
    } else {
      pos += 1
    }
  }
  return foodieMatchRecords
} 
