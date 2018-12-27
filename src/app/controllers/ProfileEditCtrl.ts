import swal from "sweetalert";

export default class ProfileEditCtrl {
  constructor(
    private API_URL,
    private $rootScope,
    private $scope,
    private $http,
    private $location,
    private scopeService,
    private profile
  ) {
    $scope.profile = profile;

    $scope.profileId = $scope.profile.id;
    $rootScope.isLoading = true;
    $scope.isSaving = false;

    $scope.clickProfilePic = () => {
      ($('#uploadProfilePicModal').appendTo("body") as any).modal('show');
    };

    $scope.submitChanges = async () => {
      $scope.isSaving = true;

      try {
        await this.updateUser({
          props: {
            twitter: $scope.profile.twitter,
            reddit: $scope.profile.reddit
          },
          addressBCH: $scope.profile.addressBCH,
          bio: $scope.profile.bio
        })
      } catch (err) {
        if (err.data.code === "WRONG_BCH_ADDRESS") {
          $scope.isSaving = false;

          scopeService.safeApply($scope, () => {});

          return swal(err.data.desc);
        }
      }

      this.$location.path(`/profile/${profile.username}`);

      scopeService.safeApply($scope, () => {});
    }
  }

  static $inject = [
    "API_URL",
    "$rootScope",
    "$scope",
    "$http",
    "$location",
    "scopeService",
    "profile"
  ];

  private updateUser = async (data: { props: any; addressBCH: string; bio: string; }) : Promise<{ status: any; desc: string; code: string; }> => {
    let res = await this.$http.put(`${this.API_URL}/user/${this.$scope.profile.id}`, data);

    res = res || {};

    if (res.status === 'ok') {
      return res;
    } else {
      throw res;
    }
  };
}

