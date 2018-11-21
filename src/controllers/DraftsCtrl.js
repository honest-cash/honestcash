export default class DraftsCtrl {
    constructor($scope, $stateParams, $http) {
        $scope.drafts = [];
        $http.get("/api/drafts").then(response => {
            
            $scope.drafts = response.data;
        });
    }
}
