import { Feature } from '@jbrowse/core/util/simpleFeature'
import { doesIntersect2 } from '@jbrowse/core/util/range'
import { Mismatch } from '../BamAdapter/MismatchParser'
import { FoodieMatch, getFoodieMatches } from '../BamAdapter/FoodieMatchParser'
import { getTag } from '../util'
import { kMeans } from '../PileupRenderer/foodieSort'
import { log } from 'console'

interface SortObject {
  pos: number
  type: string
  tag?: string
}

export const sortFeature = (
  features: Map<string, Feature>,
  sortedBy: SortObject,
) => {
  const featureArray = Array.from(features.values())
  const featuresInCenterLine: Feature[] = []
  const featuresOutsideCenter: Feature[] = []
  const { pos, type } = sortedBy // pos是center line的位置坐标

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
          // @ts-ignore
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

    case 'Foodie sort': {
      const foodieSortMap = new Map()
      let min = Infinity
      let max = 0
      featuresInCenterLine.forEach(feature => {
        const xg = getTag(feature, 'XG')
        // 只看CT reads
        if (xg === 'CT') {
          const start = feature.get('start')
          const id = feature.id()
          const mismatches = feature.get('mismatches') as Mismatch[]
          const seq = feature.get('seq') as string
          const foodieMatches: FoodieMatch[] = getFoodieMatches(
            mismatches,
            seq,
            xg,
          )
          const baseArray: number[][] = []
          for (let i = 0; i < foodieMatches.length; i += 1) {
            const foodieMatch = foodieMatches[i]
            const fstart = start + foodieMatch.start
            if (i === 0) {
              min = fstart < min ? fstart : min
            }
            if (i === foodieMatches.length - 1) {
              max = fstart > max ? fstart : max
            }
            const fbase = foodieMatch.base
            // if (fbase === 'T' || fbase === 'A') {
            //   baseArray.push([fstart, 1])
            // } else {
            //   baseArray.push([fstart, 0])
            // }
            // 只看C的1 0矩阵
            // if (fbase === 'T') {
            //   baseArray.push([foodieMatch.start, 1])
            // } else {
            //   baseArray.push([foodieMatch.start, 0])
            // }
            // 使用绝对位置和reads中最少的红base数量、最少的蓝base数量拼接的矩阵
            if (fbase === 'T') {
              baseArray.push([fstart, 1])
            } else {
              baseArray.push([fstart, 0])
            }
            foodieSortMap.set(id, baseArray)
          }
        }
      })
      // console.log('before:', featuresInCenterLine[100])

      // const matrixLen = max - min + 1
      const matrix: number[][] = []
      const matrixKey = Array.from(foodieSortMap.keys())
      let minCNum = Infinity
      let minTNum = Infinity
      for (let i = 0; i < matrixKey.length; i++) {
        const id = matrixKey[i]
        const baseArray = foodieSortMap.get(id)
        const matrixArr: number[] = []
        // for (let j = 0; j < matrixLen; j++) {
        //   if (baseArray.length > 0 && baseArray[0][0] === j) {
        //     matrixArr.push(baseArray[0][1])
        //     baseArray.shift()
        //   } else {
        //     matrixArr.push(-1)
        //   }
        // }
        // matrix.push(matrixArr)

        // 所有reads中每条含有的最小红色数量和最小蓝色数量
        let CNum = 0
        let TNum = 0
        for (let i = 0; i < baseArray.length; i++) {
          if (baseArray[i][1] === 0) {
            CNum += 1
          } else {
            TNum += 1
          }
        }
        if (minCNum > CNum) {
          minCNum = CNum
        }
        if (minTNum > TNum) {
          minTNum = TNum
        }
      }
      console.log(minCNum, minTNum);
      

      // // ml-hclust.js
      // const { agnes } = require('ml-hclust');
      // // // 将矩阵切片：宽度为two pairs / one pair进行测试
      // // const thinMatrix: number[][] = [];
      // // const position = pos - min;
      // // for (let i = 0; i < matrix.length; i++) {
      // //   thinMatrix.push([matrix[i][position + 1], matrix[i][position + 1]]);
      // // }
      // // console.log(thinMatrix);
      // const tree = agnes(matrix, {
      //   method: 'ward',
      // })
      // const indexArray = tree.indices();

      // let arr: [] = [];
      // 试用node-kmeans包
      // const kmeans = require('node-kmeans');
      // kmeans.clusterize(matrix, { k: 2 }, (err: any, res: any) => {
      //   if (err) {
      //     console.error(err);
      //   } else {
      //     // eslint-disable-next-line no-console
      //     arr = res[0].clusterInd.concat(res[1].clusterInd);
      //     console.log(res, arr);
      //   }
      // });

      // // cluster包，没有indexArray
      // const clusterfck = require('clusterfck')
      // // Calculate clusters.
      // const clusters = clusterfck.kmeans(matrix, 2);

      // skmeans包试用
      // const skmeans = require('skmeans')
      // const vectDistance = (a: number[], b: number[]): number => {
      //   let total = 0
      //   for (let i = 0; i < a.length; i++) {
      //     if (a[i] === b[i]) {
      //       total += 0
      //     } else {
      //       total += 1
      //     }
      //   }
      //   const res = total / a.length
      //   return res
      // }
      // const res = skmeans(matrix, 2, null, null, vectDistance)
      // console.log(res)

      // foodieSort试用
      // const result = kMeans(matrix, 4);
      // const indexArray = result[0][2];
      // console.log(result[0]);

      // reorder featuresInCenterLine according to indexArray
      const tempArray = []
      for (let i = 0; i < featuresInCenterLine.length; i++) {
        tempArray.push(featuresInCenterLine[i])
      }
      featuresInCenterLine.length = 0
      //   for (let i = 0; i < indexArray.length; i++) {
      //     featuresInCenterLine[indexArray[i]] = tempArray[i];
      //   }
    }
  }

  const sortedMap = new Map(
    featuresInCenterLine
      .concat(featuresOutsideCenter)
      .map(feature => [feature.id(), feature]),
  )

  return sortedMap
}
