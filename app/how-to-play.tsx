import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Lang, TEXT } from "../constants/i18n";
import { getLanguage } from "../utils/storage";

export default function HowToPlayScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [lang, setLang] = useState<Lang>("en");
  const t = TEXT[lang] ?? TEXT.en;

  useFocusEffect(
    useCallback(() => {
      getLanguage().then((v) => {
        if (v === "vi" || v === "en") setLang(v);
      });
    }, []),
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={26} color="#776E65" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{t.howToPlayTitle}</Text>

        {/* spacer để title luôn ở giữa */}
        <View style={{ width: 26 }} />
      </View>

      {/* ===== BOARD IMAGE ===== */}
      <Image
        source={require("../assets/images/board.png")}
        style={styles.boardImage}
      />

      {/* ===== SWIPE ===== */}
      <Image
        source={require("../assets/images/swipe_icons.png")}
        style={styles.swipeIcons}
      />
      <Text style={styles.swipeText}>{t.howToPlayDesc1}</Text>

      {/* ===== RULES ===== */}
      <View style={styles.ruleBox}>
        <Text style={styles.rule}>{t.howToPlayDesc2}</Text>
        <Text style={styles.rule}>{t.howToPlayFooter}</Text>
      </View>

      {/* ===== 2048 TILE ===== */}
      <Image
        source={require("../assets/images/tile_2048.png")}
        style={styles.tile2048}
      />
      <Text style={styles.winText}>{t.win}</Text>

      {/* ===== PLAY ===== */}
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={() => router.replace("/game?size=4")}
        activeOpacity={0.85}
      >
        <Text style={[styles.buttonText, styles.primaryText]}>
          {t.play.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    paddingHorizontal: 20,
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  backBtn: {
    width: 26,
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#776E65",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.12)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  /* ===== CONTENT ===== */
  boardImage: {
    width: "100%",
    resizeMode: "contain",
    height: 100,
    marginTop: 20,
  },

  swipeIcons: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
    marginTop: 8,
  },

  swipeText: {
    textAlign: "center",
    color: "#776E65",
    fontSize: 16,
    marginTop: 6,
    fontWeight: "700",
    lineHeight: 22,
  },

  ruleBox: {
    marginTop: 16,
    backgroundColor: "#EEE4DA",
    borderRadius: 14,
    padding: 16,
    borderWidth: 3,
    borderColor: "#E0D4BF",
  },

  rule: {
    color: "#776E65",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "700",
    textAlign: "center",
  },

  tile2048: {
    width: 110,
    height: 60,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 18,
  },

  winText: {
    textAlign: "center",
    color: "#776E65",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "900",
  },

  gotItBtn: {
    marginTop: 20,
    backgroundColor: "#F59563",
    alignSelf: "center",
    paddingHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 32,
    elevation: 4,
  },

  gotItText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EEE4DA",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  primaryButton: {
    backgroundColor: "#F67C5F",
    textAlign: "center",
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#776E65",
    textAlign: "center",
    margin: "auto",
  },

  primaryText: {
    color: "#FFF",
  },
});
