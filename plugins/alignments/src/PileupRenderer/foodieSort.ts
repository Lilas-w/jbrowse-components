type Point = number[]

interface Cluster {
  centroid: Point
  points: Point[]
  rawArrayIndices: number[]
}

const vectDistance = (a: Point, b: Point): number => {
  let total = 0
  for (let i = 0; i < a.length; i++) {
    total += a[i] === b[i] ? 0 : 1;
  }
  return Math.sqrt(total)
}

const avgPoint = (points: Point[]): Point => {
  const avg: Point = new Array(points[0].length).fill(0)
  for (const point of points) {
    for (let i = 0; i < point.length; i++) {
      avg[i] += point[i]
    }
  }
  for (let i = 0; i < avg.length; i++) {
    avg[i] /= points.length
  }
  return avg
}

export const kMeans = (
  points: Point[],
  k: number,
  maxIterations = 100,
  // between 0.0001 and 0.001 as a starting point
  epsilon = 0.0001,
): [Cluster[], number[]] => {
  const n = points.length
  const clusters: Cluster[] = []
  const rawArrayIndices: number[] = Array.from({ length: n }, (_, i) => i)

  for (let i = 0; i < k; i++) {
    const randomIndex = Math.floor(Math.random() * rawArrayIndices.length)
    const centroid = points[rawArrayIndices[randomIndex]]
    clusters.push({ centroid, points: [], rawArrayIndices: [] })
    rawArrayIndices.splice(randomIndex, 1)
  }

  let iterations = 0
  let changed = true

  while (changed && iterations < maxIterations) {
    changed = false
    for (let i = 0; i < n; i++) {
      const point = points[i]
      let minDistance = Number.MAX_SAFE_INTEGER
      let closestClusterIndex = -1
      for (let j = 0; j < k; j++) {
        const distance = vectDistance(point, clusters[j].centroid)
        if (distance < minDistance) {
          minDistance = distance
          closestClusterIndex = j
        }
      }
      const closestCluster = clusters[closestClusterIndex]
      if (!closestCluster.points.includes(point)) {
        closestCluster.points.push(point)
        closestCluster.rawArrayIndices.push(i)
        changed = true
      }
    }

    for (let i = 0; i < k; i++) {
      const cluster = clusters[i]
      const oldCentroid = cluster.centroid
      const newCentroid = avgPoint(cluster.points)
      cluster.centroid = newCentroid
      if (vectDistance(oldCentroid, newCentroid) > epsilon) {
        changed = true
      }
    }
    iterations++
  }
  return [clusters, rawArrayIndices]
}
