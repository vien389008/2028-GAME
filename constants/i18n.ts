/* ================= TYPES ================= */

export type Lang = "vi" | "en";

/* ================= TEXT ================= */

export const TEXT: Record<Lang, any> = {
  vi: {
    /* ===== COMMON ===== */
    ok: "OK",
    cancel: "Hủy",
    confirm: "Xác nhận",
    on: "Bật",
    off: "Tắt",
    back: "Quay lại",

    /* ===== HOME ===== */
    subtitle: "Ghép các ô số để đạt được ô 2048!",
    modes: {
      classic: { title: "Cổ điển", desc: "Bàn cờ 4 × 4" },
      large: { title: "Mở rộng", desc: "Bàn cờ 5 × 5" },
      huge: { title: "Siêu lớn", desc: "Bàn cờ 6 × 6" },
    },

    /* ===== SETTINGS ===== */
    settings: "Cài đặt",
    sound: "Âm thanh",
    language: "Ngôn ngữ",
    vietnamese: "Tiếng Việt",
    english: "Tiếng Anh",
    rate: "Đánh giá ứng dụng",
    rateTitle: "Chưa phát hành",
    rateMsg: "Ứng dụng chưa được phát hành trên cửa hàng.",
    privacy: "Chính sách bảo mật",
    info: "Thông tin",

    /* ===== GAME ===== */
    score: "Điểm",
    best: "Kỷ lục",
    gameOver: "THUA CUỘC",
    win: "BẠN ĐÃ THẮNG!",

    resetTitle: "Chơi lại?",
    resetMsg: "Bạn có chắc muốn bắt đầu ván mới không?",
    reset: "Chơi lại",

    /* ===== HOW TO PLAY ===== */
    howToPlay: "Cách chơi",
    howToPlayTitle: "Cách chơi",
    howToPlayDesc1:
      "Vuốt lên, xuống, trái hoặc phải để di chuyển\ntất cả các ô theo hướng đó.",
    howToPlayDesc2: "Ghép các ô có cùng giá trị để nâng cấp chúng:",
    howToPlayFooter: "Tiếp tục ghép các ô cho đến khi\nbạn đạt được ô 2048!",
    play: "Chơi",

    /* ===== INFO ===== */
    about: "Giới thiệu",
    version: "Phiên bản",
    author: "Tác giả",
  },

  en: {
    /* ===== COMMON ===== */
    ok: "OK",
    cancel: "Cancel",
    confirm: "Confirm",
    on: "On",
    off: "Off",
    back: "Back",

    /* ===== HOME ===== */
    subtitle: "Join the numbers and get the 2048 tile!",
    modes: {
      classic: { title: "Classic", desc: "4 × 4 board" },
      large: { title: "Large", desc: "5 × 5 board" },
      huge: { title: "Huge", desc: "6 × 6 board" },
    },

    /* ===== SETTINGS ===== */
    settings: "Settings",
    sound: "Sound",
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
    rate: "Rate app",
    rateTitle: "Not published",
    rateMsg: "This app is not published on the store yet.",
    privacy: "Privacy policy",
    info: "Information",

    /* ===== GAME ===== */
    score: "Score",
    best: "Best",
    gameOver: "GAME OVER",
    win: "YOU WIN!",

    resetTitle: "Restart game?",
    resetMsg: "Are you sure you want to start a new game?",
    reset: "Restart",

    /* ===== HOW TO PLAY ===== */
    howToPlay: "How to play",
    howToPlayTitle: "How to play",
    howToPlayDesc1:
      "Swipe up, down, left, or right to move all\ntiles in that direction.",
    howToPlayDesc2: "Merge tiles of the same number\nto upgrade them:",
    howToPlayFooter: "Keep merging the tiles until\nyou get the 2048 tile!",
    play: "Play",

    /* ===== INFO ===== */
    about: "About",
    version: "Version",
    author: "Author",
  },
};
