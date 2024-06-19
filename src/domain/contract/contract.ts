
export type OperationType =
'subtraction' | 
'division' | 'addition' | 'multiplication' | 'remainder';

export interface GetTaskResponseDto {
    id: string;
    operation: OperationType;
    right: number;
    left: number;
};

export interface SubmitTaskResponseDto {
    ok: boolean;
    failureReason?: string;
};

export interface MathOperationExecutionStepDto {
    failureReason?: string;
    operation: OperationType;
    right: number;
    left: number;
    result: number;
    isCorrect?: boolean;
};