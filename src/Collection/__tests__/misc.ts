import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Collection misc methods', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )


  test( 'chunks', () => {
    const chunks = coll.chunks( 2 )
    expect( chunks ).toEqual( [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ] )
  } )


  test( 'shuffle', () => {
    const arr = Array( 1000 ).fill( 0 ).map( ( _, i ) => i )
    coll.push( arr )
    const origin = coll.toArray()
    for ( let i = 0; i < 10; i++ ) {
      coll.shuffle()
      expect( coll.toArray() ).not.toEqual( origin )
    }
  } )


  test( 'toJSON', () => {
    const collJSON = coll.toJSON()
    expect( collJSON ).toBe( "[1,2,3,4,5]" )
    const obj = { a: 1, x: { a: 1 } }
    const cyclicColl = new Collection( [ obj ] )
    obj.x = obj
    expect( cyclicColl.toJSON() ).toBe( null )
  } )


  test( 'repeat', () => {
    coll.truncate( 2 )

    expect( coll.toArray() ).toEqual( [ 1, 2 ] )
    expect( coll.repeat( 2 ).toArray() ).toEqual( [ 1, 2, 1, 2 ] )

    coll = new Collection( [ 1 ] )
    expect( coll.repeat( 5 ).toArray() ).toEqual( [ 1, 1, 1, 1, 1 ] )

    coll = new Collection( [] )
    expect( coll.repeat( 15 ).toArray() ).toEqual( [] )

    coll = new Collection<number>( [ 1, 2, 3 ] )
    expect( coll.repeat( -10 ).toArray() ).toEqual( [] )
  } )

} )
