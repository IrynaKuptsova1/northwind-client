const colors = [
  "#e53935",
  "#d81b60",
  "#8e24aa",
  "#5e35b1",
  "#3949ab",
  "#1e88e5",
  "#039be5",
  "#00acc1",
  "#00897b",
  "#43a047",
  "#7cb342",
  "#c0ca33",
  "#fdd835",
  "#ffb300",
  "#fb8c00",
  "#f4511e",
];

export default function getAvatar(name: string | null) {
  const words = (name ?? "").trim().split(/\s+/).filter(Boolean);
  let initials = "?";

  if (words.length > 0) {
    initials = words[0].charAt(0);
    if (words.length > 1) {
      initials += words[words.length - 1].charAt(0);
    }
    initials = initials.toUpperCase();
  }

  const background = colors[initials.charCodeAt(0) % colors.length];

  return (
    <span
      title={name?.trim() || "Unknown contact"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "34px",
        height: "34px",
        borderRadius: "50%",
        backgroundColor: background,
        color: "#ffffff",
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {initials}
    </span>
  );
}
