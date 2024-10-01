import { Product } from './Product.js';

export class Cake extends Product {

    private weight: number;
    private pricePerKilo: number;

    public constructor(flavor: string, weight: number, pricePerKilo: number) {

        super(flavor);
        this.weight = weight;
        this.pricePerKilo = pricePerKilo;
        this.setPrice();

    }

    public getWeight(): number {

        return this.weight;

    }

    public getPricePerKilo(): number {

        return this.pricePerKilo;

    }

    protected setPrice(): void {

        this.price = this.pricePerKilo * this.weight;

    }

}
