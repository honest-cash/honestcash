import feedsTemplateHtml from "./feeds.template.html";

class FeedsDirectiveCtrl {

  public static $inject = [
    "$rootScope",
    "$scope",
  ];

  constructor() {}
}

export default function feeds(): ng.IDirective {
  return {
    restrict: "E",
    scope: {
      isLoading: "=isLoading",
      feeds: "=feeds",
      user: "=user",
      loadMore: "&loadMore",
    },
    template: feedsTemplateHtml,
    controller: FeedsDirectiveCtrl,
  };
}
