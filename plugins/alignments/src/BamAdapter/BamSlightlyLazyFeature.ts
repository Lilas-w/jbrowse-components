/* eslint-disable no-underscore-dangle */
import {
  Feature,
  SimpleFeatureSerialized,
} from '@jbrowse/core/util/simpleFeature'
import { BamRecord } from '@gmod/bam'

// locals
import { getClip, getMismatches } from '../MismatchParser'
import BamAdapter from './BamAdapter'

export interface ClusterInfo {
  cluster_type?: string;
  cluster_size?: number;
  total_reads?: number;
  percentage?: string;
}

export default class BamSlightlyLazyFeature implements Feature {
  // uses parameter properties to automatically create fields on the class
  // https://www.typescriptlang.org/docs/handbook/classes.html#parameter-properties
  cluster_info: ClusterInfo;

  constructor(
    private record: BamRecord,
    private adapter: BamAdapter,
    private ref?: string,
    cluster_info?: ClusterInfo
  ) {
    this.cluster_info = cluster_info || {}
  }

  _get_name() {
    return this.record.get('name')
  }

  _get_type(): string {
    return 'match'
  }

  _get_score(): number {
    return this.record.get('mq')
  }

  _get_cluster_type() {
    return this.cluster_info.cluster_type;
  }

  _get_cluster_size() {
    return this.cluster_info.cluster_size;
  }

  _get_percentage() {
    return this.cluster_info.percentage;
  }

  _get_total_reads() {
    return this.cluster_info.total_reads;
  }

  _get_flags(): string {
    return this.record.flags
  }

  _get_strand(): number {
    return this.record.isReverseComplemented() ? -1 : 1
  }

  _get_pair_orientation() {
    return this.record.isPaired() ? this.record.getPairOrientation() : undefined
  }

  _get_next_ref() {
    return this.record.isPaired()
      ? this.adapter.refIdToName(this.record._next_refid())
      : undefined
  }

  _get_next_pos() {
    return this.record.isPaired() ? this.record._next_pos() : undefined
  }

  _get_next_segment_position() {
    return this.record.isPaired()
      ? `${this.adapter.refIdToName(this.record._next_refid())}:${
          this.record._next_pos() + 1
        }`
      : undefined
  }

  _get_seq() {
    return this.record.getReadBases()
  }

  qualRaw() {
    return this.record.qualRaw()
  }

  set() {}

  tags() {
    const properties = Object.getOwnPropertyNames(
      BamSlightlyLazyFeature.prototype,
    )

    return [
      ...new Set(
        properties
          .filter(
            prop =>
              prop.startsWith('_get_') &&
              prop !== '_get_mismatches' &&
              prop !== '_get_tags',
          )
          .map(methodName => methodName.replace('_get_', ''))
          .concat(this.record._tags()),
      ),
    ]
  }

  id() {
    return `${this.adapter.id}-${this.record.id()}`
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(field: string): any {
    const methodName = `_get_${field}`
    // @ts-expect-error
    if (this[methodName]) {
      // @ts-expect-error
      return this[methodName]()
    }
    return this.record.get(field)
  }

  _get_refName() {
    return this.adapter.refIdToName(this.record.seq_id())
  }

  parent() {
    return undefined
  }

  children() {
    return undefined
  }

  pairedFeature() {
    return false
  }

  toJSON(): SimpleFeatureSerialized {
    return {
      ...Object.fromEntries(
        this.tags()
          .map(t => [t, this.get(t)])
          .filter(elt => elt[1] !== undefined),
      ),
      uniqueId: this.id(),
    }
  }

  _get_mismatches() {
    return getMismatches(
      this.get('CIGAR'),
      this.get('MD'),
      this.get('seq'),
      this.ref,
      this.qualRaw(),
    )
  }

  _get_clipPos() {
    const cigar = this.get('CIGAR') || ''
    return getClip(cigar, this.get('strand'))
  }
}
