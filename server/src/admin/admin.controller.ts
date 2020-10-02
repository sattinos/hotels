import { Controller, Get } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Controller('admin')
export class AdminController {
    // This is mainly to support occasional browser refresh 
    private _cachedAdminIndexFile: string = '';
    constructor() {
        var indexFile = path.resolve('data/public/admin/index.html');
        if( fs.existsSync(indexFile) ) {
            this._cachedAdminIndexFile = fs.readFileSync(indexFile, { encoding: 'UTF-8' });            
        }        
    }

    @Get('/*')
    adminIndexFile() {
        return this._cachedAdminIndexFile ?? '';
    }
 }