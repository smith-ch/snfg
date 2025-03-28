"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="opacity-0">
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${currentTheme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${currentTheme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
          />
          <span className="sr-only">Cambiar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="h-4 w-4 mr-2" />
          <span>Claro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="h-4 w-4 mr-2" />
          <span>Oscuro</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <span className="h-4 w-4 mr-2">🖥️</span>
          <span>Sistema</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

