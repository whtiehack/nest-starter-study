
import { IsString, IsInt } from 'class-validator';
import {ApiModelProperty} from "@nestjs/swagger";

export class CreateCatDto{
    @ApiModelProperty()
    @IsString()
    public readonly name: string;
    @ApiModelProperty()
    @IsInt()
    public readonly age: number;
    @ApiModelProperty()
    @IsString()
    readonly breed: string;
}
