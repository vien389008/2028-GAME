import AsyncStorage from "@react-native-async-storage/async-storage";
import { AudioPlayer, createAudioPlayer } from "expo-audio";

const SOUND_KEY = "SOUND_ENABLED";

let enabled = true;

/* ===== PLAYERS ===== */

let swipePlayer: AudioPlayer | null = null;
let mergePlayer: AudioPlayer | null = null;
let winPlayer: AudioPlayer | null = null;

/* ===== LOAD / SAVE SETTING ===== */

export async function loadSoundSetting() {
  const v = await AsyncStorage.getItem(SOUND_KEY);
  enabled = v !== "false";
}

export async function setSoundEnabled(value: boolean) {
  enabled = value;
  await AsyncStorage.setItem(SOUND_KEY, String(value));
}

export function isSoundEnabled() {
  return enabled;
}

/* ===== LOAD SOUNDS ===== */

export async function loadSounds() {
  await loadSoundSetting();

  if (!swipePlayer) {
    swipePlayer = createAudioPlayer(require("../assets/sounds/swipe.wav"));
  }

  if (!mergePlayer) {
    mergePlayer = createAudioPlayer(require("../assets/sounds/merge.wav"));
  }

  if (!winPlayer) {
    winPlayer = createAudioPlayer(require("../assets/sounds/win.wav"));
  }
}

/* ===== PLAY ===== */

export function playSwipe() {
  if (!enabled || !swipePlayer) return;
  try {
    swipePlayer.seekTo(0);
    swipePlayer.play();
  } catch {}
}

export function playMerge() {
  if (!enabled || !mergePlayer) return;
  try {
    mergePlayer.seekTo(0);
    mergePlayer.play();
  } catch {}
}

export function playWin() {
  if (!enabled || !winPlayer) return;
  try {
    winPlayer.seekTo(0);
    winPlayer.play();
  } catch {}
}

/* ===== CLEANUP ===== */

export function unloadSounds() {
  try {
    swipePlayer?.pause();
    mergePlayer?.pause();
    winPlayer?.pause();
  } catch {}

  swipePlayer = null;
  mergePlayer = null;
  winPlayer = null;
}
