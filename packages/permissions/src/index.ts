export type Role = 'super_admin' | 'admin' | 'manager' | 'member' | 'viewer';
export const ROLE_HIERARCHY: Record<Role, number> = {
  viewer: 10,
  member: 20,
  manager: 50,
  admin: 80,
  super_admin: 100,
};
export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}
export function can(role: Role, minRole: Role): boolean {
  return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[minRole];
}
export interface Permission {
  id: string;
  resource: string;
  action: string;
  description?: string;
}
export interface RoleWithPermissions {
  id: string;
  name: string;
  hierarchy: number;
  permissions: Permission[];
}
