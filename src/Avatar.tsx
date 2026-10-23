type ContactAvatarProps = {
  name: string | null;
};

const colorRanges = [
  { from: "A", to: "B", background: "#dcfce7", color: "#166534" },
  { from: "C", to: "D", background: "#dbeafe", color: "#1d4ed8" },
  { from: "E", to: "F", background: "#f3e8ff", color: "#7e22ce" },
  { from: "G", to: "H", background: "#fef3c7", color: "#92400e" },
  { from: "I", to: "J", background: "#ccfbf1", color: "#115e59" },
  { from: "K", to: "L", background: "#fce7f3", color: "#9d174d" },
  { from: "M", to: "N", background: "#e0e7ff", color: "#3730a3" },
  { from: "O", to: "P", background: "#ffedd5", color: "#9a3412" },
  { from: "Q", to: "R", background: "#fee2e2", color: "#991b1b" },
  { from: "S", to: "T", background: "#cffafe", color: "#155e75" },
  { from: "U", to: "V", background: "#ede9fe", color: "#5b21b6" },
  { from: "W", to: "Z", background: "#e2e8f0", color: "#334155" },
];

export default function ContactAvatar({ name }: ContactAvatarProps) {
  const words = (name ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const normalizeInitial = (word: string) =>
    word
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .charAt(0)
      .toUpperCase();

  const initials =
    words.length === 0
      ? "?"
      : words.length === 1
        ? normalizeInitial(words[0])
        : normalizeInitial(words[0]) +
          normalizeInitial(words[words.length - 1]);

  const firstInitial = initials.charAt(0);

  const colorRange = colorRanges.find(
    (range) =>
      firstInitial >= range.from && firstInitial <= range.to,
  );

  const background = colorRange?.background ?? "#e2e8f0";
  const color = colorRange?.color ?? "#334155";

  return (
    <span
      title={name ?? "Unknown contact"}
      aria-label={`${name ?? "Unknown contact"}, initials ${initials}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        flexShrink: 0,
        borderRadius: "50%",
        backgroundColor: background,
        color,
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {initials}
    </span>
  );
}