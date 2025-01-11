import { css, extractCriticalStyles, clearStyles } from "../index";

describe("SSR Support", () => {
  beforeEach(() => {
    // 每个测试前清理样式
    clearStyles();
  });

  it("should generate consistent class names between server and client", () => {
    // 模拟服务器端渲染
    const serverClassName = css`
      color: blue;
      font-size: 16px;
    `;

    // 清理样式模拟客户端重新开始
    clearStyles();

    // 模拟客户端渲染
    const clientClassName = css`
      color: blue;
      font-size: 16px;
    `;

    // 确保服务器和客户端生成的类名相同
    expect(serverClassName).toBe(clientClassName);
  });

  it("should collect and extract critical CSS", () => {
    // 创建多个样式
    css`
      color: red;
      font-size: 14px;
    `;

    css`
      background: blue;
      padding: 10px;
    `;

    // 提取关键CSS
    const criticalCSS = extractCriticalStyles();

    // 验证CSS内容
    expect(criticalCSS).toContain("color: red");
    expect(criticalCSS).toContain("font-size: 14px");
    expect(criticalCSS).toContain("background: blue");
    expect(criticalCSS).toContain("padding: 10px");
  });

  it("should clear styles correctly", () => {
    // 创建一些样式
    css`
      color: green;
    `;

    // 提取并验证样式存在
    let criticalCSS = extractCriticalStyles();
    expect(criticalCSS).toContain("color: green");

    // 清理样式
    clearStyles();

    // 验证样式已被清理
    criticalCSS = extractCriticalStyles();
    expect(criticalCSS).toBe("");
  });

  it("should handle nested rules in SSR", () => {
    const className = css`
      color: blue;
      &:hover {
        color: red;
        transform: scale(1.1);
      }
    `;

    const criticalCSS = extractCriticalStyles();

    // 验证基础样式
    expect(criticalCSS).toContain("color: blue");

    // 验证嵌套规则
    expect(criticalCSS).toContain("&:hover");
    expect(criticalCSS).toContain("color: red");

    // 验证添加了浏览器前缀
    expect(criticalCSS).toContain("-webkit-transform: scale(1.1)");
    expect(criticalCSS).toContain("transform: scale(1.1)");
  });

  it("should maintain style order in SSR", () => {
    // 按特定顺序创建样式
    const class1 = css`
      color: red;
    `;
    const class2 = css`
      color: blue;
    `;
    const class3 = css`
      color: green;
    `;

    const criticalCSS = extractCriticalStyles();

    // 验证样式顺序
    const redIndex = criticalCSS.indexOf("color: red");
    const blueIndex = criticalCSS.indexOf("color: blue");
    const greenIndex = criticalCSS.indexOf("color: green");

    expect(redIndex).toBeLessThan(blueIndex);
    expect(blueIndex).toBeLessThan(greenIndex);
  });
});
