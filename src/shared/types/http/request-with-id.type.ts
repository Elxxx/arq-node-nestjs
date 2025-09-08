import { Request } from 'express';

/**
 * Extiende el request de Express con un campo `id` para trazabilidad.
 */
export type RequestWithId = Request & { id?: string };
