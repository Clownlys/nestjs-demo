import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @ApiProperty({ description: '用户id', type: 'number' })
    @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({ description: '用户名', type: 'string' })
    @Column()
    name: string;
    @ApiProperty({ description: '年龄', type: 'number' })
    @Column()
    age: number;
}