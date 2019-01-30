import Notif from "../../core/models/Notif";
import NotifService from "../../core/services/NotifService";
import PostService from "../../core/services/PostService";
import ScopeService from "../../core/services/ScopeService";

export default class NotifsCtrl {
  public static $inject = [
    "$scope",
    "NotifService",
    "ScopeService",
    "PostService"
  ];

  private isLoading: boolean = true;
  private page: number = 1;
  private notifs: Notif[] = [];
  private notifsAvailable: boolean = true;

  constructor(
    private $scope: ng.IScope,
    private notifService: NotifService,
    private scopeService: ScopeService,
    private postService: PostService
  ) {
    this.ngInit();
  }

  protected async markAsRead(notif: Notif) {
    notif.isRead = true;

    await this.notifService.markAsRead(notif);
  }

  protected displayNotif(html: string): string {
    return this.postService.displayHTML(html);
  }

  private async ngInit() {
    this.loadNotifs();
  }

  private async loadNotifs() {
    this.isLoading = true;

    const nextNotifs = await this.notifService.getNotifs({
      page: this.page
    });

    this.notifs = this.notifs.concat(nextNotifs);

    this.notifsAvailable = nextNotifs.length < 20 ? false : true;

    this.scopeService.safeApply(this.$scope);

    this.isLoading = false;
  }

  private loadMoreNotifs() {
    if (!this.isLoading && this.notifsAvailable) {
      this.page += 1;

      this.loadNotifs();
    }
  }
}
