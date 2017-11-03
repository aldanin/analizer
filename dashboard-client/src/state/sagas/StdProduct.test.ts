import { call, put, takeEvery, select } from 'redux-saga/effects'

import {
  PRODUCT_ADD_TAG,
  PRODUCT_REMOVE_TAG,
  PRODUCT_SET_FAVORITE,
  PRODUCT_MARK_AS_READ,
  PRODUCT_MARK_AS_UNREAD,
  PRODUCT_ADD_TO_NOTEBOOK,
  PRODUCT_ASK_FOR_TRANSLATE,
  PRODUCT_ASK_FOR_TRANSCRIPT,
} from '../actions/ProductActions'

import {
  productActionFail,
  productAddTag,
  productRemoveTag,
  productSetFavorite,
  productMarkAsRead,
} from '../actions/ProductActions'

import * as Saga from './StdProduct'

describe('should watch all actions', () => {
  const generator = Saga.watchProductActions();

  test('PRODUCT_ADD_TAG', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_ADD_TAG, Saga.addTag)
    );
  })
  test('PRODUCT_REMOVE_TAG', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_REMOVE_TAG, Saga.removeTag)
    );
  })
  test('PRODUCT_SET_FAVORITE', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_SET_FAVORITE, Saga.setFavorite)
    );
  })
  test('PRODUCT_MARK_AS_READ', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_MARK_AS_READ, Saga.mark, 'read', true)
    );
  })
  test('PRODUCT_MARK_AS_UNREAD', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_MARK_AS_UNREAD, Saga.mark, 'read', false)
    );
  })
  test('PRODUCT_ADD_TO_NOTEBOOK', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_ADD_TO_NOTEBOOK, Saga.mark, 'notebook', true)
    );
  })
  test('PRODUCT_ASK_FOR_TRANSCRIPT', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_ASK_FOR_TRANSCRIPT, Saga.mark, 'transcript', true)
    );
  })
  test('PRODUCT_ASK_FOR_TRANSLATE', () => {
    expect(
      generator.next().value
    ).toEqual(
      takeEvery(PRODUCT_ASK_FOR_TRANSLATE, Saga.mark, 'translate', true)
    );
  })
})

describe('add tag success', () => {
  const action = productAddTag({
    ids: [],
    tags: [],
  },                           'foo')
  const generator = Saga.addTag(action)

  it('should select agent id', () => {
    // select agen id
    expect(
      generator.next().value
    ).toEqual(
      select(Saga.agentSelector)
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next('agentFoo').value
    ).toEqual(
      call(Saga.apiAddTag, 'foo', [], 'agentFoo', [])
    );
  })
})

describe('add tag fail', () => {
  it('should dispatch fail action on fail', () => {
    const action = productAddTag({
      ids: [],
      tags: [],
    },                           'foo')
    const generator = Saga.addTag(action)
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(productActionFail(error))
    )
  })
})

describe('remove tag success', () => {
  const action = productRemoveTag({
    id: 'abcd',
    tagId: 'tag',
  },                              'foo')
  const generator = Saga.removeTag(action)

  it('should select agent id', () => {
    // select agen id
    expect(
      generator.next().value
    ).toEqual(
      select(Saga.agentSelector)
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next('agentSmith').value
    ).toEqual(
      call(Saga.apiRemoveTag, 'foo', 'abcd', 'agentSmith', 'tag')
    );
  })
})

describe('remove tag fail', () => {
  it('should dispatch fail action on fail', () => {
    const action = productRemoveTag({
      id: 'abcd',
      tagId: 'tag',
    },                              'foo')
    const generator = Saga.removeTag(action)
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(productActionFail(error))
    )
  })
})

describe('set favorite success', () => {
  const action = productSetFavorite({
    id: 'abcd',
    isFavorite: true,
  },                                'foo')
  const generator = Saga.setFavorite(action)

  it('should select agent id', () => {
    // select agen id
    expect(
      generator.next().value
    ).toEqual(
      select(Saga.agentSelector)
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next('agentSmith').value
    ).toEqual(
      call(Saga.apiMark, 'foo', ['abcd'], 'agentSmith', 'starred', true)
    );
  })
})

describe('set favorite fail', () => {
  it('should dispatch fail action on fail', () => {
    const action = productSetFavorite({
      id: 'abcd',
      isFavorite: true,
    },                                'foo')
    const generator = Saga.setFavorite(action)
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(productActionFail(error))
    )
  })
})

describe('mark success', () => {
  const action = productMarkAsRead({
    ids: [],
  },                               'foo')
  const generator = Saga.mark('read', true, action)

  it('should select agent id', () => {
    // select agen id
    expect(
      generator.next().value
    ).toEqual(
      select(Saga.agentSelector)
    );
  })

  it('should call the API', () => {
    // call API
    expect(
      generator.next('agentSmith').value
    ).toEqual(
      call(Saga.apiMark, 'foo', [], 'agentSmith', 'read', true)
    );
  })
})

describe('mark fail', () => {
  it('should dispatch fail action on fail', () => {
    const action = productMarkAsRead({
      ids: [],
    },                               'foo')
    const generator = Saga.mark('read', true, action)
    const error = new Error('blah')

    generator.next();

    expect(
      generator.throw(error).value
    ).toEqual(
      put(productActionFail(error))
    )
  })
})
