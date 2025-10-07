import { ControlsIcon, HomeIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("home")
        .schemaType("home")
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.document()
            .id("home")
            .schemaType("home")
            .documentId("home")
            .title("Home Page"),
        ),
      S.documentTypeListItem("pageType").title("Pages"),
      S.documentTypeListItem("contentType").title("Featured Content"),
      S.listItem()
        .id("settings")
        .schemaType("settings")
        .title("Site Settings")
        .icon(ControlsIcon)
        .child(
          S.document()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
            .title("Site Settings"),
        ),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            "media.tag",
            "mux.videoAsset",
            "home",
            "settings",
            "pageType",
            "contentType"
          ].includes(item.getId() || ""),
      ),
    ]);
