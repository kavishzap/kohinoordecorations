import { themes, type ThemeData } from "@/lib/data"
import { listDecorationImages } from "@/lib/supabase/storage"

/** @deprecated Prefer client fetch via /api/decorations/[folder] */

/** Load theme metadata with images from Supabase storage (fallback to local assets). */
export async function getThemesWithImages(): Promise<ThemeData[]> {
  return Promise.all(
    themes.map(async (theme) => {
      const remoteImages = await listDecorationImages(
        theme.storageFolder,
        theme.name,
      )
      return {
        ...theme,
        images: remoteImages.length > 0 ? remoteImages : theme.images,
      }
    }),
  )
}
