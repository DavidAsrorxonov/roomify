export const HOSTING_CONFIG_KEY = "roomify_hosting_config";
export const HOSTING_DOMAIN_SUFFIX = ".puter.site";

export const createHostingSlug = () =>
  `roomify-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const isHostedUrl = (value: unknown): value is string =>
  typeof value === "string" && value.includes(HOSTING_DOMAIN_SUFFIX);

export const imageUrlToPngBlob = async (url: string): Promise<Blob | null> => {
  if (typeof window === "undefined") return null;

  try {
    const img = new Image();
    img.crossOrigin = "anonymous";

    const loaded = await new Promise<HTMLImageElement>((resolve, reject) => {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });

    const width = loaded.naturalWidth || loaded.width;
    const height = loaded.naturalHeight || loaded.height;
    if (!width || !height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(loaded, 0, 0, width, height);

    return await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((result) => resolve(result), "image/png");
    });
  } catch (error) {
    console.error(`Failed to load image: ${error}`);
    return null;
  }
};

export const dataUrlToBlob = (
  dataUrl: string,
): { blob: Blob; contentType: string } | null => {
  try {
    const match = dataUrl.match(/^data:([^;]+)?(;base64)?,([\s\S]*)$/i);
    if (!match) return null;
    const contentType = match[1] || "";
    const isBase64 = !!match[2];
    const data = match[3] || "";
    const raw = isBase64
      ? atob(data.replace(/\s/g, ""))
      : decodeURIComponent(data);
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i += 1) {
      bytes[i] = raw.charCodeAt(i);
    }
    return { blob: new Blob([bytes], { type: contentType }), contentType };
  } catch {
    return null;
  }
};

export const fetchBlobFromUrl = async (
  url: string,
): Promise<{ blob: Blob; contentType: string } | null> => {
  if (url.startsWith("data:")) return dataUrlToBlob(url);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch image");
    return {
      blob: await response.blob(),
      contentType: response.headers.get("content-type") || "",
    };
  } catch (error) {
    console.error(`Failed to fetch image: ${error}`);
    return null;
  }
};
