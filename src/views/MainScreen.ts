import color from 'chalk';
import readline from 'readline-sync';
import systemController from '../index.js';
import { NewOrderScreen } from './NewOrderScreen.js';
import { OrderListScreen } from './OrderListScreen.js';

export class MainScreen {

    private username: string;
    private fullName: string;

    public setFullName(): void {

        this.fullName = systemController.modelsController.getFullNameFromUsername(this.username);

    }

    public setUsername(username: string): void {

        this.username = username;

    }

    public getUserChoice(): void {

        console.clear();
        console.log(color.cyan('\nSweetBook\n'));
        console.log(color.green('Hello', this.fullName + '!\n'));
        console.log(color.magenta('1.'), 'New Order\n');
        console.log(color.magenta('2.'), 'Order List\n');
        console.log(color.magenta('3.'), 'Quit\n');

        const userChoice = readline.question();

        switch (userChoice) {

            case '1':
                
                const newOrderScreen = new NewOrderScreen(this.username);

                newOrderScreen.getUserChoice();

                break;

            case '2':

                const orderListScreen = new OrderListScreen();

                orderListScreen.getUserChoice();

                break;

            case '3':

                console.clear();
                console.log(color.green('\nOk. Goodbye!!!\n'));

                setTimeout(() => {systemController.endSystem();}, 1700);

                break;

            default:

                console.clear();

                console.log(color.red('\nPlease, insert a valid option.\n'));

                this.getUserChoice();

                break;

        }

    }

}
