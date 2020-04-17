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
    console.log( chunks )
    expect( chunks ).toEqual( [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ] )
  } )

} )
