import { app } from "./config"
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"

export async function loginDemoUser() {
  const email = "community@helphub.ai"
  const password = "demo1234"
  const auth = getAuth(app)
  
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

export async function logoutUser() {
  const auth = getAuth(app)
  try {
    await signOut(auth)
  } catch (error) {
    console.error("Logout failed:", error)
    throw error
  }
}