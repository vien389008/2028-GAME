import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Lang, TEXT } from "../constants/i18n";
import { TILE_COLORS } from "../constants/tileColors";
import { Tile, use2048 } from "../hooks/use2048";
import {
  loadSounds,
  playMerge,
  playSwipe,
  playWin,
  unloadSounds,
} from "../utils/sound";
import { getBestScore, getLanguage, setBestScore } from "../utils/storage";

const SWIPE_THRESHOLD = 50;
const ANIM_DURATION = 140;

/* ================= FONT LOGIC ================= */

/**
 * Trả về style chữ theo:
 * - size board (4x4, 5x5, 6x6)
 * - số chữ của value (2,3,4,5 chữ số)
 */
const getTileTextStyle = (value: number, boardSize: number) => {
  const length = value.toString().length;

  let fontSize = 0;
  let letterSpacing = 0;

  // Base theo board
  if (boardSize <= 4) fontSize = 24;
  else if (boardSize === 5) fontSize = 20;
  else fontSize = 18; // 6x6+

  // Letter spacing cho số dài
  if (length >= 4) letterSpacing = -1;

  return {
    fontSize,
    letterSpacing,
  };
};

export default function GameScreen() {
  const { size } = useLocalSearchParams();
  const boardSize = Number(size) || 4;
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  const [lang, setLang] = useState<Lang>("vi");
  const t = TEXT[lang] ?? TEXT.vi;

  useFocusEffect(
    useCallback(() => {
      getLanguage().then((v) => {
        if (v === "vi" || v === "en") setLang(v);
      });
    }, []),
  );

  const { tiles, score, move, gameOver, lastMerged, hasWon } = use2048(
    boardSize,
    gameKey,
  );

  const [best, setBest] = useState(0);
  const swipeLocked = useRef(false);

  useEffect(() => {
    loadSounds();
    return () => unloadSounds();
  }, []);

  useEffect(() => {
    if (lastMerged.length > 0) playMerge();
  }, [lastMerged]);

  useEffect(() => {
    if (hasWon) playWin();
  }, [hasWon]);

  /* ===== Load best score theo board size ===== */
  useEffect(() => {
    getBestScore(boardSize).then(setBest);
  }, [boardSize]);

  /* ===== Update best score khi score thay đổi ===== */
  useEffect(() => {
    if (score > best) {
      setBest(score);
      setBestScore(boardSize, score);
    }
  }, [score]);

  const onGestureEvent = (e: PanGestureHandlerGestureEvent) => {
    if (swipeLocked.current) return;

    const { translationX, translationY } = e.nativeEvent;
    const absX = Math.abs(translationX);
    const absY = Math.abs(translationY);

    if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) return;

    playSwipe();
    // eslint-disable-next-line no-unused-expressions
    absX > absY
      ? move(translationX > 0 ? "right" : "left")
      : move(translationY > 0 ? "down" : "up");

    swipeLocked.current = true;
  };

  const onStateChange = (e: PanGestureHandlerGestureEvent) => {
    if (e.nativeEvent.state === State.END) {
      swipeLocked.current = false;
    }
  };

  const SCREEN_WIDTH = Dimensions.get("window").width;
  const BOARD_SIZE = SCREEN_WIDTH - 32;
  const GAP = 6;
  const PADDING = 6;

  const TILE_SIZE =
    (BOARD_SIZE - PADDING * 2 - GAP * (boardSize - 1)) / boardSize;

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <View style={styles.topRow}>
        <ScoreBox label={t.score.toUpperCase()} value={score} />
        <View style={styles.logo}>
          <Text style={styles.logoText}>2048</Text>
        </View>
        <ScoreBox label={t.best.toUpperCase()} value={best} />
      </View>

      <View style={styles.iconRow}>
        <IconButton icon="home" onPress={() => router.replace("/")} />
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => setShowResetConfirm(true)}
        >
          <Ionicons name="sync" size={22} color="#FFF" />
        </TouchableOpacity>
        <IconButton icon="settings" onPress={() => router.push("/settings")} />
      </View>

      <Text style={styles.subtitle}>{t.subtitle}</Text>

      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onStateChange}
      >
        <View
          style={[
            styles.board,
            {
              width: BOARD_SIZE,
              height: BOARD_SIZE,
              padding: PADDING,
            },
          ]}
        >
          {Array.from({ length: boardSize * boardSize }).map((_, i) => {
            const r = Math.floor(i / boardSize);
            const c = i % boardSize;

            return (
              <View
                key={`bg-${i}`}
                style={{
                  position: "absolute",
                  left: PADDING + c * (TILE_SIZE + GAP),
                  top: PADDING + r * (TILE_SIZE + GAP),
                  width: TILE_SIZE,
                  height: TILE_SIZE,
                  borderRadius: 10,
                  backgroundColor: "#CDC1B4",
                }}
              />
            );
          })}

          {tiles.map((tile) => (
            <AnimatedTile
              key={tile.id}
              tile={tile}
              size={TILE_SIZE}
              gap={GAP}
              padding={PADDING}
              duration={ANIM_DURATION}
              boardSize={boardSize}
            />
          ))}
        </View>
      </PanGestureHandler>

      {gameOver && <Text style={styles.gameOver}>{t.gameOver}</Text>}
      {hasWon && !gameOver && <Text style={styles.gameWin}>{t.win}</Text>}

      <Modal transparent visible={showResetConfirm} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{t.resetTitle}</Text>
            <Text style={styles.modalText}>{t.resetMsg}</Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowResetConfirm(false)}
              >
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.confirmBtn]}
                onPress={() => {
                  setShowResetConfirm(false);
                  setGameKey((k) => k + 1);
                }}
              >
                <Text style={styles.confirmText}>{t.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ================= TILE ================= */

function AnimatedTile({
  tile,
  size,
  gap,
  padding,
  duration,
  boardSize,
}: {
  tile: Tile;
  size: number;
  gap: number;
  padding: number;
  duration: number;
  boardSize: number;
}) {
  const x = useSharedValue(padding + tile.c * (size + gap));
  const y = useSharedValue(padding + tile.r * (size + gap));
  const scale = useSharedValue(tile.spawned ? 0 : 1);

  useEffect(() => {
    x.value = withTiming(padding + tile.c * (size + gap), {
      duration,
      easing: Easing.out(Easing.cubic),
    });
    y.value = withTiming(padding + tile.r * (size + gap), {
      duration,
      easing: Easing.out(Easing.cubic),
    });

    if (tile.merged) {
      scale.value = withSequence(
        withTiming(1.15, { duration: 90 }),
        withTiming(1, { duration: 90 }),
      );
    }

    if (tile.spawned) {
      scale.value = withTiming(1, { duration: 120 });
    }
  }, [tile.r, tile.c, tile.merged, tile.spawned]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View
      style={[
        styles.tile,
        style,
        {
          width: size,
          height: size,
          backgroundColor: TILE_COLORS[tile.value],
        },
      ]}
    >
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={[
          styles.tileText,
          tile.value >= 8 && styles.tileTextLight,
          getTileTextStyle(tile.value, boardSize),
        ]}
      >
        {tile.value}
      </Text>
    </Animated.View>
  );
}

/* ================= UI ================= */

function ScoreBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.scoreLabel}>{label}</Text>
      <Text style={styles.scoreValue}>{value}</Text>
    </View>
  );
}

function IconButton({
  icon,
  onPress,
}: {
  icon: "home" | "settings";
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.iconBtn} onPress={onPress}>
      <Ionicons
        name={icon === "home" ? "home" : "settings"}
        size={22}
        color="#FFF"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 72,
  },
  logo: {
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDC22E",
    paddingHorizontal: 28,
    borderRadius: 16,
  },
  logoText: { fontSize: 32, fontWeight: "bold", color: "#FFF" },
  scoreBox: {
    height: 72,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8F7A66",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  scoreLabel: { fontSize: 12, color: "#EEE4DA" },
  scoreValue: { fontSize: 20, fontWeight: "bold", color: "#FFF" },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 60,
  },
  iconBtn: { backgroundColor: "#8F7A66", padding: 12, borderRadius: 12 },
  subtitle: {
    textAlign: "center",
    marginVertical: 16,
    color: "#776E65",
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "700",
  },
  board: {
    backgroundColor: "#BBADA0",
    borderRadius: 20,
    alignSelf: "center",
  },
  tile: {
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tileText: {
    fontWeight: "bold",
    color: "#776E65",
    textAlign: "center",
    includeFontPadding: false,
  },
  tileTextLight: { color: "#FFF" },
  gameOver: {
    marginTop: 22,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: "#8E0000", // đỏ sẫm
    letterSpacing: 2,
    textTransform: "uppercase",

    textShadowColor: "rgba(255,0,0,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  gameWin: {
    marginTop: 26,
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    color: "#2ECC71", // xanh ngọc sáng hơn #28e038
    letterSpacing: 1.5,
    textTransform: "uppercase",

    // ✨ Glow nhẹ
    textShadowColor: "rgba(46, 204, 113, 0.6)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#FAF8EF",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#776E65",
    marginBottom: 10,
  },
  modalText: {
    textAlign: "center",
    color: "#776E65",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelBtn: { backgroundColor: "#EEE4DA" },
  confirmBtn: { backgroundColor: "#F67C5F" },
  cancelText: { color: "#776E65", fontWeight: "600" },
  confirmText: { color: "#FFF", fontWeight: "700" },
});
