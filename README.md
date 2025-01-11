# Mini CSS-in-JS

一个用于学习 CSS-in-JS 原理的最小实现。

## 这是什么？

这是一个极简的 CSS-in-JS 实现，用于理解:

- CSS-in-JS 的核心工作原理
- 如何实现动态样式注入
- 服务端渲染(SSR)中的样式处理
- 浏览器前缀自动添加的实现

## 核心特性

✅ 动态生成 CSS 类名和样式注入  
✅ 支持模板字符串语法  
✅ 自动添加浏览器前缀  
✅ 支持嵌套规则（类似 SCSS）  
✅ 服务端渲染 (SSR) 支持  
✅ 零运行时依赖  
✅ TypeScript 支持

## 基础示例

```typescript
import { css } from "mini-cssinjs-lib";

// 最简单的用法
const className = css`
  color: blue;
  font-size: 16px;
`;

// 支持嵌套语法
const buttonClass = css`
  background: blue;

  &:hover {
    background: darkblue;
  }
`;
```

## SSR 示例

展示了如何在服务端处理样式：

```typescript
import { css, extractCriticalStyles, clearStyles } from "mini-cssinjs-lib";

// 服务端渲染示例
function renderApp() {
  clearStyles();

  const className = css`
    color: blue;
  `;

  const criticalCSS = extractCriticalStyles();

  return `
    <style>${criticalCSS}</style>
    <div class="${className}">Hello!</div>
  `;
}
```

## 本地运行

```bash
# 安装依赖
pnpm install

# 运行测试
pnpm test

# 开发模式
pnpm dev

# 运行 SSR 示例
pnpm start:ssr
```

## 项目结构

```
src/
  ├── index.ts          # 主入口
  ├── StyleCollector.ts # 样式收集器
  └── utils/
      └── prefixer.ts   # 浏览器前缀处理
```

## 学习要点

1. 样式注入原理：见 `src/index.ts`
2. 类名生成策略：见 `src/StyleCollector.ts`
3. 前缀处理实现：见 `src/utils/prefixer.ts`
4. SSR 处理方案：见 `example/ssr.ts`

## 参考资料

- [styled-components 原理](https://styled-components.com/docs/advanced#how-it-works)
- [CSS-in-JS 技术方案](https://github.com/MicheleBertoli/css-in-js)

## 注意

这是一个学习项目，不建议用于生产环境。如果需要在生产环境使用 CSS-in-JS，推荐：

- styled-components
- emotion
- ...
