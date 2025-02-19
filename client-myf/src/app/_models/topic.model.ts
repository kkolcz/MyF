export interface ITopic {
  id: number;
  type: 'group' | 'private';
  name: string;
  isOnline?: boolean;
  lastSeen?: Date;
}
