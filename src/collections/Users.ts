import type { CollectionConfig } from "payload";

import { isStaff, isSuperAdmin, USER_ROLES } from "@/access/roles";
import { adminGroups } from "@/i18n/adminGroups";
import { bl } from "@/i18n/labels";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: { pt: "Utilizador", en: "User" },
    plural: { pt: "Utilizadores", en: "Users" },
  },
  admin: {
    useAsTitle: "email",
    group: adminGroups.administration,
    hidden: ({ user }) => !isSuperAdmin(user),
    defaultColumns: ["email", "role", "updatedAt"],
  },
  auth: true,
  access: {
    admin: ({ req }) => isStaff(req.user),
    read: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      if (req.user?.id) return { id: { equals: req.user.id } };
      return false;
    },
    create: async ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      const { totalDocs } = await req.payload.count({ collection: "users" });
      return totalDocs === 0;
    },
    update: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      if (req.user?.id) return { id: { equals: req.user.id } };
      return false;
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (operation !== "create" || !data) return data;

        const { totalDocs } = await req.payload.count({ collection: "users" });
        if (totalDocs === 0) {
          data.role = "super-admin";
        } else if (!data.role) {
          data.role = "cms-manager";
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "role",
      type: "select",
      label: bl("Função", "Role"),
      required: true,
      defaultValue: "cms-manager",
      options: [
        {
          label: bl("Super administrador", "Super admin"),
          value: USER_ROLES[0],
        },
        {
          label: bl("Administrador", "Admin"),
          value: USER_ROLES[1],
        },
        {
          label: bl("Gestor de CMS", "CMS manager"),
          value: USER_ROLES[2],
        },
      ],
      access: {
        create: async ({ req }) => {
          if (isSuperAdmin(req.user)) return true;
          const { totalDocs } = await req.payload.count({
            collection: "users",
          });
          return totalDocs === 0;
        },
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description: bl(
          "Define o que este utilizador pode ver e editar no painel.",
          "Controls what this user can see and edit in the admin panel.",
        ),
      },
    },
  ],
};
