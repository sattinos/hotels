import * as React from 'react';

import ReactTable, { Resize } from 'react-table-v6';
import 'react-table-v6/react-table.css';

import checkboxHOC from 'react-table-v6/lib/hoc/selectTable';

// tslint:disable-next-line:variable-name
const CheckboxTable = checkboxHOC(ReactTable);

import { EntityFetcher } from '../../controller/network/entityFetcher';

interface ViewAllEntitiesProps<T> {
    title: string;
    columns: any[];
    entityFetcher: EntityFetcher<T>;
    onSelectionChange?: (entities: T[]) => void;
    onDataFetched?: (entities: T[]) => T[];
}

interface ViewAllEntitiesState<T> {
    count: number;
    busy: boolean;
    page: number;
    pageSize: number;
    entities: T[];
    selection: number[];
    selectedEntities: T[];
    selectAll: boolean;
    resized: Resize[];
}

export class ViewAllEntities<T> extends React.Component<ViewAllEntitiesProps<T>, ViewAllEntitiesState<T>> {
    private _pagesCount = 1;
    private _checkboxTableRef: any = null;

    constructor(props: ViewAllEntitiesProps<T>) {
        super(props);
        this.state = {
            count: -1,
            busy: true,
            page: 0,
            pageSize: 10,
            entities: [],
            selection: [],
            selectedEntities: [],
            selectAll: false,
            resized: []
        };
    }

    public async componentDidMount() {
        this.setState({ busy: true });
        const count = await this.props.entityFetcher.getCount(true);
        this._pagesCount = Math.ceil(count / this.state.pageSize);
        this.setState({
            busy: false,
            count
        });
    }

    public render() {
        return (
            <div>
                <div className='paddedBox'>
                    <label className='bg center block'>{this.props.title}</label>
                </div>
                <CheckboxTable
                    ref={(r) => (this._checkboxTableRef = r)}
                    className='-striped -highlight'
                    data={this.state.entities}
                    columns={this.props.columns}
                    manual={true}
                    defaultPageSize={this.state.pageSize}
                    pages={this._pagesCount}
                    loading={this.state.busy}
                    onFetchData={this.fetchData}
                    keyField={'id'}
                    resizable={true}
                    resized={this.state.resized}
                    onResizedChange={this.onResizedChange}
                    selectType='checkbox'
                    isSelected={this.isSelected as any}
                    selectAll={this.state.selectAll}
                    toggleAll={this.toggleAll}
                    toggleSelection={this.toggleSelection as any}
                />
            </div>
        );
    }

    private isSelected = (key: number): boolean => {
        return this.state.selection.indexOf(key) >= 0;
    }

    private toggleAll = () => {
        const selectAll = this.state.selectAll ? false : true;
        const selection: number[] = [];
        const selectedEntities: T[] = [];
        if (selectAll && this._checkboxTableRef) {
            const wrappedInstance = this._checkboxTableRef.getWrappedInstance();
            const currentRecords = wrappedInstance.getResolvedState().sortedData;
            currentRecords.forEach((item: any) => {
                selection.push(item._original.id);
                selectedEntities.push(item._original);
            });
        }
        this.setState({ selectAll, selection, selectedEntities });
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectedEntities);
        }
    }

    private toggleSelection = (_key: number, _shiftKeyPressed: boolean, row: any) => {
        let selection = [...this.state.selection];
        let selectedEntities = [...this.state.selectedEntities];
        const entityIndex = selectedEntities.findIndex((e: any) => e.id === row.id);

        if (entityIndex >= 0) {
            selection = [...selection.slice(0, entityIndex), ...selection.slice(entityIndex + 1)];
            selectedEntities = [...selectedEntities.slice(0, entityIndex), ...selectedEntities.slice(entityIndex + 1)];
        } else {
            selectedEntities.push(row);
            selection.push(row.id);
        }

        this.setState({ selection, selectedEntities });
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(selectedEntities);
        }
    }

    private fetchData = async (state: any, _instance: any) => {
        this.setState({ busy: true });
        let entities = await this.props.entityFetcher.getAll(state.page, state.pageSize, state.sorted);
        if (this.props.onDataFetched) {
            entities = this.props.onDataFetched(entities);
        }
        this.setState({
            entities,
            busy: false
        });
    }

    private onResizedChange = (resized: Resize[], _event: any) => {
        this.setState({ resized });
    }
}
