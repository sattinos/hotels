import * as React from 'react';
import './style.less';

export interface FileUploaderProps {
    onFilesChosen: (chosenFiles: File[]) => void;
}

export interface FileUploaderState {
    sample: string;
}

export class FileUploader extends React.Component<FileUploaderProps, FileUploaderState> {
    private _fileInput: any;

    constructor(props: FileUploaderProps) {
        super(props);
        this.state = {
            sample: ''
        };
    }

    public render() {
        return (
            <input multiple type='file' accept='image/*' ref={(input) => { this._fileInput = input; }} onChange={this.onFileChosen} />
        );
    }

    public open() {
        if (this._fileInput) {
            this._fileInput.click();
        }
    }

    private onFileChosen = (element: any) => {
        const imagesFiles: File[] | null = (element.target.files.length > 0) ? element.target.files : [];
        if (imagesFiles) {
            this.props.onFilesChosen(imagesFiles);
        }
    }
}