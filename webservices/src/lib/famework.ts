import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import Logger from './logger';
import Controller from './controller';

class Framework {
    private config: WSFramework.FrameworkConfig;
    private engine: express.Application;
    private logger: any;

    constructor(config: WSFramework.FrameworkConfig) {
        this.config = config;

        this.engine = express();

        // Setup engine
        this.engine.use(cors());
        this.engine.use(bodyParser.json());

        this.engine.use(Framework.poweredByMiddleware(config.serviceName));

        this.logger = new Logger(config.logLevel);
    }

    public getEngine() {
        return this.engine;
    }

    public get(path: any, handler?: WSFramework.EndpointConstructor) {
        (<express.IRouterMatcher<any>> this.engine.get)(path, new Controller(handler, this.logger).mount());

        return this;
    }

    public post(path: any, handler?: WSFramework.EndpointConstructor) {
        this.engine.post(path, new Controller(handler, this.logger).mount());

        return this;
    }

    public put(path: any, handler?: WSFramework.EndpointConstructor) {
        this.engine.put(path, new Controller(handler, this.logger).mount());

        return this;
    }

    public delete(path: any, handler?: WSFramework.EndpointConstructor) {
        this.engine.delete(path, new Controller(handler, this.logger).mount());

        return this;
    }

    public use(path: string, handler?: WSFramework.EndpointConstructor) {
        this.engine.use(path, new Controller(handler, this.logger).mount());

        return this;
    }

    public listen(port?: number) {
        this.engine.listen(port || this.config.port);
    }

    static poweredByMiddleware(serviceName: string) {
        return (request, response, next) => {
            response.set('X-Powered-By', serviceName);

            next();
        }
    }
}

export default (config: WSFramework.FrameworkConfig) => new Framework(config);