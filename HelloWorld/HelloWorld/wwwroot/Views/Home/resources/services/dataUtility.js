export class DataObjectUtility {

    /**
     * helper function to retreive a deep copy of JSON object
     *
     * @param obj   - JSON object to be copied
     *
     * note: JSON.stringify   - converts the obj to a JSON string
     *       JSON.parse       - converts the JSON string to javscript objects
     */
    static cloneObject(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

}
