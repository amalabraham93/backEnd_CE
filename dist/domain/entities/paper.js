"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Paper {
    id;
    name;
    submissionTitle;
    abstract;
    author;
    approved;
    affliation;
    date;
    conference;
    users;
    constructor(name, submissionTitle, abstract, author, affliation, date, conference, users) {
        this.name = name;
        this.submissionTitle = submissionTitle;
        this.abstract = abstract;
        this.author = author;
        // this.approved = null
        this.affliation = affliation;
        this.date = date;
        this.conference = conference;
        this.users = users;
    }
    getName() {
        return this.name;
    }
    getAbstract() {
        return this.abstract;
    }
    getAuthor() {
        return this.author;
    }
    getApproved() {
        return this.approved;
    }
    getAffliation() {
        return this.affliation;
    }
    getDate() {
        return this.date;
    }
    getConference() {
        return this.conference;
    }
    getUsers() {
        return this.users;
    }
    getSubmissionTitle() {
        return this.submissionTitle;
    }
}
exports.default = Paper;
