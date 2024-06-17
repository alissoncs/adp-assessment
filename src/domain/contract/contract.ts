
export type OperationType =
'subtraction' | 
'division' | 'addition' | 'multiplication' | 'remainder';

export interface GetTaskResponseDto {
    id: string;
    operation: OperationType;
    right: number;
    left: number;
}