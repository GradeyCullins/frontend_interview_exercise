import { handleApiError } from '../utils/helpers';
import shotData from './data/shotsNine.json';

export const shots = async () => {
  try {
    const response = shotData;
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
