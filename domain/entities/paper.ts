import { ObjectId, Types } from "mongoose"
import { Date } from "mongoose"

class Paper {
    private id!:ObjectId
    private name:string
    private submissionTitle:string
    private abstract:string
    private author: string[]
    private approved!:boolean
    private affliation:string
    private date:Date
    private conference:Types.ObjectId
    private users:ObjectId[]
    
    constructor(name:string,submissionTitle:string,abstract:string,author:string[],affliation:string,date:Date,conference:Types.ObjectId,users:ObjectId[]) {
        this.name = name
        this.submissionTitle = submissionTitle
        this.abstract = abstract
        this.author = author
        // this.approved = null
        this.affliation= affliation
        this.date = date
        this.conference = conference
        this.users = users
    }

  getName():string{
   return this.name
  }

  getAbstract():string{
    return this.abstract
  }

  getAuthor():string[]{
  return this.author
  }

  getApproved():boolean{
    return this.approved
  }
  
  getAffliation():string{
    return this.affliation
  }
 
  getDate():Date{
    return this.date
  }
  

  getConference():Types.ObjectId{
    return this.conference
  }
  
  getUsers():ObjectId[]{
    return this.users
  }
  
  getSubmissionTitle():string{
    return this.submissionTitle
  }


}

export default Paper