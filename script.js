const storeData = {
  "ベルク": [
    "ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン", "牛肉", "豚肉", "鶏肉", "ひき肉",
    "味付け肉", "ごま油", "マヨネーズ", "韓国のり", "シーチキン", "麻婆豆腐", "カニカマ", "たまご",
    "菓子パン", "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"
  ],
  "スギ薬局": [
    "マスク", "綿棒", "絆創膏", "目薬", "ハイチオールC", "鼻炎薬", "キュキュットウルトラ", "JOY",
    "カビキラー", "マジックリン", "消臭剤", "ビニール袋", "三角ネット", "サランラップ", "ナプキン",
    "トイレシート", "歯磨きガム", "歯ブラシ", "歯磨き粉", "デンタルリンス", "マウピー洗浄剤",
    "ボディーソープ", "バブ", "消臭ビーズ", "ファブリーズ", "柔軟剤", "洗濯洗剤", "ドラム洗浄剤",
    "ティッシュ", "トイペ", "犬用トイペ", "ファンタ", "菓子パン", "食パン", "シャンプー",
    "コンディショナー", "白髪染め", "ハードスプレー"
  ],
  "パレッテ": [
    "漬け物", "お菓子類", "プルコギ丼のタレ", "スープパスタ", "辛麺", "おにぎりのもと", "ファンタ",
    "パン", "キャベせん", "アイス", "チャーハン"
  ],
  "業務スーパー": [
    "コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり",
    "ミックスベジタブル", "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺", "どら焼き"
  ]
};

let currentStore = "ベルク";
let selection = {};
let activeItems = {};

document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    btn.classList.add("active");
    currentStore = btn.dataset.store;
    render();
  });
});

document.getElementById("confirmSelection").addEventListener("click", () => {
  if (!activeItems[currentStore]) activeItems[currentStore] = [];
  if (!selection[currentStore]) selection[currentStore] = [];

  selection[currentStore].forEach(item => {
    if (!activeItems[currentStore].includes(item)) {
      activeItems[currentStore].push(item);
    }
  });

  selection[currentStore] = [];
  save();
  render();
});

document.getElementById("reset").addEventListener("click", () => {
  activeItems[currentStore] = [];
  selection[currentStore] = [];
  save();
  render();
});

function render() {
  const fullList = document.getElementById("fullList");
  const activeList = document.getElementById("activeList");
  fullList.innerHTML = "";
  activeList.innerHTML = "";

  const items = storeData[currentStore];
  const selected = selection[currentStore] || [];
  const active = activeItems[currentStore] || [];

  items.forEach(item => {
    // 全体リスト
    const li = document.createElement("li");
    li.textContent = item;
    li.className = "item";
    if (selected.includes(item)) li.classList.add("active");
    li.addEventListener("click", () => {
      if (!selection[currentStore]) selection[currentStore] = [];
      const index = selection[currentStore].indexOf(item);
      if (index > -1) {
        selection[currentStore].splice(index, 1);
      } else {
        selection[currentStore].push(item);
      }
      render();
    });
    fullList.appendChild(li);
  });

  active.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = "item";
    li.addEventListener("click", () => {
      const i = activeItems[currentStore].indexOf(item);
      if (i > -1) {
        activeItems[currentStore].splice(i, 1);
      }
      save();
      render();
    });
    li.classList.add("done");
    activeList.appendChild(li);
  });
}

function save() {
  localStorage.setItem("selection", JSON.stringify(selection));
  localStorage.setItem("activeItems", JSON.stringify(activeItems));
}

function load() {
  selection = JSON.parse(localStorage.getItem("selection")) || {};
  activeItems = JSON.parse(localStorage.getItem("activeItems")) || {};
}

load();
render();
