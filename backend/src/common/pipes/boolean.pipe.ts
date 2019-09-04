import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class BooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== 'false' && value !== 'true') {
      throw new BadRequestException();
    }
    return value === 'true';
  }
}
