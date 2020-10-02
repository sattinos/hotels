import * as React from 'react';
import { EntityFetcher } from '../../controller/network/entityFetcher';
import { ViewAllEntities } from './viewAllEntities';
import { Icon } from '../lib/icon';
import { newIcon, editIcon, deleteIcon, saveIcon } from '../../images';
import localizer from '../../controller/lib/localization/localizer';
import { Redirect } from 'react-router';
import { shared } from '../shared';
import { generatePath, CrudOperation } from '../../paths';

export interface ViewAllCrudProps<T> {
    title: string;
    columns: any[];
    entityFetcher: EntityFetcher<T>;
    entityName: string;
    onDataFetched?: (entities: T[]) => T[];

    deleteEnabled?: boolean;
}

export interface ViewAllCrudState<T> {
    editEnabled: boolean;
    saveEnabled: boolean;
    deleteEnabled: boolean;
    selection: T[];
    modified: T[];

    createClicked: boolean;
    editClicked: boolean;
}

class ViewAllCrud<T> extends React.Component<ViewAllCrudProps<T>, ViewAllCrudState<T>> {
    static getInitialState = () => {
        return {
            deleteEnabled: false,
            editEnabled: false,
            saveEnabled: false,
            selection: [],
            modified: [],
            createClicked: false,
            editClicked: false
        };
    }

    constructor(props: ViewAllCrudProps<T>) {
        super(props);
        this.state = ViewAllCrud.getInitialState();
    }

    componentDidMount() {
        shared.entityName = this.props.entityName;
    }

    render() {
        if (this.state.createClicked) {
            return <Redirect to={generatePath(this.props.entityName, CrudOperation.Create)} />;
        }

        if (this.state.editClicked) {
            return <Redirect to={generatePath(this.props.entityName, CrudOperation.Update)} />;
        }

        return (
            <>
                <div className='center form'>
                    <ViewAllEntities
                        title={this.props.title}
                        columns={this.props.columns}
                        entityFetcher={this.props.entityFetcher}
                        onSelectionChange={this.onSelectionChange}
                        onDataFetched={this.props.onDataFetched} />

                    <div className='paddedBox'>
                        <Icon enabled={true} src={newIcon} className='tableRowIcon' onClick={this.onNewClicked} />
                        <Icon enabled={this.state.editEnabled} src={editIcon} className='tableRowIcon' onClick={this.onEditClicked} />
                        <Icon enabled={(this.props.deleteEnabled !== undefined) ? this.props.deleteEnabled && this.state.deleteEnabled : this.state.deleteEnabled } src={deleteIcon} className='tableRowIcon' onClick={this.onDeleteClicked} />
                        <Icon enabled={this.state.saveEnabled} src={saveIcon} className='tableRowIcon' onClick={this.onSaveClicked} />
                    </div>
                </div>
            </>
        );
    }

    public onEntityModified = (entity: T) => {
        const modified = this.state.modified;
        modified.push(entity);
        this.setState({
            saveEnabled: true,
            modified
        });
    }

    private onNewClicked = () => {
        this.setState({
            createClicked: true
        });
    }

    private onEditClicked = () => {
        shared.entityID = (this.state.selection[0] as any).id;
        this.setState({
            editClicked: true
        });
    }

    private onDeleteClicked = () => {
        shared.alertFunction(localizer.text('common.confirm'), async () => {
            shared.busyFunction(true);
            const ids = EntityFetcher.getValues<T>(this.state.selection, 'id');
            const deleteResult = await this.props.entityFetcher.deleteMany(ids);
            console.log('updateResult: ', deleteResult);
            shared.busyFunction(false);
            this.setState(ViewAllCrud.getInitialState());
        }, () => {
            //
        });
    }

    private onSaveClicked = async () => {
        shared.alertFunction(localizer.text('common.confirm'), async () => {
            shared.busyFunction(true);
            const updateResult = await this.props.entityFetcher.updateMany(this.state.modified);
            console.log('updateResult: ', updateResult);
            shared.busyFunction(false);
            this.setState(ViewAllCrud.getInitialState());
        }, () => {
            //
            console.log('no');
        });
    }

    private onSelectionChange = (selection: T[]) => {
        console.log(selection);

        const editEnabled = selection.length === 1;
        const deleteEnabled = selection.length > 0;

        this.setState({
            editEnabled,
            deleteEnabled,
            selection
        });
    }
}

export default ViewAllCrud;
