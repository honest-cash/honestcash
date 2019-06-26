
import "tippy.js/dist/tippy.css";
import { IGlobalScope } from "../../core/lib/interfaces";
import ProfileService from "../../core/services/ProfileService";
import ScopeService from "../../core/services/ScopeService";
import { User } from "src/core/models/models";

enum TabStatus {
  notifications = "notifications",
}

type EmailType = "weeklyDigest" | "followingNewStory" | "productDigest" | "marketingEmails";
// tslint:disable-next-line: max-line-length
// type EmailUserProp = "UnsubscribedFollowingNewStory" | "UnsubscribedWeeklyDigest" | "UnsubscribedProductDigest" | "UnsubscribedMarketingEmails";

interface IScopeSettingsCtrl extends ng.IScope {
  currentTab: TabStatus;
  isLoading: boolean;
  settings: {
    email: {
      followingNewStory: boolean;
      weeklyDigest: boolean;
      marketingEmails: boolean;
      productDigest: boolean;
    },
  };

  updateSetting(
    setting: EmailType,
  ): void;
}

const USER_PROP_MAP = {
  marketingEmails: "UnsubscribedMarketingEmails",
  productDigest: "UnsubscribedProductDigest",
  weeklyDigest: "UnsubscribedWeeklyDigest",
  followingNewStory: "UnsubscribedFollowingNewStory",
};

export default class SettingsCtrl {
  public static $inject = [
    "$rootScope",
    "$scope",
    "ProfileService",
    "ScopeService",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $scope: IScopeSettingsCtrl,
    private profileService: ProfileService,
    private scopeService: ScopeService,
  ) {
    this.$scope.currentTab = TabStatus.notifications;
    this.$scope.isLoading = true;
    this.$scope.settings = {
      // will get all settings set to false, casting intentional
      email: this.getEmailSettings() as any,
    };

    this.$scope.updateSetting = this.updateSetting;

    this.profileService.fetchProfile($rootScope.user.id, (user) => {
      if (user.userProperties.length > 0) {

        // casting intentional
        this.$scope.settings.email = this.getEmailSettings(user) as any;

        this.$scope.isLoading = false;
        this.scopeService.safeApply(this.$scope);
      }
    });
  }

  public updateSetting = (
    setting: EmailType,
  ) => {
    this.profileService.updateUserProp(
      this.$rootScope.user.id,
      USER_PROP_MAP[setting],
      !this.$scope.settings.email[setting] ? "1" : "0",
    );
  }

  private getEmailSettings(user?: User): { [emailType: string]: boolean } {
    const emails = {};

    Object.keys(USER_PROP_MAP).forEach((emailSetting) => {
      if (user) {
        emails[emailSetting] =
          !this.profileService.isUserPropSet(user, USER_PROP_MAP[emailSetting]);
      } else {
        emails[emailSetting] = false;
      }
    });

    return emails as { [emailType: string]: boolean };
  }
}
