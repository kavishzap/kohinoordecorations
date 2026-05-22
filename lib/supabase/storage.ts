const BUCKET = "decorations"
const MAX_IMAGES = 10
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i
const SIGNED_URL_TTL = 3600

export type StorageListItem = {
  name: string
  id?: string | null
  metadata?: Record<string, unknown> | null
}

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return { url, key }
}

function formatImageLabel(themeName: string, fileName: string, index: number) {
  const base = fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .trim()
  const shortTheme = themeName.split(" ")[0]
  return base ? `${shortTheme} – ${base}` : `${shortTheme} – Image ${index + 1}`
}

/** True for real uploads; excludes placeholders and folder markers. */
export function isDisplayableImage(file: StorageListItem) {
  if (!file.name || file.name.startsWith(".")) return false
  if (file.name === ".emptyFolderPlaceholder") return false
  if (file.id == null) return false

  if (IMAGE_EXT.test(file.name)) return true

  const mime = file.metadata?.mimetype ?? file.metadata?.contentType
  if (typeof mime === "string" && mime.startsWith("image/")) return true

  return false
}

function isSubfolder(file: StorageListItem) {
  return Boolean(
    file.name &&
      !file.name.startsWith(".") &&
      file.name !== ".emptyFolderPlaceholder" &&
      file.id == null,
  )
}

async function storageList(
  prefix: string,
): Promise<StorageListItem[]> {
  const env = getSupabaseEnv()
  if (!env) return []

  const res = await fetch(
    `${env.url}/storage/v1/object/list/${BUCKET}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.key}`,
        apikey: env.key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix,
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      }),
      cache: "no-store",
    },
  )

  if (!res.ok) {
    console.error(
      `[supabase] list ${BUCKET}/${prefix}:`,
      res.status,
      await res.text(),
    )
    return []
  }

  const data = await res.json()
  return Array.isArray(data) ? data : []
}

/** Walk theme folder and any nested subfolders (Supabase upload layout). */
async function collectImagePaths(folder: string): Promise<string[]> {
  const paths: string[] = []

  async function walk(prefix: string) {
    if (paths.length >= MAX_IMAGES) return

    const items = await storageList(prefix)
    for (const item of items) {
      if (paths.length >= MAX_IMAGES) return
      if (!item.name) continue

      const itemPath = prefix ? `${prefix}/${item.name}` : item.name

      if (isDisplayableImage(item)) {
        paths.push(itemPath)
      } else if (isSubfolder(item)) {
        await walk(itemPath)
      }
    }
  }

  await walk(folder)
  return paths.slice(0, MAX_IMAGES)
}

async function createSignedImageUrl(objectPath: string): Promise<string | null> {
  const env = getSupabaseEnv()
  if (!env) return null

  const res = await fetch(
    `${env.url}/storage/v1/object/sign/${BUCKET}/${objectPath}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.key}`,
        apikey: env.key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ expiresIn: SIGNED_URL_TTL }),
      cache: "no-store",
    },
  )

  if (!res.ok) {
    console.error(
      `[supabase] sign ${objectPath}:`,
      res.status,
      await res.text(),
    )
    return null
  }

  const body = (await res.json()) as { signedURL?: string }
  if (!body.signedURL) return null

  return `${env.url}/storage/v1${body.signedURL}`
}

/** List images from a theme folder and return signed URLs (private bucket safe). */
export async function listDecorationImages(
  folder: string,
  themeName: string,
): Promise<{ src: string; label: string }[]> {
  try {
    const paths = await collectImagePaths(folder)
    if (paths.length === 0) return []

    const signed = await Promise.all(
      paths.map(async (objectPath, index) => {
        const src = await createSignedImageUrl(objectPath)
        if (!src) return null
        const fileName = objectPath.split("/").pop() ?? objectPath
        return {
          src,
          label: formatImageLabel(themeName, fileName, index),
        }
      }),
    )

    return signed.filter((item): item is { src: string; label: string } =>
      Boolean(item),
    )
  } catch (err) {
    console.error(`[supabase] list decorations/${folder}:`, err)
    return []
  }
}
