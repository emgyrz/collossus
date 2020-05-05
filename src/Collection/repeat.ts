import { isUint } from "../hlp";


export function repeat<T>( arr: Array<T>, count: number ): Array<T> {
  const len = arr.length
  if ( !isUint( count ) ) return []

  const result = new Array( len * count )

  for ( let i = 0; i < len; i++ ) {
    for ( let k = 0; k < count; k++ ) {
      result[ i + len * k ] = arr[ i ]
    }
  }

  return result
}
