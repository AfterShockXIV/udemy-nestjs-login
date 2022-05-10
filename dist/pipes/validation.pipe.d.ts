import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ValidationOptions } from 'class-validator';
export declare class ValidationPipe implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
export declare function IsComparePassword(property: string, validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
