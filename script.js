const itemData = {
  "ベルク": [
    "ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン",
    "牛肉", "豚肉", "鶏肉", "ひき肉", "味付け肉", "ごま油", "マヨネーズ",
    "韓国のり", "シーチキン", "麻婆豆腐", "カニカマ", "たまご",
    "菓子パン", "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"
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
  "業スー": [
    "コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり",
    "ミックスベジタブル", "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺",
    "どら焼き"
  ]
};

let currentStore = "ベルク";
let selectedItems = [];
let plannedItems = [];

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentStore = tab.dataset.store;
    loadItems();
  });
});

function loadItems() {
  const mainList = document.getElementById("main-list");
  const plannedList = document.getElementById("planned-list");
  mainList.innerHTML = "";
  plannedList.innerHTML = "";

  const storeItems = itemData[currentStore];

  storeItems.forEach(item => {
    // 品物一覧（下）
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      li.classList.toggle("selected");
      if (selectedItems.includes(item)) {
        selectedItems = selectedItems.filter(i => i !== item);
      } else {
        selectedItems.push(item);
      }
    });
    mainList.appendChild(li);
  });

  // 購入予定（上）
  plannedItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      li.classList.toggle("checked");
    });
    plannedList.appendChild(li);
  });
}

document.getElementById("add-button").addEventListener("click", () => {
  const newItems = selectedItems.filter(item => !plannedItems.includes(item));
  plannedItems = plannedItems.concat(newItems);
  selectedItems = [];
  loadItems();
});

document.getElementById("reset-button").addEventListener("click", () => {
  selectedItems = [];
  plannedItems = [];
  loadItems();
});

window.addEventListener("load", loadItems);
