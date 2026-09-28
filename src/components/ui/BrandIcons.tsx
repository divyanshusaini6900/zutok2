type P = { className?: string };

export function WhatsAppIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.3 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.1 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.2-.2-.5-.3Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MessengerIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.1 7.1v3.3l3-1.7c.9.3 1.9.4 2.9.4 5.6 0 10-4.1 10-9.6S17.6 2 12 2Zm1 12.9-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7-5.5 5.8Z"
      />
    </svg>
  );
}

export function TelegramIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M21.7 3.3 2.9 10.6c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L23 4.8c.3-1.3-.5-1.9-1.3-1.5ZM8.4 13.4l9.6-6c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-5Z"
      />
    </svg>
  );
}

export function ShopifyIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M15.6 4.4s-.3.1-.8.2a5 5 0 0 0-.4-.9c-.5-1-1.2-1.4-2.1-1.4h-.2l-.2-.2A1.6 1.6 0 0 0 10.6 1.7C9 1.7 7.4 2.9 6.2 5c-.9 1.4-1.5 3.2-1.7 4.6L1.8 10.4c-.8.3-.8.3-.9 1L0 20.8 16.9 24 21 23l-4.9-18.6-.5.1ZM12.3 5.4l-2.4.7c.2-.9.7-1.9 1.3-2.5.2-.2.5-.4.8-.6.3.7.3 1.6.3 2.4Zm-1.6-3c.3 0 .5.1.7.2-.3.2-.7.4-1 .8a6 6 0 0 0-1.5 3.1l-2 .6c.4-2 2-4.7 3.8-4.7Zm1.9 8.8c-.9-.4-1.7-.3-2.6.2-1.6.9.2 2.2.1 3.4-.2 3-3.9 2.8-4.7 1.9l.6-2.2s1.4 1.2 2.3.6c.8-.5-.2-1.3-.4-2.2-.6-2.4 2.9-4.9 5.5-3.7l-.8 2Zm.6-6.1c0-.7-.1-1.8-.4-2.6 1 .2 1.5 1.3 1.7 2l-1.3.6Z"
      />
    </svg>
  );
}

export function WooIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M3 5h18a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-6l1 3-4-3H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm1.4 2.6c-.4 0-.6.4-.5.8l1.1 5.2c.1.5.7.6 1 .2l1.6-2.8 1 2.6c.2.5.8.5 1 .1 1.2-2.4 1.8-4.6 1.8-5.4 0-.4-.4-.7-.8-.6-.3.1-.5.3-.5.6-.2 1.1-.6 2.3-1.1 3.4L7.9 9.3c-.2-.4-.7-.4-.9 0l-1.3 2.4-.7-3.5c-.1-.4-.3-.6-.6-.6Zm11 1c-1.5 0-2.4 1.4-2.4 2.9s.8 2.4 1.9 2.4c1.5 0 2.4-1.4 2.4-2.9s-.8-2.4-1.9-2.4Zm0 1.4c.5 0 .7.5.7 1.1 0 .8-.4 1.4-.9 1.4s-.7-.5-.7-1.1c0-.8.4-1.4.9-1.4Zm4.6-1.4c-1.5 0-2.4 1.4-2.4 2.9s.8 2.4 1.9 2.4c1.5 0 2.4-1.4 2.4-2.9s-.8-2.4-1.9-2.4Zm0 1.4c.5 0 .7.5.7 1.1 0 .8-.4 1.4-.9 1.4s-.7-.5-.7-1.1c0-.8.4-1.4.9-1.4Z"
      />
    </svg>
  );
}

export function GoogleIcon({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-1.9 3.3-4.8 3.3-8.1Z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
    </svg>
  );
}

export const channelMeta = [
  { key: "whatsapp", label: "WhatsApp", color: "#25d366", Icon: WhatsAppIcon },
  { key: "instagram", label: "Instagram", color: "#e1306c", Icon: InstagramIcon },
  { key: "messenger", label: "Messenger", color: "#0a7cff", Icon: MessengerIcon },
  { key: "telegram", label: "Telegram", color: "#29a9eb", Icon: TelegramIcon },
] as const;
