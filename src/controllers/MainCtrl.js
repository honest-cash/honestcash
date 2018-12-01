import * as simpleWalletProvider from "../lib/simpleWalletProvider";
export default class MainCtrl {
    constructor(
        $rootScope, $scope, $state, $sce, $window, $location, $http, AuthService, HashtagService, PostService, $uibModal
    ) {
        $scope.hashtags = HashtagService.defaultHashtags;
    
        const mouseEnterAddress = (className, address) => {
            const container = document.getElementsByClassName(className)[0];
            
            container.innerHTML = "";
    
            new QRCode(container, address);
        };

        const addressClicked = async (address, postId) => {
            const simpleWallet = simpleWalletProvider.get();

            // users with connected BCH accounts
            if (simpleWallet) {
                let tx;

                // distribute only to testnet of owner
                // default tip is 100000 satoshis = 0.001 BCH, around 20 cents
                try {
                    tx = await simpleWallet.send([
                        { address: address, amountSat: 100000 }
                    ]);
                } catch (err) {
                    if (err.message && err.message.indexOf("Insufficient") > -1) {
                        return toastr.warning("Insufficient balance on your BCH account.");
                    }

                    console.error(err);

                    return toastr.warning("Error. Try again later.");
                }

                $('#tipSuccessModal').modal('show');

                const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

                const anchorEl = document.getElementById("bchTippingTransactionUrl");

                console.log(`Upvote transaction: ${url}`);

                anchorEl.innerHTML = `See transaction: ${tx.txid.substring(0, 9)}...`;
                anchorEl.href = url;

                PostService.upvote({
                    postId: postId,
                    txId: tx.txid
                });

                return;
            }

            $('#tipModal').modal('show');

            // users with no connected BCH accounts
            const inputEl = document.getElementById("bchTippingAddress");
    
            inputEl.value = address;
            
            const anchorEl = document.getElementById("bchTippingAddressUrl");

            const split = address.split("bitcoincash:")[0];
            anchorEl.href = address ? "https://blockchair.com/bitcoin-cash/address/" + split[0] || split[1] : "";

            const qrContainer = document.getElementById("bchTippingAddressQR");

            qrContainer.innerHTML = "";

            new QRCode(qrContainer, address);
        };
    
        const mouseLeaveAddress = (className) => {
            const container = document.getElementsByClassName(className)[0];
    
            container.innerHTML = "";
        };
    
        $scope.addressClicked = addressClicked;
        $scope.mouseEnterAddress = mouseEnterAddress;
        $scope.mouseLeaveAddress = mouseLeaveAddress;
    
        $scope.showUpvotes = function(feed, statType) {
            PostService.getUpvotes(feed.id, function(rPostUpvotes) {
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'userListModal.html',
                    controller: 'userListCtrl',
                    resolve: {
                        statType: statType,
                        postId: feed.id,
                        stats: function() {
                            return {
                                upvotesCount: feed.upvotes_count,
                                viewsCount: feed.views_count,
                                commentsCount: feed.comment_count
                            };
                        },
                        postUpvotes: function() {
                            return rPostUpvotes;
                        }
                    }
                });
            });
        };
    
        $rootScope.trustSrc = (src) => {
            return $sce.trustAsResourceUrl(src);
        }
    
        $rootScope.searchVicigo = function(searchInput) {
            searchInput = searchInput.toLowerCase();
            searchInput = searchInput.replace('#', '');
            searchInput = searchInput.replace('@', '');
    
            return $http.get('/api/search?q=' + searchInput).then(function(response) {
                return response.data.map(function(item) {
                    return item;
                });
            });
        };
    
        $rootScope.searchResultSelected = function($item) {
            switch ($item.type) {
                case "profile":
                    $state.go("vicigo.profile", {
                        profileId: $item.objId
                    });
                    break;
                case "post":
                    $state.go("vicigo.post", {
                        postId: $item.objId
                    });
                    break;
                case "hashtag":
                    $state.go("vicigo.hashtag", {
                        hashtag: $item.objId
                    });
                    break;
                default:
            }
        };
    
        $scope.sort = function(sortType) {
            if (sortType == $scope.sortType) {
                $window.location.reload();
            } else {
                $scope.sortType = sortType;
                $scope.postsAvailable = true;
                $location.search('sort', $scope.sortType);
            }
        };
    
        $scope.newPhoto = function() {
            $('#uploadImageModal').modal('show');
            $('#uploadedImage').attr('src', null);
            $(".tags-area").tagit("removeAll");
            //imageDropzone.removeAllFiles(true);
            $(".dz-message").removeClass("hidden");
            $("#uploadedImage").addClass("hidden");
        };
    
        $scope.displayFeedBody = PostService.displayHTML;
    
        $rootScope.publishPicturePost = () => {
            var postId = $("#uploadedImagePostId").val();
            var tags = $("#uploadedPictureTags").val();
            $('#uploadImageModal').modal('toggle');
    
            if (postId) {
                PostService.publishPic(postId, {
                    hashtags: tags
                }, function() {
                    $(".dz-message").removeClass("hidden");
                    $('#uploadedImage').attr('src', "");
                    $("#uploadedPictureTags").tagit("removeAll");
                    document.getElementById("publishPicturePostBtn").disabled = true;
                    $(".dz-message").removeClass("hidden");
                    $("#uploadedImage").addClass("hidden");
                });
            }
        };
    
        $rootScope.logoutMe = () => {
            AuthService.logout();

            $rootScope.user = false;
            $rootScope.fetchingNotifs = false;
            $rootScope.simpleWallet = null;

            // destroy connected user wallet.
            simpleWalletProvider.set(null);
            localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
            localStorage.setItem("HC_BCH_MNEMONIC", "");

            $state.go("vicigo.feeds");

            location.reload();
        };
    }
}

MainCtrl.$inject = [
    "$rootScope",
    "$scope", 
    "$state",
    "$sce",
    "$window",
    "$location",
    "$http",
    "AuthService",
    "HashtagService",
    "PostService",
    "$uibModal"
];
