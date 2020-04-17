import { isArr, isNull } from '../hlp'
import { CompareFuncType } from '../_types'
import { findBy, has } from './finders'

export function push<T>( list: Array<T>, it: T | Array<T> ): void {
  if ( isArr( it ) ) {
    list.push( ...it )
  } else {
    list.push( it )
  }
}


export function pushUniq<T>( list: Array<T>, it: T | Array<T> ): void {
  if ( isArr( it ) ) {
    it.forEach( item => {
      if ( !has( list, item ) ) {
        list.push( item )
      }
    } )
  } else {
    if ( !has( list, it ) ) {
      list.push( it )
    }
  }
}


export function pushUniqBy<T>( list: Array<T>, it: T | Array<T>, compare: CompareFuncType<T> ): void {
  if ( isArr( it ) ) {
    it.forEach( item => {
      const found = findBy( list, itA => compare( itA, item ) )
      if ( isNull( found ) ) {
        list.push( item )
      }
    } )
  } else {
    if ( isNull( findBy( list, itA => compare( itA, it ) ) ) ) {
      list.push( it )
    }
  }
}
