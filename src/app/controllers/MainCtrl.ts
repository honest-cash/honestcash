import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import * as upvoteDistribution from "../lib/upvoteDistribution";

export default class MainCtrl {
    constructor(
        $rootScope, $scope, $state, $sce, $window, $location, $http, scopeService, AuthService, RelsService, HashtagService, ProfileService, PostService
    ) {
        HashtagService.getTopHashtags()
        .then(hashtags => {
          $scope.hashtags = hashtags;

          scopeService.safeApply($scope, () => {});
        });

        if ($rootScope.user) {
          ProfileService.fetchRecommentedProfiles($rootScope.user.id, {}, (users) => {
            $scope.recommendedUsers = users;
  
            scopeService.safeApply($scope, () => {});
          });
        }

        const mouseEnterAddress = (className, address) => {
            const container = document.getElementsByClassName(className)[0];
            
            container.innerHTML = "";
    
            new QRCode(container, address);
        };

        const byteCount = (s) => {
            return ((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2);
        };

        const makeUncesorable = async (post) => {
            const simpleWallet = simpleWalletProvider.get();

            const json = {
                title: post.title,
                body: post.plain,
                author: post.user.username,
            };

            if (byteCount(JSON.stringify(json)) > 5) {
                return toastr.warning("The story is too long! We are working on it!");
            }

            $('#uncensoredResultModal').modal({
                backdrop: "static"
            });

            document.getElementById("uncensoredResultLoading").style.display = "block";
            document.getElementById("uncensoredResultSuccess").style.display = "none";

            // users with connected BCH accounts
            if (simpleWallet) {
                let res;

                try {
                    res = await simpleWallet.upload(json, {
                        title: `${post.title} by ${post.user.username} | Honest Cash`,
                        extUri: `https://honest.cash/${post.user.username}/${post.alias}`
                    });
                } catch (err) {
                    $('#uncensoredResultModal').modal('hide');

                    if (err.message.indexOf("mempool") > -1) {
                        return toastr.warning("The story is too long! We are working on it!");
                    }

                    return toastr.warning(err.message);
                }

                document.getElementById("uncensoredResultLoading").style.display = "none";
                document.getElementById("uncensoredResultSuccess").style.display = "block";

                const fileId = res.fileId;

                console.log(res);
                console.log("Story saved for all times on BCH: " + fileId);
               
                const inputEl = document.getElementById("bitcoinFileId");

                inputEl.value = fileId;

                PostService.createRef({
                    postId: post.id,
                    extId: fileId
                });
            }
        };

        const satoshiToBch = (amountSat) => {
            return (amountSat / 100000000).toFixed(5);
        }

        const addressClicked = async (post) => {
          const postId = post.id;
          const address = post.user.addressBCH;
          const simpleWallet = simpleWalletProvider.get();

          $scope.upvotingPostId = postId;
          $scope.upvotingStatus = "loading";

          // users with connected BCH accounts
          let tx;
          let upvotes;

          try {
            upvotes = (await PostService.getUpvotes(postId)).data;
          } catch (err) {
            toastr.error("Can't connect.");

            return console.error(err);
          }
          
          const receivers = upvoteDistribution.determineUpvoteRewards(upvotes, post.user);

          toastr.info("Upvoting...");

          const distributionInfoEl = document.getElementById("distribution-info");

          distributionInfoEl.innerHTML = "";

          for (let receiver of receivers) {
            const el = document.createElement("div");

            let userHtml;

            if (receiver.user) {
                userHtml = `<a target="_self" href="/profile/${receiver.user.username}"><img style="border-radius:50%; width: 23px;" src="${receiver.user.imageUrl ? receiver.user.imageUrl : '/img/avatar.png'}" /> ${receiver.user.username}</a> ${post.userId === receiver.user.id ? '(Author)' : ''}`;
            } else {
                userHtml = `<img style="width: 23px;" src="/img/avatar.png" /> Anonymous`;
            }

            el.innerHTML = `${satoshiToBch(receiver.amountSat)} BCH -> ${userHtml}`;

            distributionInfoEl.appendChild(el);
          }

          // distribute only to testnet of owner
          // default tip is 100000 satoshis = 0.001 BCH, around 20 cents
          try {
              tx = await simpleWallet.send(receivers);
          } catch (err) {
              if (err.message && err.message.indexOf("Insufficient") > -1) {
                  return toastr.warning("Insufficient balance on your BCH account.");
              }

              if (err.message && err.message.indexOf("has no matching Script") > -1) {
                  return toastr.warning("Could not find an unspent bitcoin that is big enough");
              }

              $scope.upvotingStatus = "error";

              console.error(err);

              return toastr.warning("Error. Try again later.");
          }

          $('#tipSuccessModal').modal('show');

          const url = `https://explorer.bitcoin.com/bch/tx/${tx.txid}`;

          const anchorEl = document.getElementById("bchTippingTransactionUrl");
      
          console.log(`Upvote transaction: ${url}`);

          anchorEl.innerHTML = `Receipt: ${tx.txid.substring(0, 9)}...`;
          anchorEl.href = url;

          PostService.upvote({
              postId: postId,
              txId: tx.txid
          });

          $scope.upvotingPostId = null;

          /**
          $('#tipModal').modal('show');

          const inputEl = document.getElementById("bchTippingAddress");

          inputEl.value = address;
          
          const anchorEl = document.getElementById("bchTippingAddressUrl");

          const split = address.split("bitcoincash:")[0];
          anchorEl.href = address ? "https://blockchair.com/bitcoin-cash/address/" + split[0] || split[1] : "";

          const qrContainer = document.getElementById("bchTippingAddressQR");

          qrContainer.innerHTML = "";

          new QRCode(qrContainer, address);
          */
        };
    
        const mouseLeaveAddress = (className) => {
            const container = document.getElementsByClassName(className)[0];
    
            container.innerHTML = "";
        };
    
        $scope.addressClicked = addressClicked;
        $scope.makeUncesorable = makeUncesorable;
        $scope.mouseEnterAddress = mouseEnterAddress;
        $scope.mouseLeaveAddress = mouseLeaveAddress;
    
        $scope.follow = (profileId, followGuy) => {
            if (!$rootScope.user || !$rootScope.user.id) {
                return $state.go("starter.welcome");
            }

            followGuy.alreadyFollowing = !followGuy.alreadyFollowing;

            RelsService.followProfile(profileId);
        };

        $scope.unfollow = (profileId, followGuy) => {
          if (followGuy) {
              followGuy.alreadyFollowing = false;
          }

          RelsService.unfollowProfile(profileId);
        };

        $scope.showUpvotes = (feed, statType) => {
            PostService.getUpvotes(feed.id, (rPostUpvotes) => {
              
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
    "scopeService",
    "AuthService",
    "RelsService",
    "HashtagService",
    "ProfileService",
    "PostService"
];
