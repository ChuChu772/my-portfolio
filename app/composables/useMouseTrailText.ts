import { onBeforeUnmount } from "vue";

interface UseMouseTrailTextOptions {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  triggerDistance?: number;
  maxWords?: number;
  zIndex?: number;
}

interface BindResult {
  cleanup: () => void;
  fadeOutAll: () => Promise<void>; // 新增：清除所有文字，回傳 Promise 等待動畫結束
}

export function useMouseTrailText(options: UseMouseTrailTextOptions): {
  bind: (el: HTMLElement) => BindResult;
} {
  const {
    text,
    fontSize = 17,
    fontFamily = "monospace",
    maxWords = 20,
    zIndex = 9999,
  } = options;

  const words = text.split(" ").filter(Boolean);

  function createContainer(): HTMLElement {
    const el = document.createElement("div");
    Object.assign(el.style, {
      position: "fixed",
      left: "0",
      top: "0",
      width: "0",
      height: "0",
      pointerEvents: "none",
      color: "black",
      // mixBlendMode: "difference",
      zIndex: String(zIndex),
    });
    document.body.appendChild(el);
    return el;
  }

  function createMeasureSpan(): HTMLSpanElement {
    const span = document.createElement("span");
    Object.assign(span.style, {
      position: "fixed",
      visibility: "hidden",
      whiteSpace: "pre",
      font: `${fontSize}px ${fontFamily}`,
    });
    document.body.appendChild(span);
    return span;
  }

  function getTextWidth(measureSpan: HTMLSpanElement, word: string): number {
    measureSpan.textContent = word;
    return measureSpan.offsetWidth;
  }

  function fadeOutWord(wordEl: HTMLElement): Promise<void> {
    return new Promise((resolve) => {
      const letters = Array.from(wordEl.children) as HTMLElement[];
      letters.forEach((char, i) => {
        setTimeout(() => {
          char.style.opacity = "0";
        }, i * 50);
      });
      const totalTime = letters.length * 50 + 300;
      setTimeout(() => {
        wordEl.parentNode?.removeChild(wordEl);
        resolve();
      }, totalTime);
    });
  }

  function showWord(
    container: HTMLElement,
    measureSpan: HTMLSpanElement,
    word: string,
    x: number,
    y: number,
    movingRight: boolean,
  ): void {
    const wordEl = document.createElement("span");
    const width = getTextWidth(measureSpan, word);

    Object.assign(wordEl.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y - 20}px`,
      width: `${width}px`,
      display: "inline-block",
      textAlign: "center",
      whiteSpace: "nowrap",
      font: `${fontSize}px ${fontFamily}`,
      transform: movingRight ? "translateX(-100%)" : "",
    });
    container.appendChild(wordEl);

    word.split("").forEach((char, i) => {
      const charEl = document.createElement("span");
      charEl.textContent = char;
      Object.assign(charEl.style, {
        display: "inline-block",
        opacity: "0",
        transform: "translateX(-5px)",
      });
      wordEl.appendChild(charEl);
      setTimeout(() => {
        charEl.style.transition = "opacity 0.1s ease, transform 0.1s ease";
        charEl.style.opacity = "1";
        charEl.style.transform = "translateX(0)";
      }, i * 70);
    });

    const excess = Array.from(container.children).slice(
      0,
      container.children.length - maxWords,
    );
    excess.forEach((el) => fadeOutWord(el as HTMLElement));
    setTimeout(() => {
      if (!wordEl.isConnected) return;
      fadeOutWord(wordEl);
    }, 3000);
  }

  function bind(targetEl: HTMLElement): BindResult {
    const container = createContainer();
    const measureSpan = createMeasureSpan();

    let wordIndex = 0;
    let isActive = false;
    let lastX = 0,
      lastY = 0,
      accumulated = 0;
    let isClearing = false;

    function onMouseEnter(e: MouseEvent): void {
      isActive = true;
      wordIndex = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      accumulated = 0;
    }
    function onMouseLeave(): void {
      isActive = false;
    }
    function onMouseMove(e: MouseEvent): void {
      if (!isActive) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      accumulated += Math.sqrt(dx * dx + dy * dy);
      const word = words[wordIndex % words.length] ?? "";
      if (!word) return;
      const threshold = getTextWidth(measureSpan, word) + 10;
      if (accumulated >= threshold) {
        showWord(container, measureSpan, word, e.clientX, e.clientY, dx > 0);
        accumulated -= threshold;
        wordIndex++;
      }
      lastX = e.clientX;
      lastY = e.clientY;
    }
    function onScroll(): void {
      if (isClearing) return;
      isClearing = true;
      Array.from(container.children).forEach((el) =>
        fadeOutWord(el as HTMLElement),
      );
      setTimeout(() => {
        isClearing = false;
      }, 1000);
    }

    targetEl.addEventListener("mouseenter", onMouseEnter);
    targetEl.addEventListener("mouseleave", onMouseLeave);
    targetEl.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // 清除所有文字，等最後一個 fadeOut 完成才 resolve
    function fadeOutAll(): Promise<void> {
      isActive = false;
      const all = Array.from(container.children) as HTMLElement[];
      if (all.length === 0) return Promise.resolve();
      return Promise.all(all.map((el) => fadeOutWord(el))).then(() => {});
    }

    function cleanup(): void {
      targetEl.removeEventListener("mouseenter", onMouseEnter);
      targetEl.removeEventListener("mouseleave", onMouseLeave);
      targetEl.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      container.parentNode?.removeChild(container);
      measureSpan.parentNode?.removeChild(measureSpan);
    }

    return { cleanup, fadeOutAll };
  }

  return { bind };
}
