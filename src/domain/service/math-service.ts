import {
  MathOperationExecutionStepDto,
  OperationType,
} from "../contract/contract";
import { TaskInterface } from "../../adapter/task-interface";
import MathOperationRepository from "../persistence/math-operation-repository";

type OperationFunction = (val: number, val2: number) => number;

export const operationMapFunction: Record<OperationType, OperationFunction> = {
  addition: (val: number, val2: number) => val + val2,
  subtraction: (val: number, val2: number) => val - val2,
  division: (val: number, val2: number) => val / val2,
  multiplication: (val: number, val2: number) => val * val2,
  remainder: (val: number, val2: number) => val % val2,
};

export default class MathService {
  private readonly RUN_EVERY_SECONDS: number = 10;

  private readonly taskImpl: TaskInterface;
  private readonly mathOperationRepository: MathOperationRepository;

  constructor(
    taskImpl: TaskInterface,
    mathOperationRepository: MathOperationRepository,
  ) {
    this.taskImpl = taskImpl;
    this.mathOperationRepository = mathOperationRepository;
  }

  async handleMathOperation(): Promise<MathOperationExecutionStepDto> {
    const taskResult = await this.taskImpl.getTask();
    console.info("Task result output: ", taskResult);

    const { left, right, operation, id } = taskResult;

    if (!operationMapFunction[operation]) {
      throw new Error(`Unmapped operation '${operation}'`);
    }

    const result = operationMapFunction[operation](left, right);

    const submitTaskResult = await this.taskImpl.submitTask(id, result);

    const payload = {
      operation,
      isCorrect: submitTaskResult.ok,
      failureReason: submitTaskResult.failureReason,
      left,
      right,
      result,
      at: new Date(),
    };

    await this.mathOperationRepository.save(payload);
    return payload;
  }

  async findAllExecutions() {
    return await this.mathOperationRepository.findAll();
  }

  async executeMathOperationsInBackground() {
    console.info("Math operations running in the background. Process started.");
    setInterval(() => {
      this.handleMathOperation();
    }, this.RUN_EVERY_SECONDS * 1000);
  }
}
