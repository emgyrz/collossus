import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Collection.push*', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )


  test( 'push', () => {
    coll.push( [ 6, 7, 8 ] )
    expect( coll.toArray() ).toEqual( numArr.concat( [ 6, 7, 8 ] ) )
    coll.push( 10 )
    expect( coll.last() ).toBe( 10 )
  } )


  test( 'pushUniq', () => {
    coll.pushUniq( [ 2, 3 ] )
    coll.pushUniq( 1 )
    expect( coll.toArray() ).toEqual( numArr )
    coll.pushUniq( [ 5, 6 ] )
    expect( coll.toArray() ).toEqual( numArr.concat( [ 6 ] ) )
    coll.pushUniq( 7 )
    expect( coll.toArray() ).toEqual( numArr.concat( [ 6, 7 ] ) )
    const w5 = { ind: 5 }
    objColl.pushUniq( w5 )
    expect( objColl.last() ).toEqual( w5 )
    expect( objColl.length ).toBe( 6 )
    objColl.pushUniq( w5 )
    expect( objColl.length ).toBe( 6 )
  } )

  test( 'pushUniqBy', () => {
    coll.pushUniqBy( 10, () => true )
    expect( coll.last() ).toBe( 5 )
    coll.pushUniqBy( 10, it => it === 10 )
    expect( coll.last() ).toBe( 10 )

    const w10 = { ind: 10 }
    objColl.pushUniqBy( [ { ind: 3 }, w10, w10 ], ( itA, itB ) => itA.ind === itB.ind )
    expect( objColl.toArray() ).toEqual( objArr.concat( [ w10 ] ) )
  } )

} )
