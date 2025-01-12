import { addVendorPrefixes } from "./utils/prefixer";
import { styleCollector } from "./StyleCollector";

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

function injectStyle(className: string, cssText: string): void {
  // 在浏览器环境下才注入 DOM
  if (typeof document !== "undefined") {
    const style = getStyleElement();
    style.textContent += `\n.${className} { ${cssText} }`;
  }
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
    cssText = styles.reduce((result, str, i) => {
      const interpolation =
        i < interpolations.length ? String(interpolations[i]) : "";
      return result + str + interpolation;
    }, "");
  }

  // 清理和添加前缀
  cssText = cssText
    .trim()
    .replace(/\n\s+/g, " ")
    .replace(/\s{2,}/g, " ");
  cssText = addVendorPrefixes(cssText);

  // 使用 StyleCollector 生成类名
  const className = styleCollector.generateClassName();

  // 收集样式
  styleCollector.addStyle(className, cssText);

  // 在客户端环境下注入样式
  if (typeof document !== "undefined") {
    injectStyle(className, cssText);
  }

  return className;
}

export function extractCriticalStyles(): string {
  return styleCollector.getStyleString();
}

export function clearStyles(): void {
  styleCollector.clear();
}
