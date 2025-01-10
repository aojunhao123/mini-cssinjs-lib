import { css } from "../index";

describe("css", () => {
  let mockStyleElement: HTMLStyleElement;
  let originalGetElementById: typeof document.getElementById;
  let originalCreateElement: typeof document.createElement;
  let originalAppendChild: typeof document.head.appendChild;

  beforeEach(() => {
    mockStyleElement = document.createElement("style");
    originalGetElementById = document.getElementById;
    originalCreateElement = document.createElement;
    originalAppendChild = document.head.appendChild;

    document.head.appendChild = jest.fn();
    document.createElement = jest.fn().mockReturnValue(mockStyleElement);
    document.getElementById = jest.fn().mockReturnValue(null);
  });

  afterEach(() => {
    document.getElementById = originalGetElementById;
    document.createElement = originalCreateElement;
    document.head.appendChild = originalAppendChild;
  });

  it("should be a function", () => {
    expect(typeof css).toBe("function");
  });

  it("should return a class name string", () => {
    const className = css("color: blue;");
    expect(typeof className).toBe("string");
    expect(className).toMatch(/^css-/);
  });

  it("should inject styles to document", () => {
    const className = css("color: blue;");

    expect(document.head.appendChild).toHaveBeenCalled();
    expect(mockStyleElement.textContent).toContain("color: blue");
    expect(mockStyleElement.textContent).toContain(className);
  });

  it("should support template literals", () => {
    const color = "blue";
    const fontSize = "14px";
    css`
      color: ${color};
      font-size: ${fontSize};
    `;

    expect(mockStyleElement.textContent).toContain("color: blue");
    expect(mockStyleElement.textContent).toContain("font-size: 14px");
  });

  it("should handle nested interpolations", () => {
    const margin = "20px";
    const padding = { top: "10px", bottom: "15px" };
    css`
      margin: ${margin};
      padding-top: ${padding.top};
      padding-bottom: ${padding.bottom};
    `;

    expect(mockStyleElement.textContent).toContain("margin: 20px");
    expect(mockStyleElement.textContent).toContain("padding-top: 10px");
    expect(mockStyleElement.textContent).toContain("padding-bottom: 15px");
  });

  it("should add vendor prefixes to supported properties", () => {
    css`
      transform: scale(1.2);
      user-select: none;
      display: flex;
      flex-direction: column;
    `;

    const style = mockStyleElement.textContent || "";

    // 检查是否添加了浏览器前缀
    expect(style).toContain("-webkit-transform: scale(1.2)");
    expect(style).toContain("-moz-transform: scale(1.2)");
    expect(style).toContain("-ms-transform: scale(1.2)");
    expect(style).toContain("transform: scale(1.2)");

    expect(style).toContain("-webkit-user-select: none");
    expect(style).toContain("-moz-user-select: none");
    expect(style).toContain("-ms-user-select: none");
    expect(style).toContain("user-select: none");

    expect(style).toContain("-webkit-flex-direction: column");
    expect(style).toContain("flex-direction: column");
  });

  it("should not add prefixes to standard properties", () => {
    css`
      color: blue;
      margin: 10px;
    `;

    const style = mockStyleElement.textContent || "";

    // 检查是否没有添加不必要的前缀
    expect(style.match(/color: blue/g)?.length).toBe(1);
    expect(style.match(/margin: 10px/g)?.length).toBe(1);
  });
});
