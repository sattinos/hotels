import * as React from 'react';
import { MetaData, Indexable, MetaDataForFiles } from './types';
import { EntityViewer } from './entityViewer';
import { RoundBtn } from '../lib/roundButton';
import localizer from '../../controller/lib/localization/localizer';
import filesUploader from '../../controller/network/filesUploader';
import { EntityFetcher, RelationInfo } from '../../controller/network/entityFetcher';
import { shared } from '../shared';
import { Redirect } from 'react-router';
import { CrudOperation, generatePath } from '../../paths';

export interface UpdateEntityProps<T extends Indexable> {
    title: string;
    entity: T;
    metaDataForFiles: MetaDataForFiles[];
    relations?: RelationInfo[];
    entityFetcher: EntityFetcher<T>;
    descriptor: MetaData[];
}

export interface UpdateEntityState {
    sumbitEnabled: boolean;
    toMainTapped: boolean;
}

export class UpdateEntity<T extends Indexable> extends React.Component<UpdateEntityProps<T>, UpdateEntityState> {
    constructor(props: UpdateEntityProps<T>) {
        super(props);
        this.state = this.getDefaultState();
    }

    async componentDidMount() {
        this.setState(this.getDefaultState());
        this.refresh(this.props.entity);
    }

    public render() {
        if (this.state.toMainTapped) {
            return (
                <Redirect to={generatePath(shared.entityName, CrudOperation.ViewAll)} />
            );
        }
        return (
            <div>
                <label className='bg'>{this.props.title}</label>
                <EntityViewer<T>
                    metaDataForFiles={this.props.metaDataForFiles}
                    descriptor={this.props.descriptor}
                    entity={this.props.entity}
                    onEntityChanged={this.onEntityChanged}>
                    {this.props.children}
                </EntityViewer>

                <RoundBtn text={localizer.text('common.save')} disabled={!this.state.sumbitEnabled} onClick={this.onSaveTapped} />
                <RoundBtn text={localizer.text('cp.back')} disabled={false} onClick={() => this.setState({ toMainTapped: true })} />
            </div>
        );
    }

    private onEntityChanged = (entity: T, _metaDataForFiles?: MetaDataForFiles[]) => {
        this.refresh(entity);
    }

    private onSaveTapped = async () => {
        try {
            const entity = this.props.entity;
            shared.busyFunction(true);
            console.log('metadata uploading: ', this.props.metaDataForFiles);
            if (this.props.metaDataForFiles.length > 0) {
                for (let i = 0; i < this.props.metaDataForFiles.length; i++) {
                    const metaInfoForFilesItem = this.props.metaDataForFiles[i];
                    const uploadInfo = await filesUploader.uploadMultiple(metaInfoForFilesItem.files, 'files');
                    console.log('uploadInfo:', uploadInfo);
                    if (uploadInfo.length > 0) {
                        entity[metaInfoForFilesItem.fieldName] = [];
                        for (let uploadItemIndex = 0; uploadItemIndex < uploadInfo.length; uploadItemIndex++) {
                            const info = uploadInfo[uploadItemIndex];
                            entity[metaInfoForFilesItem.fieldName].push(info.name);
                        }
                    }
                }
            }
            const id = this.props.entity.ID;

            let created: any = {};
            if (!id) {
                created = await this.props.entityFetcher.create(entity, this.props.relations, true);
            } else {
                console.log('updateOne', entity);
                created = await this.props.entityFetcher.updateOne(id, entity, true, this.props.relations);
            }
            shared.busyFunction(false);
            shared.alertFunction(JSON.stringify(created));
        } catch (error) {
            console.error('update entity onSaveTapped(err):', error);
            shared.busyFunction(false);
        }
    }

    private refresh(entity: T) {
        let sumbitEnabled = true;
        for (let uploadItemIndex = 0; uploadItemIndex < this.props.descriptor.length; uploadItemIndex++) {
            const metaData = this.props.descriptor[uploadItemIndex];
            const name = metaData.name;
            const validator = metaData.isValid;
            if (validator && name) {
                const isValid = validator(entity[name]);
                if (!isValid) {
                    // console.log(name, ' is not valid');                    console.log('entity:', entity);                    console.log(entity[name]);
                    sumbitEnabled = false;
                    break;
                }
            }
        }
        this.setState({
            sumbitEnabled
        });
    }

    private getDefaultState = () => {
        return {
            metaDataForFiles: [],
            sumbitEnabled: false,
            toMainTapped: false
        };
    }
}
