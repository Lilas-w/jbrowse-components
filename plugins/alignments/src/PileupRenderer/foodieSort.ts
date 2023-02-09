type Point = number[]

function vectDistance(a: Point, b: Point): number {
  let total = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      total += 0
    } else {
      total += 1
    }
  }
  return Math.sqrt(total)
}

function avgPoint(points: Point[]): Point {
  let numDimensions = 0
  if (points[0]) {
    numDimensions = points[0].length
  }
  const avg = Array.from({ length: numDimensions }, () => 0)

  for (const p of points) {
    for (let i = 0; i < numDimensions; i++) {
      avg[i] += p[i]
    }
  }

  for (let i = 0; i < numDimensions; i++) {
    avg[i] /= points.length
  }

  return avg
}

export function kMeans(
  data: Point[],
  k: number,
): { means: Point[]; rawIndex: number[][] } {
  let rawIndex: number[][] = []
  const assignments: number[] = []
  const means = data.slice(0, k)

  let changed = true
  while (changed) {
    const indices: number[][] = Array(k)
      .fill(null)
      .map(() => [])
    changed = false
    const clusters: Point[][] = Array(k)
      .fill(null)
      .map(() => [])

    for (let i = 0; i < data.length; i++) {
      let minDistance = Infinity
      let meanIndex = 0
      for (let j = 0; j < k; j++) {
        const distance = vectDistance(data[i], means[j])
        if (distance < minDistance) {
          minDistance = distance
          meanIndex = j
        }
      }
      if (assignments[i] !== meanIndex) {
        changed = true
        assignments[i] = meanIndex
      }
      indices[meanIndex].push(i)
      clusters[meanIndex].push(data[i])
    }

    for (let i = 0; i < k; i++) {
      const newMean = avgPoint(clusters[i])
      if (vectDistance(means[i], newMean) > 1e-6) {
        changed = true
        means[i] = newMean
      }
    }
    rawIndex = indices
  }

  return { means, rawIndex }
}
