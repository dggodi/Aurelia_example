function getDiscussionInput() {
	return "";
}

// helper function to retreive a deep copy 
// JSON.stringify   - converts the obj to a JSON string
// JSON.parse       - converts the JSON string to javscript objects
function cloneObject(obj) {
	return JSON.parse(JSON.stringify(obj));
}

export class Discussion {
    activate() {
		this.discussionInput = getDiscussionInput();
		this.originalInput = cloneObject(this.discussionInput);
    }

	save() {
		this.originalInput = cloneObject(this.discussionInput);
    }

    // determines whether the deactivate method is called
    // if new input != original input confirm navigation
    canDeactivate() {
		if (JSON.stringify(cloneObject(this.discussionInput)) != 
			JSON.stringify(this.originalInput)) {
			if (confirm("Unsaved data, are you sure you want to navigate away?")) {
				return true;
			}
			else {
				return false;
			}
		}
		else {
			return true;
		}
    }

    deactivate() {
		console.log("Discussion deactivated");
	}

}
