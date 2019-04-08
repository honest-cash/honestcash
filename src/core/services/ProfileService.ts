interface IUserProp {
  propValue: string;
  propKey: string;
}

interface IProfile {
  id: number;
  username: string;
  addressBCH: string;
  userProperties: IUserProp[];
}

interface IUIProfile extends IProfile {
  twitter: string;
  reddit: string;
  addressSLP: string;
}
export default class ProfileService {
  public static $inject = [
    "$http",
    "API_URL",
  ];

  private recommendedProfiles;

  constructor(
    private $http: ng.IHttpService,
    private API_URL,
  ) {}

  public fetchProfileStatus(query, callback) {
    this.$http({
      url: `${this.API_URL}/user/status`,
      method: "GET",
      params: {},
    }).then((response) => {
      callback(response.data);
    });
  }

  public fetchRecommentedProfiles(profileId, params, callback) {
    if (this.recommendedProfiles) {
      return callback(this.recommendedProfiles);
    }

    this.$http({
      params,
      method: "GET",
      url: `${this.API_URL}/user/${profileId}/recommended-profiles`,
    }).then((response) => {
      this.recommendedProfiles = response.data;

      callback(this.recommendedProfiles);
    });
  }

  public updateUser(userId: number, fieldName: string, fieldValue: string) {
    const data = {};

    data[fieldName] = fieldValue;

    return this.$http.put(`${this.API_URL}/user/${userId}`, data);
  }

  public updateUserProp(userId: number, propKey: string, propValue: string, callback) {
    const props = {};

    props[propKey] = propValue;

    this.$http({
      url: `${this.API_URL}/user/${userId}`,
      method: "PUT",
      params: {
        props,
      },
    }).then((response) => {
      callback(response.data);
    });
  }

  public upsertUserProp(userId: number, propKey: string, propValue: string, callback) {
    this.$http.post(`${this.API_URL}/user/${userId}/property`, {
      propKey,
      propValue,
    },
    ).then((response) => {
      callback(response.data);
    });
  }

  public fetchProfile(profileId: number, callback) {
    this.$http.get(`${this.API_URL}/user/${profileId}`)
    .then((response) => {
      const profile = this.extendWithProps(response.data as IProfile);

      callback(profile);
    });
  }

  private getProp(userProperties: IUserProp[], propKey: string): string | null {
    const userProp = userProperties
      .find((prop) => prop.propKey === propKey);

    return userProp ? userProp.propValue : null;
  }

  private extendWithProps(profile: IProfile): IUIProfile {
    const extendedProfile: IUIProfile = {
      ...profile,
      addressSLP: this.getProp(profile.userProperties, "addressSLP"),
      reddit: this.getProp(profile.userProperties, "reddit"),
      twitter: this.getProp(profile.userProperties, "twitter"),
    };

    return extendedProfile;
  }
}
