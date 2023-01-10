import { Feature } from '@jbrowse/core/util/simpleFeature'
import { doesIntersect2 } from '@jbrowse/core/util/range'
import { Mismatch } from '../BamAdapter/MismatchParser'
import { FoodieMatch, getFoodieMatches } from '../BamAdapter/FoodieMatchParser'
import { getTag } from '../util'

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
          // const name = feature.get('name')
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
            if (fbase === 'T') {
              baseArray.push([fstart, 1])
            } else {
              baseArray.push([fstart, 0])
            }
            foodieSortMap.set(id, baseArray)
          }
        }
      })
      const matrixLen = max - min + 1
      console.log(foodieSortMap);
      // create a matrix

    }
  }

  const sortedMap = new Map(
    featuresInCenterLine
      .concat(featuresOutsideCenter)
      .map(feature => [feature.id(), feature]),
  )

  return sortedMap
}
