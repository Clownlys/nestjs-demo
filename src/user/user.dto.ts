import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity'; 

export class queryUserListDto {
    @ApiProperty({ description: '用户列表', type: [User] })
    list: User[];
    @ApiProperty({ description: '总条数', type: 'number' })
    total: number;
    @ApiProperty({ description: '每页条数', type: 'number' })
    pageSize: number;
    @ApiProperty({ description: '当前页', type: 'number' })
    currentPage: number;
}


