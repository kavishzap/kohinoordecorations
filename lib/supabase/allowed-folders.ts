import { galleryBucketByCategory } from "@/lib/data"

export const STORAGE_FOLDER_LABELS: Record<string, string> = {
  haldi: "Haldi",
  mehendi: "Mehendi",
  reception: "Reception",
  wedding: "Wedding",
  stage: "Stage",
  entrance: "Entrance",
  "table-decor": "Table Décor",
}

export const ALLOWED_STORAGE_FOLDERS = new Set(
  Object.values(galleryBucketByCategory),
)
