import { Product } from './Product.js';

export class SweetType extends Product {

    private amount: number;
    private priceOfHundred: number;

    public constructor(flavor: string, amount: number, priceOfHundred: number) {

        super(flavor);
        this.amount = amount;
        this.priceOfHundred = priceOfHundred;
        this.setPrice();

    }

    public getAmount(): number {

        return this.amount;

    }

    public getPriceOfHundred(): number {

        return this.priceOfHundred;

    }
    
    protected setPrice(): void {

        this.price = ((this.priceOfHundred / 100) * this.amount);
    
    }

}
