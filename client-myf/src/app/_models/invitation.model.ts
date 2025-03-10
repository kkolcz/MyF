export interface IInvitation {
  id: string;
  sender: IUser;
  receiver: IUser;
}

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}
