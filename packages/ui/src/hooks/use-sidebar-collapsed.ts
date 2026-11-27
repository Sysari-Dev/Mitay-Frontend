'use client'

import { useCallback, useSyncExternalStore } from 'react'

const SIDEBAR_COLLAPSED_STORAGE_KEY = 'mitay-sidebar-collapsed'

const listeners = new Set<() => void>()
let memoryValue = false

function readCollapsed() {
  try {
    const stored = window.localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY)
    return stored === null ? memoryValue : stored === 'true'
  } catch {
    return memoryValue
  }
}

function persistCollapsed(value: boolean) {
  try {
    window.localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(value))
    return true
  } catch {
    return false
  }
}

function writeCollapsed(value: boolean) {
  memoryValue = value
  persistCollapsed(value)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function useSidebarCollapsed() {
  const isCollapsed = useSyncExternalStore(subscribe, readCollapsed, () => false)
  const toggleCollapsed = useCallback(() => writeCollapsed(!readCollapsed()), [])
  return { isCollapsed, toggleCollapsed }
}

export { useSidebarCollapsed }
