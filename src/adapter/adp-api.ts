import { AxiosInstance } from "axios";
import { TaskInterface } from "./task-interface";
import api from "../common/api";
import {
  GetTaskResponseDto,
  SubmitTaskResponseDto,
} from "../domain/contract/contract";

export class AdpApi implements TaskInterface {
  private readonly api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance || api;
  }

  async getTask(): Promise<GetTaskResponseDto> {
    const taskResult = await this.api.get<GetTaskResponseDto>("/v1/get-task");
    return taskResult.data;
  }

  async submitTask(id: string, result: number): Promise<SubmitTaskResponseDto> {
    const res = await this.api
      .post("/v1/submit-task", {
        id,
        result,
      })
      .catch((err) => {
        if (err.response) return err.response;
        throw err;
      });

    console.info(
      `Submit Task response: ${id}, ${res.status} ${JSON.stringify(res.data)}`,
    );

    const mappedResults: Record<number | string, SubmitTaskResponseDto> = {
      200: { ok: true },
      404: { ok: false, failureReason: "Endpoint not found" },
      400: { ok: false, failureReason: "Incorrect provided result" },
      default: { ok: false, failureReason: "Internal error" },
    };

    return mappedResults[res.status] || mappedResults["default"];
  }
}
