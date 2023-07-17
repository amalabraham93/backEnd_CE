import { ObjectId, Types } from "mongoose";

class Presentation {
  public _id!: ObjectId;
  public stream_key: string;
  public start_time!: Date;
  public end_time!: Date;
  public created_at: Date;
  public papers!: ObjectId[];
  public conference: Types.ObjectId;
  public authors!: ObjectId[];

  constructor(
    stream_key: string,
    conference: Types.ObjectId,
   ) 
   {
    this.stream_key = stream_key;
    this.created_at = new Date();
    this.conference = conference;
  
  }

  getId(): ObjectId {
    return this._id;
  }

  getStreamKey(): string {
    return this.stream_key;
  }

  getStartTime(): Date {
    return this.start_time;
  }

  getEndTime(): Date {
    return this.end_time;
  }

  setEndTime(endTime: Date): void {
    this.end_time = endTime;
  }

  getCreatedAt(): Date {
    return this.created_at;
  }

  getPapers(): ObjectId[] {
    return this.papers;
  }

  getConference(): Types.ObjectId {
    return this.conference;
  }

  getAuthors(): ObjectId[] {
    return this.authors;
  }
}

export default Presentation;