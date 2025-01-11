import { css, extractCriticalStyles, clearStyles } from "../src";
import express from "express";

const app = express();

// 模拟的React组件样式
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

// 服务器端渲染函数
function renderApp() {
  // 清理之前的样式
  clearStyles();

  // 创建样式
  const { buttonClass, containerClass } = createStyles();
  console.log("生成的类名:", { buttonClass, containerClass });

  // 获取关键CSS
  const criticalCSS = extractCriticalStyles();
  console.log("提取的 CSS:", criticalCSS);

  // 渲染HTML
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR Demo</title>
        <style id="__mini_cssinjs">${criticalCSS}</style>
      </head>
      <body>
        <div class="${containerClass}">
          <button class="${buttonClass}">Click me</button>
        </div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  `;
}

// 添加静态文件服务
app.use(express.static("dist-ssr"));

// 设置路由
app.get("/", (req, res) => {
  console.log("收到请求");
  const html = renderApp();
  console.log("生成的 HTML:", html);
  res.send(html);
});

// 启动服务器
app.listen(3009, () => {
  console.log("SSR demo running at http://localhost:3009");
});
