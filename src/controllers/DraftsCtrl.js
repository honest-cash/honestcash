export default class DraftsCtrl {
    constructor($scope, $http) {
        $scope.drafts = [];
        $http.get("/api/drafts").then(response => {
            
            $scope.drafts = response.data;
        });
    }
}

DraftsCtrl.$inject = [ "$scope", "$http" ];