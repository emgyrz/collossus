import { IHasId } from '../_types'

export function defaultIdCompareFn<T extends IHasId>( itA: T, itB: T ): boolean {
  return itA.id === itB.id
}

export function genDefaultIdPredicate<T extends IHasId>( id: T['id'] ): ( it: T ) => boolean {
  return (it: T) => it.id === id
}
