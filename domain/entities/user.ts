class User {
    public id: string;
    private name: string;
    private email: string;
    public password: string;
  
    constructor(id: string, name: string, email: string, password: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.password = password;
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
  }
  
  export default User;