import { Dimensions } from './dimensions';

export interface Evaluation {
    brand: string;
    model: string;
    color: string;
    dimensions: Dimensions;
    condition: string;
    materials: string[]; 
    price: string;
    notes: string;
    timeStamp: string;
    id: string;
    imageId: string;
}