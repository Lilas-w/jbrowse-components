import { doesIntersect2, Feature, isContainedWithin} from '@jbrowse/core/util'
import { Mismatch } from '../MismatchParser'
import {
  getFoodieRange,
  getFoodieCluster1,
  getFoodieCluster2,
  getFoodieCluster3,
  getFoodieRangeOne,
  getFoodieClusterOne,
} from '../BamAdapter/FoodieMatchParser'
import { getTag } from '../util'

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

interface SortFeaturesResult {
  sortedFeatures: Map<string, Feature>
  featuresHasFoodie1Length?: number
  featuresHasFoodie2Length?: number
  featuresHasFoodie3Length?: number
  featuresHasNoFoodieLength?: number
}

export const sortFeature = (
  features: Map<string, Feature>,
  sortedBy: SortObject,
): SortFeaturesResult => {
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
    if (isContainedWithin(left, right, start, end)){
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
      // const foodieSortMap = new Map()
      // let min = Infinity
      // let max = 0
      // const featuresHasFoodie1: Feature[] = []
      // const featuresHasFoodie2: Feature[] = []
      // const featuresHasFoodie3: Feature[] = []
      // const featuresHasNoFoodie: Feature[] = []
      // const left1 = sortedBy.left1 as number
      // const left2 = sortedBy.left2 as number
      // const right1 = sortedBy.right1 as number
      // const right2 = sortedBy.right2 as number
      const probability1 = sortedBy.probability1 as number
      const probability2 = sortedBy.probability2 as number

      featuresCoverTwoTFs.forEach(feature => {
        const xg = getTag(feature, 'XG')
        if (xg === 'CT') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          // const foodieMatches: FoodieMatch[] = getFoodieMatches(
          //   mismatches,
          //   seq,
          //   xg,
          // )

          const [foodieRange1, foodieRange2] = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
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

          // // co-binding
          // if (flag1) {
          //   featuresHasFoodie1.push(feature)
          // } else {
          //   featuresHasNoFoodie.push(feature)
          // }

          // const baseArray: number[][] = []
          // for (let i = 0; i < foodieMatches.length; i += 1) {
          //   const foodieMatch = foodieMatches[i]
          //   // absolute position
          //   const fstart = start + foodieMatch.start
          //   if (i === 0) {
          //     min = fstart < min ? fstart : min
          //   }
          //   if (i === foodieMatches.length - 1) {
          //     max = fstart > max ? fstart : max
          //   }
          //   const fbase = foodieMatch.base
          //   if (fbase === 'T') {
          //     baseArray.push([fstart, foodieMatch.start, 1])
          //   } else {
          //     baseArray.push([fstart, foodieMatch.start, 0])
          //   }
          //   foodieSortMap.set(id, baseArray)
          // }
        } else if (xg === 'GA') {
          const start = feature.get('start')
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string

          const [foodieRange1, foodieRange2] = getFoodieRange(
            mismatches,
            start,
            seq,
            xg,
            left1,
            right1,
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
      // //co-binding
      // featuresInCenterLine = featuresHasFoodie1.concat(featuresHasNoFoodie)
      console.log('Total features Covered:' + featuresCoverTwoTFs.length)
      console.log('Cluster1-Cobind:' + featuresHasFoodie1.length)
      console.log('Cluster2-left:' + featuresHasFoodie2.length)
      console.log('Cluster3-right:' + featuresHasFoodie3.length)
      console.log('Cluster4-Nobind:' + featuresHasNoFoodie.length)
      console.log('Cluster5-NotCover:' + featuresNotCoverTwoTFs.length)
      console.log('Total features:' + featureArray.length)
      
      featuresInCenterLine = featuresHasFoodie1
        .concat(featuresHasFoodie2)
        .concat(featuresHasFoodie3)
        .concat(featuresHasNoFoodie)

      // const matrixLen = max - min + 1
      // const matrix: number[][] = []
      // const matrixKey = Array.from(foodieSortMap.keys())
      // for (let i = 0; i < matrixKey.length; i++) {
      //   const id = matrixKey[i]
      //   const baseArray = foodieSortMap.get(id)
      //   const matrixArr: number[] = []
      //   // 绝对位置填充0的矩阵（无法区分红T蓝C）
      //   for (let j = 0; j < matrixLen; j++) {
      //     if (baseArray.length > 0 && baseArray[0][1] === j) {
      //       matrixArr.push(baseArray[0][0])
      //       baseArray.shift()
      //     } else {
      //       matrixArr.push(0)
      //     }
      //   }
      //   matrix.push(matrixArr)
      // }

      // // ml-hclust.js
      // const { agnes } = require('ml-hclust');
      // const tree = agnes(matrix, {
      //   method: 'ward',
      // })
      // const indexArray = tree.indices();

      // // reorder featuresInCenterLine according to indexArray
      // const tempArray = []
      // for (let i = 0; i < featuresInCenterLine.length; i++) {
      //   tempArray.push(featuresInCenterLine[i])
      // }
      // featuresInCenterLine.length = 0
      // for (let i = 0; i < indexArray.length; i++) {
      //   featuresInCenterLine[indexArray[i]] = tempArray[i];
      // }

      break
    }

    case 'single TF':
      {
        const featuresHasFoodie1: Feature[] = []
        const featuresHasNoFoodie: Feature[] = []
        const left1 = sortedBy.left1 as number
        const right1 = sortedBy.right1 as number
        const probability1 = sortedBy.probability1 as number

        featuresInCenterLine.forEach(feature => {
          const xg = getTag(feature, 'XG')
          // 只看CT reads
          if (xg === 'CT') {
            const start = feature.get('start')
            const mismatches = feature.get('mismatches') as Mismatch[]
            const seq = feature.get('seq') as string

            const foodieRangeOne = getFoodieRangeOne(
              mismatches,
              start,
              seq,
              xg,
              left1,
              right1,
            )

            // single bind flag
            const flagOne = getFoodieClusterOne(
              xg,
              foodieRangeOne,
              probability1,
            )
            if (flagOne) {
              featuresHasFoodie1.push(feature)
            } else {
              featuresHasNoFoodie.push(feature)
            }
          } else if (xg === 'GA') {
            const start = feature.get('start')
            const mismatches = feature.get('mismatches') as Mismatch[]
            const seq = feature.get('seq') as string

            const foodieRangeOne = getFoodieRangeOne(
              mismatches,
              start,
              seq,
              xg,
              left1,
              right1,
            )

            // single bind flag
            const flagOne = getFoodieClusterOne(
              xg,
              foodieRangeOne,
              probability1,
            )
            if (flagOne) {
              featuresHasFoodie1.push(feature)
            } else {
              featuresHasNoFoodie.push(feature)
            }
          }
        })
        featuresInCenterLine = featuresHasFoodie1.concat(featuresHasNoFoodie)
      }
      break
  }

  // const sortedMap = new Map(
  //   [...featuresInCenterLine, ...featuresOutsideCenter].map(feature => [
  //     feature.id(),
  //     feature,
  //   ]),
  // )

  // return sortedMap

  const result: SortFeaturesResult = {
    sortedFeatures: new Map(
      [...featuresInCenterLine, ...featuresOutsideCenter].map(feature => [
        feature.id(),
        feature,
      ]),
    ),
  }

  if (sortedBy.type === 'co-binding TFs') {
    result.featuresHasFoodie1Length = featuresHasFoodie1.length
    result.featuresHasFoodie2Length = featuresHasFoodie2.length
    result.featuresHasFoodie3Length = featuresHasFoodie3.length
    result.featuresHasNoFoodieLength = featuresHasNoFoodie.length
  }
  
  return result;
}
