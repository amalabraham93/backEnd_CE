import { ObjectId } from "mongodb"
import { Types } from "mongoose"

class Conference{
    private id:ObjectId
    private name:string
    private startDate :Date
    //  private enddate : Date
    private organizations :Types.ObjectId
    //  private location :string
    //  private  type : string
    //  private users:string[]
     


    constructor( name:string, startDate:Date,
        // enddate:Date,
        organizations:Types.ObjectId,
        // location:string,type:string,users:string[]
        ){
        this.id = new ObjectId()
        this.name = name
        this.startDate = startDate
        // this.enddate = enddate
        this.organizations = organizations
        // this.location = location
        // this.type = type
        // this.users = users

    }
    
    getName(){
    return this.name
    }
    getId(){
        return this.id
    }

   
}
export default Conference