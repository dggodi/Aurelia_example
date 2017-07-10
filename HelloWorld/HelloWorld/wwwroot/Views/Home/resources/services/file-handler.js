﻿import { FileReaderHelper } from "./file-reader-helper"

export class FileHandler {
    constructor(onLoad, onLoaded, onProgress, onError, fileFilter, maxFileSize, readAs, hoverClass) {
        this.onLoad = onLoad;
        this.onLoaded = onLoaded;
        this.onProgress = onProgress;
        this.onError = onError;
        this.fileFilter = fileFilter;
        this.maxFileSize = maxFileSize;
        this.readAs = readAs;
        this.hoverClass = hoverClass || "file-hover";
    }

    readFile = (file, obj) => {

        var reader = FileReaderHelper.createReader(file, this.onLoad, this.onLoaded, this.onProgress, this.onError, obj);

        if (this.readAs == "text")
        { reader.readAsText(file); }
        else if (this.readAs == "array")
        { reader.readAsArrayBuffer(file); }
        else if (this.readAs == "binary")
        { reader.readAsBinaryString(file); }
        else
        { reader.readAsDataURL(file); }

        reader.fileName = name;
        return reader;
    };

    handleFileDrag = (fileDragEvent) => {
        fileDragEvent.stopPropagation();
        fileDragEvent.preventDefault();

        if (fileDragEvent.type == "dragover")
        { fileDragEvent.target.classList.add(this.hoverClass); }
        else
        { fileDragEvent.target.classList.remove(this.hoverClass); }
    };

    handleDrop = (fileDropEvent) => {
        this.handleFileDrag(fileDropEvent);
        this.handleFileSelected(fileDropEvent);
    };

    handleFileSelected = (fileSelectionEvent) => {
        
        var files = fileSelectionEvent.target.files || fileSelectionEvent.dataTransfer.files;

        for (let i = 0, f; f = files[i]; i++) {
            if (this.fileFilter && !f.type.match(this.fileFilter)) {
                if (this.onError)
                { this.onError(f, "File type does not match filter"); }
                continue;
            }

            if (this.maxFileSize && f.size >= this.maxFileSize) {
                console.log("error");
                if (this.onError)
                { this.onError(f, "File exceeds file size limit"); }
                continue;
            }
            let obj = { name: files[i].name, type: files[i].type, size:files[i].size}
            this.readFile(f, obj);
        }
    };
}