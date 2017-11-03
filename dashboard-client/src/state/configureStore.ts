import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas/rootSaga'
import * as createLogger from 'redux-logger'

const configureStore = (preloadedState: any) => {
  const sagaMiddleware = createSagaMiddleware()
  const reduxLogger = createLogger()

  let middleware = [
    sagaMiddleware,
  ]
  if (process.env.NODE_ENV === 'development') {
    middleware.push(reduxLogger)
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(sagaMiddleware, reduxLogger)
  )

  sagaMiddleware.run(rootSaga)

  return store
}

export default configureStore
