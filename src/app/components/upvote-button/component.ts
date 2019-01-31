import template from './template.html';

declare const angular, toastr;

interface IScopeUpvoteButton extends ng.IScope, IUpvoteButtonOptions {
  clickPressed: (e) => void;
}

interface IUpvoteButtonOptions {
  amount?: number;
  text?: string;
  loadingText?: string;
  backgroundColor?: string;
  textColor?: string;
  isUpvoting: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const defaultOptions:IUpvoteButtonOptions = {
  isUpvoting: false,
  isDisabled: false,
  amount: 0.002,
  text: "Upvote",
  loadingText: "Upvoting...",
  backgroundColor: "#f7941d",
  textColor: "#ffffff",
  onClick: () => { console.log('Upvote Button Clicked.') }
}

class UpvoteButtonController {

  public static $inject = [
    "$scope",
    "$window",
  ]

  constructor(
    private $scope: IScopeUpvoteButton,
    private $window: ng.IWindowService
  ) {
    this.$scope.amount = angular.isUndefined(this.$scope.amount) ? defaultOptions.amount : this.$scope.amount;
    this.$scope.text = angular.isUndefined(this.$scope.text) ? defaultOptions.text : this.$scope.text;
    this.$scope.loadingText = angular.isUndefined(this.$scope.loadingText) ? defaultOptions.loadingText : this.$scope.loadingText;
    this.$scope.backgroundColor = angular.isUndefined(this.$scope.backgroundColor) ? defaultOptions.backgroundColor : this.$scope.backgroundColor;
    this.$scope.textColor = angular.isUndefined(this.$scope.textColor) ? defaultOptions.textColor : this.$scope.textColor;
    this.$scope.isUpvoting = angular.isUndefined(this.$scope.isUpvoting) ? defaultOptions.isUpvoting : this.$scope.isUpvoting;
    this.$scope.isDisabled = angular.isUndefined(this.$scope.isDisabled) ? defaultOptions.isDisabled : this.$scope.isDisabled;
    this.$scope.onClick = angular.isUndefined(this.$scope.onClick) ? defaultOptions.onClick : this.$scope.onClick;

    this.$scope.clickPressed = (event) => this.clickPressed(event);

    this.$window.onbeforeunload = (event) => {
      if (this.$scope.isUpvoting) {
        event.preventDefault();
        return "There is a pending upvote in process. Are you sure you want to leave?"
      }
    };

  }
  
  private clickPressed(e) {
    if (this.$scope.isUpvoting || this.$scope.isDisabled) {
      e.stopPropagation();
      return;
    }
    this.$scope.onClick();
  }
}

export default function upvoteButton(): ng.IDirective {
  return {
    restrict: 'E',
    scope: {
        "onClick": "&",
        "isUpvoting": "<",
        "isDisabled": "<",
        "amount": "=?", 
        "text": "=?", 
        "loadingText": "=?", 
        "backgroundColor": "=?",
        "textColor": "=?", 
    },
    template,
    controller: UpvoteButtonController
  };
};
