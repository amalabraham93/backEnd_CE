class Organizer {
    private id: string;
    private name: string;
    private email: string;
    private organization: string;
  
    constructor(id: string, name: string, email: string, organization: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.organization = organization;
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
  
    getOrganization(): string {
      return this.organization;
    }
  
    setOrganization(organization: string): void {
      this.organization = organization;
    }
  }
  
  export default Organizer;