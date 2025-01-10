import { addVendorPrefixes } from "./utils/prefixer";

// 用于生成唯一的类名
let counter = 0;
function generateClassName(): string {
  return `css-${(counter++).toString(36)}`;
}

// 创建或获取 style 标签
function getStyleElement(): HTMLStyleElement {
  const id = "__mini_cssinjs";
  let element = document.getElementById(id) as HTMLStyleElement;

  if (!element) {
    element = document.createElement("style");
    element.id = id;
    document.head.appendChild(element);
  }

  return element;
}

// 注入样式到 DOM
function injectStyle(className: string, cssText: string): void {
  const style = getStyleElement();
  style.textContent += `\n.${className} { ${cssText} }`;
}

export function css(
  styles: string | TemplateStringsArray,
  ...interpolations: any[]
): string {
  // 处理样式内容
  let cssText = "";

  if (typeof styles === "string") {
    cssText = styles;
  } else {
    // 处理模板字面量
    cssText = styles.reduce((result, str, i) => {
      // 处理插值，确保转换为字符串
      const interpolation =
        i < interpolations.length ? String(interpolations[i]) : "";
      return result + str + interpolation;
    }, "");
  }

  // 清理多余的空白字符
  cssText = cssText
    .trim()
    .replace(/\n\s+/g, " ")
    .replace(/\s{2,}/g, " ");

  // 在注入样式之前添加浏览器前缀
  cssText = addVendorPrefixes(cssText);

  // 生成唯一类名
  const className = generateClassName();

  // 注入样式
  if (typeof document !== "undefined") {
    injectStyle(className, cssText);
  }

  return className;
}
