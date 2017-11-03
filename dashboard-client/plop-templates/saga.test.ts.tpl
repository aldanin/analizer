import { call, put, takeEvery } from 'redux-saga/effects'
import { fetch{{ properCase name }}, watch{{ properCase name }}, apiFetch{{ properCase name }} } from './{{ properCase name }}'
import {
  LOAD_{{ constantCase name }},
  {{ camelCase name }}Load,
  {{ camelCase name }}LoadRequest,
  {{ camelCase name }}LoadSuccess,
  {{ camelCase name }}LoadFail
} from '../actions/{{ properCase name }}'

describe('should watch all actions', () => {
  const generator = watch{{ properCase name }}();

  it('should watch load action', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(LOAD_{{ constantCase name }}, fetch{{ properCase name }})
    );
  })
})

describe('data load flow success', () => {
  const action = {{ camelCase name }}Load(5)
  const generator = fetch{{ properCase name }}(action);

  it('should dispatch request started', () => {
    expect(
      generator.next().value
    ).toEqual(
      put({{ camelCase name }}LoadRequest())
    );
  })

  it('should call the API', () => {
    expect(
      generator.next().value
    ).toEqual(
      call(apiFetch{{ properCase name }}, 5)
    );
  })

  it('should dispatch the results', () => {
    const demoResponse = []

    const res = generator.next(demoResponse).value
    expect(
      res
    ).toEqual(
      put({{ camelCase name }}LoadSuccess(demoResponse, res['PUT'].action.timestamp))
    )
  })
})

describe('data load flow fail', () => {
  it('should dispatch fail action on fetch fail', () => {
    const action = {{ camelCase name }}Load(7)
    const generator = fetch{{ properCase name }}(action);
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put({{ camelCase name }}LoadFail(error))
    )
  })
})
