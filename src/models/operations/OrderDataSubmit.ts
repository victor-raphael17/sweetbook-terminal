import { Order } from '../data/Order.js';
import { OrderStorage } from './OrderStorage.js';

export class OrderDataSubmit extends OrderStorage {

    private order: Order;

    public constructor(order: Order) {

        super();

        this.order = order;

    }   

    public registerOrder(): void {
        
        const data = this.readData();
        
        data.push(this.order);
        
        this.writeData(data);
            
    }
}