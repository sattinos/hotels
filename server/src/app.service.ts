import * as fs from 'fs';
import * as path from 'path';
import { Injectable, Logger } from '@nestjs/common';
import { Connection, QueryRunner } from 'typeorm';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly connection: Connection,
    public readonly userService: UserService
  ) {
    this.seedSystem().then((res) => {
      this.migrate();      
    }).catch((err) => {
      console.log('failed to seed with error:' + err);
    });
  }

  root(): string {
    return '';
  }

  async seedSystem() {
    var seedingNotNeeded = await this.userService.hasData();
    if (!seedingNotNeeded) {
      Logger.log('seeding the system');
      const queryRunner = this.connection.createQueryRunner();
      await this.seed(queryRunner);
    } else {
      Logger.log('seeding not needed');
    }
  }

  migrate() {
    Logger.log('migration start');
    // Migration of DB should be manual step. Uncomment the next block of code and run your migration query file. After finish, re-comment it
    /*
    const queryRunner = this.connection.createQueryRunner(); 
    const migrationIntance = new PutYourMigrationQueryFileHere();
    migrationIntance.up(queryRunner).then((res: any) => {
      Logger.log('migration end: ', res);
    }).catch((err: any) => {
      Logger.log('error while migration: ', err.message);
    });
    */
    Logger.log('migration end');
  }

  readSqlFile(filepath: string): string {
    return fs
      .readFileSync(path.join(__dirname, filepath))
      .toString();
  };

  public async seed(queryRunner: QueryRunner): Promise<void> {
    const query = this.readSqlFile('database/seed.sql');
    await queryRunner.query(query);
  }
}
