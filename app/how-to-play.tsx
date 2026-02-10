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
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#776E65" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>How to Play</Text>
      </View>

      {/* BOARD IMAGE */}

      <Image
        source={require("../assets/images/board.png")}
        style={styles.boardImage}
      />

      {/* SWIPE ICONS */}
      <Image
        source={require("../assets/images/swipe_icons.png")}
        style={styles.swipeIcons}
      />
      <Text style={styles.swipeText}>Swipe to move tiles</Text>

      {/* RULE BOX */}
      <View style={styles.ruleBox}>
        <Text style={styles.rule}>• Swipe to move all tiles</Text>
        <Text style={styles.rule}>• Same numbers merge into one</Text>
        <Text style={styles.rule}>• Each merge adds score</Text>
        <Text style={styles.rule}>• Reach 2048 to win 🎉</Text>
      </View>

      {/* 2048 TILE */}
      <Image
        source={require("../assets/images/tile_2048.png")}
        style={styles.tile2048}
      />
      <Text style={styles.winText}>You win when you reach this tile!</Text>

      {/* GOT IT */}
      <TouchableOpacity
        style={styles.gotItBtn}
        activeOpacity={0.9}
        onPress={() => router.replace("/game?size=4")}
      >
        <Text style={styles.gotItText}>GOT IT!</Text>
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#776E65",
  },
  boardImage: {
    width: "100%",
    display: "flex",
    resizeMode: "contain",
    height: 140,
    marginTop: 40,
  },

  swipeIcons: {
    width: "100%",
    height: 70,
    resizeMode: "contain",
    marginTop: 6,
  },

  swipeText: {
    textAlign: "center",
    color: "#776E65",
    fontSize: 16,
    marginTop: 4,
    fontWeight: "900",
  },

  ruleBox: {
    marginTop: 14,
    backgroundColor: "#EEE4DA",
    borderRadius: 12,
    padding: 14,
    borderWidth: 4,
    borderColor: "#e9dcc7",
  },

  rule: {
    color: "#776E65",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
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
    marginTop: 18,
    backgroundColor: "#F59563",
    alignSelf: "center",
    paddingHorizontal: 60,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 4,
  },

  gotItText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "800",
  },
});
