import { CallbackFuncType } from "../_types"


type ReturnType<T> = { passed: T[], removed: T[] }

export function filter<T>(
  arr: Array<T>,
  predicate: CallbackFuncType<T, boolean>, isForDrain: boolean ): ReturnType<T> {
  const passed = []
  const removed = []
  const len = arr.length
  const cb = isForDrain ? ( it: T, ind: number ): boolean => !predicate( it, ind ) : predicate
  for ( let i = 0; i < len; i++ ) {
    const it = arr[ i ]
    if ( cb( it, i ) ) {
      passed.push( it )
    } else {
      removed.push( it )
    }
  }
  return { passed, removed }
}
