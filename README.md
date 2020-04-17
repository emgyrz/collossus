# collossus

Collection ( or Array or Vector or List or etc.) of elements of the same type.

![npm](https://img.shields.io/npm/v/collossus)

Has everything that we are so lacking in JS `Array`s and a little more.\
It is strongly typed: written in TypeScript and has Flow declarations.


### Exports two main classes:
* `Collection` - Just a wrapper around the Array, adds methods that make life easier. [docs](https://emgyrz.github.io/collossus/classes/collection)
* `IdCollection` - Identified collection. This collection is inherited from the previous one. Designed to work with data that has an identifier (`id: number | string`). [docs](https://emgyrz.github.io/collossus/classes/idcollection)



### Example:
```typescript
import { Collection, IdCollection } from 'collossus'

type TreeType = {
  id: number,
  name: string,
}

const treesColl = new IdCollection<TreeType>()

treesColl.pushUniq( [ { id: 3, name: 'poplar' }, { id: 5, name: 'spruce' }, { id: 11, name: 'pine' } ] ) // adds only unique elements

const furnitureToMake: Collection<string> = new Collection( [ 'bed', 'couch' ] )

if ( furnitureToMake.has('couch') ) {
  const poplar = treesColl.findBy( tree => tree.name === 'poplar' ) // returns null or item

  if ( poplar !== null ) {
    SomeWhere.makeFurniture( 'couch', poplar ).then(() => {
      treesColl.removeById( poplar.id ) // remove item from collection just by id

      const ind = furnitureToMake.rfindIndexBy( it => it === 'couch' ) // searched from right
      if( ind !== -1 ) {
        furnitureToMake.remove( ind ) // removes element at given position
      }

    } )
  }
}



if (
  furnitureToMake.isEmpty() // it`s clear
) {
  const remainingTrees = treesColl.toArray() // shallow copy of collection elements
  SomeWhere.sellTrees( remainingTrees )
  treesColl.clear() // removes all

} else {
  const furn = furnitureToMake.first() // first item
  const tree = treesColl.last() // last item. Your Captain Obvious
  if ( tree === null || furn === null ) throw 'nothing to do'
  SomeWhere.makeFurniture( furn, tree ).then( () => {
    if( furn === 'bed') {
      SomeWhere.goToSleep()
    }
  })
}
```

### `Collection` methods

* [chunks](https://emgyrz.github.io/collossus/classes/collection.html#chunks) - `( chunkSize: number ) => Array<Array<T>>`
* [clear](https://emgyrz.github.io/collossus/classes/collection.html#clear) - `() => void`
* [findBy](https://emgyrz.github.io/collossus/classes/collection.html#findby) - `( predicate: CallbackFuncType<T, boolean>, startIndex?: number ) => null | T`
* [findIndexBy](https://emgyrz.github.io/collossus/classes/collection.html#findindexby) - `( predicate: CallbackFuncType<T, boolean>, startIndex?: number ) => number`
* [first](https://emgyrz.github.io/collossus/classes/collection.html#first) - `() => null | T`
* [forEach](https://emgyrz.github.io/collossus/classes/collection.html#foreach) - `( closure: CallbackFuncType<T, void> ) => void`
* [get](https://emgyrz.github.io/collossus/classes/collection.html#get) - `( index: number ) => null | T`
* [getInnerRef](https://emgyrz.github.io/collossus/classes/collection.html#getinnerref) - `() => Array<T>`
* [has](https://emgyrz.github.io/collossus/classes/collection.html#has) - `( it: T ) => boolean`
* [isEmpty](https://emgyrz.github.io/collossus/classes/collection.html#isempty) - `() => boolean`
* [last](https://emgyrz.github.io/collossus/classes/collection.html#last) - `() => null | T`
* [lastIndex](https://emgyrz.github.io/collossus/classes/collection.html#lastindex) - `() => number`
* [map](https://emgyrz.github.io/collossus/classes/collection.html#map) - `<R>( closure: CallbackFuncType<T, R> ) => Collection<R>`
* [mapArr](https://emgyrz.github.io/collossus/classes/collection.html#maparr) - `<R>( closure: CallbackFuncType<T, R> ) => Array<R>`
* [push](https://emgyrz.github.io/collossus/classes/collection.html#push) - `( it: T | Array<T> ) => void`
* [pushUniq](https://emgyrz.github.io/collossus/classes/collection.html#pushuniq) - `( it: T | Array<T> ) => void`
* [pushUniqBy](https://emgyrz.github.io/collossus/classes/collection.html#pushuniqby) - `( it: T | Array<T>, compare: CompareFuncType<T> ) => void`
* [reduce](https://emgyrz.github.io/collossus/classes/collection.html#reduce) - `<A>( callback: ( acc: A, it: T ) => A, initValue: A ) => A`
* [remove](https://emgyrz.github.io/collossus/classes/collection.html#remove) - `( index: number ) => null | T`
* [removeBy](https://emgyrz.github.io/collossus/classes/collection.html#removeby) - `( predicate: CallbackFuncType<T, boolean> ) => null | T`
* [reset](https://emgyrz.github.io/collossus/classes/collection.html#reset) - `( data: null | Array<T> ) => void`
* [rfindBy](https://emgyrz.github.io/collossus/classes/collection.html#rfindby) - `( predicate: CallbackFuncType<T, boolean>, startIndex?: number ) => null | T`
* [rfindIndexBy](https://emgyrz.github.io/collossus/classes/collection.html#rfindindexby) - `( predicate: CallbackFuncType<T, boolean>, startIndex?: number ) => number`
* [set](https://emgyrz.github.io/collossus/classes/collection.html#set) - `( index: number, it: T ) => boolean`
* [swap](https://emgyrz.github.io/collossus/classes/collection.html#swap) - `( indexA: number, indexB: number ) => boolean`
* [toArray](https://emgyrz.github.io/collossus/classes/collection.html#toarray) - `() => Array<T>`


### `IdCollection` methods

* [findById](https://emgyrz.github.io/collossus/classes/idcollection.html#findbyid) - `( id: IdOf<T> ) => null | T`
* [findIndexById](https://emgyrz.github.io/collossus/classes/idcollection.html#findindexbyid) - `( id: IdOf<T> ) => number`
* [hasById](https://emgyrz.github.io/collossus/classes/idcollection.html#hasbyid) - `( id: IdOf<T> ) => boolean`
* [pushUniqById](https://emgyrz.github.io/collossus/classes/idcollection.html#pushuniqbyid) - `( it: Array<T> | T ) => void`
* [removeById](https://emgyrz.github.io/collossus/classes/idcollection.html#removebyid) - `( id: IdOf<T> ) => null | T`



### License

This module is [MIT licensed](./LICENSE).


##### Enjoy using!
