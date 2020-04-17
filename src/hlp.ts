import { IHasId } from './_types'

export function isArr<T>( arr: any ): arr is Array<T> {
  return Array.isArray( arr )
}

export function isNull( some: any ): some is null {
  return some === null
}

export function isNum( some: any ): some is number {
  return typeof some === 'number'
}


export function castArr<T>( maybeArr?: Array<T> ): Array<T> {
  return isArr( maybeArr ) ? maybeArr : []
}

export function castNum( some: any, defVal?: number ): number {
  if ( typeof some === 'number' ) {
    return some
  }
  return typeof defVal === 'number' ? defVal : 0
}


export function isValidIndex( ind: number, len: number ): boolean {
  return ind >= 0 && ( ind < len )
}

export function defaultCompareFn<T>( itA: T, itB: T ): boolean {
  return itA === itB
}
