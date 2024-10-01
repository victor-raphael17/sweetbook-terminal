import { Cake } from './Cake.js';
import { SweetType } from './SweetType.js';

export class Order {

    private id: number;
    private customerName: string;
    private date: Date;
    private username: string;
    private cakes: Cake[];
    private sweets: SweetType[];
    private totalPrice: number;
    private specialOrder: boolean;

    public constructor(
        id: number,
        customerName: string,
        date: Date,
        username: string,
        cakes: Cake[],
        sweets: SweetType[],
        specialOrder?: number
    ) {

        this.id = id;
        this.customerName = customerName;
        this.date = date;
        this.username = username;
        this.cakes = cakes;
        this.sweets = sweets;
        this.setTotalPrice();

        if (specialOrder) {

            this.specialOrder = true;

        } else {

            this.specialOrder = false;

        }

    }

    public getId(): number {

        return this.id;

    }

    public getCustomerName(): string {

        return this.customerName;

    }
    
    public getDate(): Date {

        return this.date;

    }

    public getUsername(): string {

        return this.username;

    }

    public getCakes(): Cake[] {

        return this.cakes;

    }

    public getSweets(): SweetType[] {

        return this.sweets;

    }

    private setTotalPrice(): void {

        let totalPrice: number = 0;

        for (let i = 0; i < this.cakes.length; i++) {

            totalPrice += this.cakes[i].getPrice();

        } 

        for (let i = 0; i < this.sweets.length; i++) {

            totalPrice += this.sweets[i].getPrice();

        }

        this.totalPrice = parseFloat(totalPrice.toFixed(2));

    }

    public getTotalPrice(): number {

        return this.totalPrice;

    }

    public getSpecialOrderInfo(): boolean {

        return this.specialOrder;

    }

}