// Function to generate a random hex color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to update colors and hex code display
function generatePalette() {
  const blocks = document.querySelectorAll(".color-block");
  blocks.forEach((block) => {
    const lockIcon = block.querySelector(".fa-lock");
    if (lockIcon && lockIcon.classList.contains("locked")) return;

    const color = getRandomColor();
    block.style.backgroundColor = color;

    const codeDiv = block.querySelector(".color-code");
    if (codeDiv) {
      codeDiv.textContent = color;
    }
  });
}

// Helper function to convert rgb() to hex
function rgbToHex(rgb) {
  const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
  return result
    ? "#" +
        [result[1], result[2], result[3]]
          .map((x) => parseInt(x).toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase()
    : rgb;
}

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Generate button
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", generatePalette);
  }

  // Copy Palette button
  const copyBtn = document.getElementById("copy-palette-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const codes = [];
      document.querySelectorAll(".color-block").forEach((block) => {
        const bgColor = block.style.backgroundColor;
        const hex = rgbToHex(bgColor);
        codes.push(hex);

        const codeSpan = block.querySelector(".color-code");
        if (codeSpan) codeSpan.textContent = hex;
      });

      const paletteText = codes.join(", ");
      navigator.clipboard.writeText(paletteText).then(() => {
        alert("🎨 Palette copied to clipboard:\n" + paletteText);
      });
    });
  }

  // Copy single block on icon click
  const copyIcons = document.querySelectorAll(".fa-copy");
  copyIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const colorCode = icon
        .closest(".color-block")
        .querySelector(".color-code").innerText;

      navigator.clipboard.writeText(colorCode).then(() => {
        icon.classList.add("text-success");
        setTimeout(() => icon.classList.remove("text-success"), 1000);
      });
    });
  });

  // Toggle lock on lock icon click
  const lockIcons = document.querySelectorAll(".fa-lock");
  lockIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("locked");

      if (icon.classList.contains("locked")) {
        icon.style.color = "red";
        icon.setAttribute("title", "Locked");
      } else {
        icon.style.color = "white";
        icon.setAttribute("title", "Unlocked");
      }
    });
  });

  // Delete block and show reset button
  const closeIcons = document.querySelectorAll(".fa-times");
  closeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const block = icon.closest(".color-block");
      if (!block) return;

      // Clone the block for later restoration
      const blockClone = block.cloneNode(true);

      // Create Reset Button
      const resetBtn = document.createElement("button");
      resetBtn.textContent = "Reset";
      resetBtn.classList.add("reset-btn");
      resetBtn.style.padding = "10px 20px";
      resetBtn.style.margin = "10px auto";
      resetBtn.style.display = "block";
      resetBtn.style.cursor = "pointer";

      const parent = block.parentNode;
      parent.replaceChild(resetBtn, block);

      // Restore original block on reset
      resetBtn.addEventListener("click", () => {
        parent.replaceChild(blockClone, resetBtn);
        generatePalette(); // Optional: regenerate color

        // Rebind all icons in the restored block
        rebindIcons(blockClone);
      });
    });
  });

  // Generate initial colors
  generatePalette();
});

// Rebind icons for dynamic/clone content
function rebindIcons(block) {
  const lockIcon = block.querySelector(".fa-lock");
  if (lockIcon) {
    lockIcon.addEventListener("click", () => {
      lockIcon.classList.toggle("locked");
      if (lockIcon.classList.contains("locked")) {
        lockIcon.style.color = "red";
        lockIcon.setAttribute("title", "Locked");
      } else {
        lockIcon.style.color = "white";
        lockIcon.setAttribute("title", "Unlocked");
      }
    });
  }

  const copyIcon = block.querySelector(".fa-copy");
  if (copyIcon) {
    copyIcon.addEventListener("click", () => {
      const colorCode = block.querySelector(".color-code").innerText;
      navigator.clipboard.writeText(colorCode).then(() => {
        copyIcon.classList.add("text-success");
        setTimeout(() => copyIcon.classList.remove("text-success"), 1000);
      });
    });
  }

  const closeIcon = block.querySelector(".fa-times");
  if (closeIcon) {
    closeIcon.addEventListener("click", () => {
      const blockClone = block.cloneNode(true);
      const resetBtn = document.createElement("button");
      resetBtn.textContent = "Reset";
      resetBtn.classList.add("reset-btn");
      resetBtn.style.padding = "10px 20px";
      resetBtn.style.margin = "10px auto";
      resetBtn.style.display = "block";
      resetBtn.style.cursor = "pointer";

      // Added styles for white border, bold text, transparent background
      resetBtn.style.border = "2px solid white";
      resetBtn.style.background = "transparent";
      resetBtn.style.color = "white";
      resetBtn.style.fontWeight = "700";
      resetBtn.style.borderRadius = "4px";

      const parent = block.parentNode;
      parent.replaceChild(resetBtn, block);

      resetBtn.addEventListener("click", () => {
        parent.replaceChild(blockClone, resetBtn);
        generatePalette();
        rebindIcons(blockClone);
      });
    });
  }
}
// ========
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".palette-carousel");
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Lower value for smoother control
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".palette-carousel1");
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });

    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5; // Lower value for smoother control
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});

// ==================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const paletteCard = btn.closest(".palette-card");
      const hexCodes = Array.from(paletteCard.querySelectorAll(".color")).map(
        (el) => {
          // First try data-hex attribute
          let hex = el.getAttribute("data-hex");
          if (hex) return hex;

          // Fallback: convert computed background-color to hex
          const rgb = getComputedStyle(el).backgroundColor;
          return rgbToHex(rgb);
        }
      );

      const colorString = hexCodes.join(" ");
      navigator.clipboard
        .writeText(colorString)
        .then(() => {
          btn.textContent = "✅";
          setTimeout(() => (btn.textContent = "📋"), 1500);
        })
        .catch((err) => {
          console.error("Clipboard error:", err);
          btn.textContent = "❌";
          setTimeout(() => (btn.textContent = "📋"), 1500);
        });
    });
  });
});

// RGB to Hex helper
function rgbToHex(rgb) {
  const result = rgb.match(/\d+/g);
  if (!result) return "";
  return (
    "#" +
    result
      .slice(0, 3)
      .map((x) => parseInt(x).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}
