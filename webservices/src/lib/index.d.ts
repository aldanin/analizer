declare namespace WSFramework {
	export interface FrameworkConfig {
		port: number;
		logLevel: number;
		serviceName: string;
		authSecret: string;
	}

	export interface Controller {
		mount(request: any, response: any): void;
	}

	export interface EndpointConstructor {
		new (logger: WSFramework.Logger): Endpoint;

		getIdentifier(): string;
		isProtected(): boolean;
		getRequestValidators(): Object | void;
		getResponseValidators(): Object | void;
	}

	export interface Endpoint {
		execute(request: any, response: any): Promise<any>;

	}

	export interface RequestHandler {
		(request: any, response: any, next?: any): void
	}

	interface LoggerCtor {
		new (logLevel: number): Logger;
	}

	export interface Logger {
		info(component: string, message: any): void;
		error(component: string, message: any): void;
		audit(component: string, message: any): void;
	}

	export interface Validator {
		validate(value: any, path: string): any;
	}

	export interface ObjectValidator extends Validator {
		pushExpectedValidator(key: string, validator: Validator): void;
	}
}