"use client"

import { useState, useEffect, useRef } from "react"

interface UseIntersectionObserverProps {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0.1,
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const [node, setNode] = useState<Element | null>(null)
  const frozen = useRef(false)

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry)

    if (freezeOnceVisible && entry.isIntersecting) {
      frozen.current = true
    }
  }

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver

    if (!hasIOSupport || frozen.current || !node) return

    const observer = new IntersectionObserver(updateEntry, {
      root,
      rootMargin,
      threshold,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [node, root, rootMargin, threshold, frozen])

  return [setNode, entry?.isIntersecting || false, entry] as const
}
