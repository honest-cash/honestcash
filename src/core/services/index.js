import HashtagService from './HashtagService';
import PostService from './PostService';
import ProfileService from './ProfileService';
import FeedService from './FeedService';
import RelsService from './RelsService';
import ScopeService from './ScopeService';
import WalletService from './WalletService';

angular.module("vqServices", [ "vqConfig" ])
.service('HashtagService', HashtagService)
.service("PostService", PostService)
.service("FeedService", FeedService)
.service("ProfileService", [ "$http", "API_URL", ProfileService ])
.service("RelsService", [ "$http", "API_URL", RelsService ])
.service("ScopeService", [ ScopeService ])
.service("WalletService", WalletService);
