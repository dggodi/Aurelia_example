import {inject} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';

@inject(DialogController)
export class RatingDialog {

  heading = 'Rate me...';
  maxRating = 5;

  constructor(dialogController) {
      this.dialogController = dialogController;
  }
  
  activate(rating) {
    this.rating = rating;
  }
  
  rate(event) {
    if(event.target.dataset.rate) {
      this.rating = event.target.dataset.rate;
    }
  }

  save() {
      var a = this.rating;
      this.dialogController.ok();
  }

  cancel() {
      this.dialogController.cancel();
  }
}
