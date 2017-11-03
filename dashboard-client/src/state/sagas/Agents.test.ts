import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchAgents, watchAgents, apiFetchAgents } from './Agents'
import { LOAD_AGENTS_REQUEST, agentsLoad, agentsLoadSuccess, agentsLoadFail } from '../actions/Agents'

it('should do fake data fetching', () => {
  const action = agentsLoad()
  const generator = fetchAgents(action);

  // Check that Saga asks to call the API
  expect(
    generator.next().value
  ).toEqual(
    call(apiFetchAgents)
  );

  // check dispatching of result
  const demoData = []

  expect(
    generator.next(demoData).value
  ).toEqual(
    put(agentsLoadSuccess(demoData))
  );
})

it('should put agentsLoadFail on fetch fail', () => {
  const action = agentsLoad()
  const generator = fetchAgents(action);
  const error = new Error('blah')

  generator.next();

  expect(
    generator.throw(error).value
  ).toEqual(
    put(agentsLoadFail(error))
  )
})

it('should watch load action', () => {
  const generator = watchAgents();

  expect(
    generator.next().value
  ).toEqual(
    takeEvery(LOAD_AGENTS_REQUEST, fetchAgents)
  );
})

// it('shoud update a selected password in a pw conflict in accountItem', () => {
//
// })
