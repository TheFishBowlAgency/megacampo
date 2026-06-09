import type {
  Adapter,
  HandleDelete,
  HandleUpload,
  StaticHandler,
} from "@payloadcms/plugin-cloud-storage/types";
import { randomUUID } from "crypto";
import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

import { slugify } from "../lib/slugify";

const DEFAULT_FOLDER = "megacampo";

type CloudinaryResourceType = "image" | "video" | "raw";

function getFileExtension(filename: string): string {
  const match = filename.match(/(\.[^./\\]+)$/);
  return match?.[1]?.toLowerCase() ?? "";
}

function getFileBaseName(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

export function sanitizeUploadFilename(originalFilename: string): string {
  const extension = getFileExtension(originalFilename);
  const slug = slugify(getFileBaseName(originalFilename)) || "file";
  const uniqueId = randomUUID().slice(0, 8);
  const maxSlugLength = 120 - uniqueId.length - 1;
  const trimmedSlug = slug.slice(0, Math.max(maxSlugLength, 1));

  return `${trimmedSlug}-${uniqueId}${extension}`;
}

function getCloudinaryFolder(prefix?: string): string {
  return prefix || process.env.CLOUDINARY_FOLDER || DEFAULT_FOLDER;
}

function getPublicId(filename: string, folder: string): string {
  const baseName = filename.replace(/\.[^/.]+$/, "");
  return `${folder}/${baseName}`;
}

function inferResourceType(
  mimeType?: string | null,
  filename?: string | null,
): CloudinaryResourceType {
  if (mimeType?.startsWith("video/")) {
    return "video";
  }

  if (mimeType?.startsWith("image/")) {
    return "image";
  }

  const extension = getFileExtension(filename ?? "");
  if ([".mp4", ".mov", ".webm", ".avi", ".mkv"].includes(extension)) {
    return "video";
  }

  if (
    [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".avif", ".bmp"].includes(
      extension,
    )
  ) {
    return "image";
  }

  return "raw";
}

function ensureCloudinaryConfigured(): void {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "Cloudinary credentials missing. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

function uploadToCloudinary(
  file: Parameters<HandleUpload>[0]["file"],
  folder: string,
  sanitizedFilename: string,
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: getFileBaseName(sanitizedFilename),
        display_name: file.filename,
        overwrite: false,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve(result);
      },
    );

    uploadStream.end(file.buffer);
  });
}

export function buildCloudinaryFileURL(
  filename: string,
  prefix?: string,
  mimeType?: string | null,
): string {
  if (!filename) {
    return "";
  }

  ensureCloudinaryConfigured();
  const folder = getCloudinaryFolder(prefix);
  return cloudinary.url(getPublicId(filename, folder), {
    secure: true,
    resource_type: inferResourceType(mimeType, filename),
  });
}

export const cloudinaryAdapter: Adapter = ({ prefix }) => {
  const folder = getCloudinaryFolder(prefix);

  const handleUpload: HandleUpload = async ({ data, file }) => {
    ensureCloudinaryConfigured();
    const sanitizedFilename = sanitizeUploadFilename(file.filename);
    const result = await uploadToCloudinary(file, folder, sanitizedFilename);

    return {
      ...data,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      filesize: result.bytes,
      filename: sanitizedFilename,
      mimeType: file.mimeType,
      prefix: folder,
    };
  };

  const handleDelete: HandleDelete = async ({ filename, doc }) => {
    ensureCloudinaryConfigured();
    const docFolder = getCloudinaryFolder(
      typeof doc.prefix === "string" ? doc.prefix : folder,
    );
    const publicId = getPublicId(filename, docFolder);

    await cloudinary.uploader.destroy(publicId, {
      resource_type: inferResourceType(
        typeof doc.mimeType === "string" ? doc.mimeType : null,
        filename,
      ),
    });
  };

  const staticHandler: StaticHandler = (_req, { params }) => {
    const url = buildCloudinaryFileURL(
      params.filename,
      typeof params.prefix === "string" ? params.prefix : folder,
    );

    return Response.redirect(url, 302);
  };

  return {
    name: "cloudinary",
    handleUpload,
    handleDelete,
    staticHandler,
    generateURL: ({ data, filename, prefix: filePrefix }) =>
      buildCloudinaryFileURL(
        filename,
        filePrefix ?? folder,
        typeof data?.mimeType === "string" ? data.mimeType : null,
      ),
  };
};

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );
}
