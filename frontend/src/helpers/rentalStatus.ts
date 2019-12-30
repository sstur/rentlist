import { RentalStatus } from '../types/Property';

export function statusToLabel(role: RentalStatus): string {
  switch (role) {
    case 'RENTED': {
      return 'Rented';
    }
    case 'AVAILABLE': {
      return 'Available';
    }
  }
}

export const statuses: Array<RentalStatus> = ['RENTED', 'AVAILABLE'];
