const printButtons = document.querySelectorAll("[data-print-guide]");

for (const button of printButtons) {
  button.addEventListener("click", () => {
    window.print();
  });
}

if (printButtons.length > 0) {
  const watermark = document.createElement("div");
  watermark.className = "print-watermark";
  watermark.setAttribute("aria-hidden", "true");
  watermark.textContent = "CertHappens.com";
  document.body.append(watermark);

  const watermarkStyles = document.createElement("style");
  watermarkStyles.textContent = `
    .print-watermark {
      display: none;
    }

    @media print {
      .print-watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 1000;
        display: block;
        width: max-content;
        color: rgba(17, 17, 17, 0.035);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 86pt;
        font-weight: 700;
        line-height: 1;
        letter-spacing: 0.01em;
        pointer-events: none;
        transform: translate(-50%, -50%) rotate(-48deg);
        transform-origin: center;
        user-select: none;
        white-space: nowrap;
      }
    }
  `;
  document.head.append(watermarkStyles);
}
