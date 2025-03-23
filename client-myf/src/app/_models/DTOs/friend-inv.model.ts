import { IUser } from '../user.model';

export interface IFriendDto {
  users: IUser[];
}

export interface IFriendInvDto {
  invitations: IFriendInv[];
}

export interface IFriendInv {
  id: string;
  sender: IUser;
  receiver: IUser;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ';
}

export interface IFriendSearchDto {
  users: IUser[];
}
