import { doesIntersect2, Feature, isContainedWithin } from '@jbrowse/core/util'
import { Mismatch } from '../MismatchParser'
import {
  getFoodieRange,
  getFoodieCluster1,
  getFoodieCluster2,
  getFoodieCluster3,
  getFoodieSingleCluster,
  toPercentage,
} from '../BamAdapter/FoodieMatchAdapter'
import { getTag } from '../util'
import BamSlightlyLazyFeature from '../BamAdapter/BamSlightlyLazyFeature'
import CramSlightlyLazyFeature from '../CramAdapter/CramSlightlyLazyFeature'

interface SortObject {
  pos: number
  type: string
  tag?: string
  left1?: number
  right1?: number
  left2?: number
  right2?: number
  probability1?: number
  probability2?: number
}

export interface ClusterInfo {
  cluster_type: string
  cluster_size: number
  total_reads: number
  percentage: string
}

async function postDataToServer(data: {}) {
  try {
    const response = await fetch('http://localhost:3000/clusters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include', // Include cookies in the request
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const resData = await response.json();
    console.log('Data stored on the server:', resData);
  } catch (error) {
    console.error('Error storing data on the server:', error);
  }
}

export const sortFeature = (
  features: Map<string, Feature>, 
  sortedBy: SortObject,
) => {
  const featureArray = Array.from(features.values())
  let featuresInCenterLine: Feature[] = []
  const featuresOutsideCenter: Feature[] = []
  const featuresHasFoodie1: Feature[] = []
  const featuresHasFoodie2: Feature[] = []
  const featuresHasFoodie3: Feature[] = []
  const featuresHasNoFoodie: Feature[] = []
  const { pos, type } = sortedBy // pos是center line的位置坐标
  const featuresCoverTwoTFs: Feature[] = []
  const featuresNotCoverTwoTFs: Feature[] = []
  const left1 = sortedBy.left1 as number
  const left2 = sortedBy.left2 as number
  const right1 = sortedBy.right1 as number
  const right2 = sortedBy.right2 as number

  // only sort on features that intersect center line, append those outside post-sort
  featureArray.forEach(innerArray => {
    const feature = innerArray
    const start = feature.get('start')
    const end = feature.get('end')
    if (doesIntersect2(pos - 1, pos, start, end)) {
      featuresInCenterLine.push(innerArray)
    } else {
      featuresOutsideCenter.push(innerArray)
    }
  })

  // only sort on features that cover two TFs
  featureArray.forEach(innerArray => {
    const feature = innerArray
    const start = feature.get('start')
    const end = feature.get('end')
    const left = left1 < left2 ? left1 : left2
    const right = right1 > right2 ? right1 : right2
    if (isContainedWithin(left, right, start, end)) {
      featuresCoverTwoTFs.push(innerArray)
    } else {
      featuresNotCoverTwoTFs.push(innerArray)
    }
  })

  const isCram = featureArray.length ? featureArray[0].get('tags') : false
  switch (type) {
    case 'Start location': {
      featuresInCenterLine.sort((a, b) => a.get('start') - b.get('start'))
      break
    }

    case 'tag': {
      const tag = sortedBy.tag as string
      const getTag = (f: Feature, t: string) => {
        return isCram ? f.get('tags')[t] : f.get(t)
      }
      const isString =
        featuresInCenterLine[0] &&
        typeof getTag(featuresInCenterLine[0], tag) === 'string'
      if (isString) {
        featuresInCenterLine.sort((a, b) =>
          getTag(b, tag).localeCompare(getTag(a, tag)),
        )
      } else {
        featuresInCenterLine.sort(
          (a, b) => (getTag(b, tag) || 0) - (getTag(a, tag) || 0),
        )
      }
      break
    }

    // first sort all mismatches, then all reference bases at the end
    case 'Base pair': {
      const baseSortArray: [string, Mismatch][] = []
      featuresInCenterLine.forEach(feature => {
        const mismatches: Mismatch[] = feature.get('mismatches')
        mismatches.forEach(mismatch => {
          const start = feature.get('start')
          const offset = start + mismatch.start + 1
          const consuming =
            mismatch.type === 'insertion' || mismatch.type === 'softclip'
          const len = consuming ? 0 : mismatch.length
          if (pos >= offset && pos < offset + len) {
            baseSortArray.push([feature.id(), mismatch])
          }
        })
      })

      const baseMap = new Map(baseSortArray)
      featuresInCenterLine.sort((a, b) => {
        const aMismatch = baseMap.get(a.id())
        const bMismatch = baseMap.get(b.id())
        const acode = bMismatch && bMismatch.base.toUpperCase()
        const bcode = aMismatch && aMismatch.base.toUpperCase()
        if (acode === bcode && acode === '*') {
          // @ts-expect-error
          return aMismatch.length - bMismatch.length
        }
        return (
          (acode ? acode.charCodeAt(0) : 0) - (bcode ? bcode.charCodeAt(0) : 0)
        )
      })
      break
    }

    // sorts positive strands then negative strands
    case 'Read strand': {
      featuresInCenterLine.sort((a, b) =>
        a.get('strand') <= b.get('strand') ? 1 : -1,
      )
      break
    }

    case 'co-binding TFs': {
      const probability1 = sortedBy.probability1 as number
      const probability2 = sortedBy.probability2 as number

      featuresCoverTwoTFs.forEach(feature => {
        const xg = getTag(feature, 'XG')
        if (xg === 'CT') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          const foodieRange1 = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
          )
          const foodieRange2 = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left2,
            right2,
          )
          const flag1 = getFoodieCluster1(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )
          const flag2 = getFoodieCluster2(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )
          const flag3 = getFoodieCluster3(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )

          // 4 clusters
          if (flag1) {
            featuresHasFoodie1.push(feature)
          } else if (flag2) {
            featuresHasFoodie2.push(feature)
          } else if (flag3) {
            featuresHasFoodie3.push(feature)
          } else {
            featuresHasNoFoodie.push(feature)
          }
        } else if (xg === 'GA') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          const foodieRange1 = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
          )
          const foodieRange2 = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left2,
            right2,
          )
          const flag1 = getFoodieCluster1(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )
          const flag2 = getFoodieCluster2(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )
          const flag3 = getFoodieCluster3(
            xg,
            foodieRange1,
            foodieRange2,
            probability1,
            probability2,
          )

          // 4 clusters
          if (flag1) {
            featuresHasFoodie1.push(feature)
          } else if (flag2) {
            featuresHasFoodie2.push(feature)
          } else if (flag3) {
            featuresHasFoodie3.push(feature)
          } else {
            featuresHasNoFoodie.push(feature)
          }
        }
      })

      featuresInCenterLine = featuresHasFoodie1
        .concat(featuresHasFoodie2)
        .concat(featuresHasFoodie3)
        .concat(featuresHasNoFoodie)

      const total = featuresInCenterLine.length
      const len1 = featuresHasFoodie1.length
      const len2 = featuresHasFoodie2.length
      const len3 = featuresHasFoodie3.length
      const len4 = featuresHasNoFoodie.length
      const percent1 = toPercentage(len1, total)
      const percent2 = toPercentage(len2, total)
      const percent3 = toPercentage(len3, total)
      const percent4 = toPercentage(len4, total)

      const cluster1Info: ClusterInfo = {
        cluster_type: 'R11',
        cluster_size: len1,
        total_reads: total,
        percentage: percent1,
      }

      const cluster2Info: ClusterInfo = {
        cluster_type: 'R10',
        cluster_size: len2,
        total_reads: total,
        percentage: percent2,
      }

      const cluster3Info: ClusterInfo = {
        cluster_type: 'R01',
        cluster_size: len3,
        total_reads: total,
        percentage: percent3,
      }

      const cluster4Info: ClusterInfo = {
        cluster_type: 'R00',
        cluster_size: len4,
        total_reads: total,
        percentage: percent4,
      }

      const clustersData = [
        { name: 'R11', percentage: percent1 },
        { name: 'R10', percentage: percent2 },
        { name: 'R01', percentage: percent3 },
        { name: 'R00', percentage: percent4 },
      ]

      postDataToServer(clustersData)
        .then(() => {
          // Success
          console.log('Data stored successfully')
        })
        .catch(error => {
          // Error
          console.error('Error storing data:', error)
        })

      featuresHasFoodie1.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster1Info
        }
      })

      featuresHasFoodie2.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster2Info
        }
      })

      featuresHasFoodie3.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster3Info
        }
      })

      featuresHasNoFoodie.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster4Info
        }
      })

      break
    }

    case 'single TF': {
      const featuresHasFoodie1: Feature[] = []
      const featuresHasNoFoodie: Feature[] = []
      const left1 = sortedBy.left1 as number
      const right1 = sortedBy.right1 as number
      const probability1 = sortedBy.probability1 as number

      featuresInCenterLine.forEach(feature => {
        const xg = getTag(feature, 'XG')
        if (xg === 'CT') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          const foodieRangeOne = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
          )

          // single bind flag
          const flag = getFoodieSingleCluster(xg, foodieRangeOne, probability1)
          if (flag) {
            featuresHasFoodie1.push(feature)
          } else {
            featuresHasNoFoodie.push(feature)
          }
        } else if (xg === 'GA') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          const foodieRange = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
          )

          // single bind flag
          const flag = getFoodieSingleCluster(xg, foodieRange, probability1)
          if (flag) {
            featuresHasFoodie1.push(feature)
          } else {
            featuresHasNoFoodie.push(feature)
          }
        }
      })
      featuresInCenterLine = featuresHasFoodie1.concat(featuresHasNoFoodie)
      const total = featuresInCenterLine.length
      const len1 = featuresHasFoodie1.length
      const len2 = featuresHasNoFoodie.length
      const percent1 = toPercentage(len1, total)
      const percent2 = toPercentage(len2, total)

      const clustersData = [
        { name: 'R1', percentage: percent1 },
        { name: 'R0', percentage: percent2 },
      ]

      postDataToServer(clustersData)
        .then(() => {
          // Success
          console.log('Data stored successfully')
        })
        .catch(error => {
          // Error
          console.error('Error storing data:', error)
        })

      const cluster1Info: ClusterInfo = {
        cluster_type: 'R1',
        cluster_size: len1,
        total_reads: total,
        percentage: percent1,
      }

      const cluster2Info: ClusterInfo = {
        cluster_type: 'R0',
        cluster_size: len2,
        total_reads: total,
        percentage: percent2,
      }

      featuresHasFoodie1.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster1Info
        }
      })

      featuresHasNoFoodie.forEach(feature => {
        if (
          feature instanceof BamSlightlyLazyFeature ||
          feature instanceof CramSlightlyLazyFeature
        ) {
          feature['cluster_info'] = cluster2Info
        }
      })

      break
    }
  }
  const sortedMap = new Map(
    [...featuresInCenterLine, ...featuresOutsideCenter].map(feature => [
      feature.id(),
      feature,
    ]),
  )
  return sortedMap
}
