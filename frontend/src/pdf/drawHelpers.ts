import { PDFDocument, PDFFont, PDFPage, rgb } from 'pdf-lib';
import type { Point, BoxRect } from './coordinates';
import { FONT_SIZE } from './coordinates';
import { Photos } from '../api/photos';

export interface DrawCtx { doc: PDFDocument; font: PDFFont; }

export function page(ctx: DrawCtx, n: number): PDFPage {
  return ctx.doc.getPage(n - 1);
}

export function text(ctx: DrawCtx, pt: Point | null | undefined, value: any, size = FONT_SIZE.default) {
  if (!pt) return;
  if (value === null || value === undefined || value === '') return;
  const p = page(ctx, pt.page);
  p.drawText(String(value), { x: pt.x, y: pt.y, size, font: ctx.font, lineHeight: size + 2 });
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
  const black = rgb(0, 0, 0);
  // วาดเครื่องหมายถูก ✓ ด้วยเส้นสองเส้น
  p.drawLine({ start: { x: pt.x, y: pt.y + 3 }, end: { x: pt.x + 3, y: pt.y }, thickness: 1.5, color: black, opacity: 1 });
  p.drawLine({ start: { x: pt.x + 3, y: pt.y }, end: { x: pt.x + 9, y: pt.y + 7 }, thickness: 1.5, color: black, opacity: 1 });
}

export async function image(
  ctx: DrawCtx, box: BoxRect, url: string | undefined, mime: 'jpg' | 'png' = 'jpg'
) {
  if (!url) return;
  try {
    let bytes: ArrayBuffer;
    let actualMime = mime;
    if (url.startsWith('data:')) {
      bytes = base64ToArrayBuffer(url.split(',')[1]);
    } else {
      // รองรับทั้ง ?id=XXX, &id=XXX และ /d/XXX/
      const m = url.match(/[?&]id=([^&]+)/) || url.match(/\/d\/([^/]+)\//);
      const fileId = m ? m[1] : null;
      if (fileId) {
        const data = await Photos.fetch(fileId);
        bytes = base64ToArrayBuffer(data.base64);
        actualMime = data.mime_type.includes('png') ? 'png' : 'jpg';
      } else {
        const res = await fetch(url, { mode: 'cors' });
        bytes = await res.arrayBuffer();
      }
    }
    const embedded = actualMime === 'png'
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

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const buf = new ArrayBuffer(bin.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
  return buf;
}
