import sweetalert from "sweetalert";

declare var bitbox: any;

export default class ProfileEditCtrl {
  public static $inject = [
    "API_URL",
    "$rootScope",
    "$scope",
    "$http",
    "$location",
    "ScopeService",
    "profile",
  ];

  constructor(
    private API_URL,
    private $rootScope,
    private $scope,
    private $http,
    private $location,
    private scopeService,
    private profile,
  ) {
    $scope.profile = profile;

    $scope.profileId = $scope.profile.id;
    $rootScope.isLoading = true;
    $scope.isSaving = false;

    $scope.clickProfilePic = () => {
      ($("#uploadProfilePicModal").appendTo("body") as any).modal("show");
    };

    $scope.submitChanges = async () => {
      $scope.isSaving = true;

      if (bitbox.Address.isLegacyAddress($scope.profile.addressBCH)) {
        const cashAddress = bitbox.Address.toCashAddress($scope.profile.addressBCH);

        $scope.profile.addressBCH = cashAddress;
      }

      if (
        $scope.profile.addressSLP &&
        $scope.profile.addressSLP.indexOf("simpleledger:") === -1
      ) {
        $scope.isSaving = false;

        scopeService.safeApply($scope);

        return sweetalert("Your SLP address is not correct!");
      }

      try {
        await this.updateUser({
          addressBCH: $scope.profile.addressBCH,
          bio: $scope.profile.bio,
          props: {
            addressSLP: $scope.profile.addressSLP,
            reddit: $scope.profile.reddit,
            twitter: $scope.profile.twitter,
          },
        });
      } catch (err) {
        if (err.data.code === "WRONG_BCH_ADDRESS") {
          $scope.isSaving = false;

          scopeService.safeApply($scope, () => { /** */ });

          return sweetalert(err.data.desc);
        }
      }

      this.$location.path(`/profile/${profile.username}`);

      scopeService.safeApply($scope, () => {});
    };
  }

  private updateUser = async (
    data: { props: any; addressBCH: string; bio: string; },
  ): Promise<{ status: any; desc: string; code: string; }> => {
    let res = await this.$http.put(`${this.API_URL}/user/${this.$scope.profile.id}`, data);

    res = res || {};

    if (res.status === "ok") {
      return res;
    }
    throw res;

  }
}
