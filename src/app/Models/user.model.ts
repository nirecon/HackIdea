export class User {
  userName: string;
  empId: number;
  email: string;
  contact: string;

  constructor(init?: Partial<User>) {
    this.userName = '';
    this.empId = 0;
    this.email = '';
    this.contact = '';
    Object.assign(this, init);
  }
}
