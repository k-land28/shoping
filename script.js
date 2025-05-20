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

function saveData() {
  localStorage.setItem("planned", JSON.stringify(planned));
  localStorage.setItem("bought", JSON.stringify(bought));
}

function loadData() {
  planned = JSON.parse(localStorage.getItem("planned")) || {};
  bought = JSON.parse(localStorage.getItem("bought")) || {};
}

function renderItems() {
  const list = document.getElementById("item-list");
  list.innerHTML = "";

  (itemsData[currentStore] || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = selecting.has(item) ? "selecting" : "";
    li.addEventListener("click", () => {
      if (selecting.has(item)) {
        selecting.delete(item);
      } else {
        selecting.add(item);
      }
      renderItems();
    });
    list.appendChild(li);
  });
}

function renderPlanned() {
  const list = document.getElementById("planned-list");
  list.innerHTML = "";

  (planned[currentStore] || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = (bought[currentStore] || []).includes(item) ? "bought" : "";
    li.addEventListener("click", () => {
      if (!bought[currentStore]) bought[currentStore] = [];
      if (bought[currentStore].includes(item)) {
        bought[currentStore] = bought[currentStore].filter(i => i !== item);
      } else {
        bought[currentStore].push(item);
      }
      saveData();
      renderPlanned();
    });
    list.appendChild(li);
  });
}

document.querySelectorAll(".tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentStore = button.dataset.store;
    selecting.clear();
    renderItems();
    renderPlanned();
  });
});

document.getElementById("confirm-button").addEventListener("click", () => {
  if (!planned[currentStore]) planned[currentStore] = [];
  selecting.forEach(item => {
    if (!planned[currentStore].includes(item)) {
      planned[currentStore].push(item);
    }
  });
  selecting.clear();
  saveData();
  renderItems();
  renderPlanned();
});

document.getElementById("reset-button").addEventListener("click", () => {
  delete planned[currentStore];
  delete bought[currentStore];
  saveData();
  renderPlanned();
});

loadData();
renderItems();
renderPlanned();
