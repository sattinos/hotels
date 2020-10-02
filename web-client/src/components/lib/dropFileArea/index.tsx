import * as React from 'react';
import { FileUploader } from '../fileUploader';
import './style.less';
import config from '../../../config';

interface DropFileAreaProps {
    urls: string[];
    onFilesChosen: (urls: string[], files: File[]) => void;
}

export class DropFileArea extends React.Component<DropFileAreaProps, {}> {
    private _fileUploader: FileUploader | undefined = undefined;

    constructor(props: DropFileAreaProps) {
        super(props);
    }

    public render = () => {
        let contents = null;
        if (this.props.urls.length === 0) {
            contents = this.renderEmpty();
        } else {
            contents = this.renderImages();
        }
        return (
            <div id='dropFileAreaDiv' className='center' onClick={this.onChooseClicked}>
                {contents}
                <FileUploader onFilesChosen={this.onFilesChosen} ref={(uploader: FileUploader) => this._fileUploader = uploader} />
            </div>
        );
    }

    private renderImages = () => {
        const urls = [...this.props.urls];
        // TOOD: remove this at production
        if ( !urls[0].includes('blob') ) {
            for (let index = 0; index < urls.length; index++) {
                urls[index] = `${config.baseURL}/${urls[index]}`;
            }
        }
        const images = urls.map((url: string, index: number) =>
            <div key={index}>
                <img src={url} onClick={this.onChooseClicked} className='thumbNail' />
            </div>
        );
        return images;
    }

    private renderEmpty = () => {
        return (
            <div className='empty-area'>{'drop files here'}</div>
        );
    }

    private onChooseClicked = () => {
        if (this._fileUploader) {
            this._fileUploader.open();
        } else {
            console.log('no file uploader found.');
        }
    }

    private onFilesChosen = (files: File[]) => {
        if (files.length < 1) {
            return;
        }
        const urls: string[] = [];
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const url = URL.createObjectURL(file);
            urls.push(url);
        }
        this.props.onFilesChosen(urls, files);
    }
}
