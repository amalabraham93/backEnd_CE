class Organizer {
    public id: string;
    private organizername: string;
    private email: string;
    public password: string;
  
    constructor(id: string, name: string, email: string, password: string) {
      this.id = id;
      this.organizername = name;
      this.email = email;
      this.password = password;
    }
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.organizername;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    getOrganization(): string {
      return this.password;
    }
  
    setpassword(password: string): void {
      this.password = password;
    }
  }
  
  export default Organizer;