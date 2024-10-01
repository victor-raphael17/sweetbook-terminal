import { UserStorage } from './UserStorage.js'

export class UserDataRequest extends UserStorage {

    public login(username: string, password: string): boolean {

        const data = this.readData(),
            user = data.find(
                (userTryingToLogin) =>
                    userTryingToLogin.getUsername() == username

            )

        return user ? user.getPassword() == password : false

    }

    public getFullNameFromUsername(username: string): string {

        const data = this.readData(),
            user = data.find((user) => user.getUsername() == username)

        return user.getFullName()

    }
    
}