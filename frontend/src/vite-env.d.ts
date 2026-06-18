/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_DAILY_PIN: string;
  readonly VITE_PDF_TEMPLATE: string;
  readonly VITE_PDF_DEBUG: string;
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
