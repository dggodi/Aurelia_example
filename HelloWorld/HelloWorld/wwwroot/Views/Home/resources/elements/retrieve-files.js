import { bindable, bindingMode } from 'aurelia-framework';
import { HashMap } from "../services/hashMap"
import { PdfDialog} from "../dialogs/pdf-dialog"

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

function clearFiles(names, file, map) {
    for (var i = 0; i < names.length; i++) {
        let fileName = names[i].name;
        let fileObj = map.getValue(fileName);
        if (fileObj != null) {
            map.remove(fileName);
            file.splice(i, 1);
        }
    }
}

export class RetrieveFiles {

    selectedFiles = [];
    otherSelectedFiles = [];

    selectedRemoveFiles = [];
    selectedRemoveOtherFiles = [];

    activate() {
        this.selectedFiles = _selectedFiles;
        this.otherSelectedFiles = _otherSelectedFiles;
    }

    clearSelectedDocs() {
        clearFiles(this.selectedRemoveFiles, this.selectedFiles, filesMap);
        clearFiles(this.selectedRemoveOtherFiles, this.otherSelectedFiles, otherFilessMap);
    }

    clearDocs() {
        _selectedFiles = [];
        filesMap.clear();
    }

    startLoadCallback() {
        $("#progress-file-container-bar").css("width", "0%");
        $("#percent").text("0%");
    }

    viewPdf() {
        let obj = filesMap.getValue("pdf")
        if (obj != null) {
            this.dialogService.open({ viewModel: PdfDialog, model: obj.file })
                .then(response => {
                    console.log("modal could not be opened")
                });
        }
    }

    fileProgressCallback(file, amountLoaded, totalAmount) {
        var percentLoaded = Math.round((amountLoaded / totalAmount) * 100);
        $("#progress-file-container-bar").css("width", percentLoaded + "%");
        $("#percent").text(percentLoaded + "%");
        simulateSleep(250);
    }

    fileLoadedCallback(file, data) {
        document.getElementById('loaded_pdf_file').innerHTML = data.length;
        $("#progress-file-container-barr").css("width", "100%");
        _selectedFiles.push(file);

        let fileExt = file.name.split('.').pop();
        let fileExtName = (fileExt === "pdf") ?"pdf" : "docx"

        //filesMap.add(fileExtName, { file: data, metadata: new File(file.name, file.type, file.size) });

        filesMap.add(fileExtName, data );
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

    constructor(name, size, type) {
        this.name = name;
        this.size = size;
        this.type = type;
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

    set name(value) {
        this.name = value;
    }

    set size(value) {
        this.size = value;
    }

    set type(value) {
        this.type = value;
    } 
}