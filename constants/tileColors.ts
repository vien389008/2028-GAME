// constants/tileColors.ts
// Gradient: nhạt → cam → đỏ (số càng lớn càng đỏ)

export const TILE_COLORS: Record<number, string> = {
  0: "#CDC1B4",

  // rất nhạt
  2: "#EEE4DA",
  4: "#EDE0C8",

  // cam nhạt
  8: "#F2B179",
  16: "#F59563",

  // cam rõ
  32: "#F67C5F",
  64: "#F65E3B",

  // cam đậm → đỏ cam
  128: "#F04A3A",
  256: "#E53935",

  // đỏ rõ
  512: "#D32F2F",
  1024: "#C62828",

  // đỏ đậm nhất (đỉnh game)
  2048: "#B71C1C",
  // 🔥 late game
  4096: "#8E0000", // đỏ sẫm
  8192: "#5F0000", // đỏ rất đậm
  16384: "#2B0000", // gần đen, cực hiếm

  // 🧨 ultra late game (6x6 vẫn có thể tới)
  32768: "#1A0010", // đen pha tím
  65536: "#120014", // tím than rất tối
  131072: "#0B0016", // gần như đen tuyệt đối
};
