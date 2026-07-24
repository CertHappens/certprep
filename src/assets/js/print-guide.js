const printButtons = document.querySelectorAll("[data-print-guide]");

for (const button of printButtons) {
  button.addEventListener("click", () => {
    window.print();
  });
}
