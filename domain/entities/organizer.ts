import { ObjectId } from "mongoose";

class Organizer {
    public id!: ObjectId;
    private organizername: string;
    private email: string;
    public password: string;
  
    constructor( name: string, email: string, password: string) {
      
      this.organizername = name;
      this.email = email;
      this.password = password;
    }
  
    getId(): ObjectId {
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