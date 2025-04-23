import { Dimensions } from './dimensions';

export interface Evaluation {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    evaluation: any;
    brand: string;
    model: string;
    color: string;
    dimensions: Dimensions;
    condition: string;
    materials: string[]; 
    price: string;
    notes: string;
    status: string;
    timeStamp: string;
    id: string;
    imageId: string;
}