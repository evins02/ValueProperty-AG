type SkylineProps = {
  className?: string;
  tone?: "light" | "dark";
  style?: React.CSSProperties;
};

// Signature motif echoing the Value Property AG mark: an ascending skyline.
// Used sparingly as a structural device, not decoration.
export default function Skyline({ className, tone = "dark", style }: SkylineProps) {
  const bar = tone === "dark" ? "var(--gold-500)" : "var(--gold-300)";
  const bar2 = tone === "dark" ? "var(--sky-500)" : "#bcd7ec";
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 220 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="58" width="26" height="32" fill={bar} />
      <rect x="34" y="40" width="26" height="50" fill={bar2} />
      <rect x="68" y="20" width="26" height="70" fill={bar} />
      <rect x="102" y="4" width="26" height="86" fill={bar2} />
      <line x1="6" y1="70" x2="200" y2="14" stroke={bar2} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M190 10 L204 8 L200 22" stroke={bar2} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
