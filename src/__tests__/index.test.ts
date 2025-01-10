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
    const className = css`
      color: ${color};
      font-size: ${fontSize};
    `;

    expect(mockStyleElement.textContent).toContain("color: blue");
    expect(mockStyleElement.textContent).toContain("font-size: 14px");
  });

  it("should handle nested interpolations", () => {
    const margin = "20px";
    const padding = { top: "10px", bottom: "15px" };
    const className = css`
      margin: ${margin};
      padding-top: ${padding.top};
      padding-bottom: ${padding.bottom};
    `;

    expect(mockStyleElement.textContent).toContain("margin: 20px");
    expect(mockStyleElement.textContent).toContain("padding-top: 10px");
    expect(mockStyleElement.textContent).toContain("padding-bottom: 15px");
  });
});
