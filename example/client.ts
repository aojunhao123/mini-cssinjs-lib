import { css } from "../src";

// 复用与服务器端相同的样式生成函数
function createStyles() {
  const buttonClass = css`
    background: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;

    &:hover {
      background: darkblue;
    }
  `;

  const containerClass = css`
    display: flex;
    justify-content: center;
    padding: 20px;
  `;

  return { buttonClass, containerClass };
}

// 客户端初始化
function init() {
  // 注意：不需要重新生成样式类名，因为服务端已经生成
  // 只需要添加事件处理
  const button = document.querySelector("button");
  if (button) {
    console.log("Button found, adding click handler");
    button.addEventListener("click", () => {
      alert("Button clicked!");
    });
  } else {
    console.warn("Button not found");
  }
}

// 当 DOM 加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
