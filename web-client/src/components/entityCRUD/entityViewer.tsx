import * as React from 'react';
import { OptionsInput } from '../lib/optionsInput';
import { DropFileArea } from '../lib/dropFileArea';
import { AutoExpandArea } from '../lib/autoExpandTextArea';
import { MetaData, Indexable, FieldTypes, MetaDataForFiles } from './types';
import { VerticalSpacer } from '../lib/verticalSpacer';
import DigitsInput from '../lib/digitsInput/input';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface TProps<T> {
    entity: T;
    descriptor: MetaData[];
    metaDataForFiles: MetaDataForFiles[];
    onEntityChanged: (entity: T, metaDataForFiles?: MetaDataForFiles[]) => void;
}

export class EntityViewer<T extends Indexable> extends React.Component<TProps<T>, {}> {
    constructor(props: TProps<T>) {
        super(props);
    }

    public render() {
        const renderedFields = [];
        for (let index = 0; index < this.props.descriptor.length; index++) {
            const metaData = this.props.descriptor[index];
            renderedFields.push(this.renderField(metaData, `${metaData.name}_${index}`));
        }
        return (
            <div>
                {renderedFields}
                {this.props.children}
            </div>
        );
    }

    private renderField(metaData: any, key: string) {
        if (metaData.type === FieldTypes.label) {
            return <label className={metaData.className} key={key}>{metaData.value}</label>;
        }

        const field = metaData.name;
        const value = this.props.entity[field] || '';

        if (metaData.type === FieldTypes.inputText) {
            let onChangeHandler: any = (e: any) => this.onInputChange(e, metaData.name);
            if (metaData.readOnly) {
                onChangeHandler = null;
            }
            return (
                <div key={key} className='formDiv textAlignLeft'>
                    <div>
                        {metaData.label}
                    </div>
                    <div>
                        <input
                            className={metaData.className}
                            id={metaData.id}
                            type='text'
                            value={value}
                            readOnly={metaData.readOnly}
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
            );
        }

        if (metaData.type === FieldTypes.inputDigit) {
            let onChangeHandler: any = (e: any) => this.onDigitsInputChange(e, metaData.name);
            if (metaData.readOnly) {
                onChangeHandler = null;
            }
            return (
                <div key={key} className='formDiv textAlignLeft'>
                    <div>
                        {metaData.label}
                    </div>
                    <div>
                        <DigitsInput className={metaData.className}
                            value={value}
                            placeHolder={metaData.placeholder}
                            readOnly={metaData.readOnly}
                            onChange={onChangeHandler} />
                    </div>
                </div>
            );
        }

        if (metaData.type === FieldTypes.options) {
            return (
                <div key={key} className='formDiv textAlignLeft'>
                    <div>
                        {metaData.label}
                    </div>
                    <div>
                        <OptionsInput
                            index={value}
                            title={metaData.title || 'title here'}
                            OnOptionSelected={(i: number) => this.onOptionSelected(i, metaData.name)}
                            options={metaData.options}
                        />
                    </div>
                </div>
            );
        }

        if (metaData.type === FieldTypes.inputArea) {
            return (
                <div key={key} className='formDiv textAlignLeft'>
                    <div>
                        {metaData.label}
                    </div>
                    <div>
                        <AutoExpandArea
                            className={metaData.className}
                            value={value}
                            placeholder={''}
                            onTextChange={(text: string) => this.onTextAreaChange(text, metaData.name)}
                        />
                    </div>
                </div>
            );
        }

        if (metaData.type === FieldTypes.inputDate) {
            return <DatePicker
                id={metaData.id} key={key}
                withPortal
                minDate={new Date()}
                placeholderText={metaData.placeholder}
                className={metaData.className}
                selected={value}
                onChange={(v: Date) => this.save(field, v)} />;
        }

        if (metaData.type === FieldTypes.inputFile) {
            return (
                <div key={key} className='formDiv textAlignLeft'>
                    <div>
                        {metaData.label}
                    </div>
                    <div >
                        <DropFileArea key={key}
                            urls={value}
                            onFilesChosen={(urls: string[], files: File[]) => this.onFilesDropped(urls, files, metaData.name)} />
                    </div>
                </div>
            );
        }

        if (metaData.type === FieldTypes.verticalSpacer) {
            return <VerticalSpacer key={key} height={metaData.value} />;
        }
    }

    private onFilesDropped = (urls: string[], files: File[], key: string) => {
        let foundIndex = -1;
        const metaDataForFiles = this.props.metaDataForFiles;
        for (let index = 0; index < metaDataForFiles.length; index++) {
            const metaData = metaDataForFiles[index];
            if (metaData.fieldName === key) {
                foundIndex = index;
                break;
            }
        }
        if (foundIndex === -1) {
            const metaDataForFilesNewItem: MetaDataForFiles = {
                files,
                fieldName: key
            };
            metaDataForFiles.push(metaDataForFilesNewItem);
        } else {
            metaDataForFiles[foundIndex] = {
                files,
                fieldName: key
            };
        }
        this.save(key, urls, metaDataForFiles);
    }

    private onTextAreaChange = async (text: string, key: string) => {
        this.save(key, text);
    }

    private onInputChange = async ({ target }: any, key: string) => {
        this.save(key, target.value);
    }

    private onDigitsInputChange = async (number: number, key: string) => {
        this.save(key, number);
    }

    private onOptionSelected = (index: number, key: string) => {
        this.save(key, index);
    }

    private save(fieldName: string, value: any, metaDataForFiles?: MetaDataForFiles[]) {
        const entity: T = this.props.entity;
        entity[fieldName] = value;
        this.props.onEntityChanged(entity, metaDataForFiles);
    }
}
