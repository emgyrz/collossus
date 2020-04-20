
export function shuffle<T>( arr: Array<T> ): void {
  for ( let i = arr.length - 1; i > 0; i-- ) {
    let j = Math.floor( Math.random() * ( i + 1 ) )

    let t = arr[ i ]
    arr[ i ] = arr[ j ]
    arr[ j ] = t
  }
}
