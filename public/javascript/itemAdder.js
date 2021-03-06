function itemAdder() {
  const itemAdder = document.getElementById('item-adder');
  const container = document.getElementById('items-list-container');

  const html = `<input class="item-name item-input item" type="text" name="name" Placeholder="Item" required> 
  <input class="item-price item-input" type="number" step="0.01" name="price" Placeholder="€" required>`;

  itemAdder.addEventListener('click', () => {
    const div = document.createElement('div');
    div.setAttribute('class', 'item-container');
    div.innerHTML = html;
    container.appendChild(div);
  });
}

window.addEventListener('load', itemAdder);
