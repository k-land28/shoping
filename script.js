const data = {
  berc: [
    "ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン", "牛肉", "豚肉",
    "鶏肉", "ひき肉", "味付け肉", "ごま油", "マヨネーズ", "韓国のり", "シーチキン", "麻婆豆腐",
    "カニカマ", "たまご", "菓子パン", "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"
  ],
  sugi: [
    "マスク", "綿棒", "絆創膏", "目薬", "ハイチオールC", "鼻炎薬", "キュキュットウルトラ", "JOY",
    "カビキラー", "マジックリン", "消臭剤", "ビニール袋", "三角ネット", "サランラップ", "ナプキン",
    "トイレシート", "歯磨きガム", "歯ブラシ", "歯磨き粉", "デンタルリンス", "マウピー洗浄剤",
    "ボディーソープ", "バブ", "消臭ビーズ", "ファブリーズ", "柔軟剤", "洗濯洗剤", "ドラム洗浄剤",
    "ティッシュ", "トイペ", "犬用トイペ", "ファンタ", "菓子パン", "食パン", "シャンプー",
    "コンディショナー", "白髪染め", "ハードスプレー"
  ],
  palette: [
    "漬け物", "お菓子類", "プルコギ丼のタレ", "スープパスタ", "辛麺", "おにぎりのもと", "ファンタ",
    "パン", "キャベせん", "アイス", "チャーハン"
  ],
  gyomu: [
    "コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり", "ミックスベジタブル",
    "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺", "どら焼き"
  ]
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

function renderItems() {
  const itemList = document.getElementById('item-list');
  const selectedList = document.getElementById('selected-list');
  itemList.innerHTML = '';
  selectedList.innerHTML = '';

  data[currentStore].forEach(item => {
    // 下部リスト
    const li = document.createElement('li');
    li.textContent = item;
    if (selectedItems[currentStore]?.includes(item)) {
      li.classList.add('selected');
    }
    li.onclick = () => {
      selectedItems[currentStore] = selectedItems[currentStore] || [];
      if (selectedItems[currentStore].includes(item)) {
        selectedItems[currentStore] = selectedItems[currentStore].filter(i => i !== item);
      } else {
        selectedItems[currentStore].push(item);
      }
      saveState();
      renderItems();
    };
    itemList.appendChild(li);
  });

  // 上部リスト（購入予定）
  (selectedItems[currentStore] || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    if (purchasedItems[currentStore]?.includes(item)) {
      li.classList.add('purchased');
    }
    li.onclick = () => {
      purchasedItems[currentStore] = purchasedItems[currentStore] || [];
      if (purchasedItems[currentStore].includes(item)) {
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
