import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TILE_COLORS } from "../constants/tileColors";

import { Lang, TEXT } from "../constants/i18n";
import { getLanguage } from "../utils/storage";

export default function HowToPlayScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  /* ===== I18N ===== */
  const [lang, setLang] = useState<Lang>("vi");
  const t = TEXT[lang] ?? TEXT.vi;

  useFocusEffect(
    useCallback(() => {
      getLanguage().then((v) => {
        if (v === "vi" || v === "en") setLang(v);
        else setLang("vi");
      });
    }, []),
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back" size={16} color="#FFF" />
          <Text style={styles.backText}>{t.back.toUpperCase()}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>{t.howToPlayTitle.toUpperCase()}</Text>
      </View>

      {/* DESCRIPTION */}
      <Text style={styles.desc}>{t.howToPlayDesc1}</Text>

      <Text style={[styles.desc, { marginBottom: 24 }]}>
        {t.howToPlayDesc2}
      </Text>

      {/* EXAMPLES */}
      <View style={styles.grid}>
        <ExampleRow values={[2, 2, 4]} />
        <ExampleRow values={[4, 4, 8]} />
        <ExampleRow values={[512, 512, 1024]} />
        <ExampleRow values={[1024, 1024, 2048]} />
      </View>

      <Text style={styles.footer}>{t.howToPlayFooter}</Text>

      {/* PLAY */}
      <TouchableOpacity
        style={styles.playBtn}
        onPress={() => router.replace("/game?size=4")}
        activeOpacity={0.9}
      >
        <Text style={styles.playText}>{t.play.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ===== COMPONENTS ===== */

function ExampleRow({ values }: { values: number[] }) {
  return (
    <View style={styles.row}>
      {values.map((v, i) => (
        <React.Fragment key={`${v}-${i}`}>
          <View style={[styles.tile, { backgroundColor: TILE_COLORS[v] }]}>
            <Text style={[styles.tileText, v >= 8 && styles.tileTextLight]}>
              {v}
            </Text>
          </View>

          {i < values.length - 1 && <Text style={styles.arrow}>→</Text>}
        </React.Fragment>
      ))}
    </View>
  );
}

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },

  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8F7A66",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 14,
  },

  backText: {
    color: "#FFF",
    fontWeight: "700",
    marginLeft: 6,
    fontSize: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#F67C5F",
  },

  desc: {
    textAlign: "center",
    color: "#776E65",
    lineHeight: 22,
    fontSize: 15,
  },

  grid: {
    alignItems: "center",
    gap: 18,
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  arrow: {
    fontSize: 22,
    marginHorizontal: 10,
    color: "#F67C5F",
    fontWeight: "700",
  },

  tile: {
    width: 72,
    height: 72,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  tileText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#776E65",
  },

  tileTextLight: {
    color: "#FFF",
  },

  footer: {
    textAlign: "center",
    marginTop: 16,
    color: "#776E65",
    fontSize: 16,
    fontWeight: "600",
  },

  playBtn: {
    marginTop: 28,
    alignSelf: "center",
    backgroundColor: "#F67C5F",
    paddingHorizontal: 64,
    paddingVertical: 16,
    borderRadius: 36,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  playText: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 1,
  },
});
