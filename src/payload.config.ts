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
import { Posts } from "./collections/Posts";
import { Scenarios } from "./collections/Scenarios";
import { Testimonials } from "./collections/Testimonials";
import { PackageCategories } from "./collections/PackageCategories";
import { OptionGroups } from "./collections/OptionGroups";
import { Options } from "./collections/Options";
import { Packages } from "./collections/Packages";
import { GroupExtras } from "./collections/GroupExtras";
import { Orders } from "./collections/Orders";
import { Payments } from "./collections/Payments";
import { Blog } from "./globals/Blog";
import { Cenarios } from "./globals/Cenarios";
import { Como } from "./globals/Como";
import { Eventos } from "./globals/Eventos";
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
    components: {
      providers: [
        "/components/admin/AdminLanguagePreference#AdminLanguagePreference",
      ],
    },
  },
  collections: [
    Users,
    Media,
    Activities,
    Testimonials,
    Events,
    Posts,
    Scenarios,
    PackageCategories,
    OptionGroups,
    Options,
    Packages,
    GroupExtras,
    Orders,
    Payments,
  ],
  globals: [Header, Footer, Home, Como, Cenarios, Blog, Eventos],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: "pt",
    supportedLanguages: { pt, en },
  },
  localization: {
    defaultLocale: "pt",
    fallback: true,
    locales: [
      { code: "pt", label: "Português" },
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
    ],
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
