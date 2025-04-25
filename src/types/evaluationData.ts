import { Evaluation } from "./evaluation";

export type EvaluationData = {
    suositus_hinta: number;
    priceEstimation: EvaluationData | undefined;
    evaluation: Evaluation;
    imageId: string;
    id?: string;
    timeStamp?: string;
  };