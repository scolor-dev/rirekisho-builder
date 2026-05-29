const KEY = 'rirekisho_profile'

export function loadProfile(): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<string, unknown>) : null
  } catch {
    return null
  }
}

export function saveProfile(data: Record<string, unknown>) {
  localStorage.setItem(KEY, JSON.stringify(data))
}
