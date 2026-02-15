import type { DesignItem } from "./design-item";

export type CreateProjectParams = {
  item: DesignItem;
  visibility?: "private" | "public";
};
