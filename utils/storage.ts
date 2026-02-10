import AsyncStorage from "@react-native-async-storage/async-storage";
const LANG_KEY = "language";
const BEST_KEY = "BEST_SCORE_2048";

export async function getBestScore() {
  const v = await AsyncStorage.getItem(BEST_KEY);
  return v ? Number(v) : 0;
}

export async function setBestScore(score: number) {
  await AsyncStorage.setItem(BEST_KEY, String(score));
}

export async function getLanguage(): Promise<"vi" | "en"> {
  const v = await AsyncStorage.getItem(LANG_KEY);
  return (v as "vi" | "en") || "vi";
}

export async function setLanguage(lang: "vi" | "en") {
  await AsyncStorage.setItem(LANG_KEY, lang);
}
