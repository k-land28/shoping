const storeData = {
  'ベルク': ['ねぎ', 'きゅうり', 'キャベツ', 'もやし', 'ドレッシング', 'サラダチキン', '牛肉', '豚肉', '鶏肉', 'ひき肉', '味付け肉', 'ごま油', 'マヨネーズ', '韓国のり', 'シーチキン', '麻婆豆腐', 'カニカマ', 'たまご', '菓子パン', '食パン', '千切りキャベツ', '豆腐', '冷凍うどん', 'アイス'],
  'スギ薬局': ['マスク', '綿棒', '絆創膏', '目薬', 'ハイチオールC', '鼻炎薬', 'キュキュットウルトラ', 'JOY', 'カビキラー', 'マジックリン', '消臭剤', 'ビニール袋', '三角ネット', 'サランラップ', 'ナプキン', 'トイレシート', '歯磨きガム', '歯ブラシ', '歯磨き粉', 'デンタルリンス', 'マウピー洗浄剤', 'ボディーソープ', 'バブ', '消臭ビーズ', 'ファブリーズ', '柔軟剤', '洗濯洗剤', 'ドラム洗浄剤', 'ティッシュ', 'トイペ', '犬用トイペ', 'ファンタ', '菓子パン', '食パン', 'シャンプー', 'コンディショナー', '白髪染め', 'ハードスプレー'],
  'パレッテ': ['漬け物', 'お菓子類', 'プルコギ丼のタレ', 'スープパスタ', '辛麺', 'おにぎりのもと', 'ファンタ', 'パン', 'キャベせん', 'アイス', 'チャーハン'],
  '業スー': ['コーヒー', '豆乳', 'マカロニサラダ', 'らっきょ', 'ビン鮭', '豆板醤', 'のり', 'ミックスベジタブル', 'ほうれん草', 'パプリカ', 'コーン', '唐揚げ', '辛麺', 'どら焼き']
};

let currentStore = 'ベルク';
let selected = {};
let bought = {};

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentStore = tab.dataset.store;
    render();
  });
});

function render() {
  const itemList = document.getElementById('item-list');
  const selectedList = document.getElementById('selected-items');
  itemList.innerHTML = '';
  selectedList.innerHTML = '';

  const items = storeData[currentStore];

  items.forEach(item => {
    // 全品リスト表示
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'item';
    if (selected[currentStore]?.includes(item)) li.classList.add('selecting');
    li.addEventListener('click', () => {
      selected[currentStore] = selected[currentStore] || [];
      const idx = selected[currentStore].indexOf(item);
      if (idx === -1) {
        selected[currentStore].push(item);
      } else {
        selected[currentStore].splice(idx, 1);
      }
      render();
    });
    itemList.appendChild(li);
  });

  const confirmed = bought[currentStore] || [];
  selected[currentStore]?.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'item';
    if (confirmed.includes(item)) li.classList.add('bought');
    li.addEventListener('click', () => {
      const idx = confirmed.indexOf(item);
      if (idx === -1) {
        confirmed.push(item);
      } else {
        confirmed.splice(idx, 1);
      }
      bought[currentStore] = confirmed;
      render();
    });
    selectedList.appendChild(li);
  });
}

document.getElementById('confirm-btn').addEventListener('click', () => {
  bought[currentStore] = bought[currentStore] || [];
  selected[currentStore]?.forEach(item => {
    if (!bought[currentStore].includes(item)) {
      bought[currentStore].push(item);
    }
  });
  selected[currentStore] = [];
  render();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  selected[currentStore] = [];
  bought[currentStore] = [];
  render();
});

render();
