const stores = {
  storeA: ["牛乳", "パン", "卵"],
  storeB: ["トマト", "レタス", "にんじん"],
  storeC: ["お米", "しょうゆ", "みそ"],
  storeD: ["ティッシュ", "トイレットペーパー", "洗剤"]
};

let state = {}; // 商品ごとのチェック状態を保存

const itemList = document.getElementById("item-list");
const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active")?.classList.remove("active");
    tab.classList.add("active");
    showItems(tab.dataset.store);
  });
});

function showItems(storeKey) {
  itemList.innerHTML = "";
  const items = stores[storeKey];
  if (!state[storeKey]) state[storeKey] = Array(items.length).fill("none");

  items.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const checkbox = document.createElement("div");
    checkbox.className = "checkbox";
    updateCheckboxState(checkbox, state[storeKey][index]);

    checkbox.addEventListener("click", () => {
      const current = state[storeKey][index];
      const next = current === "none" ? "active" : current === "active" ? "checked" : "none";
      state[storeKey][index] = next;
      updateCheckboxState(checkbox, next);
    });

    const text = document.createElement("div");
    text.className = "item-text";
    text.textContent = item;

    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(text);
    itemList.appendChild(itemDiv);
  });
}

function updateCheckboxState(elem, state) {
  elem.className = "checkbox"; // reset
  if (state === "active") {
    elem.classList.add("active");
  } else if (state === "checked") {
    elem.classList.add("checked");
    elem.textContent = "✔";
  } else {
    elem.textContent = "";
  }
}

// 初期表示
showItems("storeA");
