import {
  BaseFeatureDataAdapter,
  BaseOptions,
} from '@jbrowse/core/data_adapters/BaseAdapter'
import { AugmentedRegion as Region } from '@jbrowse/core/util/types'
import { ObservableCreate } from '@jbrowse/core/util/rxjs'
import { SimpleFeature, Feature } from '@jbrowse/core/util'
import { merge } from 'rxjs'
import { map } from 'rxjs/operators'

interface WiggleOptions extends BaseOptions {
  resolution?: number
}

function getFilename(uri: string) {
  const filename = uri.slice(uri.lastIndexOf('/') + 1)
  return filename.slice(0, filename.lastIndexOf('.'))
}

interface AdapterEntry {
  dataAdapter: BaseFeatureDataAdapter
  [key: string]: unknown
}

export default class MultiWiggleAdapter extends BaseFeatureDataAdapter {
  public static capabilities = [
    'hasResolution',
    'hasLocalStats',
    'hasGlobalStats',
  ]

  public async getAdapters(): Promise<AdapterEntry[]> {
    const getSubAdapter = this.getSubAdapter
    if (!getSubAdapter) {
      throw new Error('no getSubAdapter available')
    }
    let subConfs = this.getConf('subadapters')
    if (!subConfs?.length) {
      const entries = this.getConf('bigWigs') as string[]
      subConfs = entries.map(entry => ({
        type: 'BigWigAdapter',
        source: getFilename(entry),
        bigWigLocation: {
          uri: entry,
        },
      }))
    }

    return Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subConfs.map(async (conf: any) => {
        const dataAdapter = (await getSubAdapter(conf))
          .dataAdapter as BaseFeatureDataAdapter
        return {
          source: dataAdapter.id,
          ...conf,
          dataAdapter,
        }
      }),
    )
  }

  // note: can't really have dis-agreeing refNames
  public async getRefNames(opts?: BaseOptions) {
    const adapters = await this.getAdapters()
    return adapters[0].dataAdapter.getRefNames(opts)
  }

  public async getGlobalStats(opts?: BaseOptions) {
    const adapters = await this.getAdapters()
    const stats = (
      await Promise.all(
        // @ts-ignore
        adapters.map(adp => adp.dataAdapter.getGlobalStats?.(opts)),
      )
    ).filter(f => !!f)
    const scoreMin = Math.min(...stats.map(s => s.scoreMin))
    const scoreMax = Math.max(...stats.map(s => s.scoreMax))
    return { scoreMin, scoreMax }
  }

  public getFeatures(region: Region, opts: WiggleOptions = {}) {
    return ObservableCreate<Feature>(async observer => {
      const adapters = await this.getAdapters()
      merge(
        ...adapters.map(adp =>
          adp.dataAdapter.getFeatures(region, opts).pipe(
            map(p =>
              // add source field if it does not exist
              p.get('source')
                ? p
                : new SimpleFeature({
                    ...p.toJSON(),
                    uniqueId: adp.source + '-' + p.id(),
                    source: adp.source,
                  }),
            ),
          ),
        ),
      ).subscribe(observer)
    }, opts.signal)
  }

  // always render bigwig instead of calculating a feature density for it
  async estimateRegionsStats(_regions: Region[]) {
    return { featureDensity: 0 }
  }

  // in another adapter type, this could be dynamic depending on region or
  // something, but it is static for this particular multi-wiggle adapter type
  async getSources() {
    const adapters = await this.getAdapters()
    return adapters.map(({ dataAdapter, source, ...rest }) => ({
      name: source,
      ...rest,
    }))
  }

  public freeResources(): void {}
}