import color from 'chalk';
import readline from 'readline-sync';
import systemController from '../index.js';
import { Cake } from '../models/data/Cake.js';
import { SweetType } from '../models/data/SweetType.js';

export class NewOrderScreen {

    private username: string;

    public constructor(username: string) {
        
        this.username = username;

    }

    public getUserChoice(): void {

        console.clear();
        console.log(color.cyan('\nNew Order\n'));
        console.log(color.magenta('1.'), 'Proceed\n');
        console.log(color.magenta('3.'), 'Back\n');

        const userChoice = readline.question();

        switch (userChoice) {

            case '1':

                this.registerOrder();

                break;

            case '3':

                systemController.primaryScreen.mainScreen.getUserChoice();

                break;

            default:

                console.clear();

                console.log(color.red('\nPlease, insert a valid option.\n'));

                this.getUserChoice();

                break;

        }
        
    }

    private registerOrder(): void {

        console.clear();
        console.log(color.cyan('\nNew Order'));

        const customerName = this.getCustomerName(),
            date = this.getOrderDate();

        let cakes: Cake[],
            sweets: SweetType[];

        do {

            cakes = this.getCakes(),
            sweets = this.getSweets();

        } while (cakes.length == 0 && sweets.length == 0);

        let success: boolean = true,
            specialOrder: number = 0;

        console.log(color.magenta("\nSpecial order (1.No, 2.Yes)?\n"));

        do {

        specialOrder = readline.questionInt();

        } while (specialOrder >= 3 || specialOrder <= 0);

        try {

                systemController.modelsController.createOrder(
                    customerName,
                    date,
                    this.username,
                    cakes,
                    sweets,
                    specialOrder
                )

        }
    
        catch (error) {
    
            console.error('Error writing order:', error);

            success = false;
    
        }

        if (success) {

            console.clear();
            console.log(color.yellow('\nYou successfully registered the order!\n'));

        }

        setTimeout(() => {systemController.primaryScreen.mainScreen.getUserChoice();}, 3000);
        
    }

    private getCustomerName(): string {

        console.clear();

        const customerName = readline.question(color.magenta('\nCustomer name: '));

        if (customerName == '') {

            return this.getCustomerName();

        }

        return customerName;

    }

    private getCakes(): Cake[] {

        console.clear();

        let cakes: Cake[] = [];

        const amountOfCakes = readline.questionInt(color.magenta('\nAmount of Cakes: '));

        for (let i = 0; i < amountOfCakes; i++) {

            console.clear()

            let flavor: string = '';

            do {

                flavor = readline.question(
                    color.magenta('\nCake nº' + (i + 1)) + color.green(' flavor') + color.magenta(': ')
                );

                if (flavor == '') {

                    console.log(color.red("\nFlavor need to be specified"));

                }

            } while (flavor == '');

            const weight = readline.questionFloat(
                    color.magenta('\nCake nº' + (i + 1)) + color.green(' weight(kg)') + color.magenta(': ')
                ),
                pricePerKilo = readline.questionInt(
                    color.magenta('\nCake nº' + (i + 1)) + color.green(' kg price') + color.magenta(': ')
                );

            let cake = systemController.modelsController.newCake(flavor, weight, pricePerKilo);

            cakes.push(cake);

        }

        return cakes;
    }

    private getSweets(): SweetType[] {

        console.clear();

        let sweetTypes: SweetType[] = [];

        const sweetsTypesAmount = readline.questionInt(
            color.magenta('\nAmount of types of Sweets: ')
        );

        if (sweetsTypesAmount == 0) {

            const flavor = '',
                amount = 0,
                priceOfHundred = 0;

                let sweetType = systemController.modelsController.newSweetType(flavor, amount, priceOfHundred);

                sweetTypes.push(sweetType);

            return sweetTypes;

        }

        for (let i = 0; i < sweetsTypesAmount; i++) {

            console.clear();

            let flavor: string = '';

            do {

                flavor = readline.question(
                        color.magenta('\nSweets type nº' + (i + 1)) + color.green(' flavor') + color.magenta(': ')
                    );

                if (flavor == '') {

                    console.log(color.red('\nFlavor need to be specified'));

                };

            } while (flavor == '');


            const amount = readline.questionInt(
                    color.magenta('\nSweets type nº' + (i + 1)) + color.green(' amount') + color.magenta(': ')
                ),
                priceOfHundred = readline.questionInt(
                    color.magenta('\nSweets type nº' + (i + 1)) + color.green(' hundred price') + color.magenta(': ')
                );
            
            let sweetType = systemController.modelsController.newSweetType(flavor, amount, priceOfHundred);

            sweetTypes.push(sweetType);

        }

        return sweetTypes;
    }

    private getOrderDate(): Date {

        const currentYear = new Date().getFullYear();

        const year = readline.questionInt(color.magenta('\nOrder year: ')),
            month = readline.questionInt(color.magenta('\nOrder month: ')),
            day = readline.questionInt(color.magenta('\nOrder day: ')),
            hour = readline.questionInt(color.magenta('\nOrder hour (0-23): ')),
            minute = readline.questionInt(color.magenta('\nOrder minute (0-59): '));

        if (day > 31 || day <= 0 || month > 12 || month <= 0 || year > 2050 || year < currentYear) {

            console.clear();
            console.log(
                color.red(
                    '\nInvalid date. Days must be between 1 and 31, months between 1 and 12, and years between ' +
                        currentYear +
                        ' and 2050.'
                )
            );

            return this.getOrderDate();

        }

        if (hour > 23 || hour < 0 || minute > 59 || minute < 0) {

            console.clear();
            console.log(
                color.red(
                    '\nInvalid input. Hour must be between 0 and 23. Minute must be between 0 and 59.'
                )
            );

            return this.getOrderDate();

        }

        const date: Date = new Date(Date.UTC(year, month - 1, day, hour, minute, 1, 1));

        return date;

    }

}
