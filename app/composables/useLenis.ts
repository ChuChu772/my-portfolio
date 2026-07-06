import Lenis from "lenis";

interface LenisInstance extends Lenis {}

interface RequestAnimationFrameCallback {
  (time: number): void;
}

let lenis: LenisInstance | null = null;

export const useLenis = (): LenisInstance | null => {
  if (!lenis) {
    lenis = new Lenis();

    const raf: RequestAnimationFrameCallback = (time: number): void => {
      lenis!.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  return lenis;
};
