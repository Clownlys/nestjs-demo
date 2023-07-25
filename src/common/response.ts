// 实现一个响应拦截器

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 定义一个响应接口
export interface Response<T> {
  data: T;
}

// 实现一个响应拦截器
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    // 获取响应对象
    const response = context.switchToHttp().getResponse();
    // 获取响应的状态
    const status = response.statusCode;
    // 获取响应的数据
    const data = response.data;
    // 对数据进行处理
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: status,
          message: '牛逼',
          success: true,
        };
      })
    );
  }
}
