import "./social-share-buttons.styles.less";
import socialShareButtonsTemplateHtml from "./social-share-buttons.template.html";
import { Post } from "../../../core/models/models";

interface IScopeSocialShareButtonsCtrl extends ng.IScope {
  post: Post;
}

class SocialShareButtonsController {
  public static $inject = [
    "$scope",
  ];

  constructor(
    private $scope: IScopeSocialShareButtonsCtrl,
  ) {
    this.ngOnInit();
  }

  private post: Post;

  private ngOnInit() {
    this.post = this.$scope.post;
  }

}

export default function socialSharesButton(): ng.IDirective {
  return {
    controller: SocialShareButtonsController,
    controllerAs: "socialShareButtonsCtrl",
    restrict: "E",
    scope: {
      post: "=",
    },
    template: socialShareButtonsTemplateHtml,
  };
}
