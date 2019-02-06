import FeedService from "./FeedService";
import HashtagService from "./HashtagService";
import NotifService from "./NotifService";
import PostService from "./PostService";
import ProfileService from "./ProfileService";
import RelsService from "./RelsService";
import ScopeService from "./ScopeService";
import SearchService from "./SearchService";
import WalletService from "./WalletService";

angular.module("vqServices", [ "vqConfig" ])
.service("HashtagService", HashtagService)
.service("PostService", PostService)
.service("FeedService", FeedService)
.service("ProfileService", [ "$http", "API_URL", ProfileService ])
.service("RelsService", [ "$http", "API_URL", RelsService ])
.service("ScopeService", ScopeService)
.service("SearchService", SearchService)
.service("WalletService", WalletService)
.service("NotifService", NotifService);
