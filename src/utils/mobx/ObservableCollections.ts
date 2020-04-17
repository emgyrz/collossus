import Collection from "../../Collection"
import IdCollection from "../../IdCollection"
import { IHasId } from "../../_types"


/**
 * The same as {@link Collection} but ready to use with `MobX`\
 * Its inner array of elements is `observable` and state changing methods are `action`s\
 * See all docs in {@link Collection}
 */
export class ObservableCollection<T> extends Collection<T> {
}


/**
 * The same as {@link IdCollection} but ready to use with `MobX`\
 * Its inner array of elements is `observable` and state changing methods are `action`s\
 * See all docs in {@link IdCollection}
 */
export class ObservableIdCollection<T extends IHasId> extends IdCollection<T> {
}
