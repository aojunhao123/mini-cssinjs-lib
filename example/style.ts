import { css } from "../src/index";

const button1ClassName = css`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #45a049;
  }
`;

// support tag template literal
const bgColor = "#2196f3";
const color = "white";
const padding = 15;
const fontSize = 16;
const margin = 4;
const borderRadius = 4;
const hoverBgColor = "#1976d2";

const button2ClassName = css`
  background-color: ${bgColor};
  border: none;
  color: ${color};
  padding: ${padding}px ${padding * 2}px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: ${fontSize}px;
  margin: ${margin}px ${margin / 2}px;
  cursor: pointer;
  border-radius: ${borderRadius}px;

  &:hover {
    background-color: ${hoverBgColor};
  }
`;

document.querySelector(".button1")?.classList.add(button1ClassName);
document.querySelector(".button2")?.classList.add(button2ClassName);
