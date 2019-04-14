import moment from "moment";
import { dateFormat } from "../../core/config/index";
import Notif from "../models/Notif";

export default class NotifService {
  public static $inject = [
    "$http",
    "API_URL",
  ];

  constructor(
    private $http: ng.IHttpService,
    private API_URL: string,
  ) {}

  public async markAsRead(notif: Notif): Promise<void> {
    await this.$http({
      method: "PUT",
      url: `${this.API_URL}/notifications/${notif.id}/read`,
    });

    return;
  }

  public async getNotifs(params: {
    page: number,
  }): Promise<Notif[]> {
    const res = await this.$http({
      params,
      method: "GET",
      url: `${this.API_URL}/notifications`,
    });

    const notifs = res.data as Notif[];

    notifs.forEach((notif) => {
      notif.createdAtFormatted = moment(notif.createdAt).format(dateFormat);
    });

    return notifs;
  }
}
