import { IGlobalScope } from "../lib/interfaces";

export default class UserPropsService {
  public static $inject = [
    "$rootScope",
  ];

  constructor(
    private $rootScope: IGlobalScope,
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
