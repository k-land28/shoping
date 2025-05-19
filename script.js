const data = {
  'ベルク': [
    'ねぎ', 'きゅうり', 'キャベツ', 'もやし', 'ドレッシング', 'サラダチキン',
    '牛肉', '豚肉', '鶏肉', 'ひき肉', '味付け肉', 'ごま油', 'マヨネーズ',
    '韓国のり', 'シーチキン', '麻婆豆腐', 'カニカマ', 'たまご', '菓子パン',
    '食パン', '千切りキャベツ', '豆腐', '冷凍うどん', 'アイス'
  ],
  'スギ薬局': [
    'マスク', '綿棒', '絆創膏', '目薬', 'ハイチオールC', '鼻炎薬',
    'キュキュットウルトラ', 'JOY', 'カビキラー', 'マジックリン', '消臭剤',
    'ビニール袋', '三角ネット', 'サランラップ', 'ナプキン', 'トイレシート',
    '歯磨きガム', '歯ブラシ', '歯磨き粉', 'デンタルリンス', 'マウピー洗浄剤',
    'ボディーソープ', 'バブ', '消臭ビーズ', 'ファブリーズ', '柔軟剤',
    '洗濯洗剤', 'ドラム洗浄剤', 'ティッシュ', 'トイペ', '犬用トイペ',
    'ファンタ', '菓子パン', '食パン', 'シャンプー', 'コンディショナー',
    '白髪染め', 'ハードスプレー'
  ],
  'パレッテ': [
    '漬け物', 'お菓子類', 'プルコギ丼のタレ', 'スープパスタ', '辛麺',
    'おにぎりのもと', 'ファンタ', 'パン', 'キャベせん', 'アイス', 'チャーハン'
  ],
  '業務スーパー': [
    'コーヒー', '豆乳', 'マカロニサラダ', 'らっきょ', 'ビン鮭', '豆板醤', 'のり',
    'ミックスベジタブル', 'ほうれん草', 'パプリカ', 'コーン', '唐揚げ', '辛麺',
    'どら焼き'
  ]
};

let state = JSON.parse(localStorage.getItem('shoppingState')) || {};

function saveState() {
  localStorage.setItem('shoppingState', JSON.stringify(state));
}

function render(store) {
  const container = document.getElementById('content');
  container.innerHTML = '';

  if (!state[store]) state[store] = { toBuy: [], bought: [] };

  const storeDiv = document.createElement('div');
  storeDiv.className = 'store-section';

  const toBuySection = document.createElement('div');
  toBuySection.className = 'list-section';
  toBuySection.innerHTML = '<h3>買う予定のもの</h3>';
  const toBuyList = document.createElement('ul');
  state[store].toBuy.forEach(item => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = state[store].bought.includes(item);
    cb.addEventListener('change', () => {
      const bought = state[store].bought;
      if (cb.checked) {
        if (!bought.includes(item)) bought.push(item);
      } else {
        state[store].bought = bought.filter(i => i !== item);
      }
      saveState();
    });
    li.appendChild(cb);
    li.appendChild(document.createTextNode(item));
    toBuyList.appendChild(li);
  });
  toBuySection.appendChild(toBuyList);

  const allItemsSection = document.createElement('div');
  allItemsSection.className = 'list-section';
  allItemsSection.innerHTML = '<h3>買う予定を選択</h3>';
  const allList = document.createElement('ul');
  const tempSelected = new Set();

  data[store].forEach(item => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = state[store].toBuy.includes(item);
    cb.addEventListener('change', () => {
      if (cb.checked) {
        tempSelected.add(item);
      } else {
        tempSelected.delete(item);
      }
    });
    li.appendChild(cb);
    li.appendChild(document.createTextNode(item));
    allList.appendChild(li);
  });

  const addButton = document.createElement('button');
  addButton.textContent = '決定（買う予定に追加）';
  addButton.addEventListener('click', () => {
    tempSelected.forEach(item => {
      if (!state[store].toBuy.includes(item)) {
        state[store].toBuy.push(item);
      }
    });
    saveState();
    render(store);
  });

  const resetButton = document.createElement('button');
  resetButton.textContent = 'リセット';
  resetButton.style.marginLeft = '10px';
  resetButton.addEventListener('click', () => {
    state[store] = { toBuy: [], bought: [] };
    saveState();
    render(store);
  });

  allItemsSection.appendChild(allList);
  allItemsSection.appendChild(addButton);
  allItemsSection.appendChild(resetButton);

  storeDiv.appendChild(toBuySection);
  storeDiv.appendChild(allItemsSection);
  container.appendChild(storeDiv);
}

document.querySelectorAll('.tab-button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.store);
  });
});

render('ベルク'); // 初期表示
