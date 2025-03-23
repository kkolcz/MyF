import { IUser } from '../user.model';

export interface IFriendInvRequestDto {}

export interface IFriendInvResponseDto {}

export interface IFriendInvDto {
  id: string;
  sender: IUser;
  receiver: IUser;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ';
}
