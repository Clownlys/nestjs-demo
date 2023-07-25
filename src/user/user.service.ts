import { Injectable } from '@nestjs/common';
import { Interface } from 'readline';
import * as svgCaptcha from 'svg-captcha';

import { queryUserListDto } from './user.dto';
@Injectable()
export class UserService {
  getHello(): string {
    return 'Hello World!';
  }
  getCode() {
    const Captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
    });
    return Captcha;
  }
  login(body) {
    return {
      code: 200,
      msg: '登录成功',
    };
  }
  getList(currentPage:number, pageSize:number): queryUserListDto {
    return {
        list: [
          {
            id: 1,
            name: 'zhangsan',
            age: 18,
          },
          {
            id: 2,
            name: 'lisi',
            age: 20,
          },
        ],
        total: 2,
        pageSize,
        currentPage,
    };
  }
}
