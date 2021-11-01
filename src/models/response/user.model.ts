export class User {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public access_token: string;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.username = obj?.username || "";
        this.password = obj?.password || "";
        this.email = obj?.email || "";
        this.access_token = obj?.access_token || "";

    }
}