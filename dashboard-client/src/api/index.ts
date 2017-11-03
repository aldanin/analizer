import ProductionApi from './Production'
import DevelopmentApi from './Development'

export default function getInstance() {
  if (process.env.REACT_APP_IS_MOCK) {
    return new DevelopmentApi();
  }

  return new ProductionApi();
}
