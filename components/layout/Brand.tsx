import Link from "next/link"

export default function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-badge">H</span>
      <span>HelpHub AI</span>
    </Link>
  )
}