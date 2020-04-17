export type CallbackFuncType<T, R> = ( it: T, index: number ) => R
export type CompareFuncType<T> = ( itA: T, itB: T ) => boolean

/**
 * Interface for elements with id\
 * ID can be `number` or `string`\
 * For Flow.js `IdCollection<T: { id: string } | { id: number }>`  is using
 */
export interface IHasId {
  id: string | number
}


/**
 * Helper to get type of ID in element\
 * For Flow.js `$PropertyType<T, 'id'>`  is using
 */
export type IdOf<T extends IHasId> = T[ 'id' ]
