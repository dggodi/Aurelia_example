import { bindable, bindingMode } from 'aurelia-framework';
import { HashMap } from "../services/hashMap"

let _selectedFiles = [];
let _otherSelectedFiles = [];

let filesMap = new HashMap();
let otherFilessMap = new HashMap();

function simulateSleep(milliseconds) {

    var date = new Date();
    var currentDate = null;
    do { currentDate = new Date(); }
    while (currentDate - date < milliseconds);
}

function clearFiles(file, map) {
    for (var i = 0; i < file.length; i++) {
        let fileName = file[i].name;
        let fileObj = map.getValue(fileName);

        if (fileObj.metadata.getChecked() === true) {
            map.remove(fileName);
            file.splice(i, 1);
        }
    }
}

export class RetrieveFiles {

    selectedFiles = [];
    otherSelectedFiles = [];

    attached() {
        this.selectedFiles = _selectedFiles;
        this.otherSelectedFiles = _otherSelectedFiles;
    }

    clearSelectedDocs() {

        clearFiles(this.selectedFiles, filesMap);
        clearFiles(this.otherSelectedFiles, otherFilessMap);

        //for (var i = 0; i < this.selectedFiles.length; i++) {
        //    let fileName = this.selectedFiles[i].name;
        //    let fileObj = filesMap.getValue(fileName);

        //    if (fileObj.metadata.getChecked() === true) {
        //        filesMap.remove(fileName);
        //        this.selectedFiles.splice(i, 1);
        //    }
        //}

        //for (var i = 0; i < this.otherSelectedFiles.length; i++) {
        //    let fileName = this.otherSelectedFiles[i].name;
        //    let fileObj = otherFilessMap.getValue(fileName);

        //    if (fileObj.metadata.getChecked() === true) {
        //        otherFilessMap.remove(fileName);
        //        this.sotherSelectedFiles.splice(i, 1);
        //    }
        //}
    }

    clearDocs() {
        _selectedFiles = [];
        filesMap.clear();
    }

    fileCheckboxChanged(file) {
        let obj = filesMap.getValue(file.name);
        filesMap.update(obj.name, obj.metadata.setChecked());
    }

    startLoadCallback() {
        $("#progress-file-container-bar").css("width", "0%");
        $("#percent").text("0%");
    }

    fileProgressCallback(file, amountLoaded, totalAmount) {
        var percentLoaded = Math.round((amountLoaded / totalAmount) * 100);
        $("#progress-file-container-bar").css("width", percentLoaded + "%");
        $("#percent").text(percentLoaded + "%");
        simulateSleep(250);
    }

    fileLoadedCallback(file, data, obj) {
        document.getElementById('loaded_pdf_file').innerHTML = data.length;
        $("#progress-file-container-barr").css("width", "100%");
        _selectedFiles.push(obj);
        filesMap.add(obj.name, { file: data, metadata: new File(obj) });
    };

    fileSizeErrorCallback(file, error) {
        document.getElementById('error-output').innerHTML = error;
    }

    /***********************/

    startLoadOtherCallback() {
        $("#progress-otherfile-container-bar").css("width", "0%");
        $("#otherpercent").text("0%");
    }

    fileProgressOtherCallback(file, amountLoaded, totalAmount) {
        var percentLoaded = Math.round((amountLoaded / totalAmount) * 100);
        $("#progress-otherfile-container-bar").css("width", percentLoaded + "%");
        $("#otherpercent").text(percentLoaded + "%");
        simulateSleep(250);
    }

    fileLoadedOtherCallback(file, data, obj) {
        document.getElementById('loaded_pdf_file').innerHTML = data.length;
        $("#progress-otherfile-container-barr").css("width", "100%");
        _otherSelectedFiles.push(obj);
        otherFilessMap.add(obj.name, { file: data, metadata: new File(obj) });       
    };

    fileSizeErrorOtherCallback(file, error) {
        document.getElementById('error-otheroutput').innerHTML = error;
    }

}

class File {
    name;
    size;
    type;
    file;
    checked;

    constructor(name, size, type, checked) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.checked = checked;
    }

    get name() {
        return this.name;
    }

    get size() {
        return this.size;
    }

    get type() {
        return this.type;
    }

    get checked() {
        return this.checked;
    }

    set checked(value) {
        this.checked = value;
    }
}