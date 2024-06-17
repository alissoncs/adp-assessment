import api from "../../common/api";
import { GetTaskResponseDto, OperationType } from "../contract/contract";



const operationMapFunction: Record<OperationType, Function> = {
    addition: (val: number, val2: number) => val + val2,
    subtraction: (val: number, val2: number) => val - val2,
    division: (val: number, val2: number) => val / val2,
    multiplication: (val: number, val2: number) => val * val2,
    remainder: (val: number, val2: number) => val % val2,
}


export default async function handleMathOperation(): Promise<GetTaskResponseDto> {
    const taskResult = await api.get<GetTaskResponseDto>('/v1/get-task')

    const { left, right, operation, id } = taskResult.data;

    if (!operationMapFunction[operation]) {
        throw new Error("Unmapped operation called " + operation);
    }

    const result = operationMapFunction[operation](left, right);

    const submitTaskResult = await api.post('/v1/submit-task', {
        id,
        result
    });

    console.info('Result: ', submitTaskResult.data);
    
    return taskResult.data;
}