import { UserRole } from '../types/User';

export function roleToLabel(role: UserRole): string {
  switch (role) {
    case 'USER': {
      return 'User';
    }
    case 'MANAGER': {
      return 'Realtor';
    }
    case 'ADMIN': {
      return 'Admin';
    }
  }
}

export const userRoles: Array<UserRole> = ['USER', 'MANAGER', 'ADMIN'];
