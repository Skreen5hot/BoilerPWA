// Impure: connects core to the DOM
export function renderItems(items) {
  const list = document.getElementById("item-list");
  list.innerHTML = items.map(i => `<li>${i}</li>`).join("");
}
