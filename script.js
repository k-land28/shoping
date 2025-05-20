const itemsData = {
  "ベルク": [
    "ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン",
    "牛肉", "豚肉", "鶏肉", "ひき肉", "味付け肉", "ごま油", "マヨネーズ",
    "韓国のり", "シーチキン", "麻婆豆腐", "カニカマ", "たまご", "菓子パン",
    "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"
  ],
  "スギ薬局": [
    "マスク", "綿棒", "絆創膏", "目薬", "ハイチオールC", "鼻炎薬",
    "キュキュットウルトラ", "JOY", "カビキラー", "マジックリン", "消臭剤",
    "ビニール袋", "三角ネット", "サランラップ", "ナプキン", "トイレシート", "歯磨きガム",
    "歯ブラシ", "歯磨き粉", "デンタルリンス", "マウピー洗浄剤", "ボディーソープ", "バブ",
    "消臭ビーズ", "ファブリーズ", "柔軟剤", "洗濯洗剤", "ドラム洗浄剤", "ティッシュ",
    "トイペ", "犬用トイペ", "ファンタ", "菓子パン", "食パン", "シャンプー",
    "コンディショナー", "白髪染め", "ハードスプレー"
  ],
  "パレッテ": [
    "漬け物", "お菓子類", "プルコギ丼のタレ", "スープパスタ", "辛麺", "おにぎりのもと",
    "ファンタ", "パン", "キャベせん", "アイス", "チャーハン"
  ],
  "業スー": [
    "コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり",
    "ミックスベジタブル", "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺", "どら焼き"
  ]
};

let currentStore = "ベルク";
let selecting = new Set();
let planned = {};
let bought = {};

function saveState() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

function loadState() {
  const saved = localStorage.getItem('shoppingList');
  if (saved) {
    shoppingList = JSON.parse(saved);
  }
}

function updateTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.store === currentStore);
  });
}

function renderItemList() {
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = '';
  selectedItems.clear();

  data[currentStore].forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.textContent = item;

    div.addEventListener('click', () => {
      div.classList.toggle('selected');
      if (selectedItems.has(item)) {
        selectedItems.delete(item);
      } else {
        selectedItems.add(item);
      }
    });

    itemList.appendChild(div);
  });
}

function renderActiveList() {
  const activeList = document.getElementById('active-list');
  activeList.innerHTML = '';

  const items = shoppingList[currentStore] || [];

  items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'active-item';
    div.textContent = item.name;

    if (item.done) div.classList.add('done');

    div.addEventListener('click', () => {
      item.done = !item.done;
      renderActiveList();
      saveState();
    });

    activeList.appendChild(div);
  });
}

function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      currentStore = tab.dataset.store;
      updateTabs();
      renderItemList();
      renderActiveList();
    });
  });
}

function setupButtons() {
  document.getElementById('add-button').addEventListener('click', () => {
    if (!shoppingList[currentStore]) shoppingList[currentStore] = [];

    selectedItems.forEach(item => {
      shoppingList[currentStore].push({ name: item, done: false });
    });

    saveState();
    renderActiveList();
    renderItemList();
  });

  document.getElementById('reset-button').addEventListener('click', () => {
    shoppingList[currentStore] = [];
    saveState();
    renderActiveList();
  });
}

// 初期化
loadState();
initTabs();
updateTabs();
renderItemList();
renderActiveList();
setupButtons();
