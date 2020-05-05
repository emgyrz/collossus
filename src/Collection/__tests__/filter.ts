import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Filters', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )

  test( 'filter', () => {
    let filtered = coll.filterBy( n => n === 3 )
    expect( filtered.toArray() ).toEqual( [ 3 ] )

    filtered = coll.filterBy( n => n % 2 !== 0 )
    expect( filtered.toArray() ).toEqual( [ 1, 3, 5 ] )
  } )

  test( 'retainBy', () => {
    coll.retainBy( n => n === 3 )
    expect( coll.toArray() ).toEqual( [ 3 ] )

    coll = new Collection( numArr )
    coll.retainBy( n => n % 2 !== 0 )
    expect( coll.toArray() ).toEqual( [ 1, 3, 5 ] )
  } )

} )
