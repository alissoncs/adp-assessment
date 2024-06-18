import { GetTaskResponseDto, SubmitTaskResponseDto } from "../domain/contract/contract";

export interface TaskInterface {
    getTask: () => Promise<GetTaskResponseDto>;
    submitTask: (id: string, result: number) => Promise<SubmitTaskResponseDto>;
}