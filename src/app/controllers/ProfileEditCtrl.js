export default class ProfileEditCtrl {
    constructor(API_URL, $rootScope, $state, $scope, $location, $http, $q, $window, FeedService, RelsService, PostService, ProfileService, profile) {
        $scope.profile = profile;

        $scope.profileId = $scope.profile.id;
        $rootScope.isLoading = true;

        const updateMutableProfileFieldFactory = (fieldName) => async (fieldValue) => {
            var d = $q.defer();

            const data = {};

            data[fieldName] = fieldValue;
            console.log(data);

            $http.put(`${API_URL}/user/${$scope.profile.id}`, data)
                .then((res) => {
                    res = res || {};
                    if (res.status === 'ok') { // {status: "ok"}
                        d.resolve()
                    } else { // {status: "error", msg: "Username should be `awesome`!"}
                        d.resolve(res.msg)
                    }
                }, (response) => {
                    // toastr.warning(response.data.desc);

                    d.resolve(response.data.desc);
                });

            return d.promise;
        };

        $scope.updateUsername = updateMutableProfileFieldFactory("username");
        $scope.updateAddressBCH = updateMutableProfileFieldFactory("addressBCH");
        $scope.updateBio = updateMutableProfileFieldFactory("bio");
        $scope.updateTwitter = (fieldValue) => updateMutableProfileFieldFactory("props")({ twitter: fieldValue });
        $scope.updateReddit = (fieldValue) => updateMutableProfileFieldFactory("props")({ reddit: fieldValue });

        $scope.clickProfilePic = () => {
            $('#uploadProfilePicModal').appendTo("body").modal('show');
        };

        $scope.submitChanges = async () => {
            var d = $q.defer();

            Promise.all([
                $scope.updateAddressBCH($scope.profile.addressBCH),
                $scope.updateBio($scope.profile.bio),
                $scope.updateTwitter($scope.profile.twitter),
                $scope.updateReddit($scope.profile.reddit)
            ]).then((res) => {
                d.resolve(res);
                $location.path(`/profile/${profile.username}`);
            });

            return d.promise;
        }
    }
}

ProfileEditCtrl.$inject = [
    "API_URL",
    "$rootScope",
    "$state",
    "$scope",
    "$location",
    "$http",
    "$q",
    "$window",
    // "BitcoinService",
    "FeedService",
    "RelsService",
    "PostService",
    "ProfileService",
    "profile"
];
