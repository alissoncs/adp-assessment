import { describe, expect, test } from '@jest/globals';
import MathService, { operationMapFunction } from './math-service';
import { GetTaskResponseDto, MathOperationExecutionStepDto, SubmitTaskResponseDto } from '../contract/contract';
import MathOperationRepository from '../persistence/math-operation-repository';
import { TaskInterface } from '../../adapter/task-interface';

describe('two plus two is four', () => {

    const mathOperationRepository = new MathOperationRepository();
    const taskImpl: TaskInterface = {
        getTask: () => Promise.resolve({
            operation: 'addition',
            left: 1,
            right: 2,
            id: '321123'
        } as GetTaskResponseDto),
        submitTask: (id: string, result: number) => Promise.resolve({} as SubmitTaskResponseDto)
    };

    let mathService: MathService
    beforeEach(() => {
        mathService = new MathService(taskImpl, mathOperationRepository);
    });

    test('find all executions must call find all repository method', async () => {
        jest.spyOn(mathOperationRepository, 'findAll')
            .mockImplementation(() => Promise.resolve([
                {
                    left: 1,
                    operation: 'addition',
                    right: 2,
                    result: 3,
                    isCorrect: true
                } as MathOperationExecutionStepDto
            ]))

        const result = await mathService.findAllExecutions();
        expect(result[0].left).toEqual(1);
        expect(result[0].operation).toEqual('addition');
    });

    test('handleMathOperation method must call task impl api and run math operations', async () => {
        const saveMethod = jest.spyOn(mathOperationRepository, 'save')
            .mockImplementation(() => Promise.resolve())

        const result = await mathService.handleMathOperation();
        expect(result.left).toEqual(1);
        expect(result.right).toEqual(2);
        expect(result.operation).toEqual('addition');
        expect(result.result).toEqual(3);

        expect(saveMethod).toBeCalledTimes(1);
    })

    test('validate operationMapFunction all math operations', async () => {
        expect(operationMapFunction['addition'](1, 1)).toEqual(2);
        expect(operationMapFunction['subtraction'](1, 1)).toEqual(0);
        expect(operationMapFunction['multiplication'](10, 2)).toEqual(20);
        expect(operationMapFunction['division'](10, 2)).toEqual(5);
    });

});