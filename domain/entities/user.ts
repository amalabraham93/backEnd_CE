class User {
    public id: string;
    private name: string;
    public email: string;
    public password: string;
    public role: string;
    public verificationToken: string;
  
    constructor(id: string, name: string, email: string, password: string, role:string, verificationToken: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
      this.verificationToken = verificationToken;
    }
  
    getId(): string {
      return this.id;
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
    getverificationToken(): string {
      return this.verificationToken;
    }
  }
  
  export default User;