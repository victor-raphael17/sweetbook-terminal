import { Cake } from '../models/data/Cake.js';
import { Order } from '../models/data/Order.js';
import { SweetType } from '../models/data/SweetType.js';
import { User } from '../models/data/User.js';
import { OrderDataSubmit } from '../models/operations/OrderDataSubmit.js';
import { UserDataRequest } from '../models/operations/UserDataRequest.js';
import { UserDataSubmit } from '../models/operations/UserDataSubmit.js';
import { OrderDataRequest } from '../models/operations/OrderDataRequest.js';

export class ModelsController {

    public login(username: string, password: string): boolean {

        const userDataRequest = new UserDataRequest();

        return userDataRequest.login(username, password);

    }

    public getFullNameFromUsername(username: string): string {

        const userDataRequest = new UserDataRequest();

        return userDataRequest.getFullNameFromUsername(username);

    }

    public getOrderId(): number {

        const orderDataRequest = new OrderDataRequest();

        return orderDataRequest.getOrderId();

    }

    public createOrder(
        customerName: string,
        date: Date,
        username: string,
        cakes: Cake[],
        sweets: SweetType[],
        specialOrder: number
    ): void {

        const id = this.getOrderId();
        
        let order: Order;

        if (specialOrder == 1) {

            order = new Order(id, customerName, date, username, cakes, sweets);

        } else {

            order = new Order(id, customerName, date, username, cakes, sweets, specialOrder);

        }
        
        this.registerOrder(order);
        
    }

    private registerOrder(order: Order): void {

        const newOrderDataSubmit = new OrderDataSubmit(order);

        newOrderDataSubmit.registerOrder();

    }

    public createUser(username: string, password: string, fullName: string): boolean {

        const user = new User(username, password, fullName);

        return this.registerUser(user);

    }

    public registerUser(user: User): boolean {

        const newUserDataSubmit = new UserDataSubmit(user);

        return newUserDataSubmit.register();

    }

    public newCake(flavor: string, weight: number, pricePerKilo: number): Cake {

        return new Cake(flavor, weight, pricePerKilo);

    }

    public newSweetType(flavor: string, amount: number, priceOfHundred: number): SweetType {

        return new SweetType(flavor, amount, priceOfHundred);

    }

    public getDateBasedOrderList(day: number, month: number): Order[] {

        const orderDataRequest =  new OrderDataRequest();

        return orderDataRequest.getDateBasedOrderList(day, month);

    }

    public getCustomerBasedOrderList(customerName: string): Order[] {

        const orderDataRequest = new OrderDataRequest();

        return orderDataRequest.getCustomerBasedOrderList(customerName);

    }

    public getAllOrdersList(): Order[] {

        const orderDataRequest = new OrderDataRequest();

        return orderDataRequest.getAllOrdersList();

    }

}
