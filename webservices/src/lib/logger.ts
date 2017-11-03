import {bold, green, red, yellow} from 'chalk';

class Logger implements WSFramework.Logger {
    private logLevel: number;

    constructor(logLevel: number) {
        this.logLevel = logLevel;
    }

    public info(component: string, message: any): void {
        console.log(bold(`[${green(component)}]: ${message}`));
    }

    public error(component: string, message: any): void {
        console.log(bold(`[${red(component)}]: ${message}`));
    }

    public audit(component: string, message: any): void {
        console.log(bold(`[${yellow(component)}]: ${message}`));
    }
}

export default Logger;