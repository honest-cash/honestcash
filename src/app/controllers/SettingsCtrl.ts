
import sweetalert from "sweetalert";
import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post } from "../../core/models/models";
import ProfileService from "../../core/services/ProfileService";
import ScopeService from "../../core/services/ScopeService";

enum TabStatus {
  notifications = "notifications",
}

interface IScopeSettingsCtrl extends ng.IScope {
  currentTab: TabStatus;
  isLoading: boolean;
  settings: {
    email: {
      followingNewStory: boolean;
      weeklyDigest: boolean;
    },
  };

  updateSetting(setting: "UnsubscribedFollowingNewStory" | "UnsubscribedWeeklyDigest"): void;
}

const USER_PROP_MAP = {
  weeklyDigest: "UnsubscribedWeeklyDigest",
  followingNewStory: "UnsubscribedFollowingNewStory",
};

export default class SettingsCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "$timeout",
    "ProfileService",
    "ScopeService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeSettingsCtrl,
    private $timeout: ng.ITimeoutService,
    private profileService: ProfileService,
    private scopeService: ScopeService,
  ) {

    this.$scope.currentTab = TabStatus.notifications;
    this.$scope.isLoading = true;
    this.$scope.settings = {
      email: {
        followingNewStory: false,
        weeklyDigest: false,
      },
    };
    this.$scope.updateSetting = this.updateSetting;

    this.profileService.fetchProfile($rootScope.user.id, (user) => {
      if (user.userProperties.length > 0) {
        // the opposite as we want to show that the users are subscribed!
        this.$scope.settings.email = {
          followingNewStory: !this.profileService
            .isUserPropSet(user, USER_PROP_MAP["followingNewStory"]),
          weeklyDigest: !this.profileService.isUserPropSet(user, USER_PROP_MAP["weeklyDigest"]),
        };

        this.$scope.isLoading = false;
        this.scopeService.safeApply(this.$scope);
      }
    });
  }

  public updateSetting = (
    setting: "weeklyDigest" | "followingNewStory",
  ) => {
    this.profileService.updateUserProp(
      this.$rootScope.user.id,
      USER_PROP_MAP[setting],
      !this.$scope.settings.email[setting] ? "1" : "0",
    );
  }
}
