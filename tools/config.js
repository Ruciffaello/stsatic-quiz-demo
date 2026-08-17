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
    title: "尋找你的靈魂氣質色 ｜ OnePage 心理測驗",
    passcode: "8888", // 預設發貨卡密
    instructions: "請輸入您的 4 位數專屬解鎖卡密（預設卡密：8888）",
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
    title: "解鎖你的隱藏守護神獸 ｜ OnePage 心理測驗",
    passcode: "9999", // 預設發貨卡密
    instructions: "請輸入您的 4 位數專屬解鎖卡密（預設卡密：9999）",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖神獸測驗 ➔",
    themeColor: "#00cec9", // 主題配色
    bgStyle: "linear-gradient(135deg, #050515 0%, #0a192f 100%)",
  },

  // ------------------------------------------------------------------
  // 測驗 03: 戀愛依戀類型與契合度診斷 (love-attachment)
  // 網址路徑: https://quiz.yourdomain.com/q/love-attachment/
  // ------------------------------------------------------------------
  "love-attachment": {
    id: "love-attachment",
    title: "戀愛依戀類型與契合度診斷 ｜ OnePage 心理測驗",
    passcode: "7777", // 預設發貨卡密
    instructions: "請輸入您的 4 位數專屬解鎖卡密（預設卡密：7777）",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖戀愛診斷 ➔",
    themeColor: "#ec4899", // 浪漫粉紫主題色
    bgStyle: "linear-gradient(135deg, #1e1b4b 0%, #31103f 50%, #4c0519 100%)",
  },

  // ------------------------------------------------------------------
  // 測驗 04: 對象成分暨物種分析報告 (partner-species-report)
  // 網址路徑: https://quiz.yourdomain.com/q/partner-species-report/
  // ------------------------------------------------------------------
  "partner-species-report": {
    id: "partner-species-report",
    title: "對象成分暨物種分析報告 ｜ OnePage 心理測驗",
    passcode: "6666", // 原型預設卡密，正式發佈前可再調整
    instructions: "請輸入您的 4 位數專屬解鎖卡密（原型卡密：6666）",
    placeholder: "請輸入解鎖卡密",
    buttonText: "解鎖並提交樣本 ➔",
    themeColor: "#b89455",
    bgStyle: "linear-gradient(135deg, #0d111c 0%, #14231f 55%, #251712 100%)",
  }
};
