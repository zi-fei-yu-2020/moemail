"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

export default function AutoLoginPage() {
  const router = useRouter()
  const [status, setStatus] = useState("正在自动登录...")
  const [error, setError] = useState("")

  useEffect(() => {
    async function autoLogin() {
      try {
        const result = await signIn("credentials", {
          username: "test",
          password: "test123456",
          redirect: false,
        })

        if (result?.error) {
          setError(result.error)
          setStatus("登录失败")
          return
        }

        setStatus("登录成功，正在跳转...")
        // 跳转到首页
        window.location.href = "/zh-CN"
      } catch (e) {
        setError(e instanceof Error ? e.message : "未知错误")
        setStatus("登录失败")
      }
    }

    autoLogin()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">{status}</p>
        {error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>
    </div>
  )
}