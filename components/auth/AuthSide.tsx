import Eyebrow from "@/components/ui/Eyebrow"

export default function AuthSide() {
  return (
    <section className="auth-side fade-in">
      <Eyebrow>Community access</Eyebrow>
      <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 4rem)" }}>
        Enter the support network.
      </h1>
      <p>
        Choose a demo identity, set your role, and jump into a multi-page
        product flow designed for asking, offering, and tracking help with a
        premium interface.
      </p>
      <ul>
        <li>Role-based entry for Need Help, Can Help, or Both</li>
        <li>Direct path into dashboard, requests, AI Center, and community feed</li>
        <li>Persistent demo session powered by Firebase</li>
      </ul>
    </section>
  )
}