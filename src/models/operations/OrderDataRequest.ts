import { Order } from '../data/Order.js';
import { OrderStorage } from './OrderStorage.js';

export class OrderDataRequest extends OrderStorage {

    public getOrderId(): number {

        let id: number = 1;

        const data = this.readData();

        while (data.some((idTryingToRegister) => idTryingToRegister.getId() == id)) {

            id++;

        }

        return id;

    }

    public getDateBasedOrderList(day: number, month: number): Order[] {

        const data = this.readData();

        return data.filter(orders => (
            orders.getDate().getDate() == day) &&
            (orders.getDate().getMonth() == month
        ));

    }
    
    public getCustomerBasedOrderList(customerName: string): Order[] {

        const data = this.readData();

        return data.filter(orders => orders.getCustomerName() == customerName);

    }
    
    public getAllOrdersList(): Order[] {

        return this.readData();

    }

}