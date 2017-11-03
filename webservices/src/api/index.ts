import ProductionApi from './production-api';

function getApiByEnv() {
    return ProductionApi;
}

export default getApiByEnv();