class Admin {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
  
    constructor(name: string, email: string, password: string , role:string) {
      this.id = '';
      this.name = name;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  
  export default Admin;
  