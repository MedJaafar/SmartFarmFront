export class ConnectionSystem {
    
    id: number;
    connectionState:string;
    dateConnection: Date;
    systemId: string;

   //constructor
   constructor(id:number, connectionState: string, dateConnection:Date, systemId:string) { 
    this.id = id;
    this.connectionState = connectionState;
    this.dateConnection = dateConnection;
    this.systemId = systemId;
   }
}
