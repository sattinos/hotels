import { UserService, UserResultCode } from './user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import axios from 'axios';

describe('User Controller', () => {
  let module: TestingModule;
  let controller: UserController;
  let createdUser: UserEntity;

  const baseUrl = 'http://127.0.0.1:3000';
  const createUrl = `${baseUrl}/ur`;
  const isFoundUrl = `${baseUrl}/ur/if`;
  const loginUrl = `${baseUrl}/ur/lg`;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
      controllers: [UserController],
      providers: [UserService]
    }).compile();
  });
  it('should be defined', () => {
    controller = module.get<UserController>(UserController);
    expect(controller).toBeDefined();
  });

  it('create a user entity', async () => {
    const sample = {
      fullName: 'Anas Subhi',
      userName: 'anooseh',
      password: '456789',
      filename: '123',
      phone: '0543202636',
      isVerified: false
    };

    const res = await axios({
      method: 'post',
      url: createUrl,
      data: sample
    });
    expect(res.status).toBe(201);
    createdUser = res.data;
  });

  it('update a user entity', async () => {
    const update = `${baseUrl}/ur/${createdUser.id}`;
    createdUser.fullName = 'Samaya AlHaros';

    const result = await axios({
      method: 'put',
      url: update,
      data: createdUser
    });
    expect(result.status).toBe(200);
    createdUser.updatedAt = result.data.updatedAt;
  });

  it('should refuse to create entity with same userName', async () => {
    const sample = {
      fullName: 'Extended User 2',
      userName: '',
      password: '123',
      filename: '123',
      phone: '15749999',
      isVerified: false
    };

    sample.userName = createdUser.userName;
    const res = await axios({
      method: 'post',
      url: isFoundUrl,
      data: sample
    });
    expect(res.status).toBe(201);
    expect(res.data).toBe(UserResultCode.userNameUsed);
  });

  it('should refuse to create entity with same phone no', async () => {
    const sample = {
      fullName: 'Extended User 2',
      userName: 'user1944444',
      password: '123',
      filename: '123',
      phone: '15749999',
      isVerified: false
    };

    sample.phone = createdUser.phone;
    const res = await axios({
      method: 'post',
      url: isFoundUrl,
      data: sample
    });

    expect(res.status).toBe(201);
    expect(res.data).toBe(UserResultCode.phoneUsed);
  });

  it('should log and result the same created entity', async () => {
    const res = await axios({
      method: 'post',
      url: loginUrl,
      data: {
        un: createdUser.userName,
        pw: createdUser.password
      }
    });
    expect(res.status).toBe(201);
    expect(res.data).toEqual(createdUser);
  });

  it('delete a user entity', async () => {
    const deleteUrl = `${baseUrl}/ur/${createdUser.id}`;

    const deleteResult = await axios({
      method: 'delete',
      url: deleteUrl
    });
    expect(deleteResult.status).toBe(200);
  });
});
