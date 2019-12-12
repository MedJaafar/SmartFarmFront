export class AppUser {
    id: number;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    username : string;
    
   
       //constructor
   constructor(id:number, password: string, first_name:string, last_name:string, email:string,username:string) { 
    this.id = id;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.username = username;
    }
    
}
