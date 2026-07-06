declare module "page-flip" {
  export interface PageFlipSettings {
    width: number;
    height: number;
    size?: "fixed" | "stretch";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    startPage?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    useMouseEvents?: boolean;
    disableFlipByClick?: boolean;
  }

  export type FlipEventData = {
    data: number;
    object: PageFlip;
  };

  export type PageFlipState = "user_fold" | "fold_corner" | "flipping" | "read";

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromHTML(items: NodeList | HTMLElement[]): void;
    loadFromImages(images: string[]): void;
    flip(pageNum: number, corner?: "top" | "bottom"): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    on(event: "flip", callback: (e: FlipEventData) => void): void;
    on(
      event: "changeState",
      callback: (e: { data: PageFlipState }) => void,
    ): void;
    on(
      event: "init",
      callback: (e: { data: number; mode: "portrait" | "landscape" }) => void,
    ): void;
    on(
      event: "changeOrientation",
      callback: (e: { data: "portrait" | "landscape" }) => void,
    ): void;
    destroy(): void;
  }
}
