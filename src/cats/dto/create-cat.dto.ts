
import { IsString, IsInt } from 'class-validator';

export class CreateCatDto{
    @IsString()
    public readonly name: String;
    @IsInt()
    public readonly age: number;
    @IsString()
    readonly breed: string;
}
