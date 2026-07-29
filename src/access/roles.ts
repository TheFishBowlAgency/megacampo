import type { Access } from "payload";

export const USER_ROLES = ["super-admin", "admin", "cms-manager"] as const;

export type UserRole = (typeof USER_ROLES)[number];

type UserLike =
  | {
      id?: string | number;
      role?: string | null;
    }
  | null
  | undefined;

export function getUserRole(user: UserLike): UserRole | null {
  if (!user) return null;
  // Users created before roles existed keep full access until a role is set.
  if (!user.role) return "super-admin";
  if ((USER_ROLES as readonly string[]).includes(user.role)) {
    return user.role as UserRole;
  }
  return null;
}

export function isSuperAdmin(user: UserLike): boolean {
  return getUserRole(user) === "super-admin";
}

/** Super-admin or operations admin (orders, catalog, products). */
export function isOperationsAdmin(user: UserLike): boolean {
  const role = getUserRole(user);
  return role === "super-admin" || role === "admin";
}

/** Super-admin or CMS manager (page content / globals). */
export function isCmsEditor(user: UserLike): boolean {
  const role = getUserRole(user);
  return role === "super-admin" || role === "cms-manager";
}

export function isStaff(user: UserLike): boolean {
  return getUserRole(user) !== null;
}

export const anyone: Access = () => true;

export const operationsAdmin: Access = ({ req }) => isOperationsAdmin(req.user);

export const cmsEditor: Access = ({ req }) => isCmsEditor(req.user);

export const staff: Access = ({ req }) => isStaff(req.user);

/** Hide operations/catalog collections from CMS managers. */
export function hideFromNonOperations({ user }: { user: UserLike }): boolean {
  return !isOperationsAdmin(user);
}

/** Hide content globals from operations-only admins. */
export function hideFromNonCms({ user }: { user: UserLike }): boolean {
  return !isCmsEditor(user);
}
