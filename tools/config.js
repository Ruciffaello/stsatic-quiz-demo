/**
 * 🛠️ 心理測驗全站設定檔 (Quiz Build & Encryption Registry)
 * 
 * 📌 使用說明：
 * 每當在 `src/quizzes/` 資料夾下新建一個心理測驗時，
 * 必須在此檔案中新增該測驗的 ID、Title、卡密與外觀主題設定！
 * 
 * 執行命令 `node tools/build-and-encrypt.js` 時，
 * 打包腳本會自動讀取此處的設定，帶入對應的解密密碼與外觀進行 HTML 打包與 StatiCrypt 加密。
 */

module.exports = {
  // ------------------------------------------------------------------
  // 測驗 01: 靈魂色彩與性格診斷 (soul-color)
  // 網址路徑: https://quiz.yourdomain.com/q/soul-color/
  // ------------------------------------------------------------------
  "soul-color": {
    id: "soul-color",
    title: "尋找你的靈魂氣質色 ｜ 小紅書專屬心理測驗",
    passcode: "8888", // 小紅書自動發貨卡密
    instructions: "請輸入您於小紅書下單取得的 4 位數專屬解鎖卡密（預設卡密：8888）",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖並開始測驗 ➔",
    themeColor: "#6c5ce7", // 主題配色
    bgStyle: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)",
  },

  // ------------------------------------------------------------------
  // 測驗 02: 解鎖隱藏守護神獸 (guardian-beast)
  // 網址路徑: https://quiz.yourdomain.com/q/guardian-beast/
  // ------------------------------------------------------------------
  "guardian-beast": {
    id: "guardian-beast",
    title: "解鎖你的隱藏守護神獸 ｜ 小紅書專屬心理測驗",
    passcode: "9999", // 小紅書自動發貨卡密
    instructions: "請輸入您於小紅書下單取得的 4 位數專屬解鎖卡密（預設卡密：9999）",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖神獸測驗 ➔",
    themeColor: "#00cec9", // 主題配色
    bgStyle: "linear-gradient(135deg, #050515 0%, #0a192f 100%)",
  }

  /* 
  // ------------------------------------------------------------------
  // 範例：新增測驗 03 模板
  // ------------------------------------------------------------------
  , "career-potential": {
    id: "career-potential",
    title: "職場潛力與避坑指南 ｜ 心理測驗",
    passcode: "6666",
    instructions: "請輸入小紅書發貨卡密解鎖測驗",
    placeholder: "請輸入解鎖卡密",
    buttonText: "開啟性向診斷 ➔",
    themeColor: "#ff7675",
    bgStyle: "linear-gradient(135deg, #111 0%, #222 100%)",
  }
  */
};
