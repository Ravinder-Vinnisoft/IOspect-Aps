import { User } from "./user.model";

export class Post {
    userId: number;
    id: number;
    title: string;
    body: string;
    user: User

    constructor(userId: number, id: number, title: string, body: string, user: User) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
        this.user= user;
    }
}
