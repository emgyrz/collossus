import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Collection main', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )


  test( 'map, mapArr', () => {
    const double = coll.map( n => n * 2 )
    expect( double.toArray() ).toEqual( numArr.map( n => n * 2 ) )

    const strings = objColl.mapArr( it => it.ind )
    expect( strings ).toEqual( numArr )
  } )


} )
