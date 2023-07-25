import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  Header,
  HttpCode,
  Session,
  Res,
  HttpException,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { UnauthorizedFilter } from '../unauthorized.filter';
import { ApiTags, ApiOperation, ApiProperty, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { queryUserListDto } from './user.dto';

interface loginBody {
  username: string;
  password: string;
  code: string;
  [propName: string]: any;
}
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @UseFilters(UnauthorizedFilter)
  @ApiOperation({ summary: '获取所有用户' })
  getAll() {
    throw new HttpException('helloooo~', 400);
  }

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
  @Get('list')
  @ApiQuery({ name: 'currentPage', description: '当前页', required: true, type: 'number' })
  @ApiQuery({ name: 'pageSize', description: '每页条数', required: true, type: 'number' })
  @ApiResponse({ status: 200, description: '成功', type: queryUserListDto })
  getList(@Query('currentPage', ParseIntPipe) currentPage: number, @Query('pageSize', ParseIntPipe) pageSize: number): queryUserListDto {
    return this.userService.getList(currentPage, pageSize);
  }

  // @Get('info')
  // @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  // getInfo(@Query('id', ParseIntPipe) query) {
  //   console.log(query);
  //   return {
  //     code: 200,
  //     msg: 'success',
  //     data: {
  //       name: 'zhangsan',
  //       age: 18,
  //     },
  //   };
  // }
  @Get('info/:id')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  @ApiParam({ name: 'id', description: '用户id', required: true, type: 'number' })
  getInfoById(@Param('id', ParseIntPipe) id) {
    console.log(id);
    return {
      code: 200,
      msg: 'success',
      data: {
        name: 'zhangsan',
        age: 18,
      },
    };
  }

  @Get('code')
  getCode(@Session() session, @Req() req: Request, @Res() res: Response) {
    const Captcha = this.userService.getCode();
    session.code = Captcha.text;
    console.log('session', session);
    console.log('code', session.code);
    res.type('image/svg+xml');
    res.send(Captcha.data);
  }
  @Post('login')
  login(@Body() body: loginBody, @Session() session, @Req() req) {
    console.log('body', body);
    console.log('session', session);
    if (body.code.toLowerCase() !== session.code.toLowerCase()) {
      return {
        code: 400,
        msg: '验证码错误',
      };
    }
    return this.userService.login(body);
  }
}
