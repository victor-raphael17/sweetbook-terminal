import fs from 'fs';
import PrimaryScreen from '../views/PrimaryScreen.js';
import { ModelsController } from './ModelsController.js';
import { DatabaseController } from './DatabaseController.js';

export class SystemController {

    public primaryScreen = new PrimaryScreen();
    public modelsController = new ModelsController();
    public databaseController = new DatabaseController();

    public startSystem(): void {

        if (!fs.existsSync('./dist/db')) {

            fs.mkdirSync('./dist/db', { recursive: true });

        }

        if (!fs.existsSync('./dist/db/orderData.JSON')) {
            fs.writeFileSync('./dist/db/orderData.JSON', JSON.stringify([]));
        }

        if (!fs.existsSync('./dist/db/userData.JSON')) {
            fs.writeFileSync('./dist/db/userData.JSON', JSON.stringify([]));
        }

        this.primaryScreen.getWelcomeScreen();

    }

    public endSystem(): void {

        console.clear();

        process.exit(0);

    }

}
