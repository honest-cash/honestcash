import angular from "angular";

import FeedService from "./FeedService";
import HashtagService from "./HashtagService";
import NotifService from "./NotifService";
import PostService from "./PostService";
import ProfileService from "./ProfileService";
import RelsService from "./RelsService";
import ScopeService from "./ScopeService";
import WalletService from "./WalletService";
import BitcoinComService from "./BitcoinComService";
import UserPropsService from "./UserPropsService";

angular.module("vqServices", ["vqConfig"])
.service("hashtagService", HashtagService)
.service("postService", PostService)
.service("feedService", FeedService)
.service("profileService", ["$http", "API_URL", ProfileService])
.service("relsService", ["$http", "API_URL", RelsService])
.service("scopeService", ScopeService)
.service("walletService", WalletService)
.service("bitcoinComService", BitcoinComService)
.service("userPropsService", UserPropsService)
.service("notifService", NotifService);
