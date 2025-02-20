export interface IUser {
  id: string;
  firstName: string;
  lastname: string;
  email: string;
  lastSeen: string;
  online: boolean;
}

export interface IToolbarUser {
  fullNamed: string;
  isOnline: boolean;
  avatarUrl: string;
  lastSeen?: string;
}
