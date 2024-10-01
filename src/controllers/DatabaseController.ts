import fs from 'fs';
import { User } from '../models/data/User.js';
import { Order } from '../models/data/Order.js';
import { Cake } from '../models/data/Cake.js';
import { SweetType } from '../models/data/SweetType.js';

export class DatabaseController {
    
    private userDataPath: string = './dist/db/userData.JSON';
    private orderDataPath: string = './dist/db/orderData.JSON';

    public readFileSyncUser(): User[] {

        try {

            const data = fs.readFileSync(this.userDataPath, 'utf-8'),
            parsedData = JSON.parse(data);

            return parsedData.map(
                (user: { username: string; password: string; fullName: string }) =>
                    new User(user.username, user.password, user.fullName)
            );

        } catch (error) {

            console.error(error);

        }

    }

    public writeFileSyncUser(data: User[]): void {

        try {

            fs.writeFileSync(this.userDataPath, JSON.stringify(data, null, 2), 'utf-8');

        } catch (error) {

            console.error('Error writing file:', error);

        }

    }

    public readFileSyncOrder(): Order[] {

        try {

            const data = fs.readFileSync(this.orderDataPath, 'utf-8'),
                parsedData = JSON.parse(data);
    
            return parsedData.map(
                (order: {
                    id: number;
                    customerName: string;
                    date: Date;
                    username: string;
                    cakes: any[];
                    sweets: any[];
                    totalPrice: number,
                    specialOrder: number
                }) => {
                   
                    const cakes = order.cakes.map(
                        (cake: {
                            flavor: string;
                            weight: number;
                            pricePerKilo: number
                        }) =>
                            new Cake(cake.flavor,
                                cake.weight,
                                cake.pricePerKilo
                            )
                    );
    
                    const sweets = order.sweets.map(
                        (sweet: {

                            flavor: string;
                            amount: number;
                            priceOfHundred: number

                        }) =>
                            new SweetType(sweet.flavor, sweet.amount, sweet.priceOfHundred)
                    );
    
                    return new Order(
                        order.id,
                        order.customerName,
                        new Date(order.date),
                        order.username,
                        cakes,
                        sweets,
                        order.specialOrder
                    );

                }
                
            );
    
        } catch (error) {

            console.error('Error reading file:', error);

            return [];

        }

    }

    public writeFileSyncOrder(data: Order[]): void {

        try {
            
            fs.writeFileSync(this.orderDataPath, JSON.stringify(data, null, 2), 'utf-8');

        } catch (error) {

            console.error('Error writing file:', error);
            
        }

    }

}
