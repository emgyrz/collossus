import { castNum, isNull, isValidIndex } from '../hlp'
import { CallbackFuncType } from '../_types'


function _findInArrBy<T>(
  arr: Array<T>,
  callback: CallbackFuncType<T, boolean>,
  startIndex?: number,
  needIndex?: boolean,
): null | T | number {
  const len = arr.length
  const start = castNum( startIndex )
  if ( !isValidIndex( start, len ) ) {
    return null
  }

  for ( let i = start; i < len; i++ ) {
    const it = arr[ i ]
    if ( callback( it, i ) ) {
      return needIndex === true ? i : it
    }
  }

  return needIndex === true ? -1 : null
}


function _findRightInArrBy<T>(
  arr: Array<T>,
  callback: CallbackFuncType<T, boolean>,
  startIndex?: number,
  needIndex?: boolean,
): null | T | number {
  const len = arr.length
  const start = castNum( startIndex, len - 1 )

  for ( let i = start; i >= 0; i-- ) {
    const it = arr[ i ]
    if ( callback( it, i ) ) {
      return needIndex === true ? i : it
    }
  }

  return needIndex === true ? -1 : null
}


export function findBy<T>( arr: Array<T>, callback: CallbackFuncType<T, boolean>, startIndex?: number ): null | T {
  // @ts-ignore
  return _findInArrBy( arr, callback, startIndex )
}

export function findIndexBy<T>( arr: Array<T>, callback: CallbackFuncType<T, boolean>, startIndex?: number ): number {
  // @ts-ignore
  return _findInArrBy( arr, callback, startIndex, true )
}


export function findRightBy<T>( arr: Array<T>, callback: CallbackFuncType<T, boolean>, startIndex?: number ): null | T {
  // @ts-ignore
  return _findRightInArrBy( arr, callback, startIndex )
}

export function findIndexRightBy<T>( arr: Array<T>, callback: CallbackFuncType<T, boolean>, startIndex?: number ): number {
  // @ts-ignore
  return _findRightInArrBy( arr, callback, startIndex, true )
}

export function has<T>( arr: Array<T>, it: T ): boolean {
  return !isNull( findBy( arr, item => item === it ) )
}
