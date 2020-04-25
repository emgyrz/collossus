# collossus

Collection of elements of the same type, has everything that we are so lacking in JS `Array`s and a little more.

[![npm](https://img.shields.io/npm/v/collossus)](https://www.npmjs.com/package/collossus)
[![docs](https://img.shields.io/badge/-docs-green)](https://emgyrz.github.io/collossus/)

### Benefits:
 - It is strongly typed: written in TypeScript and has Flow declarations
 - No more boilerplate code when working with arrays
 - Unbelievable helps when your data has identifiers
 - Ready to use with `MobX`. See [this block](#using-with-mobx).


### What it has
Exports two main classes:
* `Collection` - Just a wrapper around the Array, adds methods that make life easier. [docs](https://emgyrz.github.io/collossus/classes/collection)
* `IdCollection` - Identified collection. This collection is inherited from the previous one. Designed to work with data that has an id (`id: number | string`). [docs](https://emgyrz.github.io/collossus/classes/idcollection)





### Example:
##### Some of `Collection` class
```typescript
import { Collection } from 'collossus'

const names = new Collection( [ 'Max' ] ) // [ ' Max' ]
names.push( [ 'Yan', 'Li' ] ) // [ ' Max', 'Yan', 'Li' ]
names.last() // -> 'Li'
names.swap( 1, 2 ) // [ ' Max', 'Li', 'Yan' ]
names.pushUniq( 'Max' ) // [ ' Max', 'Li', 'Yan' ]
names.rfindIndexBy( n => n === 'Yan' ) // -> 2
names.clear() // []
```
##### Some of `IdCollection` class
```typescript
import { IdCollection } from 'collossus'

type User = { id: number, name: string }

const users = new IdCollection<User>( [ { id: 33, name: 'Max' } ] ) // [{ id: 33, name: 'Max' }]
users.push( [ { id: 55, name: 'Yan' } ] ) // [{ id: 33, name: 'Max' },{ id: 55, name: 'Yan' }]
users.findById( 33 ) // -> { id: 33, name: 'Max' }
users.pushUniqById( { id: 55, name: 'Li' } ) // [{ id: 33, name: 'Max' },{ id: 55, name: 'Yan' }]
users.removeById( 55 ) // [ { id: 33, name: 'Max' } ]
users.first() // { id: 33, name: 'Max' }
users.clear() // []
```

### Methods
##### `Collection` methods

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
* [pop](https://emgyrz.github.io/collossus/classes/collection.html#pop) - `() => null | T`
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
* [shift](https://emgyrz.github.io/collossus/classes/collection.html#shift) - `() => null | T`
* [shuffle](https://emgyrz.github.io/collossus/classes/collection.html#shuffle) - `() => void`
* [swap](https://emgyrz.github.io/collossus/classes/collection.html#swap) - `( indexA: number, indexB: number ) => boolean`
* [toArray](https://emgyrz.github.io/collossus/classes/collection.html#toarray) - `() => Array<T>`
* [toJSON](https://emgyrz.github.io/collossus/classes/collection.html#tojson) - `() => null | string`


##### `IdCollection` methods

* [findById](https://emgyrz.github.io/collossus/classes/idcollection.html#findbyid) - `( id: IdOf<T> ) => null | T`
* [findIndexById](https://emgyrz.github.io/collossus/classes/idcollection.html#findindexbyid) - `( id: IdOf<T> ) => number`
* [hasById](https://emgyrz.github.io/collossus/classes/idcollection.html#hasbyid) - `( id: IdOf<T> ) => boolean`
* [pushUniqById](https://emgyrz.github.io/collossus/classes/idcollection.html#pushuniqbyid) - `( it: Array<T> | T ) => void`
* [removeById](https://emgyrz.github.io/collossus/classes/idcollection.html#removebyid) - `( id: IdOf<T> ) => null | T`



### Using with `Mobx`
Library exports two classes that prepared to be observable - `ObservableCollection` and `ObservableIdCollection`. 
But since it does not have `Mobx` in its dependencies you should patch it with your version of `Mobx`. 
You need to do it just once in your project before creating instances of observable collection.
```typescript
import * as mobx from 'mobx'
import { patchObservableCollections, ObservableCollection } from 'collossus'

// call this somewhere on init
patchObservableCollections( mobx )

// now ObservableCollection is **really** observable
const oc = new ObservableCollection( [ 1, 2, 3 ] )

// this is `computed`
oc.length
// this is `action`
oc.push( 4 )
// and this too
oc.remove( 0 )
```
Everything else is identical to `Collection` and `IdCollection`


### License

This module is [MIT licensed](./LICENSE).


##### Enjoy using!
