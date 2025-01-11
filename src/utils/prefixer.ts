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

// 新增：解析单个CSS规则块
function parseRuleBlock(css: string): {
  selector: string;
  declarations: string;
} {
  const [selector, ...rest] = css.split("{");
  const declarations = rest.join("{").replace("}", "").trim();
  return {
    selector: selector.trim(),
    declarations: declarations.trim(),
  };
}

// 新增：处理嵌套的CSS规则
function processNestedRules(cssText: string): string {
  // 移除所有换行符，便于处理
  const normalizedCss = cssText.replace(/\n/g, " ").trim();

  // 如果包含嵌套规则
  if (normalizedCss.includes("{") && normalizedCss.includes("}")) {
    // 先提取所有非嵌套的声明
    const outerDeclarations = normalizedCss
      .replace(/&[^{]+\{[^}]+\}/g, "") // 移除所有嵌套规则
      .split(";")
      .map((decl) => decl.trim())
      .filter(Boolean)
      .filter((decl) => !decl.includes("{") && !decl.includes("}"))
      .join(";");

    // 处理嵌套规则
    const nestedRules = normalizedCss.match(/&[^{]+\{[^}]+\}/g) || [];

    const processedRules = nestedRules
      .map((rule) => {
        const [selector, declarations] = rule.split("{").map((s) => s.trim());
        const cleanDeclarations = declarations.replace("}", "").trim();
        if (!cleanDeclarations) return "";

        // 处理嵌套规则内的声明
        const processedDeclarations = cleanDeclarations
          .split(";")
          .map((decl) => decl.trim())
          .filter(Boolean)
          .map((decl) => {
            const [prop, ...valueParts] = decl.split(":");
            return prefixDeclaration(prop.trim(), valueParts.join(":").trim());
          })
          .join("\n  ");

        return `${selector} {\n  ${processedDeclarations}\n}`;
      })
      .filter(Boolean);

    // 合并外层声明和嵌套规则
    const parts = [];
    if (outerDeclarations) parts.push(outerDeclarations);
    if (processedRules.length) parts.push(...processedRules);

    return parts.join("; ");
  }

  // 如果是单个声明，直接处理
  return addVendorPrefixes(normalizedCss);
}

// 修改：更新主函数以处理嵌套规则
export function addVendorPrefixes(cssText: string): string {
  // 如果包含嵌套规则，使用新的处理方法
  if (cssText.includes("{")) {
    return processNestedRules(cssText);
  }

  // 原有的单行声明处理逻辑
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
