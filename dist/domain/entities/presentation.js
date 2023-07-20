"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Presentation {
    _id;
    stream_key;
    start_time;
    end_time;
    created_at;
    papers;
    conference;
    authors;
    constructor(stream_key, conference) {
        this.stream_key = stream_key;
        this.created_at = new Date();
        this.conference = conference;
    }
    getId() {
        return this._id;
    }
    getStreamKey() {
        return this.stream_key;
    }
    getStartTime() {
        return this.start_time;
    }
    getEndTime() {
        return this.end_time;
    }
    setEndTime(endTime) {
        this.end_time = endTime;
    }
    getCreatedAt() {
        return this.created_at;
    }
    getPapers() {
        return this.papers;
    }
    getConference() {
        return this.conference;
    }
    getAuthors() {
        return this.authors;
    }
}
exports.default = Presentation;
