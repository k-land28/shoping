const storeItems = {
  "ベルク": [
    "ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン",
    "牛肉", "豚肉", "鶏肉", "ひき肉", "味付け肉", "ごま油", "マヨネーズ",
    "韓国のり", "シーチキン", "麻婆豆腐", "カニカマ", "たまご", "菓子パン",
    "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"
  ],
  "スギ薬局": [
    "マスク", "綿棒", "絆創膏", "目薬", "ハイチオールC", "鼻炎薬",
    "キュキュットウルトラ", "JOY", "カビキラー", "マジックリン", "消臭剤",
    "ビニール袋", "三角ネット", "サランラップ", "ナプキン", "トイレシート",
    "歯磨きガム", "歯ブラシ", "歯磨き粉", "デンタルリンス", "マウピー洗浄剤",
    "ボディーソープ", "バブ", "消臭ビーズ", "ファブリーズ", "柔軟剤",
    "洗濯洗剤", "ドラム洗浄剤", "ティッシュ", "トイペ", "犬用トイペ",
    "ファンタ", "菓子パン", "食パン", "シャンプー", "コンディショナー",
    "白髪染め", "ハードスプレー"
  ],
  "パレッテ": [
    "漬け物", "お菓子類", "プルコギ丼のタレ", "スープパスタ", "辛麺",
    "おにぎりのもと", "ファンタ", "パン", "キャベせん", "アイス", "チャーハン"
  ],
  "業務スーパー": [
    "コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり",
    "ミックスベジタブル", "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺", "どら焼き"
  ]
};

const tabs = document.querySelectorAll(".tab");
const itemList = document.getElementById("item-list");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    const store = tab.getAttribute("data-store");
    renderItems(store);
  });
});

function getSavedStates(store) {
  const saved = localStorage.getItem(`states_${store}`);
  return saved ? JSON.parse(saved) : {};
}

function saveStates(store, states) {
  localStorage.setItem(`states_${store}`, JSON.stringify(states));
}

function renderItems(store) {
  itemList.innerHTML = "";
  const states = getSavedStates(store);

  storeItems[store].forEach(item => {
    const li = document.createElement("li");
    li.classList.add("fade-in");

    const circle = document.createElement("div");
    const state = states[item] || 0;
    let currentState = state;

    circle.className = `check-circle state-${currentState}`;

    circle.addEventListener("click", () => {
      currentState = (currentState + 1) % 3;
      circle.className = `check-circle state-${currentState}`;
      states[item] = currentState;
      saveStates(store, states);
    });

    li.appendChild(circle);
    li.appendChild(document.createTextNode(item));
    itemList.appendChild(li);
  });
}

// 初期表示
renderItems("ベルク");
