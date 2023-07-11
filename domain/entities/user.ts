import { ObjectId } from 'mongoose';

class User {
  public _id!: ObjectId;
  private name: string;
  public email: string;
  public password: string;
  public role: string;
  public verificationToken: string;
  public isEmailVerified!: boolean;
  public transactions: Transaction[];

  constructor(
    name: string,
    email: string,
    password: string,
    role: string,
    verificationToken: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.verificationToken = verificationToken;
    this.isEmailVerified = false;
    this.transactions = [];
  }

  getId(): ObjectId {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getRole(): string {
    return this.role;
  }

  getVerificationToken(): string {
    return this.verificationToken;
  }
}

interface Transaction {
  itemId: ObjectId;
  date: Date;
  amount: number;
}

export default User;
