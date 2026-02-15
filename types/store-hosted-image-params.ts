import type { HostingConfig } from "./hosting-config";

export type StoreHostedImageParams = {
  hosting: HostingConfig | null;
  url: string;
  projectId: string;
  label: "source" | "rendered";
};
