function init() {
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
