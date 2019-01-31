import "./upvote-button.styles.less";
import template from "./upvote-button.template.html";

declare const angular;

interface IScopeUpvoteButton extends ng.IScope, IUpvoteButtonOptions {
  clickPressed: (e) => void;
}

interface IUpvoteButtonOptions {
  amount?: number;
  text?: string;
  loadingText?: string;
  isUpvoting: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const defaultOptions: IUpvoteButtonOptions = {
  amount: 0.002,
  isDisabled: false,
  isUpvoting: false,
  loadingText: "Upvoting...",
  onClick: () => {
    // tslint:disable-next-line:no-console
    console.log("Upvote Button Clicked.");
  },
  text: "Upvote"
};

class UpvoteButtonController {
  public static $inject = [
    "$scope",
    "$window"
  ];

  constructor(
    private $scope: IScopeUpvoteButton,
    private $window: ng.IWindowService
  ) {
    this.ngOnInit();
  }

  private ngOnInit() {
    this.$scope.amount = angular.isDefined(this.$scope.amount) ? this.$scope.amount : defaultOptions.amount;
    this.$scope.text = angular.isDefined(this.$scope.text) ? this.$scope.text : defaultOptions.text ;
    this.$scope.loadingText = angular.isDefined(this.$scope.loadingText)
      ? this.$scope.loadingText : defaultOptions.loadingText;
    this.$scope.isUpvoting = angular.isDefined(this.$scope.isUpvoting) ?
      this.$scope.isUpvoting : defaultOptions.isUpvoting;
    this.$scope.isDisabled = angular.isDefined(this.$scope.isDisabled) ?
      this.$scope.isDisabled : defaultOptions.isDisabled;
    this.$scope.onClick = angular.isDefined(this.$scope.onClick) ?
      this.$scope.onClick : defaultOptions.onClick;

    this.$scope.clickPressed = (event) => this.clickPressed(event);

    this.$window.onbeforeunload = (event) => {
      if (this.$scope.isUpvoting) {
        event.preventDefault();

        return "There is a pending upvote in process. Are you sure you want to leave?";
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
    controller: UpvoteButtonController,
    restrict: "E",
    scope: {
      amount: "=?",
      backgroundColor: "=?",
      isDisabled: "<",
      isUpvoting: "<",
      loadingText: "=?",
      onClick: "&",
      ringBackgroundColor: "=?",
      text: "=?",
      textColor: "=?"
    },
    template
  };
}
