import { Order } from '../data/Order.js';
import systemController from '../../index.js';

export abstract class OrderStorage {

    protected readData(): Order[] {

        return systemController.databaseController.readFileSyncOrder();

    }

    protected writeData(data: Order[]): void {

        systemController.databaseController.writeFileSyncOrder(data);
        
    }
    
}