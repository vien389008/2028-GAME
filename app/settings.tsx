import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Lang, TEXT } from "../constants/i18n";
import { isSoundEnabled, setSoundEnabled } from "../utils/sound";
import { getLanguage, setLanguage } from "../utils/storage";

/* ================= CONFIG ================= */

const IS_PUBLISHED = false;
const ANDROID_PACKAGE_NAME = "com.vienbv.game2048";

/* ========================================= */

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [sound, setSound] = useState(true);
  const [lang, setLang] = useState<Lang>("vi");

  const t = TEXT[lang];

  useEffect(() => {
    setSound(isSoundEnabled());
    getLanguage().then(setLang);
  }, []);

  const toggleSound = async () => {
    const v = !sound;
    setSound(v);
    await setSoundEnabled(v);
  };

  const changeLang = async (v: Lang) => {
    setLang(v);
    await setLanguage(v);
  };

  const handleRateUs = () => {
    if (!IS_PUBLISHED) {
      Alert.alert(t.rateTitle, t.rateMsg, [{ text: t.ok }]);
      return;
    }

    if (Platform.OS === "android") {
      Linking.openURL(`market://details?id=${ANDROID_PACKAGE_NAME}`);
    }
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={26} color="#776E65" />
        </TouchableOpacity>

        <Text style={styles.title}>{t.settings}</Text>

        {/* spacer để title luôn ở giữa */}
        <View style={{ width: 26 }} />
      </View>

      {/* SOUND */}
      <TouchableOpacity
        style={styles.button}
        onPress={toggleSound}
        activeOpacity={0.85}
      >
        <Ionicons
          name={sound ? "volume-high" : "volume-mute"}
          size={22}
          color="#776E65"
        />
        <Text style={styles.buttonText}>
          {t.sound}: {sound ? t.on : t.off}
        </Text>
      </TouchableOpacity>

      {/* LANGUAGE */}
      <View style={styles.langBox}>
        <Text style={styles.langTitle}>{t.language}</Text>

        <View style={styles.langRow}>
          <LangButton
            label={`🇻🇳 ${t.vietnamese}`}
            active={lang === "vi"}
            onPress={() => changeLang("vi")}
          />
          <LangButton
            label={`🇺🇸 ${t.english}`}
            active={lang === "en"}
            onPress={() => changeLang("en")}
          />
        </View>
      </View>

      <SettingButton icon="star" label={t.rate} onPress={handleRateUs} />
      <SettingButton
        icon="lock-closed"
        label={t.privacy}
        onPress={() => router.push("/privacy")}
      />
      <SettingButton
        icon="information-circle"
        label={t.info}
        onPress={() => router.push("/info")}
      />
    </View>
  );
}

/* ================= COMPONENTS ================= */

function SettingButton({
  icon,
  label,
  onPress,
  primary = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  primary?: boolean;
}) {
  return (
    <TouchableOpacity
      style={[styles.button, primary && styles.primary]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Ionicons name={icon} size={22} color={primary ? "#FFF" : "#776E65"} />
      <Text style={[styles.buttonText, primary && { color: "#FFF" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function LangButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[styles.langBtn, active && styles.langActive]}
    >
      <Text style={[styles.langText, active && { color: "#FFF" }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  /* ===== HEADER ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 80,
  },
  backBtn: {
    width: 26,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#776E65",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.12)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EEE4DA",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  primary: {
    backgroundColor: "#F67C5F",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#776E65",
  },

  langBox: {
    backgroundColor: "#EEE4DA",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  langTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#776E65",
    marginBottom: 12,
  },
  langRow: {
    flexDirection: "row",
    gap: 12,
  },
  langBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#CDC1B4",
    alignItems: "center",
  },
  langActive: {
    backgroundColor: "#F67C5F",
  },
  langText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#776E65",
  },
});
