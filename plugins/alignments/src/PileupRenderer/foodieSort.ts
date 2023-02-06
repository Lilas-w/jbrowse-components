/* eslint-disable prettier/prettier */
export const distances = {
    euclidean: function (v1: [], v2: []) {
        let total = 0
        for (let i = 0; i < v1.length; i++) {
            total += Math.pow(v2[i] - v1[i], 2)
        }
        return Math.sqrt(total)
    },
    manhattan: function (v1: [], v2: []) {
        let total = 0
        for (let i = 0; i < v1.length; i++) {
            total += Math.abs(v2[i] - v1[i])
        }
        return total
    },
    max: function (v1: [], v2: []) {
        let max = 0
        for (let i = 0; i < v1.length; i++) {
            max = Math.max(max, Math.abs(v2[i] - v1[i]))
        }
        return max
    },
}

function KMeans(centroids: []) {
    this.centroids = centroids || []
}

KMeans.prototype.randomCentroids = function (points: [][], k: number) {
    const centroids = points.slice(0) // copy  每次都取第0个？
    centroids.sort(function () {
        return Math.round(Math.random()) - 0.5 // 随机打乱
    })
    return centroids.slice(0, k)
}

KMeans.prototype.classify = function (point: [], distance: object) {
    let min = Infinity,
        index = 0

    distance = distance || 'euclidean'
    if (typeof distance == 'string') {
        distance = distances[distance]
    }

    // 找到和质心最小距离的点
    for (let i = 0; i < this.centroids.length; i++) {
        const dist = distance(point, this.centroids[i])
        if (dist < min) {
            min = dist
            index = i
        }
    }

    return index
}

KMeans.prototype.cluster = function (
    points,
    k,
    distance,
    snapshotPeriod,
    snapshotCb,
) {
    k = k || Math.max(2, Math.ceil(Math.sqrt(points.length / 2)))

    distance = distance || 'euclidean'
    if (typeof distance == 'string') {
        distance = distances[distance]
    }

    this.centroids = this.randomCentroids(points, k)

    const assignment = new Array(points.length)
    const clusters = new Array(k)

    let iterations = 0
    let movement = true
    while (movement) {
        // update point-to-centroid assignments
        for (let i = 0; i < points.length; i++) {
            // 每个点被分配到的集群的index
            assignment[i] = this.classify(points[i], distance)
        }

        // update location of each centroid
        movement = false
        for (let j = 0; j < k; j++) {
            const assigned = []
            for (let i = 0; i < assignment.length; i++) {
                if (assignment[i] == j) {
                    assigned.push(points[i])
                }
            }

            // 跳过集群j无点的情况
            if (!assigned.length) {
                continue
            }

            const centroid = this.centroids[j]
            const newCentroid = new Array(centroid.length)

            for (let g = 0; g < centroid.length; g++) {
                let sum = 0
                for (let i = 0; i < assigned.length; i++) {
                    sum += assigned[i][g]
                }
                newCentroid[g] = sum / assigned.length

                if (newCentroid[g] != centroid[g]) {
                    movement = true
                }
            }

            this.centroids[j] = newCentroid
            clusters[j] = assigned
        }

        if (snapshotCb && iterations++ % snapshotPeriod == 0) {
            snapshotCb(clusters)
        }
    }

    return clusters
}

KMeans.prototype.toJSON = function () {
    return JSON.stringify(this.centroids)
}

KMeans.prototype.fromJSON = function (json) {
    this.centroids = JSON.parse(json)
    return this
}

module.exports = KMeans

module.exports.kmeans = function (vectors, k) {
    return new KMeans().cluster(vectors, k)
}
