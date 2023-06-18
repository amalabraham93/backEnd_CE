class Organizer {
    public _id: string;
    private organizername: string;
    private email: string;
    public password: string;
  
    constructor(_id: string, name: string, email: string, password: string) {
      this._id = _id;
      this.organizername = name;
      this.email = email;
      this.password = password;
    }
  
    getId(): string {
      return this._id;
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