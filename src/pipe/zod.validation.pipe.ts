import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodObject, z } from 'zod';

/**
 * use zod for validation
 * @see [object-schema-validation](https://docs.nestjs.com/pipes#object-schema-validation)
 */
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<CreateCatDto>) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Zod Validation failed');
    }
    return value;
  }
}

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto = z.infer<typeof createCatSchema>;
