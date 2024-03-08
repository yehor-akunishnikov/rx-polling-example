import { setupWorker } from 'msw/browser';
import { handlers } from './handlers/user-processing';

export const worker = setupWorker(...handlers);
