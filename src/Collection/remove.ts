import { CallbackFuncType } from '../_types'
import { isValidIndex } from '../hlp'
import { findIndexBy } from './finders'


export function removeBy<T>( arr: Array<T>, callback: CallbackFuncType<T, boolean> ): null | T {
  const ind = findIndexBy( arr, callback )
  if ( ind === -1 ) {
    return null
  }
  return arr.splice( ind, 1 )[ 0 ]
}

export function remove<T>( arr: Array<T>, index: number ): null | T {
  if ( !isValidIndex( index, arr.length ) ) {
    return null
  }
  return arr.splice( index, 1 )[ 0 ]
}


// export function removeRange<T>( arr: Array<T>, startIndex: number, endIndex: number ): number {
//   const len = arr.length
//   if (
//     ( startIndex >= endIndex ) ||
//     ( !isValidIndex( startIndex, len ) )
//   ) {
//     return 0
//   }
//
//   arr.splice( startIndex, endIndex - startIndex )
//   return len - 1 - startIndex
// }
