"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Conference {
    id;
    name;
    startDate;
    endDate;
    organizations;
    reviewers;
    //  private location :string
    //  private  type : string
    users;
    schedule;
    constructor(name, startDate, 
    // enddate:Date,
    organizations, reviewers = [], 
    // location:string,type:string,
    users = []) {
        this.name = name;
        this.startDate = startDate;
        this.reviewers = reviewers;
        // this.enddate = enddate
        this.organizations = organizations;
        // this.location = location
        // this.type = type
        this.users = users;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    addReviewer(email, password) {
        this.reviewers.push({ email, password });
    }
    getReviewers() {
        return this.reviewers;
    }
    getUsers() {
        return this.users;
    }
    getStartDate() {
        return this.startDate;
    }
    getEndDate() {
        return this.endDate;
    }
    getSchedule() {
        return this.schedule;
    }
}
exports.default = Conference;
