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
  const cssText = typeof styles === "string" ? styles : styles.raw.join("");

  // 生成唯一类名
  const className = generateClassName();

  // 注入样式
  if (typeof document !== "undefined") {
    injectStyle(className, cssText);
  }

  return className;
}
