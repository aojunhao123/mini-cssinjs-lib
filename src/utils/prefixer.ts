// 需要添加前缀的属性列表
const PREFIXED_PROPERTIES = [
  "animation",
  "animationDelay",
  "animationDirection",
  "animationDuration",
  "animationFillMode",
  "animationIterationCount",
  "animationName",
  "animationPlayState",
  "animationTimingFunction",
  "transform",
  "transformOrigin",
  "transformStyle",
  "transition",
  "transitionDelay",
  "transitionDuration",
  "transitionProperty",
  "transitionTimingFunction",
  "userSelect",
  "flexDirection",
  "flexWrap",
  "flex",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "justifyContent",
  "alignItems",
  "alignContent",
  "order",
] as const;

const VENDORS = ["-webkit-", "-moz-", "-ms-", "-o-"] as const;

// 将驼峰命名转换为连字符命名
function hyphenate(str: string): string {
  return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

// 将连字符命名转换为驼峰命名
function camelize(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// 检查属性是否需要添加前缀
function shouldPrefix(property: string): boolean {
  // 先将属性名转换为驼峰命名再进行比较
  const camelizedProperty = camelize(property);
  return PREFIXED_PROPERTIES.includes(camelizedProperty as any);
}

// 为单个声明添加前缀
function prefixDeclaration(property: string, value: string): string {
  if (!shouldPrefix(property)) {
    return `${hyphenate(property)}: ${value};`;
  }

  return (
    VENDORS.map((vendor) => `${vendor}${hyphenate(property)}: ${value};`).join(
      "\n"
    ) + `\n${hyphenate(property)}: ${value};`
  );
}

// 解析CSS文本并添加前缀
export function addVendorPrefixes(cssText: string): string {
  // 将CSS文本分割成单独的声明
  const declarations = cssText.split(";").filter(Boolean);

  return declarations
    .map((declaration) => {
      const [property, ...valueParts] = declaration.split(":");
      if (!property) return "";

      const trimmedProperty = property.trim();
      const value = valueParts.join(":").trim();

      return prefixDeclaration(trimmedProperty, value);
    })
    .filter(Boolean)
    .join("\n");
}
