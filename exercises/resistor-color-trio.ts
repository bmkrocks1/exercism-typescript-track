const ColorValue = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
} as const;

type Colors = Array<keyof typeof ColorValue>;

export function decodedResistorValue([first, second, third]: Colors) {
  let value =
    (ColorValue[first] * 10 + ColorValue[second]) * 10 ** ColorValue[third];

  if (value >= 1000000000) {
    return `${value / 1000000000} gigaohms`;
  }

  if (value >= 1000000) {
    return `${value / 1000000} megaohms`;
  }

  if (value >= 1000) {
    return `${value / 1000} kiloohms`;
  }

  return `${value} ohms`;
}
