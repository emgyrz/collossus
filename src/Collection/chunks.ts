export function chunks<T>( arr: Array<T>, chunkSize: number ): Array<Array<T>> {
  if ( chunkSize < 1 ) {
    return []
  }
  const len = arr.length
  const result = []
  let nextChunk = []

  for ( let i = 0; i < len; i++ ) {
    nextChunk.push( arr[ i ] )
    if ( nextChunk.length === chunkSize ) {
      result.push( nextChunk )
      nextChunk = []
    }
  }

  if ( nextChunk.length !== 0 ) {
    result.push( nextChunk )
  }

  return result
}


export function* chunksIter<T>( arr: Array<T>, chunkSize: number ): Generator<Array<T>, void> {
  if ( chunkSize < 1 ) {
    return undefined
  }
  const len = arr.length
  let pointer = 0

  while ( pointer < len ) {
    const pointerEnd = pointer + chunkSize
    const nextChunk = arr.slice( pointer, pointerEnd )
    pointer = pointerEnd
    yield nextChunk
  }

  return undefined
}
