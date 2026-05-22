import { galleryBucketByCategory, themes } from "@/lib/data"

export const STORAGE_FOLDER_LABELS: Record<string, string> = {
  ...Object.fromEntries(themes.map((t) => [t.storageFolder, t.name])),
  haldi: "Haldi",
  mehendi: "Mehendi",
  reception: "Reception",
  wedding: "Wedding",
  stage: "Stage",
  entrance: "Entrance",
  "table-decor": "Table Décor",
}

export const ALLOWED_STORAGE_FOLDERS = new Set([
  ...themes.map((t) => t.storageFolder),
  ...Object.values(galleryBucketByCategory),
])
