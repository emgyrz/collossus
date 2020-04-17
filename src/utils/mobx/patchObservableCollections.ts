import Collection from "../../Collection"
import IdCollection from "../../IdCollection"
import { ObservableCollection, ObservableIdCollection } from './ObservableCollections'

type CollKeysType = keyof Collection<any>
type IdCollKeysType = keyof IdCollection<any>

// type ObservableFnType = <T>( arg: T ) => T
// type ActionFnType = <T>( arg: T ) => T
// type DecorateFnType = ( ...args: any[] ) => void

type MobX = any

const COLL_ACTIONS: CollKeysType[] = [
  // @ts-ignore
  '_init',

  'set',
  'clear',
  'reset',
  'push',
  'pushUniq',
  'pushUniqBy',
  'remove',
  'removeBy',
  'swap',
]


const ID_COLL_ACTIONS: IdCollKeysType[] = [
  'removeById',
  'pushUniqById',
]

function _defineLengthGetter( proto: any ) {
  Object.defineProperty( proto, 'length', {
    get: function () {
      return this._list.length
    },
    configurable: true,
  } )
}

function patchObservableCollections( mobx: MobX ) {
  const { decorate, action, observable, computed } = mobx

  COLL_ACTIONS.forEach( k => {
    // @ts-ignore
    ObservableCollection.prototype[ k ] = action( ObservableCollection.prototype[ k ] )
    // @ts-ignore
    ObservableIdCollection.prototype[ k ] = action( ObservableIdCollection.prototype[ k ] )
  } )
  ID_COLL_ACTIONS.forEach( k => {
    // @ts-ignore
    ObservableIdCollection.prototype[ k ] = action( ObservableIdCollection.prototype[ k ] )
  } )

  _defineLengthGetter( ObservableCollection.prototype )
  _defineLengthGetter( ObservableIdCollection.prototype )

  decorate( ObservableCollection, {
    _list: observable,
    length: computed,
  } )
  decorate( ObservableIdCollection, {
    _list: observable,
    length: computed,
  } )

}

export {
  patchObservableCollections,
}
