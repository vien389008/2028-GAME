import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Lang, TEXT } from "../constants/i18n";
import { getLanguage } from "../utils/storage";

export default function PrivacyScreen() {
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
          paddingTop: insets.top + 24,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text style={styles.title}>{t.privacy}</Text>

      {/* CONTENT */}
      <Text style={styles.text}>
        {lang === "vi"
          ? "Quyền riêng tư của bạn rất quan trọng với chúng tôi."
          : "Your privacy is important to us."}
      </Text>

      <Text style={styles.text}>
        {lang === "vi"
          ? "Trò chơi này không thu thập, lưu trữ hoặc chia sẻ bất kỳ thông tin cá nhân nào."
          : "This game does not collect, store, or share any personal information."}
      </Text>

      <Text style={styles.text}>
        {lang === "vi"
          ? "Tất cả tiến trình trò chơi và cài đặt chỉ được lưu trữ cục bộ trên thiết bị của bạn."
          : "All game progress and settings are stored locally on your device only."}
      </Text>

      <Text style={styles.text}>
        {lang === "vi"
          ? "Chúng tôi không sử dụng quảng cáo, phân tích hay công cụ theo dõi của bên thứ ba."
          : "We do not use ads, analytics, or third-party tracking tools."}
      </Text>

      <Text style={styles.text}>
        {lang === "vi"
          ? "Khi sử dụng ứng dụng này, bạn đồng ý với Chính sách bảo mật."
          : "By using this app, you agree to this Privacy Policy."}
      </Text>

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

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#776E65",
    textAlign: "center",
    marginBottom: 24,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    color: "#776E65",
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "500",
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
});
