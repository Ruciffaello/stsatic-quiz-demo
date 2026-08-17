# 💡 心理測驗企劃提案與設計規範庫 (Proposals & Design Library)

本目錄專門存放所有新心理測驗主題的**企劃提案 (Project Proposal)**、**心理學框架與題庫**、**UI/UX 視覺設計 (Design Spec)** 與**商業化定位**文件。

---

## 📁 目錄組織結構與命名慣例

每次提出或規劃一個新的心理測驗時，請在此目錄下建立獨立子資料夾：

```text
proposals/
├── README.md                      # 📚 本導覽說明與提案發起規範
├── _TEMPLATE/                     # 📋 提案與設計公版範本 (可直接複製使用)
│   ├── PROPOSAL.md                # 企劃提案範本 (背景、客群、題庫、計分、裂變)
│   └── DESIGN.md                  # 視覺設計範本 (調色盤、字型、UI交互、報告卡規範)
│
├── soul-color/                    # 測驗 01: 靈魂氣質色 (企劃與設計存檔)
│   ├── PROPOSAL.md
│   └── DESIGN.md
│
├── guardian-beast/                # 測驗 02: 隱藏守護神獸 (企劃與設計存檔)
│   ├── PROPOSAL.md
│   └── DESIGN.md
│
├── love-attachment/               # 測驗 03: 戀愛依戀類型診斷 (企劃與設計存檔)
│   ├── PROPOSAL.md
│   └── DESIGN.md
│
└── [new-quiz-id]/                 # ➕ 新增提案...
    ├── PROPOSAL.md
    └── DESIGN.md
```

---

## 🚀 發起新測驗提案標準流程 (Workflow)

```text
1. 複製 _TEMPLATE/ ➔ 重新命名為 proposals/[quiz-id]/
2. 撰寫 PROPOSAL.md (確認客群痛點、4-8題情境題庫、計分模型)
3. 撰寫 DESIGN.md (定義沉浸視覺氛圍、配色 Hex、報告卡佈局)
4. 提案審核確認 ➔ 進入 src/quizzes/[quiz-id]/ 進行前端開發
5. 在 tools/config.js 登記 ➔ 打包加密輸出 release/q/[quiz-id]/
```

---

## 📑 提案核心文件清單說明

| 文件名稱 | 核心內容與目的 |
|---|---|
| **`PROPOSAL.md`** | 包含：測驗主題動機、目標受眾、心理學依據 (如 MBTI/依戀理論/原型心理學)、題目與選項配置、加權計分規則、社群裂變分享點與定價規劃。 |
| **`DESIGN.md`** | 包含：視覺主題定位 (極光/賽博/粉紫等)、色彩與字體規範、動態效果微互動、結果卡片 (html2canvas) 輸出尺寸與視覺層級規範。 |
| **`assets/`** (選填) | 放置設計稿 Mockup、靈感參考圖或圖示素材。 |
