export interface IInvitation {
  id: string;
  sender: IUser;
  receiver: IUser;
  status: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ';
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}
