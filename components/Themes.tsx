import { themes } from "@/lib/data"
import ThemesClient from "./ThemesClient"

export default function Themes() {
  return <ThemesClient themes={themes} />
}
