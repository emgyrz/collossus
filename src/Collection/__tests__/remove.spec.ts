import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Collection.remove*', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )


  test( 'remove', () => {
    const isRemoved = coll.remove( 3 )
    expect( isRemoved ).toBe( 4 )
    expect( coll.length ).toBe( 4 )

    const isRemoved2 = coll.remove( 10 )
    expect( isRemoved2 ).toBe( null )
    expect( coll.length ).toBe( 4 )
  } )


  test( 'removeBy', () => {
    coll.removeBy( it => it === 3 )
    coll.removeBy( it => it === 5 )
    const isRemoved = coll.removeBy( it => it === 1 )
    expect( coll.toArray() ).toEqual( [ 2, 4 ] )
    expect( isRemoved ).toBe( 1 )

    const isRemoved2 = coll.removeBy( it => it === 10 )
    expect( isRemoved2 ).toBe( null )
    expect( coll.length ).toBe( 2 )
  } )


  // TODO:
  test( 'removeRange', () => {

  } )

} )
