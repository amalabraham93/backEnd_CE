import { ObjectId } from "mongodb"
import { Types } from "mongoose"

class Conference{
    private id!:ObjectId
    private name:string
    private startDate :Date
    //  private enddate : Date
    private organizations :Types.ObjectId
    private reviewers: { email: string; password: string }[];
    //  private location :string
    //  private  type : string
     private users:string[]
     


    constructor( name:string, startDate:Date,
        // enddate:Date,
        organizations:Types.ObjectId,
        reviewers: { email: string; password: string }[] = [],
        // location:string,type:string,
         users:string[]=[]
        ){
        
        this.name = name
        this.startDate = startDate
        this.reviewers= reviewers
        // this.enddate = enddate
        this.organizations = organizations
        // this.location = location
        // this.type = type
        this.users = users

    }
    
    getName(){
    return this.name
    }
    getId(){
        return this.id
    }
    

    addReviewer(email: string, password: string): void {
        this.reviewers.push({ email, password });
      }
    
      getReviewers(): { email: string, password: string }[] {
        return this.reviewers;
      }
    
   
}
export default Conference