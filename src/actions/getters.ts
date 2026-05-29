import { config } from "../config/config"
import type { ArtStyles, AttemptResult, Category, Perspective, Saga } from "../types/game"

const JSON_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
} as const

/** GET `path` (relative to the API base URL) and parse the JSON response body. */
const getJson = async <T>(path: string): Promise<T> => {
    const response = await fetch(`${config.apiUrl}${path}`, {
        method: "GET",
        headers: JSON_HEADERS,
        credentials: "include",
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json() as Promise<T>
}

export const getCategories = () => getJson<Category[]>("/sagas/categories")
export const getPerspectives = () => getJson<Perspective[]>("/sagas/perspectives")
export const getArtStyles = () => getJson<ArtStyles[]>("/sagas/artstyles")
export const getSagas = () => getJson<Saga[]>("/sagas")
export const getSagle = () => getJson<Saga>("/sagle/get-sagle")

export const getAttempts = async (): Promise<AttemptResult[]> => {
    const data = await getJson<unknown>("/sagle/attempts")

    // BUG-07: an empty list (new user) or a "no session" object are valid,
    // non-error states — just normalize them to an empty array.
    return Array.isArray(data) ? (data as AttemptResult[]) : []
}
