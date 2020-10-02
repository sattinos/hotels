import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { CrudServiceOrm } from './../lib/crud/crud-service';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity, UserType } from './user.entity';
import expertTexting from '../lib/sms-gateway';
import { OtpService } from '../otp/otp.service';
import { ContentsToolService } from '../contents-tool/contents-tool.service';
import { MenuItemService } from '../menu-item/menu-item.service';
import { MenuItemEntity } from '../menu-item/menu-item.entity';
import { generateRandomToken } from '../lib/mathHelpers/random';
import appLogger from '../logger';

export enum UserResultCode {
  userNameUsed,
  phoneUsed,
  notFound,
  success,
  systemError,
  unknown
}

@Injectable()
export class UserService extends CrudServiceOrm<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly rep: Repository<UserEntity>,
    protected readonly otpService: OtpService,
    public readonly contentsToolService: ContentsToolService,
    public readonly menusService: MenuItemService
  ) {
    super(rep);
  }

  async guestCreate(fullName: string, phone: string, city: string) {
    const entity = new UserEntity();

    entity.fullName = fullName;
    entity.phone = phone;
    entity.city = city;
    entity.userName = generateRandomToken(8).substr(0, 7);
    entity.userType = UserType.customer;
    entity.password = generateRandomToken(8).substr(0, 7);
    entity.menus = [];
    entity.isVerified = false;
    entity.filename = '';

    return await this.create(entity);
  }

  async hasData(): Promise<boolean> {
    try {
      let count = await this.rep.count();
      return count > 0;
    } catch (err) {
      Logger.error(`hasData(err): ${err.message}`);
      return false;
    }
  }

  async isFound(entity: UserEntity): Promise<UserResultCode> {
    try {
      let users = await this.rep.find({
        select: ['id'],
        where: {
          userName: entity.userName
        },
      });
      if (users.length > 0) {
        return UserResultCode.userNameUsed;
      }

      users = await this.rep.find({
        select: ['id'],
        where: {
          phone: entity.phone,
        },
      });
      if (users.length > 0) {
        return UserResultCode.phoneUsed;
      }
      return UserResultCode.notFound;
    } catch (error) {
      return UserResultCode.unknown;
    }
  }

  async generateOtp(msisdn: string): Promise<{ isSuccess: boolean }> {
    const old = await this.otpService.repositery.findOne({
      where: {
        msisdn
      }
    });
    if (old) {
      await this.otpService.delete(old.id);
    }
    const otp = await this.otpService.generate(msisdn);
    if (otp) {
      const sendSMSResult = await expertTexting.sendSMS(msisdn, `enter the number ${otp.generated} inside the app`);
      Logger.log(sendSMSResult, 'sendSmsResult');
      return {
        isSuccess: !!sendSMSResult && !!sendSMSResult.Response
      };
    }
    return {
      isSuccess: false
    };
  }

  async verify(msisdn: string, otp: string) {
    const otpEntity = await this.otpService.repositery.findOne({
      where: {
        msisdn
      }
    });
    let isSuccess = true;
    if (!otpEntity || otpEntity.generated !== otp) {
      isSuccess = false;
    } else {
      await this.otpService.delete(otpEntity.id);
      await this.repositery.update({
        phone: msisdn
      },
        {
          isVerified: true
        }
      );
    }
    return {
      isSuccess
    };
  }

  async login(userName: string, password: string): Promise<UserEntity | undefined> {
    const user = await this.rep.findOne({
      relations: ['menus'],
      where: {
        userName, password
      }
    });

    if (user) {
      // console.log('user:', user);
      const mainMenus: MenuItemEntity[] = [];
      const keyMap = {};
      const menus = user.menus;
      for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        delete menu.createdAt;
        delete menu.updatedAt;
        if (!menu.parentuID) {
          (menu as any).subMenus = [];
          keyMap[menu.uID] = menu;
          mainMenus.push(menu);
          delete menu.to;
          delete menu.createPath;
          delete menu.updatePath;
          delete menu.deletePath;
          continue;
        }
      }
      for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        if (menu.parentuID) {
          const mainMenu = keyMap[menu.parentuID];
          mainMenu.subMenus.push(menu);
        }
      }
      for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        delete menu.uID;
        delete menu.parentuID;
      }
      user.menus = mainMenus;
      return user;
    }
  }

  async forgotPassword(phone: string) {
    const userEntity = await this.rep.findOne({
      where: {
        phone
      },
      select: ['password']
    });
    if (!userEntity) {
      return {
        isSuccess: false
      };
    }
    const sendSMSResult = await expertTexting.sendSMS(phone, `your password is ${userEntity.password}`);
    Logger.log(sendSMSResult, 'sendSmsResult');
    return {
      isSuccess: !!sendSMSResult && !!sendSMSResult.Response
    };
  }
}
