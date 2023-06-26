import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class FileSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): boolean;
}
