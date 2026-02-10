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
};
