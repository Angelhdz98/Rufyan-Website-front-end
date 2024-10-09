import { Painting } from "../types/typesIndex";

export function isPainting(obj: any): obj is Painting {

    return obj && typeof obj === 'object' && 'id' in obj && 'largo_cm' in obj && 'altura_cm' in obj && 'medium' in obj && 'price_copy' in obj && 'available_copies' in obj;
  }