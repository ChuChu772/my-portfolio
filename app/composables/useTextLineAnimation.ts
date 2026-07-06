// composables/useTextLineAnimation.ts
import { type Ref } from "vue";
import gsap from "gsap";

interface Options {
  stagger?: number;
  duration?: number;
  y?: number;
  delay?: number;
}

interface ExitOptions {
  stagger?: number;
  duration?: number;
  y?: number;
}

interface AnimateHandle {
  playOut: (options?: ExitOptions) => Promise<void>;
  restore: () => void;
}

export function animateTextLines(
  el: HTMLElement,
  options: Options = {},
): AnimateHandle {
  const { stagger = 0.06, duration = 0.6, y = 12, delay = 0 } = options;
  const original = el.innerHTML;
  const text = el.innerText;

  // 先藏起來，避免拆行過程中閃爍
  el.style.opacity = "0";

  el.innerHTML = "";

  // 每個字元各自一個 span
  const charSpans: HTMLSpanElement[] = [];
  Array.from(text).forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline";
    el.appendChild(span);
    charSpans.push(span);
  });

  // 強制 reflow
  void el.offsetHeight;

  // 依 getBoundingClientRect().top 分行
  const lines: HTMLSpanElement[][] = [];
  let currentLine: HTMLSpanElement[] = [];
  let currentTop = -1;

  charSpans.forEach((span) => {
    const top = Math.round(span.getBoundingClientRect().top);
    if (currentTop === -1) currentTop = top;
    if (Math.abs(top - currentTop) > 2) {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [];
      currentTop = top;
    }
    currentLine.push(span);
  });
  if (currentLine.length) lines.push(currentLine);

  // 每行合併成一個 wrapper
  el.innerHTML = "";
  const lineWrappers: HTMLSpanElement[] = [];

  lines.forEach((lineChars) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "block";
    wrapper.style.overflow = "hidden";

    const inner = document.createElement("span");
    inner.style.display = "block";
    inner.textContent = lineChars.map((s) => s.textContent).join("");
    wrapper.appendChild(inner);
    el.appendChild(wrapper);
    lineWrappers.push(inner);
  });

  // DOM 準備好，把 el 顯示回來，讓 gsap 從 opacity:0 接手 inner
  el.style.opacity = "1";

  gsap.from(lineWrappers, {
    y,
    opacity: 0,
    duration,
    ease: "power1.inOut",
    stagger,
    delay,
    clearProps: "all",
  });

  // 離場：每行反向動畫淡出 + 往上飄走，播完才 resolve
  function playOut(exitOptions: ExitOptions = {}): Promise<void> {
    const {
      stagger: outStagger = 0.03,
      duration: outDuration = 0.4,
      y: outY = -y,
    } = exitOptions;

    return new Promise((resolve) => {
      gsap.to(lineWrappers, {
        y: outY,
        opacity: 0,
        duration: outDuration,
        ease: "power1.in",
        stagger: outStagger,
        onComplete: () => resolve(),
      });
    });
  }

  // 把 DOM 還原成原本的樣子（通常在 playOut 播完之後呼叫）
  function restore(): void {
    el.innerHTML = original;
    el.style.opacity = "";
  }

  return { playOut, restore };
}

export function useTextLineAnimation(
  elRef: Ref<HTMLElement | null>,
  options: Options = {},
) {
  let handle: AnimateHandle | null = null;

  function run(): void {
    if (!elRef.value) return;
    handle = animateTextLines(elRef.value, options);
  }

  async function playOut(exitOptions?: ExitOptions): Promise<void> {
    if (!handle) return;
    await handle.playOut(exitOptions);
  }

  function restore(): void {
    handle?.restore();
    handle = null;
  }

  // 保留舊 API 名稱相容：stop() 等同立即還原（不播放退場動畫）
  function stop(): void {
    restore();
  }

  return { run, playOut, restore, stop };
}
