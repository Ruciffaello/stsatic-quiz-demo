# 🤖 AI Agent Development & Operational Guidelines (AGENTS.md)

> **FOR AI AGENTS & AI CODING ASSISTANTS:**  
> This file contains authoritative system guidelines, directory rules, architectural invariants, and step-by-step workflows for developing and maintaining the OnePage Psychological Quiz project (`Ruciffaello/stsatic-quiz-demo`).  
> Any AI agent (e.g., Cursor, Antigravity, GitHub Copilot, ChatGPT) joining this project **MUST** read and follow these rules strictly.

---

## 📌 1. Project Invariants & Core Rules (核心不變原則)

1. **Single-Domain Architecture (單一網域原則)**:
   - All quizzes are deployed under a single root domain (e.g., `https://quiz.yourdomain.com/`).
   - All public release files live inside `release/`. Subpath routing convention: `release/q/[quiz-id]/index.html`.

2. **Strict Separation of Source & Release (開發與發佈嚴格分離)**:
   - **`src/quizzes/[quiz-id]/`**: Development source code. Unencrypted, modular (`index.html`, `style.css`, `app.js`). Edit code HERE ONLY.
   - **`release/q/[quiz-id]/`**: Production output. Single standalone HTML files produced automatically by `tools/build-and-encrypt.js`. NEVER EDIT `release/` FILES MANUALLY!

3. **Mandatory Configuration Registry (`tools/config.js`)**:
   - **CRITICAL**: Before building or releasing ANY new or modified quiz, you **MUST** ensure it is registered in [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js).
   - If a quiz is missing from `tools/config.js`, the build tool will not know its passcode or page title, and the build will fail or skip the quiz.

---

## 📁 2. File & Directory Reference (檔案與路徑指南)

```text
/
├── README.md                      # Human overview & sitemap
├── AGENTS.md                      # 🤖 THIS FILE - AI Agent system prompt & rules
├── proposals/                     # 💡 Quiz Proposals & Design Specs (PROPOSAL.md & DESIGN.md)
│   ├── README.md                  # Proposal guidelines & workflows
│   ├── _TEMPLATE/                 # Proposal & Design templates
│   └── [quiz-id]/                 # Proposal & Design documents per quiz
├── tools/
│   ├── config.js                  # ⚠️ Quiz Registry (ID, Title, Passcode, Theme colors)
│   └── build-and-encrypt.js       # Node.js automated build & StatiCrypt encryption script
├── src/
│   ├── shared/                    # Shared CSS, JS utilities (html2canvas, audio drivers)
│   └── quizzes/                   # Quiz source code (Developer workspace)
│       └── [quiz-id]/
│           ├── index.html         # Quiz HTML structure
│           ├── style.css          # Quiz styles
│           └── app.js             # Quiz interactive logic
└── release/                       # Final deployment target directory
    ├── index.html                 # Single-domain Quiz Hub (Catalog page)
    └── q/
        └── [quiz-id]/
            └── index.html         # Single standalone production bundle
```

---

## ⚙️ 3. `tools/config.js` Schema Definition

When an AI agent registers a new quiz in [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js), it MUST follow this JSON schema:

```javascript
module.exports = {
  "[quiz-id]": {
    id: "[quiz-id]",                  // String: Must match folder name in src/quizzes/
    title: "測驗標題 ｜ OnePage 心理測驗", // String: Webpage <title> & Header
    passcode: "8888",                // String: 4-digit fulfillment unlock key
    instructions: "請輸入解鎖卡密",   // String: Decryption instruction text
    placeholder: "請輸入解鎖卡密",    // String: Input box placeholder
    buttonText: "解鎖並開始測驗 ➔",  // String: Unlock button text
    themeColor: "#6c5ce7",           // String: Hex theme color
    bgStyle: "linear-gradient(...)"  // String: CSS background gradient
  }
};
```

---

## 🚀 4. AI Agent Standard Operating Workflows (SOP)

### ➔ Workflow A: Creating a New Quiz (新增心理測驗)
When instructed to create a new quiz (e.g. `career-potential`):

1. **Step 1: Create Proposal & Design Spec**:
   Create directory `proposals/[quiz-id]/` and author `PROPOSAL.md` (background, audience, question bank, scoring model) and `DESIGN.md` (palette, typography, result card spec). You can copy from `proposals/_TEMPLATE/`.

2. **Step 2: Create Source Folder**:
   Create directory `src/quizzes/[quiz-id]/`.
   Inside, create `index.html`, `style.css`, `app.js`.

3. **Step 3: Implement UI & Quiz Logic**:
   - High visual quality: Dark aesthetics, smooth gradients, subtle micro-animations.
   - Mobile-first Webview responsiveness (compatible with WeChat, Xiaohongshu, LINE, Instagram in-app browsers).
   - Implement `html2canvas` result card screenshot generation if required.

4. **Step 4: Register in `tools/config.js`**:
   Open [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) and add the quiz entry with its unique `id`, `title`, `passcode`, and `themeColor`.

5. **Step 5: Execute Automated Build**:
   Run shell command:
   ```bash
   node tools/build-and-encrypt.js
   ```

6. **Step 6: Verification**:
   Verify that `release/q/[quiz-id]/index.html` has been generated without errors.

---

### ➔ Workflow B: Modifying an Existing Quiz (修改現有測驗)

1. Locate the target source file inside `src/quizzes/[quiz-id]/`.
2. Edit `index.html`, `style.css`, or `app.js`.
3. Check [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js) to ensure passcodes or titles match any new user specs.
4. Execute build command: `node tools/build-and-encrypt.js`.
5. Confirm successful update of `release/q/[quiz-id]/index.html`.

---

## 🛠️ 5. Build Command Reference

| Action | Command | Expected Result |
|---|---|---|
| **Build All Quizzes** | `node tools/build-and-encrypt.js` | Inlines CSS/JS, applies config metadata, outputs single HTML to `release/q/*/index.html` |
| **Verify Structure** | `ls release/q/` | Lists all active release subpaths |

---

## 🎯 6. AI Agent Verification Checklist Before Ending Task

Before an AI agent reports a task as completed to the user, it MUST complete this checklist:
- [ ] Source files are cleanly placed under `src/quizzes/[quiz-id]/`.
- [ ] Quiz is registered in [`tools/config.js`](file:///D:/專案設計/小紅書心理測驗開發與專案紀錄/tools/config.js).
- [ ] `node tools/build-and-encrypt.js` command has been run cleanly with exit code 0.
- [ ] Production output exists in `release/q/[quiz-id]/index.html`.
- [ ] Documentation links in `README.md` use proper `file:///` scheme links.
