// import { IHasId } from './_types'

const toStr = Object.prototype.toString
const numStrType = '[object Number]'

export function isArr<T>( arr: any ): arr is Array<T> {
  return Array.isArray( arr )
}

export function isNull( some: any ): some is null {
  return some === null
}


export function isNum( some: any ): some is number {
  return toStr.call( some ) === numStrType && isFinite( some )
}

export function isUint( some: any ): some is number {
  return isNum( some ) && some >= 0 && ( some % 1 === 0 )
}

export function castArr<T>( maybeArr?: null | Array<T> ): Array<T> {
  return isArr( maybeArr ) ? maybeArr : []
}

export function castNum( some: any, defVal?: number ): number {
  if ( typeof some === 'number' ) {
    return some
  }
  return typeof defVal === 'number' ? defVal : 0
}


export function isValidIndex( ind: number, len: number ): boolean {
  return isUint( ind ) && ( ind < len )
}

export function defaultCompareFn<T>( itA: T, itB: T ): boolean {
  return itA === itB
}
