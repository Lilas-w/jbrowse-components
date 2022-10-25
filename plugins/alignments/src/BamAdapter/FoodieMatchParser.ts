export interface FoodieMatch {
  start: number
  base: string
}
export function foodieMatchParser(mdstring: string, seq: string) {
  const mdRegex = new RegExp(/(\d+|\^[a-z]+|[a-z])/gi)
  const md = mdstring.match(mdRegex) || []
  console.log(md);
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
        if (base === 'G' || base === 'C') {
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
