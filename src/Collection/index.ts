import { isArr, isValidIndex } from '../hlp'

import { CallbackFuncType, CompareFuncType } from '../_types'
import { findBy, findIndexBy, findIndexRightBy, findRightBy, has } from './finders'
import { push, pushUniq, pushUniqBy } from './push'
import { remove, removeBy } from './remove'
import { chunks } from './chunks'
import { shuffle } from './shuffle'

/**
 * Collection of elements with type `T` with many helpful methods
 * @typeParam T Type of elements that collection will be include
 */
export default class Collection<T> {

  // @ts-ignore
  // tslint:disable-next-line
  protected _list: Array<T>

  /**
   * Creates new collection
   *
   * ```typescript
   * const nums: Collection<number> = new Collection()
   * nums.push( 1 )
   *
   * const vegetables = new Collection( [ {
   *   name: 'potato',
   *   cost: 20
   * }, {
   *   name: 'squash',
   *   cost: 31
   * } ] )
   *
   * ```
   */
  constructor( initItems?: Array<T> ) {
    this._init( initItems )

  }

  protected _init( initItems?: Array<T> ) {
    this._list = []
    this.reset( isArr( initItems ) ? initItems : null )
  }

  /**
   * Items count
   *
   * ```typescript
   * const vec = new Collection( [ [], [] ] )
   * assert( vec.length === 2 )
   * vec.clear()
   * assert( vec.length === 0 )
   * ```
   */
  get length(): number {
    return this._list.length
  }

  /**
   * Returns `true` if the collection contains no elements
   *
   * ```typescript
   * const vec = new Collection( [ [], [] ] )
   * assert( !vec.isEmpty() )
   * vec.clear()
   * assert( vec.isEmpty() )
   * ```
   */
  isEmpty(): boolean {
    return this.length === 0
  }

  /**
   * Returns the first element of the collection, or `null` if it is empty
   *
   * ```typescript
   * const coll = new Collection( [ 'a', 'b', 'c' ] )
   * assert( coll.first() === 'a' )
   *
   * coll.clear()
   * assert( coll.first() === null )
   * ```
   */
  first(): null | T {
    if ( this.length === 0 ) { return null }
    return this._list[ 0 ]
  }


  /**
   * Returns the last element of the collection, or `null` if it is empty
   *
   * ```typescript
   * const coll = new Collection( [ 'a', 'b', 'c' ] )
   * assert( coll.last() === 'c' )
   *
   * coll.clear()
   * assert( coll.last() === null )
   * ```
   */
  last(): null | T {
    const lastInd = this.lastIndex()
    if ( lastInd === -1 ) { return null }
    return this._list[ lastInd ]
  }

  /**
   * Returns index of last element or `-1`
   *
   * ```typescript
   * const vec = new Collection()
   * assert( vec.lastIndex() === -1 )
   *
   * vec.push( [ 2, 3 ] )
   * assert( vec.lastIndex() === 1 )
   * assert( vec.lastIndex() === ( vec.length - 1 ) )
   * ```
   */
  lastIndex(): number {
    return this.length - 1
  }

  /**
   * Returns an element at the given position or `null`
   *
   * @param index - Index
   *
   *
   * ```typescript
   * const coll = new Collection( [ 'a', 'b', 'c' ] )
   * assert( coll.get( 2 ) === 'c' )
   * assert( coll.get( 12 ) === null )
   * ```
   */
  get( index: number ): null | T {
    if ( !isValidIndex( index, this.length ) ) {
      return null
    }
    return this._list[ index ]
  }


  /**
   * Replaces element at the given position with new element\
   * If `index` is out of current collection range returns `false`
   *
   * ```typescript
   * const coll = new Collection( [ 'a', 'b', 'c' ] )
   * coll.set( 0, 'x' )
   * assert( coll.first() === 'x' )
   * const isSetted = coll.set( 10, 'z' )
   * assert( !isSetted && coll.length === 3 )
   * ```
   *
   * @param index - Index
   */
  set( index: number, it: T ): boolean {
    if ( !isValidIndex( index, this.length ) ) {
      return false
    }
    this._list[ index ] = it
    return true
  }


  /**
   * Clears the collection, removing all values
   *
   * ```typescript
   * const vec = new Collection( [ 3, 2, 1 ] )
   * vec.clear()
   * assert( vec.isEmpty() )
   * ```
   */
  clear(): void {
    this._list.splice( 0, this.length )
  }

  /**
   * Resets all items in collection
   *  * If given data is `null` it will be the same as {@link clear}
   *  * If data is Array, these items replace exist items
   *
   * ```typescript
   * const vec = new Collection( [ 'a', 'b', 'c' ] )
   * vec.reset( [ 'x', 'y', 'z' ] )
   * assert( vec.last() === 'z' && vec.first() === 'x' )
   *
   * vec.reset( null )
   * assert( vec.isEmpty() )
   * ```
   */
  reset( data: null | Array<T> ): void {
    if ( isArr( data ) ) {
      this._list.splice( 0, this.length, ...data )
    } else {
      this.clear()
    }
  }

  /**
   * Returns reference to inner array of elements
   *
   * ```typescript
   * const vec = new Collection( [ 0, 9, 8 ] )
   * const inner = vec.getInnerRef()
   * assert( inner[ 2 ] === 8 )
   * vec.clear()
   * assert( inner[ 0 ] === undefined )
   * assert( inner === vec.getInnerRef() )
   * ```
   */
  getInnerRef(): Array<T> {
    return this._list
  }

  /**
   * Returns new array of existing elements, without deep copying
   *
   * ```typescript
   * const car = { id: 1, name: 'UAZ' }
   * const vec = new Collection()
   * vec.push( car )
   * const arr = vec.toArray()
   * assert( Array.isArray( arr ) )
   * assert( arr[ 0 ] === car )
   * ```
   */
  toArray(): Array<T> {
    return this._list.slice( 0 )
  }

  /**
   * Appends an element(s) to the back of a collection
   *
   * ```typescript
   * const vec = new Collection( [ 'd', 'e', 'w' ] )
   * assert( vec.last() === 'w' )
   * vec.push( 'a' )
   * assert( vec.last() === 'a' )
   * vec.push( [ 'x', 'y', 'z' ] )
   * assert( vec.length === 7 )
   * ```
   *
   * @param it - Element or array of elements to append
   */
  push( it: T | Array<T> ): void {
    push( this._list, it )
  }

  /**
   * Appends an element(s) to the back of a collection only if element is not exists in collection\
   * Uses simple strict comparison ( `itemA === itemB` ) for checking
   *
   * ```typescript
   * const nums = new Collection( [ 1, 2, 3 ] )
   * nums.pushUniq( [ 4, 3, 1, 5 ] ) // 3 and 1 will not be appended
   * assert( nums.length === 5 )
   *
   * const trees = new Collection( [ { name: 'spruce' }, { name: 'pine' } ] )
   * trees.pushUniq( [ { name: 'poplar' }, { name: 'spruce' } ] ) // all elements will be appended
   * assert( trees.length === 4 )
   * assert( trees.last().name === 'spruce' )
   * ```
   * @param it - Element or array of elements to append
   *
   */
  pushUniq( it: T | Array<T> ): void {
    pushUniq( this._list, it )
  }


  /**
   * Appends an element(s) to the back of a collection only if element is not exists in collection\
   * Uses given compare function to check existing. Comparator must return `boolean`\
   * If for some pair of elements (inner and given) compare function returns true, given element will not be added
   *
   * ```typescript
   * const nums = new Collection( [ 1, 2, 3 ] )
   *
   * nums.pushUniqBy(
   *   [ 4, 3, 1, 5 ],
   *   ( innerItem: number, externalItem: number ): boolean => innerItem === externalItem
   * )
   * // 3 and 1 will not be appended. For primitives this example is the same as `pushUniq`
   *
   * assert( nums.length === 5 )
   *
   * type Tree = { name: string }
   * const trees = new Collection<Tree>( [ { name: 'spruce' }, { name: 'pine' } ] )
   * trees.pushUniqBy( [ {
   *   name: 'poplar'
   * }, {
   *   name: 'spruce'
   * } ], ( itA: Tree, itB: Tree ): boolean => {
   *   return itA.name === itB.name
   * } )
   * // second spruce will not be added
   *
   * assert( trees.length === 3 )
   * assert( trees.last().name === 'poplar' )
   * ```
   * @param it - Element or array of elements to append
   * @param compare - Callback that will be compare given elements and existing in collection elements. Must return `boolean`
   *
   */
  pushUniqBy( it: T | Array<T>, compare: CompareFuncType<T> ): void {
    pushUniqBy( this._list, it, compare )
  }

  /**
   * Removes the last element from the collection and returns it.
   * Or return `null` if collection is empty
   *
   * ```typescript
   * const chars = new Collection( [ 'o', 'p', 'q' ] )
   * const last = chars.pop()
   * assert( last === 'q' )
   * assert( chars.length === 2 ) // [ 'o', 'p' ]
   * ```
   *
   */
  pop(): null | T {
    const last = this._list.pop()
    return last === undefined ? null : last
  }


  /**
   * Removes the first element from the collection and returns it.
   * Or return `null` if collection is empty
   *
   * ```typescript
   * const chars = new Collection( [ 'o', 'p', 'q' ] )
   * const first = chars.shift()
   * assert( first === 'o' )
   * assert( chars.length === 2 ) // [ 'p', 'q' ]
   * ```
   *
   */
  shift(): null | T {
    const first = this._list.shift()
    return first === undefined ? null : first
  }

  /**
   * Searches for an element that satisfies a predicate\
   * Takes a closure that returns `boolean`. It applies this closure to each element of the collection,
   * and if any of them return `true`, then `findBy()` returns element. If they all return `false`, it returns `null`
   *
   * ```typescript
   * const nums = new Collection( [ 1, 2, 3 ] )
   * const one = nums.find( ( n: number ): boolean => n === 1 )
   * assert( one === 1 )
   * const ten = nums.find( n => n === 10 )
   * assert( ten === null )
   *
   * type Tree = { name: string }
   * const trees = new Collection<Tree>( [ { name: 'spruce' }, { name: 'pine' }, { name: 'poplar' } ] )
   * const pine = trees.find( ( t: Tree ): boolean => t.name === 'pine' )
   * assert( pine && pine.name === 'pine' )
   * const pineAtTheEnd = trees.find( t => t.name === 'pine', 2 )
   * assert( pine === null )
   * ```
   *
   * @param predicate - Predicate
   * @param startIndex - The position where to start searching
   */
  findBy( predicate: CallbackFuncType<T, boolean>, startIndex?: number ): null | T {
    return findBy( this._list, predicate, startIndex )
  }


  /**
   * Searches for an index of element that satisfies a predicate\
   * Like {@link findBy} but returns index
   *
   *
   * ```typescript
   * const nums = new Collection( [ 1, 2, 3 ] )
   * const oneInd = nums.find( ( n: number ): boolean => n === 1 )
   * assert( oneInd === 0 )
   * const tenInd = nums.find( n => n === 10 )
   * assert( tenInd === -1 )
   *
   * const trees = new Collection<Tree>( [ { name: 'spruce' }, { name: 'poplar' } ] )
   * const poplarInd = trees.find( t => t.name === 'poplar' )
   * assert( poplarInd  === -1 )
   * ```
   *
   * @param predicate - Predicate
   * @param startIndex - The position where to start searching
   */
  findIndexBy( predicate: CallbackFuncType<T, boolean>, startIndex?: number ): number {
    return findIndexBy( this._list, predicate, startIndex )
  }

  /**
   * Searches for an element in the collection **from the right**, returning it or `null`\
   * See {@link findBy}
   *
   * ```typescript
   * const arrays = new Collection( [ [ 'a' ], [ 'b', 'c' ], [ 'd' ] ] )
   * const arrWithOneItem = arrays.rfindBy( a => a.length === 1 )
   * assert( arrWithOneItem[ 0 ] === 'd' )
   * ```
   *
   * @param predicate - Predicate
   * @param startIndex - The position where to start searching
   */
  rfindBy( predicate: CallbackFuncType<T, boolean>, startIndex?: number ): null | T {
    return findRightBy( this._list, predicate, startIndex )
  }

  /**
   * Searches for an element in the collection **from the right**, returning its index or `-1`\
   * See {@link findIndexBy}
   *
   * ```typescript
   * const arrays = new Collection( [ [ 'a' ], [ 'b', 'c' ], [ 'd' ] ] )
   * const arrWithOneItemIndex = arrays.rfindIndexBy( a => a.length === 1 )
   * assert( arrWithOneItemIndex === 2 )
   * ```
   *
   * @param predicate - Predicate
   * @param startIndex - The position where to start searching
   */
  rfindIndexBy( predicate: CallbackFuncType<T, boolean>, startIndex?: number ): number {
    return findIndexRightBy( this._list, predicate, startIndex )
  }

  /**
   * Returns `true` if the collection contains an element which is the same as the given value.
   * Uses strict comparison
   *
   * ```typescript
   * const vec = new Collection( [ 7, 8, 9 ] )
   * assert( vec.has( 8 ) )
   * assert( !vec.has( 10 ) )
   *
   * const car1 = { name: 'UAZ' }
   * const cars = new Collection( [ car1, { name: 'Toyota' }] )
   * assert( cars.has( { name: 'Toyota' } ) === false )
   * assert( cars.has( car1 ) === true )
   * ```
   *
   * @param it - Item which is searching for
   */
  has( it: T ): boolean {
    return has( this._list, it )
  }

  /**
   * Removes and returns the element at position index within the vector
   *
   * ```typescript
   * const vec: Collection<string>  = new Collection( [ 'x', 'y', 'z' ] )
   * const y = vec.remove( 1 )
   * assert( y === 'y' && vec.length === 2 )
   * const a = vec.remove( 5 )
   * assert( a === null && vec.length === 2 )
   * ```
   *
   * @param index - Index
   */
  remove( index: number ): null | T {
    return remove( this._list, index )
  }

  /**
   * Searches for an element that satisfies a predicate.
   * And if some is matches removes and returns it.
   * Stops after first found element
   *
   * ```typescript
   * const vec = new Collection( [ [ 'a' ], [ 'b', 'c' ], [ 'd' ] ] )
   * vec.removeBy( it => it.length === 2 ) // removes second array
   * assert( vec.length === 2 )
   *
   * const first = vec.removeBy( it => it.length === 1 ) // removes just first array
   * assert( first[ 0 ] === 'a' )
   * assert( vec.length === 1 )
   * ```
   *
   * @param predicate - Predicate
   */
  removeBy( predicate: CallbackFuncType<T, boolean> ): null | T {
    return removeBy( this._list, predicate )
  }

  // removeRange( startIndex: number, endIndex: number ): number {
  //   return removeRange( this._list, startIndex, endIndex )
  // }

  /**
   * Calls a closure on each element of an collection.
   *
   * ```typescript
   * interface Counter {
   *   count: number;
   *   increment(): void;
   * }
   *
   * const vec: Collection<Counter> = new Collection()
   * const c: Counter = {
   *   count: 0,
   *   increment: function() {
   *     this.count++
   *   }
   * }
   * vec.push( c )
   * vec.forEach( c => c.increment() )
   *
   * assert( vec.first().count === 1 )
   * ```
   *
   * @param closure - Callback which will be called on each element
   */
  forEach( closure: CallbackFuncType<T, void> ): void {
    // TODO: make own forEach
    this._list.forEach( closure )
  }

  // TODO:
  // some( callback: CallbackFuncType<T, boolean>, startIndex?: number ): boolean {
  //   return !isNull( this.findBy( callback, startIndex ) )
  // }

  reduce<A>( callback: ( acc: A, it: T ) => A, initValue: A ): A {
    return this._list.reduce( callback, initValue )
  }

  /**
   * Produces a new `Collection<R>` by calling given closure on each element of the original collection
   * and collecting return values of this closure
   *
   * ```typescript
   * const coll = new Collection<number>( [ 1, 2 ] )
   * const doubleStrColl = coll.map( ( n: number ): string => ( n * 2 ).toString() )
   *
   * assert( doubleStrColl.first() === '2' )
   * assert( doubleStrColl.last() === '4' )
   * ```
   *
   * @typeParam R - Return type of the callback and consequently type of items in generated collection
   * @param closure - Callback which will be called on each element
   */
  map<R>( closure: CallbackFuncType<T, R> ): Collection<R> {
    return new Collection( this.mapArr( closure ) )
  }

  /**
   * Produces a new `Array<R>` by calling given closure on each element of the original collection
   * and collecting return values of this closure
   * Like {@link map} but instead of returning Collection return Array
   *
   * ```typescript
   * const coll = new Collection<number>( [ 1, 2 ] )
   * const doubleStrArr = coll.mapArr( ( n: number ): string => ( n * 2 ).toString() )
   * assert( doubleStrArr[ 0 ] === '2' )
   * assert( doubleStrArr[ 1 ] === '4' )
   *
   * const towns = new Collection( [ { name: 'Sydney' }, { name: 'Baghdad' } ] )
   * const names = towns.mapArr( t => t.name )
   * assert( names.length === 2 && names[ 1 ] === 'Baghdad' )
   * ```
   *
   * @typeParam R - Return type of the callback and consequently type of items in generated array
   * @param closure - Callback which will be called on each element
   */
  mapArr<R>( closure: CallbackFuncType<T, R> ): Array<R> {
    // TODO: make own map
    return this._list.map( closure )
  }

  chunks( chunkSize: number ): Array<Array<T>> {
    return chunks( this._list, chunkSize )
  }

  /**
   * Swaps two elements in the collection
   * Returns false if `indexA` or `indexB` are out of bounds.
   *
   * ```typescript
   * const nums = new Collection( [ 1, 2, 3 ] )
   * nums.swap( 0, 2 )
   * assert( nums.first() === 3 && nums.last() === 1 )
   * const isSwapped = nums.swap( 0, 4 )
   * assert( isSwapped === false )
   * ```
   *
   * @param indexA - index of the first element
   * @param indexB - index of the second element
   */
  swap( indexA: number, indexB: number ): boolean {
    const len = this.length
    if ( !isValidIndex( indexA, len ) || !isValidIndex( indexB, len ) ) { return false }
    const list = this._list
    const tmp = list[ indexA ]
    list[ indexA ] = list[ indexB ]
    list[ indexB ] = tmp
    return true
  }

  /**
   * Shuffles the collection by using Fisher-Yates algorithm.
   *
   * ```typescript
   * const vec = new Collection( [ 1, 2, 3 ] )
   * vec.shuffle()
   * assert( true ) // who knows in what sequence these numbers are now
   * ```
   */
  shuffle(): void {
    shuffle( this._list )
  }

  /**
   * Returns json string of inner array of elements.
   * It is unlikely, but it is still possible that the `JSON.stringify` ends with an error,
   * in that case `toJSON` will return `null`
   *
   * ```typescript
   * const colors = new Collection( [ 'red', 'green' ] )
   * const json = colors.toJSON()
   * assert( json === "[\"red\",\"green\"]" )
   * ```
   */
  toJSON(): null | string {
    try {
      return JSON.stringify( this._list )
    } catch {
      return null
    }
  }


}

