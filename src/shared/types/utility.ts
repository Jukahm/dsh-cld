export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepReadonly<T> = T extends (infer R)[]
  ? ReadonlyArray<DeepReadonly<R>>
  : T extends object
    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
    : T;

export type ValueOf<T> = T[keyof T];

export type KeysOfType<Obj, Type> = {
  [K in keyof Obj]: Obj[K] extends Type ? K : never;
}[keyof Obj];

/** Makes specified keys required while keeping others unchanged */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Omit keys that are never */
export type OmitNever<T> = { [K in keyof T as T[K] extends never ? never : K]: T[K] };
