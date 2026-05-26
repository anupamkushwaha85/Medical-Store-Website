import { AppError } from '../utils/errors.js';

/**
 * Creates an Express middleware that validates the request body (or query)
 * against a Zod schema. On failure, throws a structured 400 AppError with
 * field-level details.
 *
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 * @param {'body' | 'query' | 'params'} source - Which part of the request to validate
 * @returns {Function} Express middleware
 */
export const validate = (schema, source = 'body') => (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
        const fieldErrors = result.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
        }));

        throw new AppError(
            'Validation failed',
            400,
            fieldErrors,
        );
    }

    // Replace the source with parsed (and transformed) data
    req[source] = result.data;
    next();
};
