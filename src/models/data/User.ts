export class User {

    private username: string;
    private password: string;
    private fullName: string;

    public constructor(username: string, password: string, fullName: string) {

        this.username = username;
        this.password = password;
        this.fullName = fullName;

    }

    public getUsername(): string {

        return this.username;

    }

    public getPassword(): string {

        return this.password;

    }

    public getFullName(): string {

        return this.fullName;

    }
    
}
