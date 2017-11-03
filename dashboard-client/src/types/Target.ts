import { OperationId } from './Operation'

export interface TargetData {
  id: TargetId,
  name: string,
  operationId: OperationId,
}
export type TargetId = string
