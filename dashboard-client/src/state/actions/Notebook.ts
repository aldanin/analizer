import * as Redux from 'redux'
import { NotebookData } from '../../types/Notebook';

export const NOTEBOOK_DATA_REQUEST = 'Notebook/DATA_REQUEST';
export const NOTEBOOK_DATA_SUCCESS = 'Notebook/DATA_SUCCESS';
export const NOTEBOOK_DATA_FAIL = 'Notebook/DATA_FAIL';

export interface NotebookRequestAction extends Redux.Action {
  productId: number;
}

export function notebookRequest(productId: number): NotebookRequestAction {
  return {
    type: NOTEBOOK_DATA_REQUEST,
    productId,
  };
}

export interface NotebookSuccessAction extends Redux.Action {
  data: NotebookData;
}

export function notebookDataSuccess(data: NotebookData): NotebookSuccessAction {
  return {
    type: NOTEBOOK_DATA_SUCCESS,
    data: data,
  };
}

export interface NotebookFailAction extends Redux.Action {
  error: Error;
}

export function notebookDataFail(error: Error): NotebookFailAction {
  return {
    type: NOTEBOOK_DATA_FAIL,
    error: error,
  };
}
