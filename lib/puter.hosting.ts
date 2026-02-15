import puter from "@heyputer/puter.js";
import type { HostingConfig } from "types/hosting-config";
import type { StoreHostedImageParams } from "types/store-hosted-image-params";
import {
  createHostingSlug,
  fetchBlobFromUrl,
  getImageExtension,
  HOSTING_CONFIG_KEY,
  imageUrlToPngBlob,
  isHostedUrl,
} from "./utils";
import type { HostedAsset } from "types/hosted-asset";

export const getOrCreateHostingConfig =
  async (): Promise<HostingConfig | null> => {
    const existing = (await puter.kv.get(
      HOSTING_CONFIG_KEY,
    )) as HostingConfig | null;

    if (existing?.subdomain) return { subdomain: existing.subdomain };

    const subdomain = createHostingSlug();

    try {
      const created = await puter.hosting.create(subdomain, ".");

      return { subdomain: created.subdomain };
    } catch (error) {
      console.warn(`Could not find subdomain: ${error}`);
      return null;
    }
  };

export const uploadImageToHosting = async ({
  hosting,
  url,
  projectId,
  label,
}: StoreHostedImageParams): Promise<HostedAsset | null> => {
  if (!hosting || !url) return null;
  if (isHostedUrl(url)) return { url };

  try {
    const resolved =
      label === "rendered"
        ? await imageUrlToPngBlob(url).then((blob) =>
            blob ? { blob, contentType: "image/png" } : null,
          )
        : await fetchBlobFromUrl(url);

    if (!resolved) return null;

    const contentType = resolved.contentType || resolved.blob.type || "";
    const ext = getImageExtension(contentType, url);
  } catch (error) {
    console.warn(`Could not find hosting URL: ${error}`);
    return null;
  }
};
