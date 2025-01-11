export class StyleCollector {
  private styles: Map<string, string>;
  private counter: number;

  constructor() {
    this.styles = new Map();
    this.counter = 0;
  }

  // 生成确定性的类名
  generateClassName(): string {
    return `css-${(this.counter++).toString(36)}`;
  }

  // 添加样式
  addStyle(className: string, cssText: string): void {
    this.styles.set(className, cssText);
  }

  // 获取所有收集的样式
  getStyleString(): string {
    let styleString = "";
    this.styles.forEach((cssText, className) => {
      styleString += `\n.${className} { ${cssText} }`;
    });
    return styleString;
  }

  // 清空收集器
  clear(): void {
    this.styles.clear();
    this.counter = 0;
  }
}

// 创建单例实例
export const styleCollector = new StyleCollector();
