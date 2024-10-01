import readline from 'readline-sync';
import color from 'chalk';
import systemController from '../index.js';
import { MainScreen } from './MainScreen.js';

export default class PrimaryScreen {

    public mainScreen = new MainScreen();

    public getWelcomeScreen(): void {

        console.clear();
        console.log(color.cyan('\nWelcome to SweetBook!\n'));

        this.getUserChoice();

    }

    public getUserChoice(): void {

        console.log(color.magenta('1.'), 'Sign In');
        console.log(color.magenta('2.'), 'Register');
        console.log(color.magenta('3.'), 'Quit\n');

        const userChoice = readline.question();

        switch (userChoice) {

            case '1':

                console.clear();
                console.log(color.green('\nYou chose to Sign in!'));

                this.login();
                
                break;

            case '2':

                console.clear();
                console.log(color.green('\nYou chose to Register!'));

                this.register();

                break;

            case '3':
                
                console.clear();
                console.log(color.green('\nOk. Goodbye!!!\n'));

                setTimeout(() => {systemController.endSystem();}, 1700);

                break;

            default:

                console.clear();
                console.log(color.red('\nInsert a valid option!\n'));

                this.getUserChoice();

                break;

        }
    }

    private login(): void {

        console.log(("\nInsert '") + color.cyan('quit') + ("' in username field to quit."));

        const username = readline.question(color.magenta('\nUsername: '));

        if (username == 'quit') {

            return this.getWelcomeScreen();

        }

        const password = readline.question(color.magenta('\nPassword: '), {hideEchoBack: true});

        const loginStatus = systemController.modelsController.login(username, password);

        if (loginStatus) {

            console.clear();

            this.mainScreen.setUsername(username);

            this.mainScreen.setFullName();

            console.log(color.yellow('\nYou have successfully logged in!\n'));
            
            setTimeout(() => {this.mainScreen.getUserChoice();}, 1800);

        } else {

            console.clear();

            console.log(color.red('\nInvalid username or password. Try again.'));

            this.login();
            
        }

    }

    private register(): void {


        console.log(("\nInsert '") + color.cyan('quit') + ("' in full name field to quit."));

        const fullName = readline.question('\nEnter your ' + color.magenta('full ') + 'name: ');

        if (fullName == 'quit') {

            return this.getWelcomeScreen();

        }

        const validatedFullName = this.getFullNameValidation(fullName);

        if (validatedFullName == 'quit') {

            return this.getWelcomeScreen();

        }

        const username: string = this.getNewUserUsername(),
            password: string = this.getNewUserPassword();

        const newUser = systemController.modelsController.createUser(username, password, validatedFullName);

        if (newUser) {

            console.clear();

            this.mainScreen.setUsername(username);

            this.mainScreen.setFullName();

            console.log(color.yellow('\nCongrats, you are successfully registered!\n'));

            setTimeout(() => {this.mainScreen.getUserChoice();}, 1800);

        } else {

            console.clear();

            console.log(color.red('\nUsername already in use.'));

            this.register();

        }

    }

    private getNewUserUsername(): string {

        const username = readline.question('\nEnter your ' + color.magenta('username: '));

        if (username == 'quit') {

            console.log(color.red('\nQuit is not assinable as an username. Try again!'));

            return this.getNewUserUsername();

        }

        if (username == '') {

            console.log(color.red("\nUsername field can't be empty."));

            return this.getNewUserUsername();

        }

        return username;

    }

    private getFullNameValidation(fullName: string): string {

        let validatedFullName: string = fullName;

        while (validatedFullName.length > 20 || validatedFullName == '') {

            if (validatedFullName.length > 20) {

                console.clear();
                console.log(color.red('\nEnter a shorter name.'));

            }

            if (validatedFullName == '') {

                console.clear();
                console.log(color.red("\nThis field can't be empty."));

            }
            
            console.log(("\nInsert '") + color.cyan('quit') + ("' in full name field to quit."));

            validatedFullName = readline.question('\nEnter your ' + color.magenta('full ') + 'name: ');
            
        }

        return validatedFullName;

    }

    private getNewUserPassword(): string {

        let password: string,
            confirmPassword: string = '';

        do {

            password = readline.question(
                '\nEnter your ' + color.magenta('password: '),
                {hideEchoBack: true}
            );

            confirmPassword = readline.question('\nConfirm your ' + color.magenta('password: '), {hideEchoBack: true});

            if (confirmPassword != password) {

                console.clear();
                console.log(color.red('\nThe passwords are different! Try again.'));

            }

            if (password == '') {

                console.clear();
                console.log(color.red("\nPassword field can't be empty."));

            }

        } while (confirmPassword != password || password == '');

        return password;

    }
       
}