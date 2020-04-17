const PRIMITIVES = [
  "[object Number]",
  "[object String]",
  "[object Symbol]",
  "[object Null]",
  "[object Undefined]",
]

const OBJ_TYPES = {
  object: "[object Object]",
  array: "[object Array]",
  map: "[object Map]",
  weakMap: "[object WeakMap]",
  set: "[object Set]",
  weakSet: "[object WeakSet]",
  function: "[object Function]",
}

const toString = Object.prototype.toString

function getType( some: any ): string {
  return toString.call( some )
}

function isPrimitive( type: string ): boolean {
  return PRIMITIVES.includes( type )
}


function _cloneArray<T>( arr: T[] ): T[] {
  const result = []
  const len = arr.length
  for ( let i = 0; i < len; i++ ) {
    result.push( cloneDeep( arr[ i ] ) )
  }
  return result
}


function _cloneObj<T, K extends keyof T>( obj: T ): T {
  // const result = {}
  // for ( let key in obj) {
  //   result[ key ] = cloneDeep( obj[ key ] )
  // }
  // const keys: K[] = Object.keys( obj )
  // const keysLen = keys.length
  // for ( let i = 0; i < keysLen; i++ ) {
  //   const k = keys[ i ]
  //   result[ k ] = cloneDeep( obj[ k ] )
  // }
  // return result
  return obj
}

export function cloneDeep<T>( it: T ): T {
  const type = getType( it )
  return it
}







