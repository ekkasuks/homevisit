import { PDFDocument, PDFFont, PDFPage, rgb } from 'pdf-lib';
import type { Point, BoxRect } from './coordinates';
import { CHECK_GLYPH, FONT_SIZE } from './coordinates';

export interface DrawCtx { doc: PDFDocument; font: PDFFont; debug?: boolean }

export function page(ctx: DrawCtx, n: number): PDFPage {
  return ctx.doc.getPage(n - 1);
}

export function text(ctx: DrawCtx, pt: Point | null | undefined, value: any, size = FONT_SIZE.default) {
  if (!pt) return;
  if (value === null || value === undefined || value === '') return;
  const p = page(ctx, pt.page);
  p.drawText(String(value), {
    x: pt.x, y: pt.y, size, font: ctx.font, lineHeight: size + 2
  });
  if (ctx.debug) markDot(p, pt, 'red');
}

export function textRight(ctx: DrawCtx, pt: Point, value: any, size = FONT_SIZE.default) {
  if (value === null || value === undefined || value === '') return;
  const s = String(value);
  const w = ctx.font.widthOfTextAtSize(s, size);
  text(ctx, { ...pt, x: pt.x - w }, s, size);
}

export function check(ctx: DrawCtx, pt: Point | null | undefined, on: any) {
  if (!pt || !on) return;
  const p = page(ctx, pt.page);
  p.drawText(CHECK_GLYPH, { x: pt.x, y: pt.y, size: 11, font: ctx.font });
  if (ctx.debug) markDot(p, pt, 'blue');
}

export async function image(
  ctx: DrawCtx, box: BoxRect, url: string | undefined, mime: 'jpg' | 'png' = 'jpg'
) {
  if (!url) return;
  try {
    let bytes: ArrayBuffer;
    if (url.startsWith('data:')) {
      const base64 = url.split(',')[1];
      bytes = base64ToArrayBuffer(base64);
    } else {
      const res = await fetch(url, { mode: 'cors' });
      bytes = await res.arrayBuffer();
    }
    const embedded = mime === 'png'
      ? await ctx.doc.embedPng(bytes)
      : await ctx.doc.embedJpg(bytes);
    const scaled = fit(embedded.width, embedded.height, box.w, box.h);
    const p = page(ctx, box.page);
    p.drawImage(embedded, {
      x: box.x + (box.w - scaled.w) / 2,
      y: box.y + (box.h - scaled.h) / 2,
      width: scaled.w, height: scaled.h
    });
  } catch (e) {
    console.warn('image embed failed:', url, e);
  }
}

function fit(w: number, h: number, bw: number, bh: number) {
  const r = Math.min(bw / w, bh / h);
  return { w: w * r, h: h * r };
}

function markDot(p: PDFPage, pt: Point, color: 'red' | 'blue') {
  const c = color === 'red' ? rgb(1, 0, 0) : rgb(0, 0, 1);
  p.drawCircle({ x: pt.x, y: pt.y, size: 1.5, color: c });
}

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const buf = new ArrayBuffer(bin.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
  return buf;
}
