import { User } from '../data/User.js';
import { UserStorage } from './UserStorage.js';

export class UserDataSubmit extends UserStorage {

    private user: User;

    public constructor(user: User) {

        super();

        this.user = user;

    }

    public register(): boolean {

        const data = this.readData(),
            userExists = data.some(
                (users) => users.getUsername() == this.user.getUsername()
            );

        if (userExists) {

            return false;

        }

        data.push(this.user);

        this.writeData(data);

        return true;
    }
}
