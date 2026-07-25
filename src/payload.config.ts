import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { en } from "@payloadcms/translations/languages/en";
import { pt } from "@payloadcms/translations/languages/pt";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Activities } from "./collections/Activities";
import { Events } from "./collections/Events";
import { Scenarios } from "./collections/Scenarios";
import { PackageCategories } from "./collections/PackageCategories";
import { OptionGroups } from "./collections/OptionGroups";
import { Options } from "./collections/Options";
import { Packages } from "./collections/Packages";
import { GroupExtras } from "./collections/GroupExtras";
import { Orders } from "./collections/Orders";
import { Cenarios } from "./globals/Cenarios";
import { Como } from "./globals/Como";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Home } from "./globals/Home";
import {
  buildCloudinaryFileURL,
  cloudinaryAdapter,
  isCloudinaryConfigured,
} from "./storage/cloudinaryAdapter";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cloudinaryFolder = process.env.CLOUDINARY_FOLDER || "megacampo";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Activities,
    Events,
    Scenarios,
    PackageCategories,
    OptionGroups,
    Options,
    Packages,
    GroupExtras,
    Orders,
  ],
  globals: [Header, Footer, Home, Como, Cenarios],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { pt, en },
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    ...(isCloudinaryConfigured()
      ? [
          cloudStoragePlugin({
            collections: {
              media: {
                adapter: cloudinaryAdapter,
                disableLocalStorage: true,
                prefix: cloudinaryFolder,
                generateFileURL: ({ filename, prefix }) =>
                  buildCloudinaryFileURL(filename, prefix),
              },
            },
          }),
        ]
      : []),
  ],
});
