export class FileReaderHelper {
    static createReader(file, onLoad, onLoaded, onProgress, onError, obj) {
        var reader = new FileReader();
        reader.onload = function (fileLoadedEvent) {
            onLoaded(file, fileLoadedEvent.target.result, obj);
        };

        if (typeof (onLoad) == "function") {
            reader.onloadstart = function () {
                onLoad();
            }
        }

        if (typeof (onProgress) == "function") {
            reader.onprogress = function (fileProgressEvent) {
                onProgress(file, fileProgressEvent.loaded, fileProgressEvent.total);
            };
        }

        if (typeof (onError) == "function") {
            reader.onerror = function (fileErrorEvent) {
                onError(file, fileErrorEvent.target.error);
            };
        }

        return reader;
    }
}