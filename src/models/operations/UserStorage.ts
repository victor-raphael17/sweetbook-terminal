import systemController from '../../index.js';
import { User } from '../data/User.js';

export abstract class UserStorage {

    protected readData(): User[] {

        return systemController.databaseController.readFileSyncUser();

    }

    protected writeData(data: User[]): void {

        systemController.databaseController.writeFileSyncUser(data);

    }

}