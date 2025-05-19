const storeData = {
  "ベルク": ["ねぎ", "きゅうり", "キャベツ", "もやし", "ドレッシング", "サラダチキン", "牛肉", "豚肉", "鶏肉", "ひき肉", "味付け肉", "ごま油", "マヨネーズ", "韓国のり", "シーチキン", "麻婆豆腐", "カニカマ", "たまご", "菓子パン", "食パン", "千切りキャベツ", "豆腐", "冷凍うどん", "アイス"],
  "スギ薬局": ["マスク", "綿棒", "絆創膏", "目薬", "ハイチオールC", "鼻炎薬", "キュキュットウルトラ", "JOY", "カビキラー", "マジックリン", "消臭剤", "ビニール袋", "三角ネット", "サランラップ", "ナプキン", "トイレシート", "歯磨きガム", "歯ブラシ", "歯磨き粉", "デンタルリンス", "マウピー洗浄剤", "ボディーソープ", "バブ", "消臭ビーズ", "ファブリーズ", "柔軟剤", "洗濯洗剤", "ドラム洗浄剤", "ティッシュ", "トイペ", "犬用トイペ", "ファンタ", "菓子パン", "食パン", "シャンプー", "コンディショナー", "白髪染め", "ハードスプレー"],
  "パレッテ": ["漬け物", "お菓子類", "プルコギ丼のタレ", "スープパスタ", "辛麺", "おにぎりのもと", "ファンタ", "パン", "キャベせん", "アイス", "チャーハン"],
  "業スー": ["コーヒー", "豆乳", "マカロニサラダ", "らっきょ", "ビン鮭", "豆板醤", "のり", "ミックスベジタブル", "ほうれん草", "パプリカ", "コーン", "唐揚げ", "辛麺", "どら焼き"]
};

let currentStore = "ベルク";
let selectedItems = {};

function renderItems() {
  const list = document.getElementById("itemList");
  list.innerHTML = "";
  storeData[currentStore].forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.className = "item";
    li.onclick = () => li.classList.toggle("active");
    list.appendChild(li);
  });
  renderSelectedItems();
}

function renderSelectedItems() {
  const container = document.getElementById("selectedItemsList");
  container.innerHTML = "";
  (selectedItems[currentStore] || []).forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.className = "item" + (item.bought ? " bought" : "");
    li.onclick = () => {
      item.bought = !item.bought;
      saveState();
      renderSelectedItems();
    };
    container.appendChild(li);
  });
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentStore = tab.dataset.store;
    renderItems();
  };
});

document.getElementById("addButton").onclick = () => {
  const actives = [...document.querySelectorAll("#itemList .item.active")];
  if (!selectedItems[currentStore]) selectedItems[currentStore] = [];
  actives.forEach(el => {
    const name = el.textContent;
    if (!selectedItems[currentStore].some(item => item.name === name)) {
      selectedItems[currentStore].push({ name, bought: false });
    }
    el.classList.remove("active");
  });
  saveState();
  renderSelectedItems();
};

document.getElementById("resetButton").onclick = () => {
  selectedItems[currentStore] = [];
  saveState();
  renderSelectedItems();
};

function saveState() {
  localStorage.setItem("shoppingAppState", JSON.stringify(selectedItems));
}

function loadState() {
  const saved = localStorage.getItem("shoppingAppState");
  if (saved) {
    selectedItems = JSON.parse(saved);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadState();
  renderItems();
});
