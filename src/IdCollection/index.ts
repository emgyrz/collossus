import Collection from '../Collection'
import { isNull } from '../hlp'
import { defaultIdCompareFn, genDefaultIdPredicate } from './utils'

import { IdOf, IHasId } from '../_types'

/**
 * Identified collection for elements with ID.
 * Extends from `Collection` and has some methods to simplify working with items that have an ID
 *
 */
export default class IdCollection<T extends IHasId> extends Collection<T> {

  /**
   * Search item by ID and returns it, otherwise returns null
   *
   * ```typescript
   * const coll = new IdCollection( [
   *    { id: 30, name: 'Wassa' },
   *    { id: 50, name: 'Sawwa' }
   * ] )
   *
   * const sawwa = coll.findById( 50 )
   * assert( sawwa !== null && sawwa.name === 'Sawwa' )
   *
   * const nobody = coll.findById( 333 )
   * assert( nobody === null )
   * ```
   *
   * @param id - Item identifier
   */
  findById( id: IdOf<T> ): null | T {
    return this.findBy( genDefaultIdPredicate( id ) )
  }


  /**
   * Search item by ID and returns its index or -1
   *
   * ```typescript
   * const coll = new IdCollection( [
   *    { id: 30, name: 'Wassa' },
   *    { id: 50, name: 'Sawwa' }
   * ] )
   *
   * const sawwaInd = coll.findIndexById( 50 )
   * assert( sawwaInd === 1 )
   *
   * const nobodyInd = coll.findIndexById( 333 )
   * assert( nobodyInd === -1 )
   * ```
   *
   * @param id - Item identifier
   */
  findIndexById( id: IdOf<T> ): number {
    return this.findIndexBy( genDefaultIdPredicate( id ) )
  }

  /**
   * Removes and returns the element with given ID\
   * Returns `null` if element is not exists
   *
   * ```typescript
   * type Furniture = { id: number, type: string }
   * const furniture = new IdCollection<Furniture>()
   * furniture.push( [ { id: 32, type: 'couch' }, { id: 13, type: 'bed' } ] )
   *
   * const removedSofa = furniture.removeById( 32 )
   * assert( removedSofa.type === 'couch' )
   * assert( furniture.length === 1 )
   *
   * const table = furniture.removeById( 333 )
   * assert( table === null )
   * ```
   *
   * @param id - Item identifier
   */
  removeById( id: IdOf<T> ): null | T {
    return this.removeBy( genDefaultIdPredicate( id ) )
  }

  /**
   * Returns true if element with given ID exists in collection\
   * Similar to `collection.findById( id ) !== null
   *
   * ```typescript
   * type Furniture = { id: number, type: string }
   * const furniture = new IdCollection<Furniture>()
   * furniture.push( [ { id: 32, type: 'couch' }, { id: 13, type: 'bed' } ] )
   *
   * assert( furniture.hasById( 32 ) )
   * assert( !furniture.hasById( 99 ) )
   * ```
   *
   * @param id - Item identifier
   */
  hasById( id: IdOf<T> ): boolean {
    return !isNull( this.findById( id ) )
  }


  /**
   * Appends an element(s) to the back of a collection only if elements collection has no same id(s)\
   * Uses given compare function to check existing. Comparator must return `boolean`\
   *
   * ```typescript
   * type Tree = { id: number, name: string }
   * const trees = new Collection<Tree>( [ { id: 5, name: 'spruce' }, { id: 7, name: 'pine' } ] )
   *
   * trees.pushUniqById( { id: 5, name: 'spruce' } ) // will not be added
   * assert( trees.length === 2 )
   *
   * trees.pushUniqById( { id: 9, name: 'poplar' } ) // will be added
   *
   * assert( trees.length === 3 )
   * assert( trees.last().name === 'poplar' )
   * ```
   * @param it - Element or array of elements to append
   */
  pushUniqById( it: Array<T> | T ): void {
    this.pushUniqBy( it, defaultIdCompareFn )
  }

}
