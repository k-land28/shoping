<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>買い物管理アプリ</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="tabs">
    <button class="tab active" data-store="ベルク">ベルク</button>
    <button class="tab" data-store="スギ薬局">スギ薬局</button>
    <button class="tab" data-store="パレッテ">パレッテ</button>
    <button class="tab" data-store="業務スーパー">業務スーパー</button>
  </div>

  <div class="controls">
    <button id="confirmSelection">決定</button>
    <button id="reset">リセット</button>
  </div>

  <div class="list-section">
    <h2>🛒 今日買うもの</h2>
    <ul id="activeList" class="item-list active-list"></ul>
  </div>

  <div class="list-section">
    <h2>📋 よく買うもの</h2>
    <ul id="fullList" class="item-list full-list"></ul>
  </div>

  <script src="script.js"></script>
</body>
</html>
