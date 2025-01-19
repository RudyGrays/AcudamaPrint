import { create, StateCreator, StoreApi, UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const customCreate = <T>(
  initializer: StateCreator<
    T,
    [["zustand/persist", unknown], ["zustand/immer", never]],
    []
  >,
  name?: string
): UseBoundStore<StoreApi<T>> => {
  if (name) {
    return create<T>()(
      persist(immer(initializer), {
        name: name,
      }) as StateCreator<T, [], []>
    );
  }
  return create<T>()(immer(initializer) as StateCreator<T, [], []>);
};
