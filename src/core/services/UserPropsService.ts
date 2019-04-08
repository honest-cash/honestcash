import { IGlobalScope } from "../lib/interfaces";

export default class UserPropsService {
  public static $inject = [
    "$rootScope",
    "$http",
    "API_URL",
  ];

  constructor(
    private $rootScope: IGlobalScope,
    private $http: ng.IHttpService,
    private API_URL,
  ) {}

  public checkRecoveryBackup = () => {
    const user = this.$rootScope.user;
    if (user &&
      user.userProperties &&
      user.userProperties.length
    ) {
      const recoveryBackedUpProp = user.userProperties.find(
        p => p.propKey === "recoveryBackedUp",
      );
      return !recoveryBackedUpProp || !JSON.parse(recoveryBackedUpProp.propValue) ? true : false;
    }  if (!user.userProperties) {
      return false;
    }
    return true;
  }
}
