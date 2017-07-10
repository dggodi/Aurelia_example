// jspm install npm:aurelia-files

//import { computedFrom } from 'aurelia-framework';

let _selectedFiles = [];
let _otherSelectedFiles = [];

var simulateSleep = function (milliseconds) {

    var date = new Date();
    var currentDate = null;
    do { currentDate = new Date(); }
    while (currentDate - date < milliseconds);
}

let _selectedFiles = [];
//let s;

export class Test{

    selectedFiles = [];
    otherSelectedFiles = [];

    attached() {
        this.selectedFiles = _selectedFiles;
    }

    pdfStartLoadCallback() {
        $("#progress-file-container-bar").css("width", "0%");
        document.getElementById('percent').innerHTML = "0%";
       // $("#percent").text("0%");
    }

    slowFileProgressCallback(file, amountLoaded, totalAmount) {
        var percentLoaded = Math.round((amountLoaded / totalAmount) * 100);
        $("#progress-file-container-bar").css("width", percentLoaded + "%");
        document.getElementById('percent').innerHTML = percentLoaded + "%";
        //$("#percent").text(percentLoaded + "%");
        simulateSleep(250);
    }

    pdfFileLoadedCallback(file, data, obj) {
        document.getElementById('loaded_pdf_file').innerHTML = data.length;
        $("#progress-file-container-barr").css("width", "100%");
        console.log("pdfFileLoadedCallback  " + obj);
        _selectedFiles.push(obj);
    };

    fileSizeErrorCallback(file, error) {
        document.getElementById('error-output').innerHTML = error;
    }

    submit() {
        this.selectedFiles = _selectedFiles;
    }
    
}

