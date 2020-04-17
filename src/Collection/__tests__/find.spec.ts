import Collection from '../index'

interface HasInd {
  ind: number
}

const numArr = [ 1, 2, 3, 4, 5 ]
const objArr = numArr.map( i => ( { ind: i } ) )

describe( 'Collection.find*', () => {
  let coll: Collection<number>
  let objColl: Collection<HasInd>

  beforeEach( () => {
    coll = new Collection( numArr )
    objColl = new Collection( objArr )
  } )


  test( 'findBy', () => {
    const third = objColl.findBy( it => it.ind === 3 )
    expect( third ).toEqual( objArr[ 2 ] )
    const unaval = objColl.findBy( it => it.ind === 10 )
    expect( unaval ).toBe( null )

    const fn = jest.fn()
    const cb = ( it: HasInd ) => {
      fn()
      return it.ind === 4
    }

    const w4 = { ind: 4 }
    objColl.push( w4 )
    const lastIt4 = objColl.findBy( cb, 4 )
    expect( lastIt4 ).toBe( w4 )
    expect( fn ).toBeCalledTimes( 2 )

  } )


  test( 'findIndexBy', () => {
    const lastInd = objColl.findIndexBy( it => it.ind === 5 )
    expect( lastInd ).toBe( 4 )
    const unavalInd = objColl.findIndexBy( it => it.ind === 10 )
    expect( unavalInd ).toBe( -1 )
  } )

  test( 'findRightBy', () => {
    const w2 = { ind: 2 }
    const w3 = { ind: 3 }
    objColl.push( [ w2, w3, { ind: 3 } ] )
    const it2 = objColl.rfindBy( it => it.ind === 2 )
    expect( it2 ).toBe( w2 )
    const last = objColl.rfindBy( it => it.ind === 3 )
    expect( last ).not.toBe( w3 )
    const it3 = objColl.rfindBy( it => it.ind === 3, objColl.lastIndex() - 1 )
    expect( it3 ).toBe( w3 )
  } )

  test( 'findIndexRightBy', () => {
    const unavalInd = objColl.rfindIndexBy( it => it.ind === 10 )
    expect( unavalInd ).toBe( -1 )

    const fn = jest.fn()
    const cb = ( it: number ) => {
      fn()
      return it === 5
    }
    const lastInd = coll.rfindIndexBy( cb )

    expect( lastInd ).toBe( coll.lastIndex() )
    expect( fn ).toBeCalledTimes( 1 )
  } )


  test( 'has', () => {
    expect( coll.has( 3 ) ).toBe( true )
    expect( coll.has( 10 ) ).toBe( false )

    expect( objColl.has( { ind: 3 } ) ).toBe( false )
    const w10 = { ind: 10 }
    objColl.push( w10 )
    expect( objColl.has( w10 ) ).toBe( true )
  } )


} )
