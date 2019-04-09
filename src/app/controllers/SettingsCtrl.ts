
import sweetalert from "sweetalert";
import tippyJs from "tippy.js";
import "tippy.js/dist/tippy.css";
import toastr from "../../core/config/toastr";
import { IGlobalScope } from "../../core/lib/interfaces";
import { Post } from "../../core/models/models";
import ProfileService from "../../core/services/ProfileService";
import ScopeService from "../../core/services/ScopeService";

enum TabStatus {
  subscription = "subscription",
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

  updateSetting(setting: "followingNewStory" | "weeklyDigest"): void;
}

export default class SettingsCtrl {
  public static $inject = [
    "$rootScope", "$scope", "$timeout", "ProfileService", "ScopeService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeSettingsCtrl,
    private $timeout: ng.ITimeoutService,
    private profileService: ProfileService,
    private scopeService: ScopeService,
  ) {

    this.$scope.currentTab = TabStatus.subscription;
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
        this.$scope.settings.email.followingNewStory = JSON.parse(
          user
            .userProperties
            .find(userProp => userProp.propKey === "followingNewStory")
            .propValue,
          );

        this.$scope.settings.email.weeklyDigest = JSON.parse(
            user
              .userProperties
              .find(userProp => userProp.propKey === "weeklyDigest")
              .propValue,
            );
        this.$scope.isLoading = false;
        this.scopeService.safeApply(this.$scope);
      }
    });

  }

  public updateSetting = (setting: "followingNewStory" | "weeklyDigest") => {
    this
      .profileService
      .upsertUserProp(
        this.$rootScope.user.id,
        setting,
        String(this.$scope.settings.email[setting]),
        () => {},
    );
  }

}
