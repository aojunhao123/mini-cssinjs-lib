import { css } from "../index";

describe("css", () => {
  it("should be a function", () => {
    expect(typeof css).toBe("function");
  });

  it("should return a class name string", () => {
    const className = css("color: blue;");
    expect(typeof className).toBe("string");
    expect(className).toMatch(/^css-/); // 类名应该以 css- 开头
  });

  it("should inject styles to document", () => {
    // 模拟 DOM 操作
    const mockStyleElement = document.createElement("style");
    const originalGetElementById = document.getElementById;

    document.head.appendChild = jest.fn();
    document.createElement = jest.fn().mockReturnValue(mockStyleElement);
    document.getElementById = jest.fn().mockReturnValue(null); // 首次调用返回 null，触发创建新元素

    const className = css("color: blue;");

    // 验证样式是否被注入
    expect(document.head.appendChild).toHaveBeenCalled();
    expect(mockStyleElement.textContent).toContain("color: blue");
    expect(mockStyleElement.textContent).toContain(className);

    // 清理 mock
    document.getElementById = originalGetElementById;
  });
});
