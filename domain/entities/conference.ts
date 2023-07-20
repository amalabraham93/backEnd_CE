import { ObjectId } from "mongodb"
import { Types } from "mongoose"
import User from "./user"

export interface Session {
  time: string;
  authorName: string;
  paperName: string;
}

export interface ScheduleDate {
  date: Date;
  sessions: Session[];
}


class Conference{
    private id!:ObjectId
    private name:string
    private startDate :Date
    private endDate! : Date
    private organizations :Types.ObjectId
    private reviewers: { email: string; password: string }[];
    //  private location :string
    //  private  type : string
     public users:User[]
     private schedule!: ScheduleDate[];


    constructor( name:string, startDate:Date,
        // enddate:Date,
        organizations:Types.ObjectId,
        reviewers: { email: string; password: string }[] = [],
        // location:string,type:string,
         users:User[]=[]
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
    
      getUsers(): User[] {
        return this.users;
      }
      
      getStartDate(){
        return this.startDate
      }
      getEndDate(){
        return this.endDate
        
      }

      getSchedule(): ScheduleDate[] {
        return this.schedule;
      }
    
      // addSessionToSchedule(sessionDate: Date, session: Session): void {
      //   const scheduleDate = this.schedule.find((date) =>
      //     date.date.getTime() === sessionDate.getTime()
      //   );
    
      //   if (scheduleDate) {
      //     scheduleDate.sessions.push(session);
      //   } else {
      //     this.schedule.push({ date: sessionDate, sessions: [session] });
      //   }
      // }
}
export default Conference