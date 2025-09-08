# 🌍 甦醒地圖 - 網頁版

這是甦醒地圖的網頁版本，提供完整的線上體驗。

## 📋 功能特色

- 🌟 **響應式網頁設計**: 支援桌面、平板和手機
- 🗺️ **互動式地圖**: 使用 Leaflet.js 的地圖體驗
- 👥 **多使用者支援**: 群組功能和全域地圖
- 📊 **完整歷史記錄**: 甦醒軌跡追蹤
- 🍽️ **AI 早餐生成**: OpenAI 驅動的當地早餐圖片
- 🎨 **管理後台**: 資料管理和統計分析

## 🚀 部署方式

### Vercel 部署 (推薦)
```bash
# 安裝依賴
npm install

# 本地開發
vercel dev

# 部署到 Vercel
vercel --prod
```

### 傳統網站部署
直接將所有檔案上傳到任何支援靜態網站的主機服務商。

## 📁 檔案結構

```
web-version/
├── index.html              # 主頁面
├── script.js              # 核心邏輯
├── style.css              # 樣式表
├── admin-dashboard.html    # 管理後台
├── api/                    # 後端 API 函數
│   ├── find-city-geonames/
│   ├── translate-location/
│   ├── generateStory/
│   ├── generateImage/
│   └── save-record/
├── cities_data.json        # 城市資料庫
├── package.json           # 專案依賴
├── vercel.json           # Vercel 配置
├── manifest.json         # PWA 設定
└── *.ico, *.png, *.svg   # 圖標資源
```

## 🔧 配置需求

### Firebase 設定
需要在 `api/config/index.js` 中設定 Firebase 配置：
- Firestore 資料庫
- Authentication

### 第三方 API
- **GeoNames API**: 城市搜尋功能
- **OpenAI API**: 故事生成和圖片生成

## 🌐 線上使用

1. 開啟網頁版甦醒地圖
2. 輸入顯示名稱和組別（選填）
3. 點擊「開始這一天」
4. 瀏覽不同分頁：
   - **今日甦醒**: 當前位置和故事
   - **甦醒軌跡**: 個人歷史記錄
   - **眾人地圖**: 全域使用者地圖

## 📱 PWA 支援

網頁版支援 Progressive Web App (PWA) 功能：
- 可安裝到手機桌面
- 離線部分功能
- 推播通知支援

## 🎯 目標使用者

- 一般網路使用者
- 希望輕鬆體驗的使用者
- 多人協作使用情境
- 行動裝置使用者

## 🔗 相關連結

- [PI 版本](../pi-version/) - 專為樹莓派實體裝置設計
- [專案主頁](../README.md) - 完整專案說明

---

💡 **提示**: 網頁版專注於便利性和可訪問性，適合快速體驗和日常使用。

