const data = {
  berc: [ /* ...省略せず必要なら再表示します */ ],
  sugi: [ /* ... */ ],
  palette: [ /* ... */ ],
  gyomu: [ /* ... */ ]
};

let currentStore = 'berc';
let selectedItems = {};
let purchasedItems = {};

function saveState() {
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));
}

function loadState() {
  selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || {};
  purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || {};
}

// 品物リスト生成時に空の選択済み配列が上書きしないように工夫
function renderItems() {
  const itemList = document.getElementById('item-list');
  const selectedList = document.getElementById('selected-list');
  itemList.innerHTML = '';
  selectedList.innerHTML = '';

  const storeData = data[currentStore] || [];
  const selected = selectedItems[currentStore] || [];
  const purchased = purchasedItems[currentStore] || [];

  storeData.forEach(item => {
    if (!selected.includes(item)) {
      const li = document.createElement('li');
      li.textContent = item;
      li.className = '';
      li.onclick = () => {
        if (!selectedItems[currentStore]) selectedItems[currentStore] = [];
        selectedItems[currentStore].push(item);
        saveState();
        renderItems();
      };
      itemList.appendChild(li);
    }
  });

  selected.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    if (purchased.includes(item)) {
      li.className = 'purchased';
    } else {
      li.className = 'selected';
    }
    li.onclick = () => {
      if (!purchasedItems[currentStore]) purchasedItems[currentStore] = [];
      const isPurchased = purchasedItems[currentStore].includes(item);
      if (isPurchased) {
        purchasedItems[currentStore] = purchasedItems[currentStore].filter(i => i !== item);
      } else {
        purchasedItems[currentStore].push(item);
      }
      saveState();
      renderItems();
    };
    selectedList.appendChild(li);
  });
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentStore = tab.dataset.store;
    renderItems();
  };
});

document.getElementById('add-button').onclick = () => {
  // 再描画で自動的に更新されるため、ここでは保存だけ
  saveState();
  renderItems();
};

document.getElementById('reset-button').onclick = () => {
  selectedItems[currentStore] = [];
  purchasedItems[currentStore] = [];
  saveState();
  renderItems();
};

loadState();
renderItems();
