interface ImportMetaEnv {
  readonly VITE_PAYPAL_CLIENT_ID: string;
  readonly VITE_TICKETMASTER_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
