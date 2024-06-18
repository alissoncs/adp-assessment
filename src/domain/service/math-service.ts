import { MathOperationExecutionStepDto, OperationType } from "../contract/contract";
import { TaskInterface } from "../../adapter/task-interface";
import MatchOperationRepository from "../persistence/math-operation-repository";


export const operationMapFunction: Record<OperationType, Function> = {
    addition: (val: number, val2: number) => val + val2,
    subtraction: (val: number, val2: number) => val - val2,
    division: (val: number, val2: number) => val / val2,
    multiplication: (val: number, val2: number) => val * val2,
    remainder: (val: number, val2: number) => val % val2,
}

export default class MathService {
    
    private readonly RUN_EVERY_SECONDS: number = 10;

    private readonly taskImpl: TaskInterface;
    private readonly matchOperationRepository: MatchOperationRepository;

    constructor(taskImpl: TaskInterface, matchOperationRepository: MatchOperationRepository) {
        this.taskImpl = taskImpl;
        this.matchOperationRepository = matchOperationRepository;
    }

    async handleMathOperation(): Promise<MathOperationExecutionStepDto> {
        const taskResult = await this.taskImpl.getTask();
        console.info("Task result output: ", taskResult);

        const { left, right, operation, id } = taskResult;

        if (!operationMapFunction[operation]) {
            throw new Error("Unmapped operation called " + operation);
        }

        const result = operationMapFunction[operation](left, right);

        const submitTaskResult = await this.taskImpl.submitTask(id, result);

        const payload =  {
            operation,
            isCorrect: submitTaskResult.ok,
            failureReason: submitTaskResult.failureReason,
            left,
            right,
            result,
            at: new Date(),
        };

        await this.matchOperationRepository.save(payload);
        return payload;
    }

    async findAllExecutions() {
        return await this.matchOperationRepository.findAll();
    }

    async executeMathOperationsInBackground() {
        console.info('Math operations in background. Process started');
        setInterval(() => {
            this.handleMathOperation()
        }, this.RUN_EVERY_SECONDS * 1000);
    }
}
