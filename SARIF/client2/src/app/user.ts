import DateTimeFormat = Intl.DateTimeFormat;

export class User {
  userId: number;
  userName: string;
  userRole: string;
  userPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  securityQ: string;
  securityA: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
}
