export default class Notif {
  public id: number;
  public createdAt: Date;
  public createdAtFormatted: Date;
  public fromUser: {
    id: number;
    imageUrl: string;
  };
  public isRead: boolean;
  public type: string;
  public message: string;
  public pointer: string;
}
