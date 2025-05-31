// Pure function example
export function addItem(state, item) {
  return { ...state, items: [...state.items, item] };
}
