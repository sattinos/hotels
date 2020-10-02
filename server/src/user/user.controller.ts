import { UserEntity, UserType } from './user.entity';
import { Controller, Body, Get, Post, Param, UseInterceptors, FileInterceptor, UploadedFile, Put, UseGuards, Session } from '@nestjs/common';
import { UserService } from './user.service';
import storageConfig from './config';
import { FileInfo } from '../contents-tool/contents-tool.entity';
import { ensureDir, move } from 'fs-extra';
import { AuthGuard } from '../auth/auth.guard';
import { SessionGuard } from '../auth/session.guard';
import appLogger from '../logger';

@Controller('ur')
export class UserController {
  constructor(protected readonly service: UserService) {
  }

  @Post('if')
  public async isFound(@Body() entity: UserEntity) {
    const returnCode = await this.service.isFound(entity);
    return returnCode;
  }

  @Post('lg')
  @UseGuards(AuthGuard)
  public async login(@Session() session) {
    // tslint:disable-next-line: no-console
    // console.log('logged user:', session.user);
    return session.user;
  }

  @Get('vr/:msisdn/:otp')
  public async verify(@Param('msisdn') msisdn: string, @Param('otp') otp: string) {
    return await this.service.verify(msisdn, otp);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('filename', storageConfig.singleFileMulterOptions)
  )
  public async create(@Body() entityArg: UserEntity, @UploadedFile() file: FileInfo) {
    if (file) {
      const newPath = `${storageConfig.uploadedFileRelativePath}/${entityArg.userName}`;
      const newFile = `${storageConfig.uploadedFileRelativePath}/${entityArg.userName}/${file.filename}`;
      await ensureDir(newPath);
      await move(file.path, newFile);
      file.path = `/${entityArg.userName}/${file.filename}`;
      entityArg.filename = file.path;
      await this.service.contentsToolService.create(file as any);
    }
    const entity = new UserEntity();
    Object.assign(entity, entityArg);

    entity.userType = UserType.admin;
    entity.menus = await this.service.menusService.getAll(0, 100);

    const createdEntity = await this.service.create(entity);
    await this.service.generateOtp(entity.phone);
    return createdEntity;
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('filename', storageConfig.singleFileMulterOptions)
  )
  public async update(@Param('id') id: number, @Body() entityArg: UserEntity, @UploadedFile() file: FileInfo) {
    console.log('file: ', file);
    id = parseInt(id as any, 10);
    entityArg.id = id;
    const oldUser = await this.service.getOne(id);
    if (file && (oldUser.filename !== entityArg.filename)) {
      const newPath = `${storageConfig.uploadedFileRelativePath}/${entityArg.userName}`;
      const newFile = `${storageConfig.uploadedFileRelativePath}/${entityArg.userName}/${file.filename}`;
      await ensureDir(newPath);
      await move(file.path, newFile);
      file.path = `/${entityArg.userName}/${file.filename}`;
      entityArg.filename = file.path;
      await this.service.contentsToolService.create(file as any);
    } else {
      delete entityArg.filename;
    }
    //     if (oldUser.phone !== entityArg.phone) {      await this.service.generateOtp(entityArg.phone);    }
    const entity = new UserEntity();
    Object.assign(entity, entityArg);
    return await this.service.update(id, entity);
  }

  @Get('fp/:phoneNo')
  public async forgotPassword(@Param('phoneNo') phoneNo: string) {
    return await this.service.forgotPassword(phoneNo);
  }

  @Get('lt')
  @UseGuards(SessionGuard)
  public async logOut(@Session() session: any) {
    const user = session.user;
    // tslint:disable-next-line: no-console
    console.log('session user(logout):', session.user);
    session.destroy((err: string) => {
      if (err) {
        appLogger.winstonLogger.error(`session destroy(err): ${err}`);
      }
      return user;
    });
    return session.user;
  }
}
