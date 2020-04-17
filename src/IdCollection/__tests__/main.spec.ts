
import IdCollection from '../index'

type Item = { id: number, name: string }
const testCollData = [ 1, 2, 3, 4, 5 ].map( ind => ( {
  id: ind,
  name: ind.toString()
} ))

describe( 'IdCollection', () => {
  let coll: IdCollection<Item>

  beforeEach( () => {
    coll = new IdCollection( testCollData )
  } )

  test( 'pushUniqById', () => {
    coll.pushUniqById( { id: 3, name: 'new' })
    expect( coll.length ).toBe( 5 )
    const first = coll.first()!
    coll.pushUniqById( [ first, first ] )
    expect( coll.length ).toBe( 5 )
    coll.pushUniqById( { id: 10, name: 'ten' } )
    expect( coll.length ).toBe( 6 )
    expect( coll.last()!.id ).toBe( 10 )
  } )


  test( 'findById', () => {
    const w3 = coll.findById( 3 )
    expect( w3 ).toEqual({ id: 3, name: '3'} )
    const w10 = coll.findById( 10 )
    expect( w10 ).toBe( null )
  } )


  test( 'removeById', () => {
    const w3 = coll.removeById( 3 )
    expect( w3 ).toEqual({ id: 3, name: '3'} )
    expect( coll.length ).toBe( 4 )
    const w10 = coll.removeById( 10 )
    expect( w10 ).toBe( null )
  } )


} )
