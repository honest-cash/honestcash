import BitcoinService from './BitcoinService';
import HashtagService from './HashtagService';
import PostService from './PostService';
import ProfileService from './ProfileService';
import CommentService from './CommentService';
import FeedService from './FeedService';
import RelsService from './RelsService';

angular.module("vqServices", [ "vqConfig" ])
.service('BitcoinService', [ "$http", "API_URL", BitcoinService ])
.service('HashtagService', HashtagService)
.service("PostService", PostService)
.service("FeedService", FeedService)
.service("ProfileService", [ "$http", "API_URL", ProfileService ])
.service("CommentService", [ "$http", CommentService ])
.service("RelsService", [ "$http", "API_URL", RelsService ])
