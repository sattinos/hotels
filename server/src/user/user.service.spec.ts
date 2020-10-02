import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService, UserResultCode } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let createdUser: UserEntity;  let id = -1;

  let createdUser1: UserEntity;
  let createdUser2: UserEntity;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
      controllers: [UserController],
      providers: [UserService]

    }).compile();
    service = module.get<UserService>(UserService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('must delete old Sami entity', async () => {
      await service.repositery.delete({});
      // console.log('delete old entity result:', res);
  });

  it('must be created successfully', async () => {
    const user = new UserEntity();
    Object.assign(user, {
      fullName: 'Sami AlMahroos',
      userName: 's123',
      password: '123',
      filename: '123',
      phone: '0543202636',
      isVerified: false
    });

    createdUser = await service.create(user);
    id = createdUser.id;
    expect(createdUser).toBeDefined();
  });

  it('must refuse to create a user with same username', async () => {
    const user = new UserEntity();
    Object.assign(user, {
      fullName: 'Abdullah',
      userName: 's123',
      password: '123',
      filename: '123',
      phone: '',
      isVerified: false
    });
    const resultCode: UserResultCode = await service.isFound(user);
    expect(resultCode).toEqual(UserResultCode.userNameUsed);
  });

  it('must refuse to create a user with same phone number', async () => {
    const user = new UserEntity();
    Object.assign(user, {
      fullName: 'Mahmoud',
      userName: 's12345',
      password: '123',
      filename: '123',
      phone: '0543202636',
      isVerified: false
    });
    const resultCode: UserResultCode = await service.isFound(user);
    expect(resultCode).toEqual(UserResultCode.phoneUsed);
  });

  it('must create 2 entities succcessfully', async () => {
    const user1 = new UserEntity();
    Object.assign(user1, {
      fullName: 'Mahmoud1',
      userName: 's123451',
      password: '1231',
      filename: '1231',
      phone: '0543202631',
      isVerified: false
    });

    createdUser1 = await service.create(user1);
    expect(createdUser1).toBeDefined();
    expect(createdUser1.fullName).toEqual(user1.fullName);

    const user2 = new UserEntity();
    Object.assign(user2, {
      fullName: 'Mahmoud2',
      userName: 's123452',
      password: '1231',
      filename: '1231',
      phone: '0543202632',
      isVerified: false
    });

    createdUser2 = await service.create(user2);
    expect(createdUser2).toBeDefined();
    expect(createdUser2.fullName).toEqual(user2.fullName);
  });

  it('must update 2 entities succcessfully', async () => {
    createdUser1.fullName = 'changed one1';
    createdUser2.phone = '0543202615';

    const updateManyResult = await service.updateMany([
      createdUser1,
      createdUser2
    ]);
    expect(updateManyResult).toBeDefined();
    // console.log('updateManyResult', updateManyResult);
  });

  it('must delete many succcessfully', async () => {
    const deleteManyResult = await service.deleteMany([
      createdUser1.id,
      createdUser2.id
    ]);
    // console.log('deleteManyResult', deleteManyResult);
    expect(deleteManyResult).toEqual(true);
  });

  it('must login successfully', async () => {
    const loggedUser: UserEntity | undefined = await service.login(createdUser.userName, createdUser.password);
    expect(loggedUser).toBeDefined();
    expect(loggedUser).toEqual(createdUser);
  });

  it(`must delete successfully`, async () => {
    await service.delete(createdUser.id);
    const resultCode = await service.isFound(createdUser);
    expect(resultCode).toBe(UserResultCode.notFound);
  });
});
