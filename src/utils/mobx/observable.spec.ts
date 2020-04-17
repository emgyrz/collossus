import * as mobx from 'mobx'
import { configure, observe } from 'mobx'

import { ObservableCollection, ObservableIdCollection, patchObservableCollections, } from '../../index'

configure( { enforceActions: 'always' } )
patchObservableCollections( mobx )

interface ITree {
  id: number,
  name: string
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { id: i, name: i.toString() } ) )


describe( 'Collection main', () => {
  let coll: ObservableCollection<number>
  let idColl: ObservableIdCollection<ITree>


  beforeEach( () => {
    coll = new ObservableCollection( numArr )
    idColl = new ObservableIdCollection( objArr )
  } )


  test( 'observer', () => {
    const fn = jest.fn()
    const ref = coll.getInnerRef()
    observe( ref, fn )
    coll.push( 5 )
    coll.push( 7 )
    coll.removeBy( x => x === 3 )
    expect( fn ).toBeCalledTimes( 3 )
    expect( coll.toArray() ).toEqual( [ 1, 2, 4, 5, 5, 7 ] )
  } )


} )
