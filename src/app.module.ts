import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { PrismaModule } from './prisma/prisma.module';

/**
 * without a Decorator it is not a module
 */
@Module({
  imports: [AuthModule, UserModule, AppointmentModule, PrismaModule],
})
export class AppModule {}
