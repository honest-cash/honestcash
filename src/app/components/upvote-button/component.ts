import template from './template.html';

declare const angular;

interface IScopeUpvoteButton extends ng.IScope, IUpvoteButtonOptions {
  clickPressed: (e) => void;
}

interface IUpvoteButtonOptions {
  amount?: number;
  text?: string;
  loadingText?: string;
  backgroundColor?: string;
  ringBackgroundColor?: string;
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
  ringBackgroundColor: "#fafafa",
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
    this.$scope.amount = angular.isDefined(this.$scope.amount) ? this.$scope.amount : defaultOptions.amount;
    this.$scope.text = angular.isDefined(this.$scope.text) ? this.$scope.text : defaultOptions.text ;
    this.$scope.loadingText = angular.isDefined(this.$scope.loadingText) ? this.$scope.loadingText : defaultOptions.loadingText;
    this.$scope.backgroundColor = angular.isDefined(this.$scope.backgroundColor) ? this.$scope.backgroundColor : defaultOptions.backgroundColor;
    this.$scope.ringBackgroundColor = angular.isDefined(this.$scope.ringBackgroundColor) ? this.$scope.ringBackgroundColor : defaultOptions.ringBackgroundColor;
    this.$scope.textColor = angular.isDefined(this.$scope.textColor) ? this.$scope.textColor : defaultOptions.textColor;
    this.$scope.isUpvoting = angular.isDefined(this.$scope.isUpvoting) ? this.$scope.isUpvoting : defaultOptions.isUpvoting;
    this.$scope.isDisabled = angular.isDefined(this.$scope.isDisabled) ? this.$scope.isDisabled : defaultOptions.isDisabled;
    this.$scope.onClick = angular.isDefined(this.$scope.onClick) ? this.$scope.onClick : defaultOptions.onClick;

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
        "ringBackgroundColor": "=?",
        "textColor": "=?", 
    },
    template,
    controller: UpvoteButtonController
  };
};
