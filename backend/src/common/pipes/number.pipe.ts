import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class NumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (value && isNaN(val)) {
      throw new BadRequestException(
        'The argument is not a number or a null value',
      );
    }
    return val;
  }
}
