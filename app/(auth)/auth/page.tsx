import AuthSide from "@/components/auth/AuthSide"
import AuthCard from "@/components/auth/AuthCard"

export default function AuthPage() {
  return (
    <main className="auth-layout container">
      <div className="auth-wrap">
        <AuthSide />
        <AuthCard />
      </div>
    </main>
  )
}