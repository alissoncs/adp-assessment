import { MathOperationExecutionStepDto } from "../contract/contract";

let IN_MEMO_DATASET: MathOperationExecutionStepDto[] = [];

export default class MathOperationRepository {
  save(data: MathOperationExecutionStepDto) {
    IN_MEMO_DATASET = [data, ...IN_MEMO_DATASET];
  }

  findAll(): Promise<MathOperationExecutionStepDto[]> {
    return Promise.resolve(IN_MEMO_DATASET);
  }
}
