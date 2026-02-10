import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Lang, TEXT } from "../constants/i18n";
import { getLanguage } from "../utils/storage";

export default function InfoScreen() {
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

  const version =
    Constants.expoConfig?.version || Constants.manifest?.version || "1.0.0";

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
      <Text style={styles.title}>{t.info}</Text>

      {/* INFO BOX */}
      <View style={styles.infoBox}>
        <Text style={styles.gameTitle}>2048</Text>

        <View style={styles.row}>
          <Text style={styles.label}>{t.version}</Text>
          <Text style={styles.value}>{version}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>{t.author}</Text>
          <Text style={styles.value}>Vien BV</Text>
        </View>
      </View>

      {/* BACK */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
        activeOpacity={0.85}
      >
        <Ionicons name="arrow-back" size={22} color="#FFF" />
        <Text style={styles.buttonText}>{t.back}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#776E65",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.12)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    textAlign: "center",
    marginBottom: 24,
  },

  button: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#F67C5F",
    borderRadius: 16,
    paddingVertical: 16,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFF",
  },

  primaryText: {
    color: "#FFF",
  },

  infoBox: {
    backgroundColor: "#EEE4DA",
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },

  gameTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#776E65",
    textAlign: "center",
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    fontSize: 16,
    color: "#776E65",
    opacity: 0.7,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776E65",
  },
});
