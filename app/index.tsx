import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSharedValue, withTiming } from "react-native-reanimated";
import { Lang, TEXT } from "../constants/i18n";
import { getLanguage } from "../utils/storage";
export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const x = useSharedValue(0);
  x.value = withTiming(100);
  const [lang, setLang] = useState<Lang>("vi");

  // ✅ Mỗi lần screen được focus lại → load lại language
  useEffect(() => {
    if (isFocused) {
      getLanguage().then(setLang);
    }
  }, [isFocused]);

  // ✅ PHÒNG THỦ – không bao giờ crash
  const t = TEXT[lang] ?? TEXT.vi;

  const startGame = (size: number) => {
    router.push({ pathname: "/game", params: { size } });
  };

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/how-to-play")}>
          <Ionicons name="help-circle-outline" size={26} color="#776E65" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color="#776E65" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>2048</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
      </View>

      {/* Modes */}
      <View style={styles.modes}>
        <Mode
          title={t.modes.classic.title}
          desc={t.modes.classic.desc}
          onPress={() => startGame(4)}
        />
        <Mode
          title={t.modes.large.title}
          desc={t.modes.large.desc}
          onPress={() => startGame(5)}
        />
        <Mode
          title={t.modes.huge.title}
          desc={t.modes.huge.desc}
          onPress={() => startGame(6)}
        />
      </View>
    </View>
  );
}

/* ================= MODE ITEM ================= */

function Mode({
  title,
  desc,
  onPress,
}: {
  title: string;
  desc: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.mode}
      onPress={onPress}
    >
      <Text style={styles.modeTitle}>{title}</Text>
      <Text style={styles.modeDesc}>{desc}</Text>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  titleBox: {
    marginTop: 48,
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 64,
    fontWeight: "900",
    color: "#776E65",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    color: "#776E65",
    opacity: 0.8,
    textAlign: "center",
  },
  modes: {
    gap: 16,
  },
  mode: {
    backgroundColor: "#EEE4DA",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  modeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#776E65",
  },
  modeDesc: {
    fontSize: 14,
    marginTop: 4,
    color: "#776E65",
    opacity: 0.7,
  },
});
