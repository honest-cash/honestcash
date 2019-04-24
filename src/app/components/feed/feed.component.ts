import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";

import feedTemplateHtml from "./feed.template.html";
import feedStylesLess from "./feed.styles.less";

import PostService from "../../../core/services/PostService";
import SoundcloudService from "src/core/services/SoundcloudService";

class FeedDirectiveCtrl {

  public static $inject = [
    "$scope",
    "$sce",
    "PostService",
    "SoundcloudService",
  ];

  constructor(
    private $scope,
    private $sce,
    private postService: PostService,
    private soundcloudService: SoundcloudService,
  ) {
    this.$scope.styles = feedStylesLess;

    this.$scope.trustSrc = (src) => {
      return this.$sce.trustAsResourceUrl(src);
    };

    this.$scope.displayFeedBody = (html: string) => {
      return this.postService.displayHTML(html);
    };

    this.initTippy();
    this.initEmbeds();
  }

  private async initTippy() {
    /**
     * data-tippy-content is not used in the HTML because
     * angular cannot interpolate the followerCount
    */
    tippyJs(".hc-tooltip");
    tippyJs(".user-follower-count", {
      content: `${this.$scope.feed.user.followerCount} followers,` +
      `${this.$scope.feed.user.followingCount} following`,
    });
  }

  private async initEmbeds() {
    $(".embeds-soundcloud").map(async (index, element) => {
      const link = $(element).find(">:first-child").attr("href");
      const result = await this.soundcloudService.getIframe(link);
      $(element).find(">:first-child").replaceWith($(result.data.html));
    });
  }

}

export default function feed(): ng.IDirective {
  return {
    restrict: "E",
    scope: {
      feed: "=",
      user: "=",
    },
    template: feedTemplateHtml,
    controller: FeedDirectiveCtrl,
  };
}
