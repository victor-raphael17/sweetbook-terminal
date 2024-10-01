import color from 'chalk';
import readline from 'readline-sync';
import systemController from '../index.js';
import { Order } from '../models/data/Order.js';

export class OrderListScreen {

    public getUserChoice(): void {

        console.clear();
        console.log(color.cyan('\nOrder List\n'));
        console.log(color.magenta('1.'), 'Date Based Order list (day/month)\n');
        console.log(color.magenta('2.'), 'Customer Based Order list (name)\n');
        console.log(color.magenta('3.'), 'All Orders list\n');
        console.log(color.magenta('4.'), 'Back\n');

        const userChoice = readline.question();

        switch (userChoice) {

            case '1':

                this.getDateBasedOrderList();

                break;

            case '2':

                this.getCustomerBasedOrderList();

                break;

            case '3':

                this.getAllOrdersList();

                break;

            case '4':

                systemController.primaryScreen.mainScreen.getUserChoice();

                break;

            default:

                console.log(color.red('\nPlease, insert a valid option.\n'));

                this.getUserChoice();

                break;

        }
        
    }

    private getNewOrderListRequestTemplate(): void {

        console.clear();
        console.log(color.cyan('\n------------------------------------------'));
        console.log(color.cyan('          New Order List Request          '));
        console.log(color.cyan('------------------------------------------'));

    }

    private getDateBasedOrderList(): void {

        console.clear();

        const day = readline.questionInt(color.magenta('\nInsert the day you want to consult: ')),
            month = readline.questionInt(color.magenta('Insert the month you want to consult: '));

        this.getNewOrderListRequestTemplate();

            this.getOrderList(
                systemController.modelsController.getDateBasedOrderList(
                    day, (month - 1)
                )
            );

    }

    private getCustomerBasedOrderList(): void {

        console.clear();

        
        const customerName = readline.question(color.magenta(
            '\nInsert the customer name of the orders you want to consult: '
        ));

        if (customerName == '') {

            console.log(color.red('\nCustomer name was not specified'));

            return this.getCustomerBasedOrderList();

        }

        this.getNewOrderListRequestTemplate();

        this.getOrderList(
            systemController.modelsController.getCustomerBasedOrderList(
                customerName
            )
        );

    }

    private getAllOrdersList(): void {

        console.clear();
        
        this.getNewOrderListRequestTemplate();

        this.getOrderList(systemController.modelsController.getAllOrdersList());

    }

    private getOrderList(orders: Order[]): void {

        for (let i = 0; i < orders.length; i++) {

            console.log('\nCustomer name: ' + orders[i].getCustomerName());
            console.log(
                '\nOrder date (mm/dd/yyyy): ' +
                (orders[i].getDate().getMonth() + 1) + '/' +
                (orders[i].getDate().getDate()) + '/' +
                orders[i].getDate().getFullYear()
            );
            console.log('\nOrder time: ' + orders[i].getDate().getUTCHours() + ':' + orders[i].getDate().getUTCMinutes());
            console.log('\nWorker username: ' + orders[i].getUsername());

            if (orders[i].getSpecialOrderInfo()) {

                console.log('\nSpecial order!');

            }

            const cakes = orders[i].getCakes(),
                sweets = orders[i].getSweets();

            for (let j = 0; j < cakes.length; j++) {

                console.log('\nCake nº' + (j + 1) + ' flavor: ' + cakes[j].getFlavor());
                console.log('Cake nº' + (j + 1) + ' weight: ' + cakes[j].getWeight());
                console.log('Cake nº' + (j + 1) + ' price per kilo: ' + cakes[j].getPricePerKilo());
                console.log('Cake nº' + (j + 1) + ' price: ' + cakes[j].getPrice());

            }

            for (let j = 0; j < sweets.length; j++) {

                console.log('\nSweet type nº' + (j + 1) + ' flavor: ' + sweets[j].getFlavor());
                console.log('Sweet type nº' + (j + 1) + ' amount: ' + sweets[j].getAmount());
                console.log('Sweet type nº' + (j + 1) + ' price of a hundred: ' + sweets[j].getPriceOfHundred());
                console.log('Sweet type nº' + (j + 1) + ' price: ' + sweets[j].getPrice());

            }

            console.log('\nTotal price: ' + orders[i].getTotalPrice());
            console.log(color.cyan('\n------------------------------------------'));

        }

        console.log(color.magenta('\n2.'), 'Back\n');

        const userChoice = readline.question();

        switch (userChoice) {

            case '2':

                this.getUserChoice();

                break;

            default:

                console.clear();
                console.log('Not a valid option. Going back anyway.');

                this.getUserChoice();

        }

    }

}