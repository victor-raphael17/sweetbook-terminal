export abstract class Product {

    public flavor: string;
    protected price: number;

    public constructor(flavor: string) {

        this.flavor = flavor;

    }

    public getFlavor(): string {

        return this.flavor;

    }

    public getPrice(): number {

        return this.price;

    }

    protected abstract setPrice(): void;

}
