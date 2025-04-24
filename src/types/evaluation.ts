import { Dimensions } from './dimensions';

export interface Evaluation {
    priceEstimation: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    evaluation: any;
    brand: string;
    model: string;
    color: string;
    dimensions: Dimensions;
    condition: string;
    materials: string[]; 
    suositus_hinta: number;
    description: string;
    status: string;
    timeStamp: string;
    id: string;
    imageId: string;
}