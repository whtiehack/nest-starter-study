import { Controller, Post, HttpStatus, HttpCode, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiBearerAuth, ApiUseTags} from "@nestjs/swagger";
/*

{
    "expires_in": 3600,
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoaXNpc0BleGFtcGxlLmNvbSIsImlhdCI6MTUyMDMxNzg5OCwiZXhwIjoxNTIwMzIxNDk4fQ.q5_0IQUIaPSoYsELzGKV_oQ9P_EO-eYIQI2xy-QSSI8"
}
 */
@ApiUseTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('token')
    @HttpCode(HttpStatus.OK)
    public async getToken() {
        return await this.authService.createToken();
    }

    @Get('authorized')
    public async authorized() {
        console.log('Authorized route...');
        return "results";
    }
}