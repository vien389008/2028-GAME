import AsyncStorage from "@react-native-async-storage/async-storage";

const LANG_KEY = "language";

/* ================= BEST SCORE ================= */

// Tạo key riêng theo size
const getBestKey = (size: number) => `BEST_SCORE_2048_${size}`;

/**
 * Lấy best score theo board size
 */
export async function getBestScore(size: number): Promise<number> {
  try {
    const v = await AsyncStorage.getItem(getBestKey(size));
    return v ? Number(v) : 0;
  } catch (e) {
    console.warn("getBestScore error:", e);
    return 0;
  }
}

/**
 * Lưu best score theo board size
 */
export async function setBestScore(size: number, score: number): Promise<void> {
  try {
    await AsyncStorage.setItem(getBestKey(size), String(score));
  } catch (e) {
    console.warn("setBestScore error:", e);
  }
}

/* ================= LANGUAGE ================= */

export async function getLanguage(): Promise<"vi" | "en"> {
  const v = await AsyncStorage.getItem(LANG_KEY);
  return (v as "vi" | "en") || "vi";
}

export async function setLanguage(lang: "vi" | "en") {
  await AsyncStorage.setItem(LANG_KEY, lang);
}
