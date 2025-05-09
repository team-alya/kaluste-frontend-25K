import { Evaluation } from "./evaluation";

export type EvaluationData = {
    recommended_price: number;
    priceEstimation: EvaluationData | undefined;
    evaluation: Evaluation;
    imageId: string;
    id?: string;
    timeStamp?: string;
    description?: string;
  };