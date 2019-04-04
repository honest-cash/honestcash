(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["app"],{

/***/ "/kzY":
/*!**********************************************!*\
  !*** ./src/app/components/feed/component.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return feed; });
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./template.html */ "pB9m");
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_template_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _feed_less__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feed.less */ "IqT8");
/* harmony import */ var _feed_less__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_feed_less__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var FeedDirectiveCtrl = /** @class */ (function () {
    function FeedDirectiveCtrl($scope, $sce, postService) {
        var _this = this;
        this.$scope = $scope;
        this.$sce = $sce;
        this.postService = postService;
        this.$scope.styles = _feed_less__WEBPACK_IMPORTED_MODULE_3___default.a;
        this.$scope.trustSrc = function (src) {
            return _this.$sce.trustAsResourceUrl(src);
        };
        this.$scope.displayFeedBody = function (html) {
            return _this.postService.displayHTML(html);
        };
        this.initTippy();
    }
    FeedDirectiveCtrl.prototype.initTippy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /**
                 * data-tippy-content is not used in the HTML because angular cannot interpolate the followerCount
                */
                Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".hc-tooltip");
                Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".user-follower-count", {
                    content: this.$scope.feed.user.followerCount + " followers, " + this.$scope.feed.user.followingCount + " following"
                });
                return [2 /*return*/];
            });
        });
    };
    FeedDirectiveCtrl.$inject = [
        "$scope",
        "$sce",
        "PostService",
    ];
    return FeedDirectiveCtrl;
}());
function feed() {
    return {
        restrict: 'E',
        scope: {
            "feed": "=",
            "user": "=",
        },
        template: _template_html__WEBPACK_IMPORTED_MODULE_2___default.a,
        controller: FeedDirectiveCtrl
    };
}
;


/***/ }),

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "03IP":
/*!*****************************************!*\
  !*** ./src/app/controllers/PostCtrl.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_config_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/config/toastr */ "mRKG");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var PostCtrl = /** @class */ (function () {
    function PostCtrl($scope, $rootScope, $stateParams, postService, scopeService) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$stateParams = $stateParams;
        this.postService = postService;
        this.scopeService = scopeService;
        this.isLoading = true;
        this.upvotes = [];
        this.responses = [];
        this.unlocks = [];
        this.responseSortOrder = "createdAt";
        this.shouldShowIcon = false;
        this.iconToShow = "";
        this.postTooltip = "";
        this.newResponse = "";
        this.ngInit();
    }
    PostCtrl.prototype.getPostTooltip = function () {
    };
    PostCtrl.prototype.ngInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data, container_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.postService.getById(this.$stateParams.alias)];
                    case 1:
                        _a.post = _b.sent();
                        this.post.isOwner = this.$rootScope.user ? this.post.user.id === this.$rootScope.user.id : false;
                        // show archived or locked/unlocked icon
                        if (this.post.status === "archived") {
                            this.shouldShowIcon = true;
                            if (this.post.hasPaidSection && (this.post.hasBeenPaidFor || this.post.isOwner)) {
                                this.postTooltip = "This story is now archived however you still have access to the original post";
                                this.iconToShow = "fa-unlock";
                            }
                            else {
                                this.postTooltip = "This story is archived";
                                this.iconToShow = "fa-archive";
                            }
                            this.scopeService.safeApply(this.$scope);
                        }
                        else if (this.post.hasPaidSection) {
                            this.shouldShowIcon = true;
                            if (!this.post.isOwner) {
                                if (this.post.hasBeenPaidFor) {
                                    this.postTooltip = "You have unlocked this story";
                                    this.iconToShow = "fa-unlock";
                                }
                                else {
                                    this.postTooltip = "Unlocking this story will cost you " + this.post.paidSectionCost + " BCH";
                                    this.iconToShow = "fa-lock";
                                }
                            }
                            else {
                                this.postTooltip = "This story has a paid section however you have access to the post";
                                this.iconToShow = "fa-unlock";
                            }
                            this.scopeService.safeApply(this.$scope);
                        }
                        this.isLoading = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        return [4 /*yield*/, Promise.all([
                                this.postService.getUpvotes(this.post.id),
                                this.postService.getResponses(this.post.id),
                                this.postService.getUnlocks(this.post.id),
                            ])];
                    case 2:
                        data = _b.sent();
                        this.upvotes = data[0];
                        this.responses = data[1];
                        this.unlocks = data[2];
                        this.scopeService.safeApply(this.$scope);
                        if (!this.$rootScope.user) {
                            container_1 = document.getElementById("post-tipping-container");
                            if (container_1) {
                                container_1.innerHTML = "";
                                (function () { return new QRCode(container_1, _this.post.user.addressBCH); })();
                            }
                        }
                        this.initTippy();
                        return [2 /*return*/];
                }
            });
        });
    };
    PostCtrl.prototype.sortResponses = function (order) {
        this.responseSortOrder = order;
        this.scopeService.safeApply(this.$scope);
    };
    PostCtrl.prototype.createPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.newResponse || this.newResponse.length < 10) {
                            return [2 /*return*/, _core_config_toastr__WEBPACK_IMPORTED_MODULE_2__["default"].error("Comments need to be at least 10 characters.")];
                        }
                        return [4 /*yield*/, this.postService.createPost({
                                body: this.newResponse,
                                parentPostId: this.post.id,
                                postTypeId: "comment"
                            })];
                    case 1:
                        newComment = _a.sent();
                        this.responses.push(newComment);
                        this.newResponse = "";
                        this.scopeService.safeApply(this.$scope);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostCtrl.prototype.editPost = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                window.location.href = "/edit/" + this.post.id;
                return [2 /*return*/];
            });
        });
    };
    PostCtrl.prototype.initTippy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".hc-tooltip");
                Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".user-follower-count");
                return [2 /*return*/];
            });
        });
    };
    PostCtrl.prototype.displayFeedBody = function (html) {
        return this.postService.displayHTML(html);
    };
    PostCtrl.$inject = [
        "$scope",
        "$rootScope",
        "$stateParams",
        "PostService",
        "ScopeService"
    ];
    return PostCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (PostCtrl);


/***/ }),

/***/ "05KQ":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/styles/feed.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".hc-feed-sidebar {\n  font-size: 12px;\n}\n.hc-header-submenu {\n  z-index: 999;\n}\n.hc-header-submenu > ul {\n  margin-top: 5px;\n  margin-bottom: 5px;\n}\n.hc-header-submenu > ul > li > a {\n  color: #777;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n.hc-header-submenu {\n  min-height: 30px;\n  font-size: 15px;\n}\n@media (min-width: 768px) {\n  .hc-header-submenu > ul {\n    padding-left: 15px;\n  }\n}\n", ""]);

// exports


/***/ }),

/***/ "0eZX":
/*!**********************************************************************!*\
  !*** ./src/app/components/unlock-button/unlock-button.template.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"btn-bch-unlock-container\"\n  ng-class=\"{'active': unlockButtonCtrl.isUnlocking, 'disabled': unlockButtonCtrl.isDisabled}\"\n  ng-click=\"unlockButtonCtrl.onClick($event)\"\n>\n  <span class=\"bch-icon\"\n    ><?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <svg\n      version=\"1.1\"\n      id=\"Layer_1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 788 788\"\n      style=\"enable-background:new 0 0 788 788;\"\n      xml:space=\"preserve\"\n    >\n      <circle\n        class=\"bch-icon-outer-ring-color\"\n        cx=\"394.5\"\n        cy=\"394.1\"\n        r=\"394.1\"\n      />\n      <title>12-bitcoin-cash-square-crop</title>\n      <circle class=\"bch-icon-inner-ring-color\" cx=\"394\" cy=\"394\" r=\"281.4\" />\n      <path\n        class=\"bch-icon-color\"\n        d=\"M551.1,407.9l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.7-0.3-1.1l0,0l0,0l0,0l0,0l0,0l0,0l0-0.1\n      c-3.9-13.2-11.7-24.8-22.4-33.5l0,0c-0.3-0.2-0.6-0.5-1-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n      l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.2-0.3l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n      l-0.4-0.3l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n      l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.5-0.2l-0.2-0.1l-0.5-0.2l-0.3-0.2l0,0\n      c-0.2-0.1-0.5-0.2-0.7-0.4c-9.6-4.9-19.9-8.2-30.6-9.7c3-3.2,5.7-6.7,8.2-10.3l0.4-0.6l0,0l0.2-0.3l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n      l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4\n      l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1\n      l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.2-0.3l0.2-0.4c0.2-0.3,0.3-0.7,0.4-1l0,0\n      c4.6-11.3,5.7-23.7,3.1-35.7l0,0l0-0.1l0,0l0,0l0,0l0,0l0,0l0,0c-0.1-0.3-0.1-0.7-0.2-1V292l0,0l0,0l0,0l0,0l-0.1-0.3\n      c-0.1-0.5-0.2-0.9-0.4-1.4c-0.1-0.5-0.2-0.9-0.4-1.4l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.6-0.3-1l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n      c-3.5-11.7-10.4-22.1-19.9-29.8l0,0c-0.3-0.2-0.6-0.4-0.8-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n      l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n      l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n      l-0.4-0.2L470,251l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.3-0.1l0,0l-0.6-0.3\n      c-18.3-9.5-41.5-12.4-64.9-6.4l-6.1,1.6l-15.4-59.9l-35.7,9.1l15.3,59.7l-28.5,7.3l-15.3-59.5L280,210l15.3,59.7l-73.5,18.9l9.8,38\n      l29.6-7.6c9.8-2.5,19.8,3.4,22.3,13.2c0,0,0,0,0,0l0,0l0,0l41.1,160c1.7,6.5-2.3,13.2-8.8,14.9l-26,6.7l1.5,45.2l73.4-18.9\n      l15.5,59.6l35.6-9.2l-15.4-59.7l28.5-7.3l15.4,59.7l35.6-9.2l-15.4-59.9c6-1.6,11.2-2.9,14.8-3.9c26.4-6.8,47.7-22.2,60.6-41.5\n      l0.4-0.6l0,0l0.2-0.3l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.2-0.4\n      l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n      l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3\n      l0.1-0.1l0.2-0.4l0.2-0.5c0.2-0.4,0.3-0.7,0.5-1.1l0,0c5.2-12.7,6.4-26.7,3.5-40.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.3-1.1v-0.1\n      l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.1-0.1c-0.1-0.5-0.2-1.1-0.4-1.6C551.2,409.1,551.2,408.5,551.1,407.9z\n       M341.6,300.9c6.1-1.6,31.2-7.9,39.5-10c13.2-3.4,26.2-2.1,36.3,2.8l0.3,0.2l0,0l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n      l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n      l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0\n      l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.1,0.1l0.1,0l0.2,0.1l0.2,0.1c0.2,0.1,0.3,0.2,0.5,0.3l0,0c5.2,3.9,9,9.4,10.9,15.6\n      l0,0l0,0.1c0,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.7c0.1,0.3,0.1,0.5,0.1,0.8l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.5\n      l0,0.1l0,0c1.3,6.4,0.6,13-2,18.9l0,0l-0.2,0.5l-0.1,0.3l-0.1,0.2l0,0.1l-0.1,0.1l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2\n      l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n      l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n      l-0.2,0.2l-0.1,0.1L431,342l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l0,0l-0.2,0.3c-6.6,9.2-17.3,16.6-30.5,20\n      c-8.3,2.1-33.4,8.7-39.5,10.3L341.6,300.9z M481,423.5l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.6l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n      c1.4,7,0.4,14.3-2.9,20.7l0,0l-0.3,0.6L478,446l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2\n      l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2L476,449l-0.1,0.2\n      l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.2,0.2\n      l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.2l0,0l-0.3,0.3c-8,10.2-20.8,18.5-36.4,22.5\n      c-9.8,2.5-39.6,10.3-46.8,12.2l-20.2-78.7c7.2-1.9,37-9.4,46.9-11.9c15.6-4,30.9-2.9,42.8,2.2l0.4,0.2l0,0l0.2,0.1l0.3,0.1l0.1,0\n      l0.3,0.1l0.1,0l0.3,0.1l0.1,0l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n      l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n      l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.2,0.2\n      c0.2,0.1,0.4,0.2,0.6,0.4l0,0c6,4,10.4,9.9,12.5,16.8l0,0l0.1,0.1c0.1,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.8\n      C481,422.8,481.1,423.2,481,423.5L481,423.5z\"\n      />\n    </svg>\n  </span>\n  <span class=\"bch-icon-loading\"></span>\n  <button ng-disabled=\"unlockButtonCtrl.isUnlocking || unlockButtonCtrl.isDisabled\" class=\"btn btn-bch-unlock\">\n    <span class=\"bch-unlock-button-amount\">{{ unlockButtonCtrl.text }}</span>\n    <span class=\"bch-unlock-button-text\">{{ unlockButtonCtrl.hoverText }}</span>\n    <span class=\"bch-unlock-button-loading\">{{ unlockButtonCtrl.loadingText }}</span>\n  </button>\n</div>\n";

/***/ }),

/***/ 1:
/*!********************************!*\
  !*** supports-color (ignored) ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!***********************!*\
  !*** chalk (ignored) ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**************************************!*\
  !*** ./terminal-highlight (ignored) ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4pt8":
/*!********************************************************************************!*\
  !*** ./src/app/components/uncensorable-button/uncensorable-button.styles.less ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./uncensorable-button.styles.less */ "ylOG");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "4wk5":
/*!********************************************************************************************************!*\
  !*** ./src/app/components/simple-ledger-protocol-details/simple-ledger-protocol-details.template.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"hc-tokens-badge-container\" ng-show=\"simpleLedgerProtocolDetailsCtrl.isVisible\">\n    <p>{{simpleLedgerProtocolDetailsCtrl.addressSLP}}</p>\n    <div class=\"hc-tokens-badge hc-tokens-badge-yellow\">\n        <div class=\"hc-tokens-badge-circle\">\n          <span class=\"hc-tokens-badge-font\">HCT</span>\n        </div>\n        <div class=\"hc-tokens-badge-ribbon\">\n            {{simpleLedgerProtocolDetailsCtrl.balanceSLP}}\n        </div>\n      </div>\n</div>\n";

/***/ }),

/***/ 5:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "75yq":
/*!*********************************************!*\
  !*** ./src/core/services/ProfileService.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ProfileService = /** @class */ (function () {
    function ProfileService($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    ProfileService.prototype.fetchProfileStatus = function (query, callback) {
        this.$http({
            url: this.API_URL + "/user/status",
            method: "GET",
            params: {}
        }).then(function (response) {
            callback(response.data);
        });
    };
    ProfileService.prototype.fetchRecommentedProfiles = function (profileId, params, callback) {
        var _this = this;
        if (this.recommendedProfiles) {
            return callback(this.recommendedProfiles);
        }
        this.$http({
            method: "GET",
            params: params,
            url: this.API_URL + "/user/" + profileId + "/recommended-profiles"
        }).then(function (response) {
            _this.recommendedProfiles = response.data;
            callback(_this.recommendedProfiles);
        });
    };
    ProfileService.prototype.updateUser = function (userId, fieldName, fieldValue) {
        var data = {};
        data[fieldName] = fieldValue;
        return this.$http.put(this.API_URL + "/user/" + userId, data);
    };
    ProfileService.prototype.updateUserProp = function (userId, propKey, propValue, callback) {
        var props = {};
        props[propKey] = propValue;
        this.$http({
            url: this.API_URL + "/user/" + userId,
            method: "PUT",
            params: {
                props: props
            }
        }).then(function (response) {
            callback(response.data);
        });
    };
    ProfileService.prototype.upsertUserProp = function (userId, propKey, propValue, callback) {
        this.$http.post(this.API_URL + "/user/" + userId + "/property", {
            propKey: propKey,
            propValue: propValue
        }).then(function (response) {
            callback(response.data);
        });
    };
    ProfileService.prototype.fetchProfile = function (profileId, callback) {
        var _this = this;
        this.$http.get(this.API_URL + "/user/" + profileId)
            .then(function (response) {
            var profile = _this.extendWithProps(response.data);
            callback(profile);
        });
    };
    ProfileService.prototype.getProp = function (userProperties, propKey) {
        var userProp = userProperties
            .find(function (prop) { return prop.propKey === propKey; });
        return userProp ? userProp.propValue : null;
    };
    ProfileService.prototype.extendWithProps = function (profile) {
        var extendedProfile = __assign({}, profile, { addressSLP: this.getProp(profile.userProperties, "addressSLP"), reddit: this.getProp(profile.userProperties, "reddit"), twitter: this.getProp(profile.userProperties, "twitter") });
        return extendedProfile;
    };
    ProfileService.$inject = [
        "$http",
        "API_URL"
    ];
    return ProfileService;
}());
/* harmony default export */ __webpack_exports__["default"] = (ProfileService);


/***/ }),

/***/ "85Iz":
/*!**********************************************************************************!*\
  !*** ./src/app/components/uncensorable-button/uncensorable-button.template.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button\n  data-tippy-content=\"Your story will be saved on blockchain.\"\n  class=\"hc-tooltip btn btn-default\"\n  ng-if=\"uncensorableButtonCtrl.isVisible\"\n  ng-click=\"uncensorableButtonCtrl.onClick($event)\"\n  ng-disabled=\"uncensorableButtonCtrl.isUncensoring\"\n>\n  <i class=\"fa fa-btc\"></i><span class=\"hidden-xs\"> Make it</span> Uncensorable\n</button>\n";

/***/ }),

/***/ "871o":
/*!******************************************!*\
  !*** ./src/app/controllers/FeedsCtrl.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var FeedsCtrl = /** @class */ (function () {
    function FeedsCtrl($rootScope, $scope, $stateParams, $location, $timeout, feedService, postService, hashtagService, profileService, scopeService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$location = $location;
        this.$timeout = $timeout;
        this.feedService = feedService;
        this.postService = postService;
        this.hashtagService = hashtagService;
        this.profileService = profileService;
        this.scopeService = scopeService;
        this.$scope.isLoading = true;
        this.$scope.feeds = [];
        this.$scope.page = 1;
        this.$scope.limit = 10;
        this.$scope.postsAvailable = true;
        this.$scope.hashtagFollowed = false;
        this.$scope.hashtag = $stateParams.hashtag;
        this.$scope.feedType = $stateParams.feedType || (this.$scope.hashtag ? $stateParams.feedType || "top" : "userfeed");
        this.$scope.feedScope = this.$scope.hashtag ? "all-time" : this.$location.search()['feedScope'] || "last-month";
        this.$scope.sortType = "new";
        this.$scope.recommendedHashtags = [];
        this.$scope.recommendedProfiles = [];
        this.hashtagService.getTopHashtags()
            .then(function (hashtags) {
            _this.$scope.hashtags = hashtags;
            _this.scopeService.safeApply($scope, function () { });
        });
        if (this.$rootScope.user) {
            this.profileService.fetchRecommentedProfiles(this.$rootScope.user.id, {}, function (users) {
                _this.$scope.recommendedUsers = users;
                _this.scopeService.safeApply($scope);
                _this.initTippy();
            });
        }
        this.$scope.fetchFeeds = function () { return _this.fetchFeeds(); };
        this.$scope.loadMore = function () { return _this.loadMore(); };
        this.fetchFeeds();
        this.$rootScope.$on('$locationChangeSuccess', function (event) {
            if (_this.$location.search()['feedScope']) {
                _this.$scope.feedScope = _this.$location.search()['feedScope'];
                _this.scopeService.safeApply($scope, function () { });
                _this.fetchFeeds(true);
            }
        });
    }
    FeedsCtrl.prototype.loadMore = function () {
        if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
            if (this.$scope.feedType === "userfeed") {
                this.$scope.until = this.$scope.feeds[this.$scope.feeds.length - 1].publishedAt;
            }
            else {
                this.$scope.page = this.$scope.page + 1;
            }
            this.fetchFeeds();
        }
    };
    FeedsCtrl.prototype.fetchFeeds = function (reload) {
        var _this = this;
        if (reload === void 0) { reload = false; }
        this.$scope.isLoading = true;
        var obj = {
            hashtag: this.$scope.hashtag,
            until: this.$scope.until,
            feedScope: undefined,
            page: this.$scope.page,
            followerId: undefined,
            orderBy: undefined,
            includeResponses: undefined
        };
        if (this.$scope.feedType === "userfeed") {
            obj.followerId = this.$rootScope.user ? this.$rootScope.user.id : undefined;
        }
        if (this.$scope.feedType === "top") {
            obj.orderBy = "upvoteCount";
        }
        if (this.$scope.feedType === "top" && this.$scope.feedScope === "last-month") {
            obj.feedScope = "last-month";
        }
        if (reload) {
            this.$scope.feeds = [];
        }
        var fetchFn = function (obj, cb) { return _this.$scope.feedType === "userfeed" ?
            _this.feedService.fetchFeeds(obj, cb) :
            _this.postService.getPosts(obj, cb); };
        fetchFn(obj, function (data) {
            if (data) {
                data.forEach(function (feed) {
                    _this.$scope.feeds.push(feed);
                });
                if (data.length < _this.$scope.limit) {
                    _this.$scope.postsAvailable = false;
                }
                else {
                    _this.$scope.postsAvailable = true;
                }
            }
            else {
                _this.$scope.postsAvailable = false;
            }
            _this.$scope.isLoading = false;
        });
    };
    FeedsCtrl.prototype.initTippy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Timeout is somehow required
                this.$timeout(function () {
                    Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".user-follower-count");
                });
                return [2 /*return*/];
            });
        });
    };
    FeedsCtrl.$inject = [
        "$rootScope",
        "$scope",
        "$stateParams",
        "$location",
        "$timeout",
        "FeedService",
        "PostService",
        "HashtagService",
        "ProfileService",
        "ScopeService"
    ];
    return FeedsCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (FeedsCtrl);


/***/ }),

/***/ "8Iek":
/*!******************************************!*\
  !*** ./src/core/services/RelsService.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function ($http, API_URL) {
    var followProfile = function (profileId) {
        $http.post(API_URL + "/user/" + profileId + "/follow/").then(function (response) {
        });
    };
    var unfollowProfile = function (profileId) {
        $http.post(API_URL + "/user/" + profileId + "/unfollow/").then(function (response) {
        });
    };
    var showFollowers = function (profileId, callback) {
        $http.get(API_URL + "/user/" + profileId + "/followers").then(function (response) {
            callback(response.data);
        });
    };
    var showFollowing = function (profileId, callback) {
        $http.get(API_URL + "/user/" + profileId + "/following").then(function (response) {
            callback(response.data);
        });
    };
    var followHashtag = function (hashtag) {
        $http.get(API_URL + "/api/hashtag/" + hashtag + "/follow").then(function (response) {
        });
    };
    var unfollowHashtag = function (hashtag) {
        $http.get(API_URL + "/api/hashtag/" + hashtag + "/unfollow").then(function (response) {
        });
    };
    var showFollowedHashtags = function (profileId, callback) {
        $http.get(API_URL + "/api/profile/" + profileId + "/hashtags/following").then(function (response) {
            callback(response.data);
        });
    };
    return {
        followHashtag: followHashtag,
        unfollowHashtag: unfollowHashtag,
        followProfile: followProfile,
        unfollowProfile: unfollowProfile,
        showFollowing: showFollowing,
        showFollowers: showFollowers,
        showFollowedHashtags: showFollowedHashtags,
    };
});
;


/***/ }),

/***/ "8XhY":
/*!*********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/core/style.css ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "body {\n  width: 100%;\n  font-family: \"Helvetica\", sans-serif;\n  font-size: 12px;\n  font-weight: 300;\n  /* color: #777; */\n  line-height: 1.6;\n  background-color: #fafafa;\n  padding-top: 50px;\n}\nimg {\n  max-width: 100%;\n}\na {\n  /*color: #444;*/\n  text-decoration: none;\n  -webkit-transition: all 0.25s ease-out;\n  -moz-transition: all 0.25s ease-out;\n  -ms-transition: all 0.25s ease-out;\n  -o-transition: all 0.25s ease-out;\n  transition: all 0.25s ease-out;\n}\na:hover {\n  color: #00aeff;\n  text-decoration: none;\n}\nh1 {\n  font-size: 42px;\n  font-family: \"Helvetica\", sans-serif;\n}\nh2 {\n  font-size: 30px;\n  font-family: \"Helvetica\", sans-serif;\n}\nh3 {\n  font-size: 23px;\n}\nh4 {\n  font-size: 16px;\n}\nh1,\nh2,\nh3,\nh4 {\n  color: #444;\n  font-weight: normal;\n  line-height: 1.2;\n  margin: 5px 0 5px 0;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.width640 {\n  width: 100%;\n  max-width: 640px !important;\n}\n.width321 {\n  width: 100%;\n  max-width: 321px !important;\n}\n/* BOOTSTRAP OVERRIDES */\n.navbar-default {\n  background-color: white;\n  border-bottom: 1px solid #eeeeee;\n}\n.header_menu {\n  padding: 5px;\n  font-size: 17px;\n  font-weight: bold !important;\n}\n.header_menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  padding-top: 3px;\n  padding-bottom: 10px;\n  margin-bottom: 10px;\n  border-bottom: 1px solid #eeeeee;\n}\n.menu-item-profile {\n  padding: 10px;\n}\nimg.lazy {\n  width: 100%;\n  /*max-height: 400px;*/\n  /* min-height: 180px; */\n  /* this causes scaling problems */\n  display: block;\n  /* optional way, set loading as background */\n  background-image: url(\"/img/loader-pacman.gif\");\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n.navbar .navbar-form {\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-right: 0;\n  margin-left: 0;\n  border: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.search-results-wrapper {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  background-color: #f9f9f9;\n}\n.search-results-wrapper > .message {\n  padding: 10px 20px;\n  border-bottom: 1px solid #ddd;\n  color: #868686;\n}\n.search-results-wrapper > .dropdown-menu {\n  position: static;\n  float: none;\n  display: block;\n  min-width: 250px;\n  background-color: transparent;\n  border: none;\n  border-radius: 0;\n  box-shadow: none;\n}\n/* end header */\n.header-logo {\n  width: 134px;\n}\n.image-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.pointer {\n  cursor: pointer;\n}\n.bold {\n  font-weight: bold;\n}\n.padding-top {\n  padding-top: 5px;\n}\n.block-center {\n  margin: 0 auto;\n}\n.img-thumbnail-avatar-normal {\n  height: 100px;\n  width: 100px;\n}\n.post-content {\n  width: 100%;\n}\n.img-thumbnail-avatar-small {\n  height: 45px;\n  width: 45px;\n}\n.img-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.img-thumbnail-avatar-smallest {\n  height: 22px;\n  width: 22px;\n}\n.hashtag {\n  padding: 2px;\n  font-weight: bold;\n  font-size: 12px;\n}\n.hashtag-big {\n  padding: 10px;\n  font-size: 30px;\n  font-weight: bold;\n}\n.selected {\n  font-weight: bold;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.horiontal-list li {\n  display: inline;\n  list-style-type: none;\n  width: 100%;\n  padding: 15px;\n}\n.text-center {\n  text-align: center;\n}\n/* DROPZONE */\n.dz-message-style {\n  border-radius: 9px 9px 9px 9px;\n  -moz-border-radius: 9px 9px 9px 9px;\n  -webkit-border-radius: 9px 9px 9px 9px;\n  border: 2px dashed #000000;\n  height: 200px;\n  width: 95%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.dz-message-text-style {\n  text-align: center;\n}\n.btn-outline {\n  margin-top: 40px;\n  color: #fff;\n  border: 2px solid #fff;\n  border-radius: 2px;\n  background-color: transparent;\n  width: 250px;\n  font-weight: 300;\n}\n.btn-outline:hover {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.fill-screen img {\n  width: 100%;\n}\n.textarea-bio {\n  margin-top: 10px;\n  width: 100%;\n  resize: none;\n  overflow: auto;\n  border: none;\n  background-color: transparent;\n  overflow-y: hidden;\n}\n@media (max-width: 767px) {\n  h1 {\n    font-size: 34px;\n  }\n  .text-center-sm {\n    text-align: center;\n  }\n  textarea {\n    resize: vertical;\n  }\n  div.inline {\n    float: left;\n  }\n  .rate-btn {\n    font-size: 24px;\n  }\n  .navbar .navbar-form {\n    width: 200px;\n    padding-left: 10px;\n    padding-right: 0;\n  }\n  body {\n    padding-top: 0px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar .navbar-form {\n    width: 300px;\n  }\n  .feed-hashtag {\n    font-size: 8px;\n  }\n}\n.hashtag {\n  color: #000;\n  background-color: #F0F0F0;\n  font-weight: bold;\n  padding: 10px;\n  font-size: 12px;\n  cursor: pointer;\n}\n.notification-badge-button {\n  color: white;\n  display: inline-block;\n  /* Inline elements with width and height. TL;DR they make the icon buttons stack from left-to-right instead of top-to-bottom */\n  position: relative;\n  /* All 'absolute'ly positioned elements are relative to this one */\n  padding: 2px 5px;\n  /* Add some padding so it looks nice */\n}\n.notification-badge {\n  background-color: #fa3e3e;\n  border-radius: 2px;\n  color: white;\n  padding: 1px 3px;\n  font-size: 10px;\n  position: absolute;\n  /* Position the badge within the relatively positioned button */\n  top: 0;\n  right: 0;\n}\n@media (max-width: 900px) {\n  .navbar-nav > li > a {\n    line-height: 10px;\n  }\n}\n#profile-badge {\n  margin-top: 5px;\n  height: 40px;\n  line-height: 28px;\n  padding: 10px 16px;\n  border-radius: 6px;\n  background-color: white;\n  font-size: 10px;\n  padding: 6px 12px;\n  text-align: justify;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-image: none;\n  border: 1px solid #F0F0F0;\n}\n#profile-badge-thumbnail {\n  float: left;\n}\n#profile-badge-details {\n  float: right;\n  line-height: 14px;\n  margin-left: 5px;\n}\n#profile-badge-mobile {\n  position: relative;\n  float: right;\n  padding: 7px;\n  border: 1px solid #F0F0F0;\n  border-radius: 4px;\n  margin-top: 8px;\n  margin-right: 5px;\n}\n.list-post-actions > li {\n  height: 30px;\n  float: left;\n  line-height: 30px;\n}\n.welcome-columns {\n  margin-top: 50px;\n  margin-bottom: 30px;\n}\n.welcome-columns h3 {\n  margin-bottom: 30px;\n  text-transform: uppercase;\n}\n.welcome-columns h3 {\n  margin-top: 20px;\n}\n.welcome-columns h4 {\n  text-align: center;\n  margin-bottom: 30px;\n  margin-top: 20px;\n}\n.welcome-columns p {\n  margin-bottom: 20px;\n}\n#embeds-youtube {\n  position: relative;\n  width: 100%;\n  height: 0;\n  padding-bottom: 56.25%;\n}\n#embeds-youtube > iframe {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.form-control {\n  font-size: 12px;\n}\n.post-paid-section-locked-wrapper {\n  margin-bottom: 20px;\n}\n.post-paid-section-locked {\n  background-color: white;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);\n  margin-bottom: 10px;\n  width: 100%;\n  text-align: center;\n  padding: 20px;\n}\n.post-paid-section-locked-inner {\n  width: 70%;\n  margin: 0 auto;\n}\narticle.fade-end {\n  display: block;\n  overflow: hidden;\n  position: relative;\n}\narticle.fade-end:after {\n  position: absolute;\n  bottom: 0;\n  height: 100%;\n  width: 100%;\n  content: \"\";\n  background: linear-gradient(to top, #fafafa 20%, rgba(255, 255, 255, 0) 80%);\n  pointer-events: none;\n  /* so the text is still selectable */\n}\n.m-0 {\n  margin: 0;\n}\nul.tagit li {\n  display: block;\n  float: left;\n  margin: 2px 5px 2px 0 !important;\n}\nblockquote {\n  font-size: 15px;\n}\n", ""]);

// exports


/***/ }),

/***/ "9Mtb":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/feed/feed.less ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".feed-container a,\n.feed-container a:visited,\n.feed-container a:hover,\n.feed-container a:active {\n  color: inherit;\n  text-decoration: none;\n  color: #444 !important;\n}\n.post-feed-body {\n  width: 100%;\n  font-family: 'Helvetica', sans-serif;\n  font-weight: 300 !important;\n  font-style: normal !important;\n  font-size: 17px !important;\n  line-height: 1.58 !important;\n  /* color: #777; */\n  line-height: 1.6;\n  background-color: white;\n  max-width: 100%;\n  font-size: 17px;\n}\n.feed {\n  overflow-wrap: break-word;\n  /*word-break: break-all;*/\n  border-style: solid;\n  border-width: 1px;\n  border-color: #F0F8FF;\n  background-color: white;\n  max-width: 640px;\n  margin: 0 auto;\n  width: 100% !important;\n}\n.feed-image {\n  display: block;\n  /* \n\t\tthe image in the feed will:\n\t\t\t1) if taller than the container, the height will be limited to 200px\n\t\t\tand the rest of the image will be overflown and hidden\n\t\t\t2) if shorten than the container, the container will shrink\n\t\t\tto the size of the image \n\t\t\tmax-height: 200px;\n\t*/\n  max-height: 200px;\n  line-height: 200px;\n  margin-left: auto;\n  margin-right: auto;\n  width: 100%;\n  overflow: hidden;\n  margin-bottom: 10px;\n}\n.feed-image img {\n  height: auto;\n  position: relative;\n  width: 100%;\n}\n.image-feed-body {\n  max-width: 100%;\n  padding: 0px;\n}\n.feed-title {\n  padding-left: 5px;\n  padding-right: 5px;\n  margin-bottom: 10px;\n}\n.feed-title h3 {\n  font-size: 18px;\n}\n.feed-container {\n  margin-top: 5px;\n  margin-bottom: 20px;\n}\n.feed .feed-header {\n  background-color: white;\n  padding-top: 10px;\n  padding: 5px;\n  border-bottom: 1px solid #F0F8FF;\n  cursor: pointer;\n}\n.feed .feed-header img {\n  border-radius: 50%;\n  height: 28px;\n  width: 28px;\n}\n.feed .feed-header ul li {\n  display: inline;\n}\n.feed .feed-header .feed-date {\n  float: right;\n}\n.feed-body {\n  cursor: pointer;\n  width: 100% !important;\n  word-wrap: break-word;\n  margin-bottom: 20px;\n}\n.feed-body lazy-img {\n  max-width: 100% !important;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  cursor: pointer;\n}\n.feed-body p,\n.feed-body article {\n  padding: 8px;\n  font-size: 14px;\n  cursor: pointer;\n}\n.feed .feed-footer .hashtag-container {\n  padding: 2px;\n  margin-right: 4px;\n}\n.feed .feed-footer .hashtag {\n  color: #000;\n  background-color: #F0F0F0;\n  font-weight: bold;\n  padding: 10px;\n  font-size: 12px;\n  cursor: pointer;\n}\n.feed .feed-footer .feed-actions .list {\n  display: inline;\n  padding-left: 5px;\n  padding-top: 4px;\n}\n.feed .feed-footer .feed-actions .list li {\n  display: inline;\n  padding-left: 10px;\n}\n.feed-hashtag {\n  font-family: 'Helvetica', sans-serif;\n  font-size: 8px;\n}\n.hashtags {\n  margin-bottom: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ "APha":
/*!*************************************!*\
  !*** ./src/app/components/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _feed_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feed/component */ "/kzY");
/* harmony import */ var _feeds_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feeds/component */ "rl8m");
/* harmony import */ var _follow_unfollow_button_follow_unfollow_button_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./follow-unfollow-button/follow-unfollow-button.component */ "dzz+");
/* harmony import */ var _logout_button_logout_button_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./logout-button/logout-button.component */ "gbrI");
/* harmony import */ var _social_share_buttons_social_share_buttons_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./social-share-buttons/social-share-buttons.component */ "ppKM");
/* harmony import */ var _upvote_button_upvote_button_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./upvote-button/upvote-button.component */ "VLQ9");
/* harmony import */ var _unlock_button_unlock_button_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unlock-button/unlock-button.component */ "RzSC");
/* harmony import */ var _uncensorable_button_uncensorable_button_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./uncensorable-button/uncensorable-button.component */ "EIXK");
/* harmony import */ var _bottom_call_to_action_bar_bottom_call_to_action_bar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bottom-call-to-action-bar/bottom-call-to-action-bar.component */ "CDFu");
/* harmony import */ var _simple_ledger_protocol_details_simple_ledger_protocol_details_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./simple-ledger-protocol-details/simple-ledger-protocol-details.component */ "LFH0");










angular
    .module('vqDirectives', ['vqConfig'])
    .directive('backImg', function () {
    return function (scope, element, attrs) {
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url + ')',
            'background-size': 'cover'
        });
    };
})
    .directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function () {
                angular.element(this).attr('src', iAttrs.fallbackSrc);
            });
        }
    };
    return fallbackSrc;
})
    .directive('feed', _feed_component__WEBPACK_IMPORTED_MODULE_0__["default"])
    .directive('feeds', _feeds_component__WEBPACK_IMPORTED_MODULE_1__["default"])
    .directive('upvoteButton', _upvote_button_upvote_button_component__WEBPACK_IMPORTED_MODULE_5__["default"])
    .directive('unlockButton', _unlock_button_unlock_button_component__WEBPACK_IMPORTED_MODULE_6__["default"])
    .directive('uncensorableButton', _uncensorable_button_uncensorable_button_component__WEBPACK_IMPORTED_MODULE_7__["default"])
    .directive('logoutButton', _logout_button_logout_button_component__WEBPACK_IMPORTED_MODULE_3__["default"])
    .directive('followUnfollowButton', _follow_unfollow_button_follow_unfollow_button_component__WEBPACK_IMPORTED_MODULE_2__["default"])
    .directive('bottomCallToActionBar', _bottom_call_to_action_bar_bottom_call_to_action_bar_component__WEBPACK_IMPORTED_MODULE_8__["default"])
    .directive('simpleLedgerProtocolDetails', _simple_ledger_protocol_details_simple_ledger_protocol_details_component__WEBPACK_IMPORTED_MODULE_9__["default"])
    .directive('socialShareButtons', _social_share_buttons_social_share_buttons_component__WEBPACK_IMPORTED_MODULE_4__["default"]);


/***/ }),

/***/ "Axmg":
/*!********************************************!*\
  !*** ./src/core/services/WalletService.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/simpleWalletProvider */ "jAkR");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var WalletService = /** @class */ (function () {
    function WalletService($http) {
        this.$http = $http;
        this.startRefreshing();
    }
    WalletService.prototype.updateBalances = function () {
        return __awaiter(this, void 0, Promise, function () {
            var bch, walletBalance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMyWalletBalance()];
                    case 1:
                        bch = _a.sent();
                        return [4 /*yield*/, this.convertBCHtoUSD(bch.totalBalance)];
                    case 2:
                        walletBalance = _a.sent();
                        return [2 /*return*/, walletBalance];
                }
            });
        });
    };
    WalletService.prototype.getAddressBalances = function () {
        return __awaiter(this, void 0, Promise, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.walletBalance) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.updateBalances()];
                    case 1:
                        _a.walletBalance = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.walletBalance];
                }
            });
        });
    };
    WalletService.prototype.startRefreshing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = this;
                                return [4 /*yield*/, this.updateBalances()];
                            case 1:
                                _a.walletBalance = _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }, 30 * 1000);
                return [2 /*return*/];
            });
        });
    };
    WalletService.prototype.convertBCHtoUSD = function (bch) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.bchUSDRate) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$http.get("https://api.coinbase.com/v2/exchange-rates?currency=BCH")];
                    case 1:
                        res = _a.sent();
                        this.bchUSDRate = Number(res.data.data.rates.USD);
                        _a.label = 2;
                    case 2: return [2 /*return*/, {
                            bch: bch,
                            usd: Number((this.bchUSDRate * bch).toFixed(2))
                        }];
                }
            });
        });
    };
    WalletService.prototype.convertUSDtoBCH = function (usd) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.bchUSDRate) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$http.get("https://api.coinbase.com/v2/exchange-rates?currency=BCH")];
                    case 1:
                        res = _a.sent();
                        this.bchUSDRate = Number(res.data.data.rates.USD);
                        _a.label = 2;
                    case 2: return [2 /*return*/, {
                            usd: usd,
                            bch: Number((1 / this.bchUSDRate * usd).toFixed(4))
                        }];
                }
            });
        });
    };
    WalletService.prototype.getMyWalletBalance = function () {
        return __awaiter(this, void 0, Promise, function () {
            var simpleWallet, _a, balanceInBCH;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        simpleWallet = _lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_0__["get"]();
                        if (!simpleWallet) {
                            return [2 /*return*/, { totalBalance: 0 }];
                        }
                        _a = this;
                        return [4 /*yield*/, simpleWallet.getWalletInfo()];
                    case 1:
                        _a.walletInfo = _b.sent();
                        balanceInBCH = Number((this.walletInfo.balance + this.walletInfo.unconfirmedBalance).toFixed(8));
                        return [2 /*return*/, { totalBalance: balanceInBCH }];
                }
            });
        });
    };
    WalletService.$inject = [
        "$http"
    ];
    return WalletService;
}());
/* harmony default export */ __webpack_exports__["default"] = (WalletService);


/***/ }),

/***/ "BKhp":
/*!******************************************!*\
  !*** ./src/core/services/FeedService.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/index */ "u61H");
/* harmony import */ var _lib_SocialSharing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/SocialSharing */ "pX/I");



var FeedService = /** @class */ (function () {
    function FeedService($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    FeedService.prototype.fetchFeeds = function (query, callback) {
        query.until = query.until || new Date().toISOString();
        this.$http({
            method: "GET",
            params: query,
            url: this.API_URL + "/feeds"
        }).then(function (response) {
            var feeds = response.data;
            for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                var feed = feeds_1[_i];
                feed.createdAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(feed.createdAt).utc().format(_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
                feed.updatedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(feed.updatedAt).utc().format(_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
                feed.publishedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(feed.publishedAt).utc().format(_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
                feed.archivedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(feed.deletedAt).utc().format(_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
                feed.shareURLs = _lib_SocialSharing__WEBPACK_IMPORTED_MODULE_2__["default"].getFeedShareURLs(feed);
            }
            callback(feeds);
        });
    };
    FeedService.$inject = [
        "$http", "API_URL"
    ];
    return FeedService;
}());
/* harmony default export */ __webpack_exports__["default"] = (FeedService);


/***/ }),

/***/ "CDFu":
/*!*********************************************************************************************!*\
  !*** ./src/app/components/bottom-call-to-action-bar/bottom-call-to-action-bar.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return bottomCallToActionBar; });
/* harmony import */ var _bottom_call_to_action_bar_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bottom-call-to-action-bar.styles.less */ "eE5U");
/* harmony import */ var _bottom_call_to_action_bar_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bottom_call_to_action_bar_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bottom_call_to_action_bar_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bottom-call-to-action-bar.template.html */ "xRMM");
/* harmony import */ var _bottom_call_to_action_bar_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_bottom_call_to_action_bar_template_html__WEBPACK_IMPORTED_MODULE_1__);


var BottomCallToActionBarController = /** @class */ (function () {
    function BottomCallToActionBarController($scope) {
        this.$scope = $scope;
        this.ngOnInit();
    }
    BottomCallToActionBarController.prototype.ngOnInit = function () {
        var _this = this;
        this.post = this.$scope.post;
        this.$scope.onClick = function () { return _this.onClick(); };
    };
    BottomCallToActionBarController.prototype.onClick = function () {
        window.location.href = '/signup';
    };
    BottomCallToActionBarController.$inject = ['$scope'];
    return BottomCallToActionBarController;
}());
function bottomCallToActionBar() {
    return {
        controller: BottomCallToActionBarController,
        controllerAs: 'bottomCallToActionBarCtrl',
        restrict: 'E',
        scope: {
            post: '='
        },
        replace: true,
        template: _bottom_call_to_action_bar_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "CFzL":
/*!**************************************************************************************!*\
  !*** ./src/app/components/follow-unfollow-button/follow-unfollow-button.styles.less ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./follow-unfollow-button.styles.less */ "dls5");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "D+dt":
/*!*********************************!*\
  !*** ./src/app/styles/post.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/less-loader/dist/cjs.js!./post.css */ "qBTb");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "DUyY":
/*!*******************************************!*\
  !*** ./src/app/controllers/WalletCtrl.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lib/simpleWalletProvider */ "jAkR");
/* harmony import */ var _core_lib_bitcoinAuthFlow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/lib/bitcoinAuthFlow */ "N3/m");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var WalletCtrl = /** @class */ (function () {
    function WalletCtrl($scope, $rootScope, authService, scopeService, walletService, profileService) {
        var _this = this;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.authService = authService;
        this.scopeService = scopeService;
        this.walletService = walletService;
        this.profileService = profileService;
        $rootScope.walletBalance = {
            bch: 0,
            usd: 0,
            isLoading: true
        };
        $scope.mnemonic = "";
        $scope.privateKey = "";
        $scope.addressBCH = "";
        $scope.showAdancedOptions = false;
        $scope.walletInfo = {};
        $scope.connectedPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
        $scope.connectedMnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
        $scope.HdPath = localStorage.getItem("HC_BCH_HD_PATH") || _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["defaultHdPath"];
        $scope.newHdPath = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["defaultHdPath"];
        $scope.isWithdrawalAddressBCHValid = true;
        var simpleWallet, lSimpleWallet;
        var checkPassword = function () { return __awaiter(_this, void 0, Promise, function () {
            var password, emails, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            buttons: {
                                cancel: true,
                                confirm: true,
                            },
                            content: {
                                element: "input",
                                attributes: {
                                    placeholder: "Enter your password.",
                                    type: "password",
                                },
                            },
                        })];
                    case 1:
                        password = _a.sent();
                        if (!password) {
                            return [2 /*return*/, { isValid: false, aborted: true }];
                        }
                        return [4 /*yield*/, this.authService.getEmails()];
                    case 2:
                        emails = _a.sent();
                        return [4 /*yield*/, this.authService.passwordCheck({
                                password: this.authService.calculatePasswordHash(emails[0], password)
                            })];
                    case 3:
                        data = _a.sent();
                        if (!!data.isValid) return [3 /*break*/, 5];
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                type: 'error',
                                title: 'Wrong password!',
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, { isValid: false, aborted: false }];
                    case 5: return [2 /*return*/, { password: password, isValid: true, aborted: false }];
                }
            });
        }); };
        $scope.onMnemonicChange = function (newMnemonic) {
            if (newMnemonic && newMnemonic.split(" ").length > 10) {
                $scope.canConnectMnemonic = true;
                return;
            }
            $scope.canConnectMnemonic = false;
        };
        $scope.saveRecoveryPhraseBackupProp = function () {
            var user = $rootScope.user;
            _this.profileService.upsertUserProp(user.id, 'recoveryBackedUp', 'true', function (res) {
                if (res) {
                    var recoveryBackedUpProp = $rootScope.user.userProperties.find(function (p) { return p.propKey === 'recoveryBackedUp'; });
                    if (recoveryBackedUpProp) {
                        recoveryBackedUpProp.propValue = true;
                    }
                    else {
                        $rootScope.user.userProperties.push(res);
                    }
                }
            });
        };
        $scope.checkRecoveryBackup = function () {
            if (_this.$rootScope.user && _this.$rootScope.user.userProperties && _this.$rootScope.user.userProperties.length) {
                var recoveryBackedUpProp = _this.$rootScope.user.userProperties.find(function (p) { return p.propKey === "recoveryBackedUp"; });
                return !recoveryBackedUpProp || !JSON.parse(recoveryBackedUpProp.propValue) ? false : true;
            }
            return false;
        };
        var refreshBalance = function (wallet) { return __awaiter(_this, void 0, void 0, function () {
            var walletInfo, err_1, _a, bch, usd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, wallet.getWalletInfo()];
                    case 1:
                        walletInfo = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        $rootScope.walletBalance = {
                            bch: 0,
                            usd: 0,
                            isLoading: false
                        };
                        return [2 /*return*/];
                    case 3: return [4 /*yield*/, this.walletService.getAddressBalances()];
                    case 4:
                        _a = _b.sent(), bch = _a.bch, usd = _a.usd;
                        $scope.walletInfo = walletInfo;
                        $rootScope.walletBalance = {
                            bch: bch,
                            usd: usd,
                            isLoading: false
                        };
                        this.scopeService.safeApply($scope, function () { });
                        return [2 /*return*/];
                }
            });
        }); };
        if ($scope.connectedMnemonic) {
            simpleWallet = new SimpleWallet($scope.connectedMnemonic, {
                HdPath: $scope.HdPath
            });
            _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["set"](simpleWallet);
            $scope.mnemonic = simpleWallet.mnemonic;
            $scope.privateKey = simpleWallet.privateKey;
            $scope.addressBCH = simpleWallet.address;
            $scope.legacyAddressBCH = simpleWallet.legacyAddress;
            refreshBalance(simpleWallet);
        }
        $scope.generate = function () {
            lSimpleWallet = new SimpleWallet(undefined, {
                HdPath: $scope.HdPath
            });
            $scope.mnemonic = lSimpleWallet.mnemonic;
            $scope.privateKey = lSimpleWallet.privateKey;
            $scope.addressBCH = lSimpleWallet.address;
            $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;
        };
        $scope.withdraw = function (withdrawalAmount, withdrawalAddressBCH) { return __awaiter(_this, void 0, void 0, function () {
            var simpleWallet, result, hasConfirmed, isValid, txid, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        simpleWallet = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["get"]();
                        return [4 /*yield*/, bitbox.Util.validateAddress(withdrawalAddressBCH)];
                    case 1:
                        result = _a.sent();
                        if (!!result.isvalid) return [3 /*break*/, 3];
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                type: 'error',
                                title: 'Oops...',
                                text: "The address " + withdrawalAddressBCH + " is not a valid Bitcoin Cash address!",
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                    case 3:
                        if (!(withdrawalAmount < 0.0005)) return [3 /*break*/, 5];
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                type: 'error',
                                title: 'Dust...',
                                text: "The amount " + withdrawalAmount + " is too small!",
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            title: 'Are you sure?',
                            text: withdrawalAmount + " BCH will be transferred to " + withdrawalAddressBCH,
                            type: 'warning',
                            buttons: {
                                cancel: true,
                                confirm: true,
                            },
                        })];
                    case 6:
                        hasConfirmed = _a.sent();
                        if (!hasConfirmed) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, checkPassword()];
                    case 7:
                        isValid = (_a.sent()).isValid;
                        if (!isValid) {
                            return [2 /*return*/];
                        }
                        console.log("Paying out " + withdrawalAmount + " BCH.");
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, simpleWallet.send([
                                {
                                    address: withdrawalAddressBCH,
                                    amountSat: bitbox.BitcoinCash.toSatoshi(withdrawalAmount)
                                }
                            ])];
                    case 9:
                        res = _a.sent();
                        txid = res.txid;
                        return [3 /*break*/, 11];
                    case 10:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [2 /*return*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                type: "error",
                                title: "Cound not send",
                                text: err_2.message,
                            })];
                    case 11: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            type: 'success',
                            title: 'Transferred!',
                            text: withdrawalAmount + " BCH has been trasferred to " + withdrawalAddressBCH,
                            footer: "<a target=\"_blank\" href=\"https://explorer.bitcoin.com/bch/tx/" + txid + "\">Receipt " + txid.substring(0, 5) + ".." + txid.substring(txid.length - 5, txid.length) + "</a>"
                        })];
                    case 12:
                        _a.sent();
                        refreshBalance(simpleWallet);
                        return [2 /*return*/];
                }
            });
        }); };
        $scope.connect = function (privateKey, HdPath) {
            if (!lSimpleWallet) {
                lSimpleWallet = new SimpleWallet(privateKey, {
                    HdPath: HdPath
                });
                $scope.privateKey = lSimpleWallet.privateKey;
            }
            $scope.connectedPrivateKey = lSimpleWallet.privateKey;
            $scope.connectedMnemonic = lSimpleWallet.mnemonic;
            $scope.HdPath = lSimpleWallet.HdPath;
            $scope.mnemonic = lSimpleWallet.mnemonic;
            $scope.privateKey = lSimpleWallet.privateKey;
            $scope.addressBCH = lSimpleWallet.address;
            $scope.legacyAddressBCH = lSimpleWallet.legacyAddress;
            _this.$rootScope.simpleWallet = {
                address: lSimpleWallet.address,
                mnemonic: lSimpleWallet.mnemonic,
                privateKey: lSimpleWallet.privateKey
            };
            _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["saveLocally"](lSimpleWallet);
            _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["set"](lSimpleWallet);
            refreshBalance(lSimpleWallet);
        };
        $scope.importNewWallet = function (newMnemonic, HdPath) { return __awaiter(_this, void 0, void 0, function () {
            var result, _a, password, isValid, simpleWallet, mnemonicEncrypted;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            type: 'warning',
                            title: 'Are you sure?',
                            text: "You will not be able to recover the previous wallet without the recovery phrase!",
                            buttons: {
                                cancel: true,
                                confirm: true,
                            }
                        })];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, checkPassword()];
                    case 2:
                        _a = _b.sent(), password = _a.password, isValid = _a.isValid;
                        if (!isValid) {
                            return [2 /*return*/];
                        }
                        simpleWallet = new SimpleWallet(newMnemonic);
                        mnemonicEncrypted = SimpleWallet.encrypt(simpleWallet.mnemonic, password);
                        this.authService
                            .setWallet({ mnemonicEncrypted: mnemonicEncrypted })
                            .then(function () {
                            $scope.connect(newMnemonic, HdPath);
                            location.reload();
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        var disconnect = function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a, password, isValid, simpleWallet;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            type: 'warning',
                            buttons: {
                                cancel: true,
                                confirm: true,
                            },
                            title: 'Are you sure?',
                            text: "You will not be able to recover the previous wallet without the recovery phrase!",
                        })];
                    case 1:
                        result = _b.sent();
                        if (!result) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, checkPassword()];
                    case 2:
                        _a = _b.sent(), password = _a.password, isValid = _a.isValid;
                        if (!isValid) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Object(_core_lib_bitcoinAuthFlow__WEBPACK_IMPORTED_MODULE_2__["default"])({ password: password })];
                    case 3:
                        simpleWallet = _b.sent();
                        this.authService
                            .setWallet({ mnemonicEncrypted: simpleWallet.mnemonicEncrypted })
                            .then(function () {
                            $scope.connect(simpleWallet.mnemonic, simpleWallet.HdPath);
                            location.reload();
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        $scope.onDepositClick = function () {
            setTimeout(function () {
                var container = document.getElementsByClassName("deposit-address-qr")[0];
                container.innerHTML = "";
                new QRCode(container, _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_1__["get"]().address);
            }, 50);
        };
        $scope.onDepositClick();
        $scope.disconnect = disconnect;
    }
    WalletCtrl.$inject = [
        "$scope",
        "$rootScope",
        "AuthService",
        "ScopeService",
        "WalletService",
        "ProfileService",
    ];
    return WalletCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (WalletCtrl);


/***/ }),

/***/ "DY7r":
/*!********************************************************************!*\
  !*** ./src/app/components/unlock-button/unlock-button.styles.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./unlock-button.styles.less */ "wDZn");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "EIXK":
/*!*********************************************************************************!*\
  !*** ./src/app/components/uncensorable-button/uncensorable-button.component.ts ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uncensorableButton; });
/* harmony import */ var lzutf8__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lzutf8 */ "gBd9");
/* harmony import */ var lzutf8__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lzutf8__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _uncensorable_button_styles_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./uncensorable-button.styles.less */ "4pt8");
/* harmony import */ var _uncensorable_button_styles_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_uncensorable_button_styles_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _uncensorable_button_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./uncensorable-button.template.html */ "85Iz");
/* harmony import */ var _uncensorable_button_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_uncensorable_button_template_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/lib/simpleWalletProvider */ "jAkR");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var UncensorableButtonController = /** @class */ (function () {
    function UncensorableButtonController($rootScope, $scope, $window, postService, walletService, scopeService) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$window = $window;
        this.postService = postService;
        this.walletService = walletService;
        this.scopeService = scopeService;
        this.byteCount = function (s) {
            return Number(((encodeURI(s).split(/%..|./).length - 1) / 1024).toFixed(2));
        };
        this.ngOnInit();
    }
    UncensorableButtonController.prototype.ngOnInit = function () {
        var _this = this;
        this.post = this.$scope.post;
        this.isUncensoring = false;
        this.isVisible = this.post.userPostRefs && !this.post.userPostRefs.length && (this.$rootScope.user && this.$rootScope.user.id && (this.$rootScope.user.id === this.post.userId));
        this.$window.onbeforeunload = function (event) {
            if (_this.isUncensoring) {
                event.preventDefault();
                return "There is a pending uncensoring in process. Are you sure you want to leave?";
            }
        };
    };
    UncensorableButtonController.prototype.onClick = function (e) {
        if (this.isUncensoring || !this.isVisible) {
            e.stopPropagation();
            return;
        }
        this.uncensor();
    };
    /**
     * Uploads a blog post onto Bitcoin blockchain and saves a refernece in Honest database
     */
    UncensorableButtonController.prototype.uncensor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var post, simpleWallet, json, compressedJson, res, postTitle, err_1, fileId, inputEl, _a, bch, usd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.isUncensoring = true;
                        this.scopeService.safeApply(this.$scope, function () { });
                        post = this.post;
                        simpleWallet = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_3__["get"]();
                        json = {
                            author: post.user.username,
                            body: post.bodyMD,
                            title: post.title
                        };
                        compressedJson = lzutf8__WEBPACK_IMPORTED_MODULE_0__["compress"](JSON.stringify(json), {
                            outputEncoding: "Base64"
                        });
                        console.log("Base64 Story: " + compressedJson);
                        if (this.byteCount(compressedJson) > 5) {
                            this.isUncensoring = false;
                            this.scopeService.safeApply(this.$scope);
                            return [2 /*return*/, toastr.warning("The story is too long! We are working on it!")];
                        }
                        $("#uncensoredResultModal").modal({
                        // backdrop: "static"
                        });
                        document.getElementById("uncensoredResultLoading").style.display = "block";
                        document.getElementById("uncensoredResultSuccess").style.display = "none";
                        if (!simpleWallet) return [3 /*break*/, 6];
                        res = void 0;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        postTitle = post.title.length > 75 ? post.title.slice(0, 75) + "..." : post.title;
                        return [4 /*yield*/, simpleWallet.upload(compressedJson, {
                                ext: "json.lzutf8",
                                extUri: "https://honest.cash/post/" + post.id,
                                title: postTitle + " by " + post.user.username + " | Honest Cash"
                            })];
                    case 2:
                        res = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        $("#uncensoredResultModal").modal("hide");
                        this.isUncensoring = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        if (err_1.message.indexOf("mempool") > -1) {
                            return [2 /*return*/, toastr.warning("The story is too long! We are working on it!")];
                        }
                        return [2 /*return*/, toastr.warning("Ensure that you have some BCH balance in your wallet to make the story uncensorable")];
                    case 4:
                        document.getElementById("uncensoredResultLoading").style.display = "none";
                        document.getElementById("uncensoredResultSuccess").style.display = "block";
                        fileId = res.fileId;
                        console.log(res);
                        console.log("Story saved for all times on BCH: " + fileId);
                        inputEl = document.getElementById("bitcoinFileId");
                        inputEl.value = fileId;
                        this.postService.createRef({
                            extId: fileId,
                            postId: post.id
                        });
                        return [4 /*yield*/, this.walletService.getAddressBalances()];
                    case 5:
                        _a = _b.sent(), bch = _a.bch, usd = _a.usd;
                        this.$rootScope.walletBalance = {
                            bch: bch,
                            usd: usd,
                            isLoading: false
                        };
                        this.isUncensoring = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        _b.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UncensorableButtonController.$inject = [
        "$rootScope",
        "$scope",
        "$window",
        "PostService",
        "WalletService",
        "ScopeService",
    ];
    return UncensorableButtonController;
}());
function uncensorableButton() {
    return {
        controller: UncensorableButtonController,
        controllerAs: "uncensorableButtonCtrl",
        restrict: "E",
        scope: {
            amount: "=?",
            loadingText: "=?",
            text: "=?",
            post: "="
        },
        template: _uncensorable_button_template_html__WEBPACK_IMPORTED_MODULE_2___default.a
    };
}


/***/ }),

/***/ "FQmk":
/*!**********************************************************************!*\
  !*** ./src/app/components/logout-button/logout-button.template.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<a href=\"#\" ng-click=\"logoutButtonCtrl.onClick()\">logout</a>";

/***/ }),

/***/ "GYqh":
/*!************************************!*\
  !*** ./src/core/services/index.ts ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FeedService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FeedService */ "BKhp");
/* harmony import */ var _HashtagService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HashtagService */ "rT8j");
/* harmony import */ var _NotifService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NotifService */ "hHIT");
/* harmony import */ var _PostService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PostService */ "TNtq");
/* harmony import */ var _ProfileService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProfileService */ "75yq");
/* harmony import */ var _RelsService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RelsService */ "8Iek");
/* harmony import */ var _ScopeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ScopeService */ "b3j/");
/* harmony import */ var _WalletService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./WalletService */ "Axmg");
/* harmony import */ var _BitcoinComService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BitcoinComService */ "xmak");









angular.module("vqServices", ["vqConfig"])
    .service("HashtagService", _HashtagService__WEBPACK_IMPORTED_MODULE_1__["default"])
    .service("PostService", _PostService__WEBPACK_IMPORTED_MODULE_3__["default"])
    .service("FeedService", _FeedService__WEBPACK_IMPORTED_MODULE_0__["default"])
    .service("ProfileService", ["$http", "API_URL", _ProfileService__WEBPACK_IMPORTED_MODULE_4__["default"]])
    .service("RelsService", ["$http", "API_URL", _RelsService__WEBPACK_IMPORTED_MODULE_5__["default"]])
    .service("ScopeService", _ScopeService__WEBPACK_IMPORTED_MODULE_6__["default"])
    .service("WalletService", _WalletService__WEBPACK_IMPORTED_MODULE_7__["default"])
    .service("BitcoinComService", _BitcoinComService__WEBPACK_IMPORTED_MODULE_8__["default"])
    .service("NotifService", _NotifService__WEBPACK_IMPORTED_MODULE_2__["default"]);


/***/ }),

/***/ "HXUB":
/*!******************************************!*\
  !*** ./src/core/controllers/MainCtrl.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MainCtrl = /** @class */ (function () {
    function MainCtrl($rootScope, $scope, $state, scopeService, walletService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$state = $state;
        this.scopeService = scopeService;
        this.walletService = walletService;
        $scope.$on('$viewContentLoaded', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, bch, usd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.walletService.getAddressBalances()];
                    case 1:
                        _a = _b.sent(), bch = _a.bch, usd = _a.usd;
                        $rootScope.walletBalance = {
                            bch: bch,
                            usd: usd,
                            isLoading: false
                        };
                        return [2 /*return*/];
                }
            });
        }); });
        var mouseEnterAddress = function (className, address) {
            var container = document.getElementsByClassName(className)[0];
            container.innerHTML = '';
            new QRCode(container, address);
        };
        var mouseLeaveAddress = function (className) {
            var container = document.getElementsByClassName(className)[0];
            container.innerHTML = '';
        };
        $scope.mouseEnterAddress = mouseEnterAddress;
        $scope.mouseLeaveAddress = mouseLeaveAddress;
        $scope.checkRecoveryBackup = function () {
            if (_this.$rootScope.user && _this.$rootScope.user.userProperties && _this.$rootScope.user.userProperties.length) {
                var recoveryBackedUpProp = _this.$rootScope.user.userProperties.find(function (p) { return p.propKey === "recoveryBackedUp"; });
                return !recoveryBackedUpProp || !JSON.parse(recoveryBackedUpProp.propValue) ? true : false;
            }
            else if (!_this.$rootScope.user.userProperties) {
                return false;
            }
            return true;
        };
    }
    MainCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$state',
        'ScopeService',
        'WalletService'
    ];
    return MainCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (MainCtrl);


/***/ }),

/***/ "IqT8":
/*!*******************************************!*\
  !*** ./src/app/components/feed/feed.less ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./feed.less */ "9Mtb");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "L6hZ":
/*!************************************************************************************!*\
  !*** ./src/app/components/social-share-buttons/social-share-buttons.template.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<small>Share on:</small>\n<a\n  ng-href=\"{{ socialShareButtonsCtrl.post.shareURLs.reddit }}\"\n  target=\"_blank\"\n  class=\"btn btn-default btn-xs\"\n>\n  <i class=\"fa fa-reddit\"></i>\n</a>\n<a\n  ng-href=\"{{ socialShareButtonsCtrl.post.shareURLs.twitter }}\"\n  target=\"_blank\"\n  class=\"btn btn-default btn-xs\"\n>\n  <i class=\"fa fa-twitter\"></i>\n</a>\n";

/***/ }),

/***/ "LFH0":
/*!*******************************************************************************************************!*\
  !*** ./src/app/components/simple-ledger-protocol-details/simple-ledger-protocol-details.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return simpleLedgerProtocolDetails; });
/* harmony import */ var _simple_ledger_protocol_details_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./simple-ledger-protocol-details.styles.less */ "fFqy");
/* harmony import */ var _simple_ledger_protocol_details_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_simple_ledger_protocol_details_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _simple_ledger_protocol_details_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./simple-ledger-protocol-details.template.html */ "4wk5");
/* harmony import */ var _simple_ledger_protocol_details_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_simple_ledger_protocol_details_template_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SimpleLedgerProtocolDetailsController = /** @class */ (function () {
    function SimpleLedgerProtocolDetailsController($scope, bitcoinComService, scopeService) {
        this.$scope = $scope;
        this.bitcoinComService = bitcoinComService;
        this.scopeService = scopeService;
        this.isVisible = false;
        this.ngOnInit();
    }
    SimpleLedgerProtocolDetailsController.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var balanceResult, token, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.addressSLP = this.$scope.profile.addressSLP;
                        if (!this.addressSLP) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bitcoinComService.getSLPAddressBalance(this.addressSLP)];
                    case 1:
                        balanceResult = _a.sent();
                        token = balanceResult.find(function (balance) { return balance.tokenId === "c35a87afad11c8d086c1449ffd8b0a84324e72b15b1bcfdf166a493551b4eea6"; });
                        if (!token) {
                            return [2 /*return*/];
                        }
                        balance = parseInt(token.balance);
                        if (balance <= 0) {
                            return [2 /*return*/];
                        }
                        this.isVisible = true;
                        this.balanceSLP = Math.round(balance / 1000) + "K";
                        this.scopeService.safeApply(this.$scope);
                        Object(tippy_js__WEBPACK_IMPORTED_MODULE_2__["default"])(".hc-tokens-badge", {
                            content: "Proud owner of " + this.balanceSLP + " Honest Tokens"
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SimpleLedgerProtocolDetailsController.$inject = [
        "$scope",
        "BitcoinComService",
        "ScopeService"
    ];
    return SimpleLedgerProtocolDetailsController;
}());
function simpleLedgerProtocolDetails() {
    return {
        controller: SimpleLedgerProtocolDetailsController,
        controllerAs: "simpleLedgerProtocolDetailsCtrl",
        restrict: "E",
        scope: {
            profile: "="
        },
        replace: true,
        template: _simple_ledger_protocol_details_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "Lv8m":
/*!*******************************************!*\
  !*** ./src/app/controllers/NotifsCtrl.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var NotifsCtrl = /** @class */ (function () {
    function NotifsCtrl($scope, notifService, scopeService, postService) {
        this.$scope = $scope;
        this.notifService = notifService;
        this.scopeService = scopeService;
        this.postService = postService;
        this.isLoading = true;
        this.page = 1;
        this.notifs = [];
        this.notifsAvailable = true;
        this.ngInit();
    }
    NotifsCtrl.prototype.markAsRead = function (notif) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        notif.isRead = true;
                        return [4 /*yield*/, this.notifService.markAsRead(notif)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotifsCtrl.prototype.displayNotif = function (html) {
        return this.postService.displayHTML(html);
    };
    NotifsCtrl.prototype.ngInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadNotifs();
                return [2 /*return*/];
            });
        });
    };
    NotifsCtrl.prototype.loadNotifs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nextNotifs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4 /*yield*/, this.notifService.getNotifs({
                                page: this.page
                            })];
                    case 1:
                        nextNotifs = _a.sent();
                        this.notifs = this.notifs.concat(nextNotifs);
                        this.notifsAvailable = nextNotifs.length < 20 ? false : true;
                        this.scopeService.safeApply(this.$scope);
                        this.isLoading = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    NotifsCtrl.prototype.loadMoreNotifs = function () {
        if (!this.isLoading && this.notifsAvailable) {
            this.page += 1;
            this.loadNotifs();
        }
    };
    NotifsCtrl.$inject = [
        "$scope",
        "NotifService",
        "ScopeService",
        "PostService"
    ];
    return NotifsCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (NotifsCtrl);


/***/ }),

/***/ "N3/m":
/*!*****************************************!*\
  !*** ./src/core/lib/bitcoinAuthFlow.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;

var generateWallet = function (data) { return __awaiter(_this, void 0, Promise, function () {
    var simpleWallet, repeatMnemonic;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                simpleWallet = new SimpleWallet(data.mnemonic);
                simpleWallet.mnemonicEncrypted = SimpleWallet.encrypt(simpleWallet.mnemonic, data.password);
                return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                        type: 'warning',
                        title: 'Write down your recovery phrase!',
                        text: simpleWallet.mnemonic,
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                        text: "The recovery phrase must remain secret at all times, because revealing it to third parties is equivalent to giving them control over the bitcoins secured by that key. The recovery phrase must also be backed up and protected from accidental loss, because if it’s lost it cannot be recovered and the funds secured by it are forever lost, too.",
                        buttons: true,
                        content: {
                            element: "input",
                            attributes: {
                                placeholder: "Re-enter your recovery phrase",
                                type: "string",
                            },
                        },
                    })];
            case 2:
                repeatMnemonic = _a.sent();
                if (!repeatMnemonic) {
                    return [2 /*return*/, generateWallet({
                            password: data.password,
                            mnemonic: simpleWallet.mnemonic
                        })];
                }
                if (!(repeatMnemonic !== simpleWallet.mnemonic)) return [3 /*break*/, 4];
                return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                        type: 'errpr',
                        title: 'Wrong',
                        text: "Try again!",
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, generateWallet({
                        password: data.password,
                        mnemonic: simpleWallet.mnemonic
                    })];
            case 4: return [2 /*return*/, simpleWallet];
        }
    });
}); };
/* harmony default export */ __webpack_exports__["default"] = (generateWallet);


/***/ }),

/***/ "RnhZ":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "K/tc",
	"./af.js": "K/tc",
	"./ar": "jnO4",
	"./ar-dz": "o1bE",
	"./ar-dz.js": "o1bE",
	"./ar-kw": "Qj4J",
	"./ar-kw.js": "Qj4J",
	"./ar-ly": "HP3h",
	"./ar-ly.js": "HP3h",
	"./ar-ma": "CoRJ",
	"./ar-ma.js": "CoRJ",
	"./ar-sa": "gjCT",
	"./ar-sa.js": "gjCT",
	"./ar-tn": "bYM6",
	"./ar-tn.js": "bYM6",
	"./ar.js": "jnO4",
	"./az": "SFxW",
	"./az.js": "SFxW",
	"./be": "H8ED",
	"./be.js": "H8ED",
	"./bg": "hKrs",
	"./bg.js": "hKrs",
	"./bm": "p/rL",
	"./bm.js": "p/rL",
	"./bn": "kEOa",
	"./bn.js": "kEOa",
	"./bo": "0mo+",
	"./bo.js": "0mo+",
	"./br": "aIdf",
	"./br.js": "aIdf",
	"./bs": "JVSJ",
	"./bs.js": "JVSJ",
	"./ca": "1xZ4",
	"./ca.js": "1xZ4",
	"./cs": "PA2r",
	"./cs.js": "PA2r",
	"./cv": "A+xa",
	"./cv.js": "A+xa",
	"./cy": "l5ep",
	"./cy.js": "l5ep",
	"./da": "DxQv",
	"./da.js": "DxQv",
	"./de": "tGlX",
	"./de-at": "s+uk",
	"./de-at.js": "s+uk",
	"./de-ch": "u3GI",
	"./de-ch.js": "u3GI",
	"./de.js": "tGlX",
	"./dv": "WYrj",
	"./dv.js": "WYrj",
	"./el": "jUeY",
	"./el.js": "jUeY",
	"./en-au": "Dmvi",
	"./en-au.js": "Dmvi",
	"./en-ca": "OIYi",
	"./en-ca.js": "OIYi",
	"./en-gb": "Oaa7",
	"./en-gb.js": "Oaa7",
	"./en-ie": "4dOw",
	"./en-ie.js": "4dOw",
	"./en-il": "czMo",
	"./en-il.js": "czMo",
	"./en-nz": "b1Dy",
	"./en-nz.js": "b1Dy",
	"./eo": "Zduo",
	"./eo.js": "Zduo",
	"./es": "iYuL",
	"./es-do": "CjzT",
	"./es-do.js": "CjzT",
	"./es-us": "Vclq",
	"./es-us.js": "Vclq",
	"./es.js": "iYuL",
	"./et": "7BjC",
	"./et.js": "7BjC",
	"./eu": "D/JM",
	"./eu.js": "D/JM",
	"./fa": "jfSC",
	"./fa.js": "jfSC",
	"./fi": "gekB",
	"./fi.js": "gekB",
	"./fo": "ByF4",
	"./fo.js": "ByF4",
	"./fr": "nyYc",
	"./fr-ca": "2fjn",
	"./fr-ca.js": "2fjn",
	"./fr-ch": "Dkky",
	"./fr-ch.js": "Dkky",
	"./fr.js": "nyYc",
	"./fy": "cRix",
	"./fy.js": "cRix",
	"./gd": "9rRi",
	"./gd.js": "9rRi",
	"./gl": "iEDd",
	"./gl.js": "iEDd",
	"./gom-latn": "DKr+",
	"./gom-latn.js": "DKr+",
	"./gu": "4MV3",
	"./gu.js": "4MV3",
	"./he": "x6pH",
	"./he.js": "x6pH",
	"./hi": "3E1r",
	"./hi.js": "3E1r",
	"./hr": "S6ln",
	"./hr.js": "S6ln",
	"./hu": "WxRl",
	"./hu.js": "WxRl",
	"./hy-am": "1rYy",
	"./hy-am.js": "1rYy",
	"./id": "UDhR",
	"./id.js": "UDhR",
	"./is": "BVg3",
	"./is.js": "BVg3",
	"./it": "bpih",
	"./it.js": "bpih",
	"./ja": "B55N",
	"./ja.js": "B55N",
	"./jv": "tUCv",
	"./jv.js": "tUCv",
	"./ka": "IBtZ",
	"./ka.js": "IBtZ",
	"./kk": "bXm7",
	"./kk.js": "bXm7",
	"./km": "6B0Y",
	"./km.js": "6B0Y",
	"./kn": "PpIw",
	"./kn.js": "PpIw",
	"./ko": "Ivi+",
	"./ko.js": "Ivi+",
	"./ky": "lgnt",
	"./ky.js": "lgnt",
	"./lb": "RAwQ",
	"./lb.js": "RAwQ",
	"./lo": "sp3z",
	"./lo.js": "sp3z",
	"./lt": "JvlW",
	"./lt.js": "JvlW",
	"./lv": "uXwI",
	"./lv.js": "uXwI",
	"./me": "KTz0",
	"./me.js": "KTz0",
	"./mi": "aIsn",
	"./mi.js": "aIsn",
	"./mk": "aQkU",
	"./mk.js": "aQkU",
	"./ml": "AvvY",
	"./ml.js": "AvvY",
	"./mn": "lYtQ",
	"./mn.js": "lYtQ",
	"./mr": "Ob0Z",
	"./mr.js": "Ob0Z",
	"./ms": "6+QB",
	"./ms-my": "ZAMP",
	"./ms-my.js": "ZAMP",
	"./ms.js": "6+QB",
	"./mt": "G0Uy",
	"./mt.js": "G0Uy",
	"./my": "honF",
	"./my.js": "honF",
	"./nb": "bOMt",
	"./nb.js": "bOMt",
	"./ne": "OjkT",
	"./ne.js": "OjkT",
	"./nl": "+s0g",
	"./nl-be": "2ykv",
	"./nl-be.js": "2ykv",
	"./nl.js": "+s0g",
	"./nn": "uEye",
	"./nn.js": "uEye",
	"./pa-in": "8/+R",
	"./pa-in.js": "8/+R",
	"./pl": "jVdC",
	"./pl.js": "jVdC",
	"./pt": "8mBD",
	"./pt-br": "0tRk",
	"./pt-br.js": "0tRk",
	"./pt.js": "8mBD",
	"./ro": "lyxo",
	"./ro.js": "lyxo",
	"./ru": "lXzo",
	"./ru.js": "lXzo",
	"./sd": "Z4QM",
	"./sd.js": "Z4QM",
	"./se": "//9w",
	"./se.js": "//9w",
	"./si": "7aV9",
	"./si.js": "7aV9",
	"./sk": "e+ae",
	"./sk.js": "e+ae",
	"./sl": "gVVK",
	"./sl.js": "gVVK",
	"./sq": "yPMs",
	"./sq.js": "yPMs",
	"./sr": "zx6S",
	"./sr-cyrl": "E+lV",
	"./sr-cyrl.js": "E+lV",
	"./sr.js": "zx6S",
	"./ss": "Ur1D",
	"./ss.js": "Ur1D",
	"./sv": "X709",
	"./sv.js": "X709",
	"./sw": "dNwA",
	"./sw.js": "dNwA",
	"./ta": "PeUW",
	"./ta.js": "PeUW",
	"./te": "XLvN",
	"./te.js": "XLvN",
	"./tet": "V2x9",
	"./tet.js": "V2x9",
	"./tg": "Oxv6",
	"./tg.js": "Oxv6",
	"./th": "EOgW",
	"./th.js": "EOgW",
	"./tl-ph": "Dzi0",
	"./tl-ph.js": "Dzi0",
	"./tlh": "z3Vd",
	"./tlh.js": "z3Vd",
	"./tr": "DoHr",
	"./tr.js": "DoHr",
	"./tzl": "z1FC",
	"./tzl.js": "z1FC",
	"./tzm": "wQk9",
	"./tzm-latn": "tT3J",
	"./tzm-latn.js": "tT3J",
	"./tzm.js": "wQk9",
	"./ug-cn": "YRex",
	"./ug-cn.js": "YRex",
	"./uk": "raLr",
	"./uk.js": "raLr",
	"./ur": "UpQW",
	"./ur.js": "UpQW",
	"./uz": "Loxo",
	"./uz-latn": "AQ68",
	"./uz-latn.js": "AQ68",
	"./uz.js": "Loxo",
	"./vi": "KSF8",
	"./vi.js": "KSF8",
	"./x-pseudo": "/X5v",
	"./x-pseudo.js": "/X5v",
	"./yo": "fzPg",
	"./yo.js": "fzPg",
	"./zh-cn": "XDpg",
	"./zh-cn.js": "XDpg",
	"./zh-hk": "SatO",
	"./zh-hk.js": "SatO",
	"./zh-tw": "kOpN",
	"./zh-tw.js": "kOpN"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "RnhZ";

/***/ }),

/***/ "RzSC":
/*!*********************************************************************!*\
  !*** ./src/app/components/unlock-button/unlock-button.component.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return upvoteButton; });
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _unlock_button_styles_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unlock-button.styles.less */ "DY7r");
/* harmony import */ var _unlock_button_styles_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_unlock_button_styles_less__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _unlock_button_template_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unlock-button.template.html */ "0eZX");
/* harmony import */ var _unlock_button_template_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_unlock_button_template_html__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/lib/simpleWalletProvider */ "jAkR");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var defaultOptions = {
    isDisabled: false,
    isUnlocking: false,
    loadingText: "Unlocking...",
    text: "Unlock"
};
var UnlockButtonController = /** @class */ (function () {
    function UnlockButtonController($rootScope, $scope, $window, postService, walletService, scopeService) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$window = $window;
        this.postService = postService;
        this.walletService = walletService;
        this.scopeService = scopeService;
        this.ngOnInit();
    }
    UnlockButtonController.prototype.ngOnInit = function () {
        var _this = this;
        this.text = "GET ACCESS FOR " + this.$scope.post.paidSectionCost + " BCH";
        this.hoverText = "UNLOCK NOW";
        this.loadingText = "UNLOCKING...";
        this.post = this.$scope.post;
        this.amount = this.$scope.post.paidSectionCost;
        this.isUnlocking = defaultOptions.isUnlocking;
        this.isDisabled = !this.$rootScope.user || this.post.userId === this.$rootScope.user.id;
        this.$window.onbeforeunload = function (event) {
            if (_this.isUnlocking) {
                event.preventDefault();
                return "There is a pending transaction in process. Are you sure you want to leave?";
            }
        };
    };
    UnlockButtonController.prototype.onClick = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmationResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isUnlocking || this.isDisabled) {
                            e.stopPropagation();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                title: "Confirm your purchase",
                                text: "You will be unlocking the full version of this story for " + this.post.paidSectionCost + " BCH. Are you sure?",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })];
                    case 1:
                        confirmationResult = _a.sent();
                        if (confirmationResult) {
                            this.unlock();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Unlocks a section in the post and saves a transaction reference in Honest database
     */
    UnlockButtonController.prototype.unlock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postId, simpleWallet, tx, HONEST_CASH_PAYWALL_SHARE, paidSectionCostInSatoshis, honestCashShare, authorShare, receiverAuthor, receiverHonestCash, err_1, addressContainer, legacyAddressContainer, qrContainer, url, anchorEl, amountEl, _a, bch, usd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.$rootScope.user) {
                            return [2 /*return*/, (location.href = "/signup")];
                        }
                        if (!this.post.user.addressBCH) {
                            toastr.error("Unlocking is not possible because the author does not have a Bitcoin address to receive");
                            return [2 /*return*/];
                        }
                        postId = this.post.id;
                        if (this.post.userId == this.$rootScope.user.id) {
                            toastr.error("Unlocking is not possible because you cannot unlock your own posts and responses");
                            return [2 /*return*/];
                        }
                        simpleWallet = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_3__["get"]();
                        this.isUnlocking = true;
                        this.scopeService.safeApply(this.$scope);
                        HONEST_CASH_PAYWALL_SHARE = 0.2;
                        paidSectionCostInSatoshis = bitbox.BitcoinCash.toSatoshi(this.post.paidSectionCost);
                        honestCashShare = paidSectionCostInSatoshis * HONEST_CASH_PAYWALL_SHARE;
                        authorShare = paidSectionCostInSatoshis - honestCashShare;
                        receiverAuthor = {
                            address: this.post.user.addressBCH,
                            amountSat: authorShare
                        };
                        receiverHonestCash = {
                            address: "bitcoincash:qrk9kquyydvqn60apxuxnh5jk80p0nkmquwvw9ea95",
                            amountSat: honestCashShare
                        };
                        toastr.info("Unlocking...");
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, simpleWallet.send([
                                receiverAuthor,
                                receiverHonestCash,
                                {
                                    opReturn: ["0x4802", postId.toString()]
                                }
                            ])];
                    case 2:
                        tx = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        if (err_1.message && err_1.message.indexOf("Insufficient") > -1) {
                            addressContainer = document.getElementById("load-wallet-modal-address");
                            legacyAddressContainer = document.getElementById("load-wallet-modal-legacy-address");
                            qrContainer = document.getElementById("load-wallet-modal-qr");
                            addressContainer.value = simpleWallet.cashAddress;
                            legacyAddressContainer.value = simpleWallet.legacyAddress;
                            qrContainer.innerHTML = "";
                            new QRCode(qrContainer, simpleWallet.cashAddress);
                            // replace with sweetalert
                            $("#loadWalletModal").modal("show");
                            this.isUnlocking = false;
                            this.scopeService.safeApply(this.$scope);
                            return [2 /*return*/, toastr.warning("Insufficient balance on your BCH account.")];
                        }
                        if (err_1.message && err_1.message.indexOf("has no matching Script") > -1) {
                            this.isUnlocking = false;
                            this.scopeService.safeApply(this.$scope);
                            return [2 /*return*/, toastr.warning("Could not find an unspent bitcoin that is big enough")];
                        }
                        this.isUnlocking = false;
                        this.scopeService.safeApply(this.$scope);
                        return [2 /*return*/, toastr.warning("Error. Try again later.")];
                    case 4:
                        url = "https://explorer.bitcoin.com/bch/tx/" + tx.txid;
                        anchorEl = document.getElementById("bchUnlockingTransactionUrl");
                        anchorEl.innerHTML = "Receipt: " + tx.txid.substring(0, 9) + "...";
                        anchorEl.href = url;
                        amountEl = document.getElementById("unlockSuccessModalAmount");
                        amountEl.innerHTML = this.post.paidSectionCost.toString();
                        $("#unlockSuccessModal").modal("show");
                        console.log("Unlock transaction: " + url);
                        this.postService.unlock({
                            postId: postId,
                            txId: tx.txid
                        });
                        return [4 /*yield*/, this.walletService.getAddressBalances()];
                    case 5:
                        _a = _b.sent(), bch = _a.bch, usd = _a.usd;
                        this.$rootScope.walletBalance = {
                            bch: bch,
                            usd: usd,
                            isLoading: false
                        };
                        this.isUnlocking = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        return [2 /*return*/];
                }
            });
        });
    };
    UnlockButtonController.$inject = [
        "$rootScope",
        "$scope",
        "$window",
        "PostService",
        "WalletService",
        "ScopeService"
    ];
    return UnlockButtonController;
}());
function upvoteButton() {
    return {
        controller: UnlockButtonController,
        controllerAs: "unlockButtonCtrl",
        restrict: "E",
        scope: {
            post: "="
        },
        replace: true,
        template: _unlock_button_template_html__WEBPACK_IMPORTED_MODULE_2___default.a
    };
}


/***/ }),

/***/ "SR3K":
/*!************************************************!*\
  !*** ./src/app/controllers/ProfileEditCtrl.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var ProfileEditCtrl = /** @class */ (function () {
    function ProfileEditCtrl(API_URL, $rootScope, $scope, $http, $location, scopeService, profile) {
        var _this = this;
        this.API_URL = API_URL;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$http = $http;
        this.$location = $location;
        this.scopeService = scopeService;
        this.profile = profile;
        this.updateUser = function (data) { return __awaiter(_this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.put(this.API_URL + "/user/" + this.$scope.profile.id, data)];
                    case 1:
                        res = _a.sent();
                        res = res || {};
                        if (res.status === "ok") {
                            return [2 /*return*/, res];
                        }
                        else {
                            throw res;
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        $scope.profile = profile;
        $scope.profileId = $scope.profile.id;
        $rootScope.isLoading = true;
        $scope.isSaving = false;
        $scope.clickProfilePic = function () {
            $("#uploadProfilePicModal").appendTo("body").modal("show");
        };
        $scope.submitChanges = function () { return __awaiter(_this, void 0, void 0, function () {
            var cashAddress, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        $scope.isSaving = true;
                        if (bitbox.Address.isLegacyAddress($scope.profile.addressBCH)) {
                            cashAddress = bitbox.Address.toCashAddress($scope.profile.addressBCH);
                            $scope.profile.addressBCH = cashAddress;
                        }
                        if ($scope.profile.addressSLP &&
                            $scope.profile.addressSLP.indexOf("simpleledger:") === -1) {
                            $scope.isSaving = false;
                            scopeService.safeApply($scope);
                            return [2 /*return*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()("Your SLP address is not correct!")];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.updateUser({
                                addressBCH: $scope.profile.addressBCH,
                                bio: $scope.profile.bio,
                                props: {
                                    addressSLP: $scope.profile.addressSLP,
                                    reddit: $scope.profile.reddit,
                                    twitter: $scope.profile.twitter
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1.data.code === "WRONG_BCH_ADDRESS") {
                            $scope.isSaving = false;
                            scopeService.safeApply($scope, function () { });
                            return [2 /*return*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()(err_1.data.desc)];
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        this.$location.path("/profile/" + profile.username);
                        scopeService.safeApply($scope, function () { });
                        return [2 /*return*/];
                }
            });
        }); };
    }
    ProfileEditCtrl.$inject = [
        "API_URL",
        "$rootScope",
        "$scope",
        "$http",
        "$location",
        "ScopeService",
        "profile"
    ];
    return ProfileEditCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (ProfileEditCtrl);


/***/ }),

/***/ "TNtq":
/*!******************************************!*\
  !*** ./src/core/services/PostService.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/config/index */ "u61H");
/* harmony import */ var _lib_SocialSharing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/SocialSharing */ "pX/I");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var sanitizeHtml = __webpack_require__(/*! sanitize-html */ "y48C");
var PostService = /** @class */ (function () {
    function PostService($http, $sce, API_URL) {
        var _this = this;
        this.$http = $http;
        this.$sce = $sce;
        this.API_URL = API_URL;
        this.processUnlock = function (unlock) {
            unlock.createdAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(unlock.createdAt).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
            if (unlock.userPost) {
                unlock.userPost = _this.processPost(unlock.userPost);
                unlock.userPost.unlockedAtFormatted = _this.formatDate(unlock.createdAt);
            }
            return unlock;
        };
    }
    PostService.prototype.publishPic = function (postId, params, callback) {
        this.$http.put(this.API_URL + "/post/image/publish", {
            postId: postId,
            tags: params.hashtags
        }).then(function (response) {
            callback(response.data);
        });
    };
    PostService.prototype.upvote = function (upvote) {
        return this.$http.post(this.API_URL + "/post/" + upvote.postId + "/upvote", {
            postId: upvote.postId,
            txId: upvote.txId
        });
    };
    PostService.prototype.unlock = function (unlock) {
        return this.$http.post(this.API_URL + "/post/" + unlock.postId + "/unlock", {
            postId: unlock.postId,
            txId: unlock.txId
        });
    };
    PostService.prototype.createRef = function (ref) {
        return this.$http.post(this.API_URL + "/post/" + ref.postId + "/ref", {
            extId: ref.extId,
            postId: ref.postId
        });
    };
    PostService.prototype.createPost = function (post) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.post(this.API_URL + "/post", post)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.processPost(res.data)];
                }
            });
        });
    };
    PostService.prototype.archivePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.put(this.API_URL + "/post/" + post.id + "/archive", post)];
            });
        });
    };
    PostService.prototype.displayHTML = function (html) {
        var clean = sanitizeHtml(html, {
            allowedTags: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
                "nl", "li", "b", "strong", "img", "em", "strike", "code", "hr", "br", "pre", "iframe"],
            allowedAttributes: {
                a: ["href", "name", "target"],
                // We don"t currently allow img itself by default, but this
                // would make sense if we did. You could add srcset here,
                // and if you do the URL is checked for safety
                img: ["src"],
                p: ["class"],
                iframe: ["src", "allowfullscreen"],
            },
            // Lots of these won"t come up by default because we don"t allow them
            selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
            // URL schemes we permit
            allowedSchemes: ["http", "https"],
            allowedSchemesByTag: {},
            allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
            allowProtocolRelative: true
        });
        return this.$sce.trustAsHtml(clean);
    };
    PostService.prototype.getById = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.API_URL + "/post/" + postId)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.processPost(res.data)];
                }
            });
        });
    };
    PostService.prototype.getByAlias = function (username, alias) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.API_URL + "/post/" + username + "/" + alias)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.processPost(res.data)];
                }
            });
        });
    };
    PostService.prototype.getUpvotes = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.API_URL + "/post/" + postId + "/upvotes")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    PostService.prototype.getResponses = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.API_URL + "/post/" + postId + "/responses")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data.map(function (post) { return _this.processPost(post); })];
                }
            });
        });
    };
    PostService.prototype.getUnlocks = function (postId) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.API_URL + "/post/" + postId + "/unlocks")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    PostService.prototype.getUserUnlocks = function (userId, callback) {
        var _this = this;
        this.$http.get(this.API_URL + "/posts/unlocks" + (userId ? "?userId=" + userId : ""))
            .then(function (response) {
            var unlocks = response.data.map(_this.processUnlock);
            callback(unlocks);
        });
    };
    PostService.prototype.getPosts = function (query, callback) {
        var _this = this;
        this.$http({
            method: "GET",
            params: query,
            url: this.API_URL + "/posts"
        }).then(function (response) {
            var feeds = response.data.map(_this.processPost);
            callback(feeds);
        });
    };
    PostService.prototype.formatDate = function (date) {
        return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
    };
    PostService.prototype.processPost = function (post) {
        var _this = this;
        post.createdAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(post.createdAt).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
        post.updatedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(post.updatedAt).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
        post.publishedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(post.publishedAt).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
        post.archivedAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(post.deletedAt).utc().format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
        post.shareURLs = _lib_SocialSharing__WEBPACK_IMPORTED_MODULE_2__["default"].getFeedShareURLs(post);
        if (post.userPosts) {
            post.userPosts.forEach(function (userPost) {
                userPost = _this.processPost(userPost);
            });
        }
        return post;
    };
    PostService.$inject = [
        "$http",
        "$sce",
        "API_URL"
    ];
    return PostService;
}());
/* harmony default export */ __webpack_exports__["default"] = (PostService);


/***/ }),

/***/ "TW3w":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/logout-button/logout-button.styles.less ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "VCPQ":
/*!******************************************!*\
  !*** ./src/app/controllers/PostsCtrl.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_config_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/config/toastr */ "mRKG");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var TabStatus;
(function (TabStatus) {
    TabStatus["drafts"] = "drafts";
    TabStatus["published"] = "published";
})(TabStatus || (TabStatus = {}));
var PostsCtrl = /** @class */ (function () {
    function PostsCtrl($rootScope, $scope, $timeout, postService, scopeService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.postService = postService;
        this.scopeService = scopeService;
        this.$scope.isLoading = true;
        this.$scope.isLoadingMore = false;
        this.$scope.isDeleting = false;
        this.$scope.posts = [];
        this.$scope.page = 1;
        this.$scope.limit = 20;
        this.$scope.postsAvailable = true;
        this.$scope.currentTab = TabStatus.published;
        this.$scope.deletePost = function (id) { return _this.deletePost(id); };
        this.$scope.switchTab = function (tab) { return _this.switchTab(tab); };
        this.$scope.displayPostBody = function (html) { return _this.displayPostBody(html); };
        this.$scope.loadMore = function () { return _this.loadMore(); };
        this.fetchPosts();
    }
    PostsCtrl.prototype.loadMore = function () {
        if (!this.$rootScope.activeCalls && this.$scope.postsAvailable) {
            this.$scope.page += 1;
            this.$scope.isLoadingMore = true;
            this.fetchPosts();
        }
    };
    PostsCtrl.prototype.fetchPosts = function () {
        var _this = this;
        this.$scope.isLoading = this.$scope.isLoadingMore ? false : true;
        this.postService.getPosts({
            includeResponses: false,
            orderBy: "publishedAt",
            page: this.$scope.page,
            status: "published",
            userId: this.$rootScope.user.id
        }, function (data) {
            if (!data) {
                return;
            }
            if (_this.$scope.page === 0) {
                _this.$scope.posts = data;
            }
            else {
                data.forEach(function (post) {
                    _this.$scope.posts.push(post);
                });
            }
            if (data.length < _this.$scope.limit) {
                _this.$scope.postsAvailable = false;
            }
            else {
                _this.$scope.postsAvailable = true;
            }
            _this.$scope.isLoading = _this.$scope.isLoadingMore ? false : false;
            _this.$scope.isLoadingMore = false;
            _this.scopeService.safeApply(_this.$scope, function () { });
            _this.initTippy();
        });
    };
    PostsCtrl.prototype.switchTab = function (tab) {
        this.$scope.currentTab = tab;
    };
    PostsCtrl.prototype.deletePost = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmationResult, deleteResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.$scope.isDeleting = true;
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                                title: "Are you sure?",
                                text: "Once deleted, you will not be able to recover this post!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                            })];
                    case 1:
                        confirmationResult = _a.sent();
                        if (!confirmationResult) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.postService.deletePost(id)];
                    case 2:
                        deleteResult = _a.sent();
                        if (deleteResult.status === 200) {
                            this.$scope.posts = this.$scope.posts.filter(function (f) { return f.id !== id; });
                            _core_config_toastr__WEBPACK_IMPORTED_MODULE_3__["default"].success("Your post has been deleted");
                        }
                        else {
                            _core_config_toastr__WEBPACK_IMPORTED_MODULE_3__["default"].error("There was an error while deleting your post");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _core_config_toastr__WEBPACK_IMPORTED_MODULE_3__["default"].info("Your post has not been deleted");
                        _a.label = 4;
                    case 4:
                        this.$scope.isDeleting = false;
                        this.scopeService.safeApply(this.$scope);
                        return [2 /*return*/];
                }
            });
        });
    };
    PostsCtrl.prototype.displayPostBody = function (html) {
        if (html.length > 400) {
            html = html.substring(0, 400) + "...";
        }
        return this.postService.displayHTML(html);
    };
    PostsCtrl.prototype.initTippy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //Timeout is somehow required
                this.$timeout(function () {
                    Object(tippy_js__WEBPACK_IMPORTED_MODULE_1__["default"])('.hc-tooltip');
                });
                return [2 /*return*/];
            });
        });
    };
    PostsCtrl.$inject = [
        "$rootScope", "$scope", "$timeout", "PostService", "ScopeService"
    ];
    return PostsCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (PostsCtrl);


/***/ }),

/***/ "VITZ":
/*!********************************!*\
  !*** ./src/app/stateConfig.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return state; });
var redirectIfNotLoggedIn = [
    "$rootScope",
    function ($rootScope) {
        if (!$rootScope.user || ($rootScope.user && !$rootScope.user.id)) {
            location.href = "/login";
        }
    }
];
var getFeedState = function (url) {
    return {
        url: url,
        templateUrl: "/templates/feeds.html",
        controller: "feedsController"
    };
};
function state($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state("wallet", {
        abstract: true,
        controller: "mainController",
        templateUrl: "/templates/layout.html"
    })
        .state("wallet.create", {
        controller: "walletController",
        url: "/wallet",
        templateUrl: "/templates/wallet.html",
        resolve: {
            isLoggedIn: redirectIfNotLoggedIn
        }
    });
    $stateProvider
        .state("vicigo", {
        abstract: true,
        controller: "mainController",
        templateUrl: "/templates/layout.html"
    })
        /**
         * START OF Feeds
         */
        .state("vicigo.feeds", getFeedState("/"))
        .state("vicigo.feedsNew", getFeedState("/{feedType:new|top}"))
        .state("vicigo.feedsNewScoped", getFeedState("/{feedType:new|top}?feedScope={last-month|all-time}"))
        .state("vicigo.hashtag", getFeedState("/hashtag/:hashtag?feedScope={all-time}"))
        .state("vicigo.hashtagFeed", getFeedState("/hashtag/:hashtag/{feedType:new|top}?feedScope={all-time}"))
        /**
         * END OF Feeds
         */
        .state("vicigo.notifs", {
        url: "/notifs",
        templateUrl: "/templates/notifs.html",
        controller: "notifsCtrl",
        controllerAs: "notifsCtrl",
        resolve: {
            isLoggedIn: redirectIfNotLoggedIn
        }
    })
        .state("vicigo.posts", {
        url: "/posts",
        templateUrl: "/templates/posts.html",
        controller: "postsCtrl",
        resolve: {
            isLoggedIn: redirectIfNotLoggedIn
        }
    })
        .state("vicigo.drafts", {
        url: "/drafts/",
        templateUrl: "/templates/drafts.html",
        controller: "draftsController",
        resolve: {
            isLoggedIn: redirectIfNotLoggedIn
        }
    })
        .state("vicigo.profile", {
        url: "/profile/:profileId",
        templateUrl: "/templates/profile.html",
        controller: "profileController",
        controllerAs: "profileCtrl",
        resolve: {
            profile: [
                "$stateParams",
                "$q",
                "ProfileService",
                function ($stateParams, $q, ProfileService) {
                    var defer = $q.defer();
                    ProfileService.fetchProfile($stateParams.profileId, function (rProfile) {
                        defer.resolve(rProfile);
                    });
                    return defer.promise;
                }
            ]
        }
    })
        .state("vicigo.profileEdit", {
        url: "/profile/:profileId/edit",
        templateUrl: "/templates/profile-edit.html",
        controller: "profileEditController",
        requireLogin: true,
        resolve: {
            profile: [
                "$stateParams",
                "$q",
                "ProfileService",
                function ($stateParams, $q, ProfileService) {
                    var defer = $q.defer();
                    ProfileService.fetchProfile($stateParams.profileId, function (rProfile) {
                        defer.resolve(rProfile);
                    });
                    return defer.promise;
                }
            ],
            isLoggedIn: redirectIfNotLoggedIn
        }
    })
        .state("vicigo.post", {
        url: "/:username/:alias",
        templateUrl: "/templates/post.html",
        controller: "postController",
        controllerAs: "postCtrl"
    })
        .state("vicigo.postById", {
        url: "/post/:postId",
        templateUrl: "/templates/post.html",
        controller: "postController",
        controllerAs: "postCtrl"
    })
        .state("vicigo.postByAlias", {
        url: "/post/:username/:alias",
        templateUrl: "/templates/post.html",
        controller: "postController",
        controllerAs: "postCtrl"
    });
}


/***/ }),

/***/ "VLQ9":
/*!*********************************************************************!*\
  !*** ./src/app/components/upvote-button/upvote-button.component.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return upvoteButton; });
/* harmony import */ var _upvote_button_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./upvote-button.styles.less */ "jp1E");
/* harmony import */ var _upvote_button_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_upvote_button_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _upvote_button_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./upvote-button.template.html */ "lX8D");
/* harmony import */ var _upvote_button_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_upvote_button_template_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/lib/simpleWalletProvider */ "jAkR");
/* harmony import */ var _core_lib_upvoteDistribution__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../core/lib/upvoteDistribution */ "qXJ/");
/* harmony import */ var _core_lib_upvoteDistribution__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_core_lib_upvoteDistribution__WEBPACK_IMPORTED_MODULE_3__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var defaultOptions = {
    amount: 0.002,
    isDisabled: false,
    isUpvoting: false,
    loadingText: 'Upvoting...',
    text: 'Upvote'
};
var UpvoteButtonController = /** @class */ (function () {
    function UpvoteButtonController($rootScope, $scope, $window, postService, walletService, scopeService) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$window = $window;
        this.postService = postService;
        this.walletService = walletService;
        this.scopeService = scopeService;
        this.satoshiToBch = function (amountSat) {
            return (amountSat / 100000000).toFixed(5);
        };
        this.ngOnInit();
    }
    UpvoteButtonController.prototype.ngOnInit = function () {
        var _this = this;
        this.amount = angular.isDefined(this.amount)
            ? this.amount
            : defaultOptions.amount;
        this.text = angular.isDefined(this.text) ? this.text : defaultOptions.text;
        this.loadingText = angular.isDefined(this.loadingText)
            ? this.loadingText
            : defaultOptions.loadingText;
        this.post = this.$scope.post;
        this.isUpvoting = defaultOptions.isUpvoting;
        this.isDisabled = !this.$rootScope.user || this.post.userId === this.$rootScope.user.id;
        this.$window.onbeforeunload = function (event) {
            if (_this.isUpvoting) {
                event.preventDefault();
                return 'There is a pending upvote in process. Are you sure you want to leave?';
            }
        };
    };
    UpvoteButtonController.prototype.onClick = function (e) {
        if (this.isUpvoting || this.isDisabled) {
            e.stopPropagation();
            return;
        }
        this.upvote();
    };
    /**
     * Splits an upvote amount between previous upvotes and saves the upvote reference in Honest database
     */
    UpvoteButtonController.prototype.upvote = function () {
        return __awaiter(this, void 0, void 0, function () {
            var postId, simpleWallet, tx, upvotes, err_1, receivers, distributionInfoEl, _i, receivers_1, receiver, el, userHtml, err_2, addressContainer, legacyAddressContainer, qrContainer, url, anchorEl, _a, bch, usd;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.$rootScope.user) {
                            return [2 /*return*/, (location.href = '/signup')];
                        }
                        if (!this.post.user.addressBCH) {
                            toastr.error('Upvoting is not possible because the author does not have a Bitcoin address to receive');
                            return [2 /*return*/];
                        }
                        postId = this.post.id;
                        if (this.post.userId == this.$rootScope.user.id) {
                            toastr.error('Upvoting is not possible because you cannot tip your own posts and responses');
                            return [2 /*return*/];
                        }
                        simpleWallet = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__["get"]();
                        this.isUpvoting = true;
                        this.scopeService.safeApply(this.$scope, function () { });
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.postService.getUpvotes(postId)];
                    case 2:
                        upvotes = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        toastr.error("Can't connect.");
                        return [2 /*return*/, console.error(err_1)];
                    case 4:
                        receivers = _core_lib_upvoteDistribution__WEBPACK_IMPORTED_MODULE_3__["determineUpvoteRewards"](upvotes, this.post.user);
                        toastr.info('Upvoting...');
                        distributionInfoEl = document.getElementById('distribution-info');
                        distributionInfoEl.innerHTML = '';
                        for (_i = 0, receivers_1 = receivers; _i < receivers_1.length; _i++) {
                            receiver = receivers_1[_i];
                            el = document.createElement('div');
                            userHtml = void 0;
                            if (receiver.user) {
                                userHtml = "<a target=\"_self\" href=\"/profile/" + receiver.user.username + "\"><img style=\"border-radius:50%; width: 23px;\" src=\"" + (receiver.user.imageUrl ? receiver.user.imageUrl : '/img/avatar.png') + "\" /> " + receiver.user.username + "</a> " + (this.post.userId === receiver.user.id ? '(Author)' : '');
                            }
                            else {
                                userHtml = "<img style=\"width: 23px;\" src=\"/img/avatar.png\" /> Anonymous";
                            }
                            el.innerHTML = this.satoshiToBch(receiver.amountSat) + " BCH -> " + userHtml;
                            distributionInfoEl.appendChild(el);
                        }
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        receivers.push({
                            opReturn: ['0x4801', postId.toString()]
                        });
                        return [4 /*yield*/, simpleWallet.send(receivers)];
                    case 6:
                        tx = _b.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        err_2 = _b.sent();
                        if (err_2.message && err_2.message.indexOf('Insufficient') > -1) {
                            addressContainer = document.getElementById('load-wallet-modal-address');
                            legacyAddressContainer = document.getElementById('load-wallet-modal-legacy-address');
                            qrContainer = document.getElementById('load-wallet-modal-qr');
                            addressContainer.value = simpleWallet.cashAddress;
                            legacyAddressContainer.value = simpleWallet.legacyAddress;
                            qrContainer.innerHTML = '';
                            new QRCode(qrContainer, simpleWallet.cashAddress);
                            // replace with sweetalert
                            $('#loadWalletModal').modal('show');
                            this.isUpvoting = false;
                            this.scopeService.safeApply(this.$scope, function () { });
                            return [2 /*return*/, toastr.warning('Insufficient balance on your BCH account.')];
                        }
                        if (err_2.message && err_2.message.indexOf('has no matching Script') > -1) {
                            this.isUpvoting = false;
                            this.scopeService.safeApply(this.$scope, function () { });
                            return [2 /*return*/, toastr.warning('Could not find an unspent bitcoin that is big enough')];
                        }
                        console.error(err_2);
                        this.isUpvoting = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        return [2 /*return*/, toastr.warning('Error. Try again later.')];
                    case 8:
                        $('#tipSuccessModal').modal('show');
                        url = "https://explorer.bitcoin.com/bch/tx/" + tx.txid;
                        anchorEl = document.getElementById('bchTippingTransactionUrl');
                        console.log("Upvote transaction: " + url);
                        anchorEl.innerHTML = "Receipt: " + tx.txid.substring(0, 9) + "...";
                        anchorEl.href = url;
                        this.postService.upvote({
                            postId: postId,
                            txId: tx.txid
                        });
                        return [4 /*yield*/, this.walletService.getAddressBalances()];
                    case 9:
                        _a = _b.sent(), bch = _a.bch, usd = _a.usd;
                        this.$rootScope.walletBalance = {
                            bch: bch,
                            usd: usd,
                            isLoading: false
                        };
                        this.isUpvoting = false;
                        this.scopeService.safeApply(this.$scope, function () { });
                        return [2 /*return*/];
                }
            });
        });
    };
    UpvoteButtonController.$inject = [
        '$rootScope',
        '$scope',
        '$window',
        'PostService',
        'WalletService',
        'ScopeService',
    ];
    return UpvoteButtonController;
}());
function upvoteButton() {
    return {
        controller: UpvoteButtonController,
        controllerAs: 'upvoteButtonCtrl',
        restrict: 'E',
        scope: {
            amount: '=?',
            loadingText: '=?',
            text: '=?',
            post: '='
        },
        replace: true,
        template: _upvote_button_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "WPZs":
/*!********************************!*\
  !*** ./src/auth/AuthModule.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AuthService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AuthService */ "vzRO");

angular.module("vqAuth", [])
    .constant("API_URL", "localhost:3010")
    .factory("AuthInterceptor", ["$rootScope", "$q", function ($rootScope, $q) {
        if ($rootScope.activeCalls === undefined) {
            $rootScope.activeCalls = 0;
        }
        return {
            request: function (config) {
                $rootScope.activeCalls += 1;
                return config;
            },
            requestError: function (rejection) {
                $rootScope.activeCalls -= 1;
                return $q.reject(rejection);
            },
            response: function (response) {
                $rootScope.activeCalls -= 1;
                return response;
            },
            responseError: function (response) {
                $rootScope.activeCalls -= 1;
                if (response.status == 401) {
                    $rootScope.$broadcast("notAuthenticated");
                }
                return $q.reject(response);
            },
        };
    }])
    .constant("API", {
    LOGIN: "/login",
    SIGNUP: "/signup/email",
    VALIDATE: "/me",
    LOGOUT: "/logout",
    RESET: "/auth/request-password-reset",
    CHANGE_PASSWORD: "/auth/reset-password",
    SET_PASSWORD: "/auth/change-password",
    SET_WALLET: "/auth/set-wallet",
    PASSWORD_CHECK: "/auth/password-check",
    GET_EMAILS: "/auth/emails",
})
    .factory("apiFactory", ["API_URL", "API", function (API_URL, API) {
        return function (method) {
            return API_URL + API[method];
        };
    }])
    .service("AuthService", ["$window", "$http", "$q", "apiFactory", _AuthService__WEBPACK_IMPORTED_MODULE_0__["AuthService"]])
    .run(["AuthService", function (authService) {
        authService.loadUserCredentials();
    }]);


/***/ }),

/***/ "Wxcs":
/*!*********************************!*\
  !*** ./src/app/styles/feed.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/less-loader/dist/cjs.js!./feed.css */ "05KQ");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "XDL3":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/upvote-button/upvote-button.styles.less ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".btn-bch-upvote-container {\n  cursor: pointer;\n  position: relative;\n  width: 130px;\n}\n.btn-bch-upvote-container > button {\n  position: absolute;\n  left: 0;\n  padding: 2px 5px 2px 20px;\n  line-height: 20px;\n  z-index: 0;\n  height: 30px;\n  outline: none !important;\n  box-shadow: none !important;\n  min-width: 115px;\n  width: 115px;\n  max-width: 115px;\n  margin-left: 12px;\n  float: left;\n  overflow: hidden;\n}\n.btn-bch-upvote-container > .bch-icon {\n  width: 30px;\n  height: 30px;\n  left: 1px;\n  position: absolute;\n  z-index: 10;\n}\n.btn-bch-upvote-container > button > .bch-upvote-button-loading {\n  display: none;\n}\n.btn-bch-upvote-container.active > button > .bch-upvote-button-loading {\n  display: inline-block;\n}\n.btn-bch-upvote-container.active > button > .bch-upvote-button-text,\n.btn-bch-upvote-container.active > button > .bch-upvote-button-amount {\n  display: none;\n}\n.btn-bch-upvote-container > button > .bch-upvote-button-text,\n.btn-bch-upvote-container > button > .bch-upvote-button-amount {\n  position: absolute;\n  top: 4px;\n  left: 0;\n  margin-left: 28px;\n  width: 68px;\n  padding-left: 4px;\n  padding-right: 4px;\n  transition: all 0.3s ease-in-out;\n}\n.btn-bch-upvote-container > button > .bch-upvote-button-amount,\n.btn-bch-upvote-container > button > .bch-upvote-button-text,\n.btn-bch-upvote-container > button > .bch-upvote-button-loading {\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.btn-bch-upvote-container > button > .bch-upvote-button-amount {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n.btn-bch-upvote-container > button > .bch-upvote-button-text {\n  opacity: 0;\n  transform: translate(100%, 0);\n}\n.btn-bch-upvote-container:hover > button > .bch-upvote-button-amount {\n  opacity: 0;\n  transform: translate(100%, 0);\n}\n.btn-bch-upvote-container:hover > button > .bch-upvote-button-text {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n.btn-bch-upvote-container.active > .bch-icon,\n.btn-bch-upvote-container.active > .bch-icon-loading,\n.btn-bch-upvote-container.disabled > .bch-icon,\n.btn-bch-upvote-container.disabled > .bch-icon-loading {\n  cursor: not-allowed;\n}\n.btn-bch-upvote-container.disabled > .btn-bch-upvote {\n  opacity: 0.65;\n}\n.btn-bch-upvote-container.active > .bch-icon-loading {\n  display: initial;\n}\n.bch-icon-loading {\n  display: none;\n  background-color: rgba(0, 0, 0, 0);\n  opacity: 0.9;\n  border-left: 2px solid rgba(0, 0, 0, 0) !important;\n  border-right: 2px solid rgba(0, 0, 0, 0) !important;\n  border-radius: 50px;\n  width: 30px;\n  z-index: 11;\n  height: 30px;\n  position: absolute;\n  left: 1px;\n  -moz-animation: spinoffPulse 1s infinite linear;\n  -webkit-animation: spinoffPulse 1s infinite linear;\n  animation: spinoffPulse 1s infinite linear;\n}\n.btn-bch-upvote-container > button {\n  background: #f7941d;\n  color: #ffffff !important;\n}\n.btn-bch-upvote-container:hover,\n.btn-bch-upvote-container > button:hover {\n  color: #ffffff !important;\n}\n.bch-icon-loading {\n  border: 2px solid #f7941d;\n}\n@-moz-keyframes spinPulse {\n  0% {\n    -moz-transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    -moz-transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    -moz-transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@-moz-keyframes spinoffPulse {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(360deg);\n  }\n}\n@-webkit-keyframes spinPulse {\n  0% {\n    -webkit-transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    -webkit-transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes spinoffPulse {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes spinPulse {\n  0% {\n    transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@keyframes spinoffPulse {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.bch-icon-outer-ring-color {\n  fill: #fafafa;\n}\n/* container background color */\n.bch-icon-inner-ring-color {\n  fill: #f7941d;\n}\n.bch-icon-color {\n  fill: #ffffff;\n}\n", ""]);

// exports


/***/ }),

/***/ "XbWe":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/style.css */ "hZLO");
/* harmony import */ var _core_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_layout_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/layout.css */ "k+s8");
/* harmony import */ var _core_layout_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_layout_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_profile_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/profile.css */ "uWhn");
/* harmony import */ var _styles_profile_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_profile_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _styles_post_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/post.css */ "D+dt");
/* harmony import */ var _styles_post_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_post_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _styles_feed_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/feed.css */ "Wxcs");
/* harmony import */ var _styles_feed_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_feed_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angular-ui-router */ "VZTK");
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(angular_ui_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ng_infinite_scroll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-infinite-scroll */ "XhL2");
/* harmony import */ var ng_infinite_scroll__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(ng_infinite_scroll__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _controllers_ProfileCtrl__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./controllers/ProfileCtrl */ "bGNS");
/* harmony import */ var _controllers_ProfileEditCtrl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./controllers/ProfileEditCtrl */ "SR3K");
/* harmony import */ var _controllers_FeedsCtrl__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./controllers/FeedsCtrl */ "871o");
/* harmony import */ var _controllers_PostsCtrl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./controllers/PostsCtrl */ "VCPQ");
/* harmony import */ var _controllers_DraftsCtrl__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./controllers/DraftsCtrl */ "facu");
/* harmony import */ var _controllers_NotifsCtrl__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./controllers/NotifsCtrl */ "Lv8m");
/* harmony import */ var _core_config_routing__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../core/config/routing */ "leVX");
/* harmony import */ var _core_config_http__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/config/http */ "hpYq");
/* harmony import */ var _stateConfig__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./stateConfig */ "VITZ");
/* harmony import */ var _controllers_PostCtrl__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./controllers/PostCtrl */ "03IP");
/* harmony import */ var _controllers_WalletCtrl__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./controllers/WalletCtrl */ "DUyY");
/* harmony import */ var _core_controllers_MainCtrl__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../core/controllers/MainCtrl */ "HXUB");
/* harmony import */ var _core_runs_runs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../core/runs/runs */ "ftlO");
/* harmony import */ var _auth_AuthModule__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../auth/AuthModule */ "WPZs");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../core/config */ "u61H");
/* harmony import */ var _core_services__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../core/services */ "GYqh");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components */ "APha");
/* harmony import */ var _core_config_toastr__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../core/config/toastr */ "mRKG");





// import angular from 'angular';




















angular.module("hashtag-app", [
    angular_ui_router__WEBPACK_IMPORTED_MODULE_5___default.a,
    'ui.bootstrap',
    ng_infinite_scroll__WEBPACK_IMPORTED_MODULE_6___default.a,
    "dcbImgFallback",
    'ngDialog',
    "angular.lazyimg",
    "vqAuth",
    "vqServices",
    "vqDirectives"
])
    .config(["$locationProvider", "$urlMatcherFactoryProvider", _core_config_routing__WEBPACK_IMPORTED_MODULE_13__["default"]])
    .config(["$httpProvider", _core_config_http__WEBPACK_IMPORTED_MODULE_14__["default"]])
    .config(["$stateProvider", "$urlRouterProvider", _stateConfig__WEBPACK_IMPORTED_MODULE_15__["default"]])
    .controller("appController", [
    "$scope",
    "AuthService",
    function ($scope, AuthService) {
        $scope.AUTH_TOKEN = AuthService.getAuthToken();
    }
])
    .controller("walletController", _controllers_WalletCtrl__WEBPACK_IMPORTED_MODULE_17__["default"])
    .controller("mainController", _core_controllers_MainCtrl__WEBPACK_IMPORTED_MODULE_18__["default"])
    .controller("postController", _controllers_PostCtrl__WEBPACK_IMPORTED_MODULE_16__["default"])
    .controller("profileController", _controllers_ProfileCtrl__WEBPACK_IMPORTED_MODULE_7__["default"])
    .controller("profileEditController", _controllers_ProfileEditCtrl__WEBPACK_IMPORTED_MODULE_8__["default"])
    .controller("feedsController", _controllers_FeedsCtrl__WEBPACK_IMPORTED_MODULE_9__["default"])
    .controller("draftsController", _controllers_DraftsCtrl__WEBPACK_IMPORTED_MODULE_11__["default"])
    .controller("postsCtrl", _controllers_PostsCtrl__WEBPACK_IMPORTED_MODULE_10__["default"])
    .controller("notifsCtrl", _controllers_NotifsCtrl__WEBPACK_IMPORTED_MODULE_12__["default"])
    .run(["$rootScope", _core_runs_runs__WEBPACK_IMPORTED_MODULE_19__["initBCHWallet"]])
    .run(["$rootScope", "$state", "AuthService", _core_runs_runs__WEBPACK_IMPORTED_MODULE_19__["onStateChange"]])
    .run(["API_URL", "AuthService", _core_runs_runs__WEBPACK_IMPORTED_MODULE_19__["initProfileUpload"]]);


/***/ }),

/***/ "YOmQ":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/social-share-buttons/social-share-buttons.styles.less ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "ZQz6":
/*!**********************************************************************************!*\
  !*** ./src/app/components/social-share-buttons/social-share-buttons.styles.less ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./social-share-buttons.styles.less */ "YOmQ");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "b3j/":
/*!*******************************************!*\
  !*** ./src/core/services/ScopeService.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ScopeService = /** @class */ (function () {
    function ScopeService() {
    }
    ScopeService.prototype.safeApply = function ($scope, fn) {
        var phase = $scope.$root.$$phase;
        if (phase === "$apply" || phase === "$digest") {
            if (fn && typeof fn === "function") {
                fn();
            }
        }
        else {
            $scope.$apply(fn);
        }
    };
    return ScopeService;
}());
/* harmony default export */ __webpack_exports__["default"] = (ScopeService);


/***/ }),

/***/ "bGNS":
/*!********************************************!*\
  !*** ./src/app/controllers/ProfileCtrl.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var ProfileCtrl = /** @class */ (function () {
    function ProfileCtrl($rootScope, $state, $scope, $location, feedService, RelsService, postService, scopeService, profile) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.$scope = $scope;
        this.$location = $location;
        this.feedService = feedService;
        this.RelsService = RelsService;
        this.postService = postService;
        this.scopeService = scopeService;
        this.profile = profile;
        this.profileId = this.profile.id;
        this.page = 1;
        this.feeds = [];
        this.postsAll = [];
        this.followGuys = [];
        this.showProfileTab = "feeds";
        this.limit = 10;
        this.postsAvailable = true;
        this.isLoading = true;
        this.followsProfileAlready = false;
        this.showFollowers = function (tab) {
            _this.followGuys = [];
            _this.showProfileTab = "followers";
            _this.RelsService.showFollowers(_this.profile.id, function (rFollowers) {
                _this.followGuys = rFollowers;
            });
        };
        this.showFollowing = function (tab) {
            _this.followGuys = [];
            _this.showProfileTab = "following";
            _this.RelsService.showFollowing(_this.profile.id, function (rFollowing) {
                _this.followGuys = rFollowing;
            });
        };
        this.fetchFeeds({});
    }
    ProfileCtrl.prototype.fetchFeeds = function (params) {
        var _this = this;
        this.isLoading = true;
        params = params ? params : {};
        this.showProfileTab = "feeds";
        this.postService.getPosts({
            includeResponses: true,
            status: "published",
            orderBy: "publishedAt",
            page: params.page ? params.page : this.page,
            userId: this.profile.id
        }, function (data) {
            if (!data) {
                return;
            }
            if (params.page === 0) {
                _this.postsAll = data;
            }
            else {
                data.forEach(function (feed) {
                    _this.postsAll.push(feed);
                });
            }
            if (data.length < _this.limit) {
                _this.postsAvailable = false;
            }
            else {
                _this.postsAvailable = true;
            }
            _this.isLoading = false;
            _this.feeds = _this.postsAll.filter(function (_) { return _this.showProfileTab === "feeds" ? !_.parentPostId : _.parentPostId; });
        });
    };
    ProfileCtrl.prototype.showFeeds = function (tab) {
        this.showProfileTab = "feeds";
        this.feeds = this.postsAll.filter(function (_) { return !_.parentPostId; });
        this.scopeService.safeApply(this.$scope, function () { });
    };
    ProfileCtrl.prototype.showResponses = function () {
        this.showProfileTab = "responses";
        this.feeds = this.postsAll.filter(function (_) { return _.parentPostId; });
        this.scopeService.safeApply(this.$scope, function () { });
    };
    ProfileCtrl.prototype.loadMore = function () {
        console.log("load more triggerred");
        if (!this.$rootScope.activeCalls && this.postsAvailable) {
            this.page = this.page + 1;
            this.fetchFeeds({
                page: this.page
            });
        }
    };
    ProfileCtrl.$inject = [
        "$rootScope",
        "$state",
        "$scope",
        "$location",
        "FeedService",
        "RelsService",
        "PostService",
        "ScopeService",
        "profile"
    ];
    return ProfileCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (ProfileCtrl);


/***/ }),

/***/ "ceco":
/*!**********************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/core/layout.css ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "dls5":
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/follow-unfollow-button/follow-unfollow-button.styles.less ***!
  \*******************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ "dzz+":
/*!***************************************************************************************!*\
  !*** ./src/app/components/follow-unfollow-button/follow-unfollow-button.component.ts ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return followUnfollowButton; });
/* harmony import */ var _follow_unfollow_button_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./follow-unfollow-button.styles.less */ "CFzL");
/* harmony import */ var _follow_unfollow_button_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_follow_unfollow_button_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _follow_unfollow_button_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./follow-unfollow-button.template.html */ "iBdM");
/* harmony import */ var _follow_unfollow_button_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_follow_unfollow_button_template_html__WEBPACK_IMPORTED_MODULE_1__);


var defaultOptions = {
    showFollow: false,
    showUnfollow: false,
};
var FollowUnfollowButtonController = /** @class */ (function () {
    function FollowUnfollowButtonController($rootScope, $scope, RelsService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.RelsService = RelsService;
        this.follow = function () {
            _this.user.alreadyFollowing = !_this.user.alreadyFollowing;
            _this.RelsService.followProfile(_this.user.id);
        };
        this.unfollow = function () {
            if (_this.user) {
                _this.user.alreadyFollowing = false;
            }
            _this.RelsService.unfollowProfile(_this.user.id);
        };
        this.ngOnInit();
    }
    FollowUnfollowButtonController.prototype.ngOnInit = function () {
        this.user = this.$scope.user;
        this.showUnfollow = angular.isDefined(this.$scope.showUnfollow)
            ? this.$scope.showUnfollow : defaultOptions.showUnfollow;
        this.showFollow = angular.isDefined(this.$scope.showFollow)
            ? this.$scope.showFollow
            : !this.$scope.showUnfollow ? true : defaultOptions.showFollow;
        this.isVisible = this.$rootScope.user && this.$rootScope.user.id !== undefined && this.user.id !== this.$rootScope.user.id;
    };
    FollowUnfollowButtonController.prototype.onClick = function (action) {
        switch (action) {
            case "follow":
                this.follow();
                break;
            case "unfollow":
                this.unfollow();
                break;
            default:
                break;
        }
    };
    FollowUnfollowButtonController.$inject = [
        '$rootScope',
        '$scope',
        'RelsService',
    ];
    return FollowUnfollowButtonController;
}());
function followUnfollowButton() {
    return {
        controller: FollowUnfollowButtonController,
        controllerAs: 'followUnfollowButtonCtrl',
        restrict: 'E',
        scope: {
            "showFollow": "=",
            "showUnfollow": "=",
            "user": "=",
        },
        template: _follow_unfollow_button_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "eE5U":
/*!********************************************************************************************!*\
  !*** ./src/app/components/bottom-call-to-action-bar/bottom-call-to-action-bar.styles.less ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./bottom-call-to-action-bar.styles.less */ "mraJ");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "fFqy":
/*!******************************************************************************************************!*\
  !*** ./src/app/components/simple-ledger-protocol-details/simple-ledger-protocol-details.styles.less ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./simple-ledger-protocol-details.styles.less */ "ufS9");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "facu":
/*!*******************************************!*\
  !*** ./src/app/controllers/DraftsCtrl.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var DraftsCtrl = /** @class */ (function () {
    function DraftsCtrl($scope, $http) {
        $scope.drafts = [];
        $http.get("/api/drafts").then(function (response) {
            $scope.drafts = response.data;
        });
    }
    return DraftsCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (DraftsCtrl);
DraftsCtrl.$inject = ["$scope", "$http"];


/***/ }),

/***/ "ftlO":
/*!*******************************!*\
  !*** ./src/core/runs/runs.ts ***!
  \*******************************/
/*! exports provided: onStateChange, initProfileUpload, initBCHWallet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onStateChange", function() { return onStateChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initProfileUpload", function() { return initProfileUpload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBCHWallet", function() { return initBCHWallet; });
/* harmony import */ var _lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/simpleWalletProvider */ "jAkR");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var onStateChange = function ($rootScope, $state, AuthService) {
    var _this = this;
    $rootScope.$on("$stateChangeStart", function (event, next, nextParams, fromState) { return __awaiter(_this, void 0, void 0, function () {
        var response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (next.name === "starter.welcome") {
                        $rootScope.welcome = true;
                    }
                    else {
                        $rootScope.welcome = false;
                    }
                    if (next.name.indexOf("starter.") > -1) {
                        $rootScope.noHeader = true;
                    }
                    else {
                        $rootScope.noHeader = false;
                    }
                    if (!!$rootScope.user) return [3 /*break*/, 2];
                    AuthService.loadUserCredentials();
                    if (AuthService.getUserId()) {
                        $rootScope.user = {
                            id: AuthService.getUserId()
                        };
                    }
                    else {
                        if (location.pathname === "/") {
                            location.href = "/signup";
                        }
                    }
                    return [4 /*yield*/, AuthService.validate()];
                case 1:
                    response = _a.sent();
                    user = response.data;
                    $rootScope.user = user || null;
                    if (!user && location.pathname === "/") {
                        return [2 /*return*/, location.href = "/signup"];
                    }
                    if (user.status !== "11" && user.status !== "10" && location.pathname === "/") {
                        return [2 /*return*/, location.href = "/thank-you"];
                    }
                    _a.label = 2;
                case 2:
                    if (next.name === "vicigo.profileEdit") {
                        if (!$rootScope.user || $rootScope.user.username !== nextParams.profileId) {
                            location.href = "/profile/" + nextParams.profileId;
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
var initProfileUpload = function (API_URL, AuthService) {
    var _this = this;
    var changeProgress = function (progress) {
        document.getElementById("imageUploadProgressBar").setAttribute("aria-valuenow", progress);
        document.getElementById("imageUploadProgressBar").style.width = progress + "%";
    };
    new Dropzone("#profilePicDropzone", {
        paramName: "files[]",
        url: API_URL + "/upload/image?isProfileAvatar=true",
        maxFiles: 10,
        maxfilesexceeded: function (file) {
            _this.removeAllFiles();
            _this.addFile(file);
        },
        thumbnailWidth: null
    })
        .on("addedfile", function () {
        $("#profilePicDropzone").addClass("hidden");
    })
        .on("sending", function (_, xhr) {
        changeProgress(0);
        xhr.setRequestHeader("X-Auth-Token", AuthService.getAuthToken());
        $("#imageUploadProgress").removeClass("hidden");
    })
        .on("uploadprogress", function (_, progress) {
        changeProgress(progress);
    })
        .on("success", function (_, response) {
        changeProgress(100);
        document.getElementById("profilePic").src = response.files[0].url;
        $("#imageUploadProgress").addClass("hidden");
        $("#profilePicDropzone").removeClass("hidden");
        $("#uploadProfilePicModal").modal("hide");
    });
};
var initBCHWallet = function ($rootScope) {
    $rootScope.simpleWallet = _lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_0__["loadWallet"]();
};


/***/ }),

/***/ "gbrI":
/*!*********************************************************************!*\
  !*** ./src/app/components/logout-button/logout-button.component.ts ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return logoutButton; });
/* harmony import */ var _logout_button_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logout-button.styles.less */ "xq3S");
/* harmony import */ var _logout_button_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_logout_button_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logout_button_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logout-button.template.html */ "FQmk");
/* harmony import */ var _logout_button_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_logout_button_template_html__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../core/lib/simpleWalletProvider */ "jAkR");



var LogoutButtonController = /** @class */ (function () {
    function LogoutButtonController($rootScope, $state, AuthService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.AuthService = AuthService;
        this.logout = function () {
            AuthService.logout();
            _this.$rootScope.user = undefined;
            _this.$rootScope.simpleWallet = null;
            _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__["clean"]();
            window.location.href = '/login';
        };
        this.ngOnInit();
    }
    LogoutButtonController.prototype.ngOnInit = function () { };
    LogoutButtonController.prototype.onClick = function () {
        this.logout();
    };
    LogoutButtonController.$inject = [
        '$rootScope',
        '$state',
        'AuthService',
    ];
    return LogoutButtonController;
}());
function logoutButton() {
    return {
        controller: LogoutButtonController,
        controllerAs: 'logoutButtonCtrl',
        restrict: 'E',
        replace: true,
        template: _logout_button_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "hHIT":
/*!*******************************************!*\
  !*** ./src/core/services/NotifService.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "wd/R");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/config/index */ "u61H");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var NotifService = /** @class */ (function () {
    function NotifService($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    NotifService.prototype.markAsRead = function (notif) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http({
                            method: "PUT",
                            url: this.API_URL + ("/notifications/" + notif.id + "/read")
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotifService.prototype.getNotifs = function (params) {
        return __awaiter(this, void 0, Promise, function () {
            var res, notifs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http({
                            method: "GET",
                            params: params,
                            url: this.API_URL + "/notifications"
                        })];
                    case 1:
                        res = _a.sent();
                        notifs = res.data;
                        notifs.forEach(function (notif) {
                            notif.createdAtFormatted = moment__WEBPACK_IMPORTED_MODULE_0___default()(notif.createdAt).format(_core_config_index__WEBPACK_IMPORTED_MODULE_1__["dateFormat"]);
                        });
                        return [2 /*return*/, notifs];
                }
            });
        });
    };
    NotifService.$inject = [
        "$http",
        "API_URL"
    ];
    return NotifService;
}());
/* harmony default export */ __webpack_exports__["default"] = (NotifService);


/***/ }),

/***/ "hZLO":
/*!****************************!*\
  !*** ./src/core/style.css ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/less-loader/dist/cjs.js!./style.css */ "8XhY");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "hpYq":
/*!*********************************!*\
  !*** ./src/core/config/http.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return http; });
function http($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.interceptors.push('AuthInterceptor');
}
;


/***/ }),

/***/ "iBdM":
/*!****************************************************************************************!*\
  !*** ./src/app/components/follow-unfollow-button/follow-unfollow-button.template.html ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button\n  ng-if=\"!followUnfollowButtonCtrl.user.alreadyFollowing && followUnfollowButtonCtrl.showFollow && followUnfollowButtonCtrl.isVisible\"\n  ng-click=\"followUnfollowButtonCtrl.onClick('follow');\"\n  class=\"btn btn-xs btn-default\"\n>\n  Follow\n</button>\n<button\n  ng-if=\"followUnfollowButtonCtrl.user.alreadyFollowing && followUnfollowButtonCtrl.showUnfollow && followUnfollowButtonCtrl.isVisible\"\n  ng-click=\"followUnfollowButtonCtrl.onClick('unfollow');\"\n  class=\"btn btn-xs btn-success\"\n>\n  Following\n</button>\n";

/***/ }),

/***/ "jAkR":
/*!**********************************************!*\
  !*** ./src/core/lib/simpleWalletProvider.ts ***!
  \**********************************************/
/*! exports provided: defaultHdPath, set, clean, saveLocally, loadWallet, get */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultHdPath", function() { return defaultHdPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clean", function() { return clean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveLocally", function() { return saveLocally; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadWallet", function() { return loadWallet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get; });
var wallet = null;
var defaultHdPath = "m/44'/0'/0'/0/0";
var set = function (lWallet) {
    wallet = lWallet;
};
var clean = function () {
    wallet = null;
    localStorage.setItem("HC_BCH_PRIVATE_KEY", "");
    localStorage.setItem("HC_BCH_MNEMONIC", "");
};
var saveLocally = function (simpleWallet) {
    localStorage.setItem("HC_BCH_PRIVATE_KEY", simpleWallet.privateKey);
    localStorage.setItem("HC_BCH_MNEMONIC", simpleWallet.mnemonic);
    localStorage.setItem("HC_BCH_HD_PATH", simpleWallet.HdPath);
};
var loadWallet = function (mnemonic, password) {
    var HdPath;
    if (!mnemonic) {
        mnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
        HdPath = localStorage.getItem("HC_BCH_HD_PATH") || defaultHdPath;
    }
    if (!mnemonic) {
        return;
    }
    var simpleWallet = new SimpleWallet(mnemonic, {
        HdPath: HdPath,
        password: password
    });
    saveLocally(simpleWallet);
    set(simpleWallet);
    return simpleWallet;
};
var get = function () {
    return wallet;
};


/***/ }),

/***/ "jp1E":
/*!********************************************************************!*\
  !*** ./src/app/components/upvote-button/upvote-button.styles.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./upvote-button.styles.less */ "XDL3");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "k+s8":
/*!*****************************!*\
  !*** ./src/core/layout.css ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/less-loader/dist/cjs.js!./layout.css */ "ceco");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "lX8D":
/*!**********************************************************************!*\
  !*** ./src/app/components/upvote-button/upvote-button.template.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div\n  class=\"btn-bch-upvote-container\"\n  ng-class=\"{'active': upvoteButtonCtrl.isUpvoting, 'disabled': upvoteButtonCtrl.isDisabled}\"\n  ng-click=\"upvoteButtonCtrl.onClick($event)\"\n>\n  <span class=\"bch-icon\"\n    ><?xml version=\"1.0\" encoding=\"utf-8\"?>\n    <svg\n      version=\"1.1\"\n      id=\"Layer_1\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n      xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n      x=\"0px\"\n      y=\"0px\"\n      viewBox=\"0 0 788 788\"\n      style=\"enable-background:new 0 0 788 788;\"\n      xml:space=\"preserve\"\n    >\n      <circle\n        class=\"bch-icon-outer-ring-color\"\n        cx=\"394.5\"\n        cy=\"394.1\"\n        r=\"394.1\"\n      />\n      <title>12-bitcoin-cash-square-crop</title>\n      <circle class=\"bch-icon-inner-ring-color\" cx=\"394\" cy=\"394\" r=\"281.4\" />\n      <path\n        class=\"bch-icon-color\"\n        d=\"M551.1,407.9l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.7-0.3-1.1l0,0l0,0l0,0l0,0l0,0l0,0l0-0.1\n      c-3.9-13.2-11.7-24.8-22.4-33.5l0,0c-0.3-0.2-0.6-0.5-1-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n      l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.2-0.3l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n      l-0.4-0.3l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n      l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.5-0.2l-0.2-0.1l-0.5-0.2l-0.3-0.2l0,0\n      c-0.2-0.1-0.5-0.2-0.7-0.4c-9.6-4.9-19.9-8.2-30.6-9.7c3-3.2,5.7-6.7,8.2-10.3l0.4-0.6l0,0l0.2-0.3l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n      l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4\n      l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1\n      l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.2-0.3l0.2-0.4c0.2-0.3,0.3-0.7,0.4-1l0,0\n      c4.6-11.3,5.7-23.7,3.1-35.7l0,0l0-0.1l0,0l0,0l0,0l0,0l0,0l0,0c-0.1-0.3-0.1-0.7-0.2-1V292l0,0l0,0l0,0l0,0l-0.1-0.3\n      c-0.1-0.5-0.2-0.9-0.4-1.4c-0.1-0.5-0.2-0.9-0.4-1.4l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.6-0.3-1l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n      c-3.5-11.7-10.4-22.1-19.9-29.8l0,0c-0.3-0.2-0.6-0.4-0.8-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n      l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n      l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n      l-0.4-0.2L470,251l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.3-0.1l0,0l-0.6-0.3\n      c-18.3-9.5-41.5-12.4-64.9-6.4l-6.1,1.6l-15.4-59.9l-35.7,9.1l15.3,59.7l-28.5,7.3l-15.3-59.5L280,210l15.3,59.7l-73.5,18.9l9.8,38\n      l29.6-7.6c9.8-2.5,19.8,3.4,22.3,13.2c0,0,0,0,0,0l0,0l0,0l41.1,160c1.7,6.5-2.3,13.2-8.8,14.9l-26,6.7l1.5,45.2l73.4-18.9\n      l15.5,59.6l35.6-9.2l-15.4-59.7l28.5-7.3l15.4,59.7l35.6-9.2l-15.4-59.9c6-1.6,11.2-2.9,14.8-3.9c26.4-6.8,47.7-22.2,60.6-41.5\n      l0.4-0.6l0,0l0.2-0.3l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.2-0.4\n      l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n      l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3\n      l0.1-0.1l0.2-0.4l0.2-0.5c0.2-0.4,0.3-0.7,0.5-1.1l0,0c5.2-12.7,6.4-26.7,3.5-40.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.3-1.1v-0.1\n      l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.1-0.1c-0.1-0.5-0.2-1.1-0.4-1.6C551.2,409.1,551.2,408.5,551.1,407.9z\n       M341.6,300.9c6.1-1.6,31.2-7.9,39.5-10c13.2-3.4,26.2-2.1,36.3,2.8l0.3,0.2l0,0l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n      l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n      l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0\n      l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.1,0.1l0.1,0l0.2,0.1l0.2,0.1c0.2,0.1,0.3,0.2,0.5,0.3l0,0c5.2,3.9,9,9.4,10.9,15.6\n      l0,0l0,0.1c0,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.7c0.1,0.3,0.1,0.5,0.1,0.8l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.5\n      l0,0.1l0,0c1.3,6.4,0.6,13-2,18.9l0,0l-0.2,0.5l-0.1,0.3l-0.1,0.2l0,0.1l-0.1,0.1l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2\n      l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n      l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n      l-0.2,0.2l-0.1,0.1L431,342l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l0,0l-0.2,0.3c-6.6,9.2-17.3,16.6-30.5,20\n      c-8.3,2.1-33.4,8.7-39.5,10.3L341.6,300.9z M481,423.5l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.6l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n      c1.4,7,0.4,14.3-2.9,20.7l0,0l-0.3,0.6L478,446l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2\n      l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2L476,449l-0.1,0.2\n      l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.2,0.2\n      l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.2l0,0l-0.3,0.3c-8,10.2-20.8,18.5-36.4,22.5\n      c-9.8,2.5-39.6,10.3-46.8,12.2l-20.2-78.7c7.2-1.9,37-9.4,46.9-11.9c15.6-4,30.9-2.9,42.8,2.2l0.4,0.2l0,0l0.2,0.1l0.3,0.1l0.1,0\n      l0.3,0.1l0.1,0l0.3,0.1l0.1,0l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n      l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n      l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.2,0.2\n      c0.2,0.1,0.4,0.2,0.6,0.4l0,0c6,4,10.4,9.9,12.5,16.8l0,0l0.1,0.1c0.1,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.8\n      C481,422.8,481.1,423.2,481,423.5L481,423.5z\"\n      />\n    </svg>\n  </span>\n  <span class=\"bch-icon-loading\"></span>\n  <button ng-disabled=\"upvoteButtonCtrl.isUpvoting || upvoteButtonCtrl.isDisabled\" class=\"btn btn-bch-upvote\">\n    <span class=\"bch-upvote-button-amount\">{{ upvoteButtonCtrl.amount }}</span>\n    <span class=\"bch-upvote-button-text\">{{ upvoteButtonCtrl.text }}</span>\n    <span class=\"bch-upvote-button-loading\">{{ upvoteButtonCtrl.loadingText }}</span>\n  </button>\n</div>\n";

/***/ }),

/***/ "leVX":
/*!************************************!*\
  !*** ./src/core/config/routing.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return routing; });
function routing($locationProvider, $urlMatcherFactoryProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $urlMatcherFactoryProvider.strictMode(false);
}
;


/***/ }),

/***/ "mRKG":
/*!***********************************!*\
  !*** ./src/core/config/toastr.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
toastr.options.positionClass = "toast-bottom-right";
var eToastr = toastr;
/* harmony default export */ __webpack_exports__["default"] = (eToastr);


/***/ }),

/***/ "mraJ":
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/bottom-call-to-action-bar/bottom-call-to-action-bar.styles.less ***!
  \*************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "#bottom-call-to-action-bar {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  font-size: 16px;\n  -webkit-box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.0785);\n  box-shadow: 0 -3px 10px 0 rgba(0, 0, 0, 0.0785);\n  background-color: #fafafa;\n  z-index: 99;\n}\n#bottom-call-to-action-bar-inner {\n  max-width: 700px;\n  margin: 0 auto;\n  padding: 10px;\n}\n#bch-icon-svg {\n  width: 50px;\n  height: 50px;\n}\n", ""]);

// exports


/***/ }),

/***/ "pB9m":
/*!***********************************************!*\
  !*** ./src/app/components/feed/template.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" ng-style=\"styles\">\n  <div class=\"push feed\">\n    <div class=\"feed-header\">\n      <div class=\"feed-author\">\n        <ul class=\"list-unstyled\">\n          <li>\n            <img\n              fallback-src=\"{{ '/img/avatar.png' }}\"\n              ng-src=\"{{\n                feed.user.imageUrl ? feed.user.imageUrl : '/img/avatar.png'\n              }}\"\n            />\n          </li>\n\n          <li>\n            <strong style=\"margin-top:15px;\">\n              <a ui-sref=\"vicigo.profile({ profileId:feed.user.username })\">\n                <span class=\"user-follower-count\">{{\n                  feed.user.username\n                }}</span>\n              </a>\n            </strong>\n          </li>\n\n          <li\n            ng-if=\"feed.parentPostId || feed.feedMetaInfo.type === 'followerUpvote'\"\n          >\n            <span style=\"margin-top:15px;\"> • </span>\n          </li>\n\n          <li ng-if=\"feed.parentPostId\">\n            <span style=\"margin-top:15px;\"> <small>Response</small> </span>\n          </li>\n\n          <li\n            ng-if=\"feed.parentPostId && feed.feedMetaInfo.type === 'followerUpvote'\"\n          >\n            <span style=\"margin-top:15px;\"> • </span>\n          </li>\n\n          <li ng-if=\"feed.feedMetaInfo.type === 'followerUpvote'\">\n            <span style=\"margin-top:15px;\">\n              <small\n                ><a\n                  target=\"_self\"\n                  href=\"/profile/{{ feed.feedMetaInfo.data.username }}\"\n                  >{{ feed.feedMetaInfo.data.username }}</a\n                >\n                upvoted it.</small\n              >\n            </span>\n          </li>\n\n          <li class=\"feed-date\">\n            <span class=\"text-muted\">\n              <small>{{ feed.publishedAtFormatted }}</small>\n            </span>\n          </li>\n        </ul>\n      </div>\n    </div>\n    <a\n      ui-sref=\"vicigo.post({ postId: feed.id, alias: feed.alias || feed.id, username: feed.user.username })\"\n    >\n      <div class=\"post-feed-body\">\n        <div class=\"feed-title\">\n          <h3>\n            <strong> {{ feed.title }} </strong>\n          </h3>\n        </div>\n\n        <div ng-if=\"feed.imageUrl\" class=\"feed-image\">\n          <lazy-img\n            ng-if=\"feed.imageUrl\"\n            class=\"lazy\"\n            ng-src=\"{{ trustSrc(feed.imageUrl) }}\"\n            alt=\"image\"\n          ></lazy-img>\n        </div>\n\n        <div class=\"feed-body\">\n          <article ng-if=\"feed.body\" class=\"feed-article\" ng-bind-html=\"displayFeedBody(feed.body)\"></article>\n        </div>\n      </div>\n    </a>\n\n    <div class=\"feed-footer\">\n      <div class=\"row hashtags\" ng-if=\"feed.userPostHashtags.length\">\n        <div class=\"col-xs-12\">\n          <div style=\"padding-left:8px;padding-right:5px;\">\n            <span\n              class=\"pull-left hashtag-container\"\n              ng-repeat=\"hashtag in feed.userPostHashtags\"\n            >\n              <a\n                class=\"hashtag\"\n                ui-sref=\"vicigo.hashtag({ hashtag : hashtag.hashtag })\"\n                >{{ ::hashtag.hashtag }}</a\n              >\n            </span>\n          </div>\n        </div>\n      </div>\n\n      <div\n        class=\"row feed-actions\"\n        style=\"padding-top: 10px; padding-bottom: 10px;\"\n      >\n        <div class=\"col-xs-12\">\n          <ul class=\"list-unstyled list-inline list list-post-actions\">\n            <li>\n              <upvote-button\n                post=\"feed\"\n              ></upvote-button>\n            </li>\n            <li>\n              <span\n                >{{ feed.upvoteCount }} <i class=\"fa fa-bitcoin\"></i\n              ></span>\n            </li>\n            <li>\n              <span\n                >{{ feed.responseCount }} <i class=\"fa fa-comment-o\"></i\n              ></span>\n            </li>\n            <li>\n              <social-share-buttons post=\"feed\"></social-share-buttons>\n            </li>\n            <li ng-if=\"feed.hasPaidSection && !feed.hasBeenPaidFor\" class=\"hc-tooltip\" data-tippy-content=\"This story has a pay to unlock section.\" style=\"float: right; margin-right: 10px;\"><i class=\"fa fa-2x fa-lock\"></i></li>\n            <li ng-if=\"feed.hasPaidSection && feed.hasBeenPaidFor\" class=\"hc-tooltip\" data-tippy-content=\"This story has a paid section however you have access to the post.\" style=\"float: right; margin-right: 10px;\"><i class=\"fa fa-2x fa-unlock\"></i></li>\n          </ul>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "pX/I":
/*!***************************************!*\
  !*** ./src/core/lib/SocialSharing.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_config_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/config/index */ "u61H");

var SocialSharing = /** @class */ (function () {
    function SocialSharing() {
    }
    SocialSharing.getFeedShareURLs = function (feed) {
        var hashtags = feed.userPostHashtags ? feed.userPostHashtags.map(function (h) { return h.hashtag; }).join(',') : "honestcash";
        var uname = feed.user.username;
        return {
            reddit: "https://reddit.com/submit?url=" + _core_config_index__WEBPACK_IMPORTED_MODULE_0__["client"] + "/" + uname + "/" + feed.alias + "&title=" + feed.title,
            twitter: "https://twitter.com/intent/tweet?url=" + _core_config_index__WEBPACK_IMPORTED_MODULE_0__["client"] + "/" + uname + "/" + feed.alias + "&text=" + feed.title + "&via=honest_cash&hashtags=" + hashtags
        };
    };
    return SocialSharing;
}());
/* harmony default export */ __webpack_exports__["default"] = (SocialSharing);


/***/ }),

/***/ "ppKM":
/*!***********************************************************************************!*\
  !*** ./src/app/components/social-share-buttons/social-share-buttons.component.ts ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return socialSharesButton; });
/* harmony import */ var _social_share_buttons_styles_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./social-share-buttons.styles.less */ "ZQz6");
/* harmony import */ var _social_share_buttons_styles_less__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_social_share_buttons_styles_less__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _social_share_buttons_template_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./social-share-buttons.template.html */ "L6hZ");
/* harmony import */ var _social_share_buttons_template_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_social_share_buttons_template_html__WEBPACK_IMPORTED_MODULE_1__);


var SocialShareButtonsController = /** @class */ (function () {
    function SocialShareButtonsController($scope) {
        this.$scope = $scope;
        this.ngOnInit();
    }
    SocialShareButtonsController.prototype.ngOnInit = function () {
        this.post = this.$scope.post;
    };
    SocialShareButtonsController.$inject = [
        "$scope"
    ];
    return SocialShareButtonsController;
}());
function socialSharesButton() {
    return {
        controller: SocialShareButtonsController,
        controllerAs: 'socialShareButtonsCtrl',
        restrict: 'E',
        scope: {
            "post": "=",
        },
        template: _social_share_buttons_template_html__WEBPACK_IMPORTED_MODULE_1___default.a
    };
}


/***/ }),

/***/ "qBTb":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/styles/post.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "h1 {\n  font-size: 22px;\n}\nh2 {\n  font-size: 20px;\n}\nh3 {\n  font-size: 18px;\n}\nh4 {\n  font-size: 16px;\n}\n.post-container .post-body .medium-insert-buttons {\n  display: none;\n}\n.post-upvote {\n  font-size: 12px;\n}\n.response-title {\n  font-size: 20px;\n}\n.response-body {\n  font-size: 14px;\n}\n@media (min-width: 768px) {\n  .post-title-container h1 {\n    font-size: 38px;\n  }\n  .post-body {\n    width: 100%;\n    font-family: 'Helvetica', sans-serif;\n    font-weight: 300;\n    font-style: normal;\n    font-size: 15px;\n    line-height: 1.58;\n    /* color: #777; */\n    line-height: 1.6;\n    max-width: 100%;\n  }\n}\n@media (max-width: 768px) {\n  .post-title-container h1 {\n    font-size: 24px;\n  }\n  .post-body {\n    width: 100%;\n    font-family: 'Helvetica', sans-serif;\n    font-weight: 300 !important;\n    font-style: normal !important;\n    font-size: 14px !important;\n    line-height: 1.58 !important;\n    max-width: 100%;\n  }\n}\n.post-body img,\n.response-body img {\n  display: block !important;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  margin-top: 10px !important;\n  margin-bottom: 10px !important;\n  max-width: 100% !important;\n}\n.post-body,\n.response-body {\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n}\n.response-body {\n  margin-bottom: 15px;\n}\n.post-uncensorable {\n  overflow-wrap: break-word;\n  word-wrap: break-word;\n}\n", ""]);

// exports


/***/ }),

/***/ "qXJ/":
/*!********************************************!*\
  !*** ./src/core/lib/upvoteDistribution.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var getBaseLog = function (x, y) {
    return Math.log(y) / Math.log(x);
};
var determineUpvoteRewards = function (upvotes, author) {
    var receivers = [];
    var tipAmountSat = 200000;
    var authorAmountPart = 0.4;
    // filter only users with BCH address for receiving tips
    upvotes = upvotes.filter(function (_) { return _.user && _.user.addressBCH; });
    var authorAmount;
    if (upvotes.length === 0) {
        authorAmount = tipAmountSat;
    }
    else {
        authorAmount = tipAmountSat * authorAmountPart;
    }
    var payoutIndex = 0;
    var tipAmountForUpvoters = tipAmountSat - authorAmount;
    var upvote = upvotes[Math.pow(2, payoutIndex) - 1];
    while (upvote) {
        receivers.push({
            upvoteId: upvote.id,
            user: upvote.user,
            address: upvote.user.addressBCH,
            amountSat: null
        });
        var upvoteIndex = Math.pow(2, payoutIndex) - 1;
        console.log("The " + upvoteIndex + "th user from the end will be rewarded.");
        payoutIndex += 1;
        upvote = upvotes[Math.pow(2, payoutIndex) - 1];
    }
    receivers = receivers.map(function (receiver) {
        receiver.amountSat = tipAmountForUpvoters / receivers.length;
        return receiver;
    });
    // author share
    receivers.push({
        upvoteId: null,
        user: author,
        amountSat: authorAmount,
        address: author.addressBCH
    });
    var totalPayouts = 0;
    for (var _i = 0, receivers_1 = receivers; _i < receivers_1.length; _i++) {
        var receiver = receivers_1[_i];
        totalPayouts += receiver.amountSat;
    }
    console.log("Total rewards payouts: " + totalPayouts);
    if (totalPayouts !== tipAmountSat) {
        throw new Error("Total payouts " + totalPayouts + " are different than the tip amount " + tipAmountSat + ". Stopping payouts!");
    }
    return receivers;
};
module.exports = {
    determineUpvoteRewards: determineUpvoteRewards
};


/***/ }),

/***/ "rT8j":
/*!*********************************************!*\
  !*** ./src/core/services/HashtagService.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var HashtagService = /** @class */ (function () {
    function HashtagService($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    HashtagService.prototype.getTopHashtags = function () {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.hashtags) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$http.get(this.API_URL + "/hashtag")];
                    case 1:
                        res = _a.sent();
                        this.hashtags = res.data;
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.hashtags];
                }
            });
        });
    };
    ;
    HashtagService.$inject = [
        "$http",
        "API_URL"
    ];
    return HashtagService;
}());
/* harmony default export */ __webpack_exports__["default"] = (HashtagService);


/***/ }),

/***/ "re9D":
/*!************************************************!*\
  !*** ./src/app/components/feeds/template.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<div infinite-scroll=\"loadMore()\" infinite-scroll-distance=\"1\">\n\t\t<div class=\"row\">\n\t\t\t<div class=\"feed-container\" ng-repeat=\"feed in feeds\">\n        \t\t<feed user=\"user\" feed=\"feed\"></feed>\n\t\t\t</div>\n\n\t\t\t<div style='clear: both;'></div>\n\t\t</div>\n\n\t\t<div style=\"margin-top: 10px;\" class=\"text-center\" ng-show='isLoading'>\n      <i class=\"fa fa-circle-o-notch fa-spin fa-2x\"></i>\n    </div>\n\t</div>\n</div>\n";

/***/ }),

/***/ "rl8m":
/*!***********************************************!*\
  !*** ./src/app/components/feeds/component.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return feeds; });
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template.html */ "re9D");
/* harmony import */ var _template_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_template_html__WEBPACK_IMPORTED_MODULE_0__);

var FeedsDirectiveCtrl = /** @class */ (function () {
    function FeedsDirectiveCtrl($rootScope, $scope) {
        this.$rootScope = $rootScope;
        this.$scope = $scope;
    }
    FeedsDirectiveCtrl.$inject = [
        "$rootScope",
        "$scope"
    ];
    return FeedsDirectiveCtrl;
}());
function feeds() {
    return {
        restrict: 'E',
        scope: {
            "isLoading": "=isLoading",
            "feeds": "=feeds",
            "user": "=user",
            "loadMore": "&loadMore"
        },
        template: _template_html__WEBPACK_IMPORTED_MODULE_0___default.a,
        controller: FeedsDirectiveCtrl
    };
}
;


/***/ }),

/***/ "u61H":
/*!**********************************!*\
  !*** ./src/core/config/index.ts ***!
  \**********************************/
/*! exports provided: api, client, dateFormat */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "api", function() { return api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "client", function() { return client; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFormat", function() { return dateFormat; });
var PRODUCTION = "https://honest.cash";
var DEV = "http://localhost:8080";
var api = DEV + "/api";
var client = PRODUCTION;
var dateFormat = "MMM Do YY";
angular.module("vqConfig", []).constant("API_URL", api);


/***/ }),

/***/ "uWhn":
/*!************************************!*\
  !*** ./src/app/styles/profile.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/less-loader/dist/cjs.js!./profile.css */ "xIyu");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "ufS9":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/simple-ledger-protocol-details/simple-ledger-protocol-details.styles.less ***!
  \***********************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".hc-tokens-badge-container {\n  margin-bottom: 15px;\n}\n.hc-tokens-badge {\n  position: relative;\n  margin: 1.5em 3em;\n  width: 4em;\n  height: 6.2em;\n  border-radius: 10px;\n  display: inline-block;\n  top: 0;\n  transition: all 0.2s ease;\n}\n.hc-tokens-badge:before,\n.hc-tokens-badge:after {\n  position: absolute;\n  width: inherit;\n  height: inherit;\n  border-radius: inherit;\n  background: inherit;\n  content: \"\";\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n}\n.hc-tokens-badge:before {\n  transform: rotate(60deg);\n}\n.hc-tokens-badge:after {\n  transform: rotate(-60deg);\n}\n.hc-tokens-badge:hover {\n  top: -4px;\n}\n.hc-tokens-badge .hc-tokens-badge-circle {\n  width: 60px;\n  height: 60px;\n  position: absolute;\n  background: #fff;\n  z-index: 10;\n  border-radius: 50%;\n  top: 0;\n  left: -5px;\n  right: 0;\n  bottom: 0;\n  margin: auto;\n  text-align: center;\n}\n.hc-tokens-badge .hc-tokens-badge-font {\n  font-family: Times New Roman;\n  font-weight: bold;\n  font-size: 20px;\n  color: white;\n  width: 34px;\n  height: 34px;\n  margin-top: 10px;\n  display: inline-block;\n  background-color: black;\n}\n.hc-tokens-badge .hc-tokens-badge-ribbon {\n  position: absolute;\n  border-radius: 4px;\n  padding: 5px 5px 4px;\n  width: 105px;\n  z-index: 11;\n  color: #fff;\n  bottom: 12px;\n  left: 50%;\n  top: 75%;\n  margin-left: -52px;\n  text-align: center;\n  height: 26px;\n  font-size: 12px;\n  font-weight: bold;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.27);\n  text-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);\n  text-transform: uppercase;\n  background: linear-gradient(to bottom right, #555555 0%, #333333 100%);\n  cursor: default;\n}\n.hc-tokens-badge-yellow {\n  background: linear-gradient(to bottom right, #ffeb3b 0%, #fbc02d 100%);\n  color: #ffb300;\n}\n.hc-tokens-badge-orange {\n  background: linear-gradient(to bottom right, #ffc107 0%, #f57c00 100%);\n  color: #f68401;\n}\n.hc-tokens-badge-pink {\n  background: linear-gradient(to bottom right, #F48FB1 0%, #d81b60 100%);\n  color: #dc306f;\n}\n.hc-tokens-badge-red {\n  background: linear-gradient(to bottom right, #f4511e 0%, #b71c1c 100%);\n  color: #c62828;\n}\n.hc-tokens-badge-purple {\n  background: linear-gradient(to bottom right, #ab47bc 0%, #4527a0 100%);\n  color: #7127a8;\n}\n.hc-tokens-badge-teal {\n  background: linear-gradient(to bottom right, #4DB6AC 0%, #00796B 100%);\n  color: #34a297;\n}\n.hc-tokens-badge-blue {\n  background: linear-gradient(to bottom right, #4FC3F7 0%, #2196F3 100%);\n  color: #259af3;\n}\n.hc-tokens-badge-blue-dark {\n  background: linear-gradient(to bottom right, #1976D2 0%, #283593 100%);\n  color: #1c68c5;\n}\n.hc-tokens-badge-green {\n  background: linear-gradient(to bottom right, #cddc39 0%, #8bc34a 100%);\n  color: #7cb342;\n}\n.hc-tokens-badge-green-dark {\n  background: linear-gradient(to bottom right, #4CAF50 0%, #1B5E20 100%);\n  color: #00944a;\n}\n.hc-tokens-badge-silver {\n  background: linear-gradient(to bottom right, #E0E0E0 0%, #BDBDBD 100%);\n  color: #9e9e9e;\n}\n.hc-tokens-badge-gold {\n  background: linear-gradient(to bottom right, #e6ce6a 0%, #b7892b 100%);\n  color: #b7892b;\n}\n", ""]);

// exports


/***/ }),

/***/ "vzRO":
/*!*********************************!*\
  !*** ./src/auth/AuthService.ts ***!
  \*********************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var sha3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sha3 */ "aklL");
/* harmony import */ var sha3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sha3__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var AuthService = /** @class */ (function () {
    function AuthService($window, $http, $q, apiFactory) {
        var _this = this;
        this.$window = $window;
        this.$http = $http;
        this.$q = $q;
        this.apiFactory = apiFactory;
        this.username = "";
        this.isAuthenticated = false;
        this.LOCAL_TOKEN_KEY = "HC_USER_TOKEN";
        this.LOCAL_USER_ID_KEY = "HC_USER_ID";
        this.LOCAL_USER = "HC_CASH_USER";
        this.getUserId = function () { return _this.authUserId; };
        this.getAuthToken = function () {
            return _this.authToken;
        };
    }
    AuthService.prototype.useCredentials = function (token, userId) {
        this.isAuthenticated = true;
        this.authToken = token;
        this.authUserId = userId;
        this.$http.defaults.headers.common["X-Auth-Token"] = token;
    };
    AuthService.prototype.loadUserCredentials = function () {
        var token = this.$window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
        var userId = Number(this.$window.localStorage.getItem(this.LOCAL_USER_ID_KEY));
        if (token) {
            this.useCredentials(token, userId);
        }
    };
    AuthService.prototype.storeUserCredentials = function (token, userId) {
        this.$window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
        this.$window.localStorage.setItem(this.LOCAL_USER_ID_KEY, userId);
        this.useCredentials(token, userId);
    };
    AuthService.prototype.destroyUserCredentials = function () {
        this.authToken = undefined;
        this.authUserId = undefined;
        this.isAuthenticated = false;
        this.$http.defaults.headers.common["X-Auth-Token"] = undefined;
        this.$window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
        this.$window.localStorage.removeItem(this.LOCAL_USER_ID_KEY);
    };
    AuthService.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.post(this.apiFactory("LOGIN"), data)];
                    case 1:
                        res = _a.sent();
                        this.storeUserCredentials(res.data.token, res.data.user.id);
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    AuthService.prototype.passwordCheck = function (data) {
        var _this = this;
        return this.$q(function (resolve, reject) {
            _this.$http
                .post(_this.apiFactory("PASSWORD_CHECK"), data)
                .then(function (res) {
                resolve(res.data);
            }, reject);
        });
    };
    AuthService.prototype.signup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var response, authData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.post(this.apiFactory("SIGNUP"), data)];
                    case 1:
                        response = _a.sent();
                        authData = response.data;
                        this.storeUserCredentials(authData.token, authData.user.id);
                        return [2 /*return*/, authData];
                }
            });
        });
    };
    AuthService.prototype.validate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.get(this.apiFactory("VALIDATE"))];
            });
        });
    };
    AuthService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.destroyUserCredentials();
                return [2 /*return*/, this.$http.post(this.apiFactory("LOGOUT"), {})];
            });
        });
    };
    AuthService.prototype.resetPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.post(this.apiFactory("RESET"), data)];
            });
        });
    };
    AuthService.prototype.changePassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.post(this.apiFactory("CHANGE_PASSWORD"), data)];
            });
        });
    };
    AuthService.prototype.setPassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.post(this.apiFactory("SET_PASSWORD"), data)];
            });
        });
    };
    AuthService.prototype.setWallet = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.$http.post(this.apiFactory("SET_WALLET"), data)];
            });
        });
    };
    AuthService.prototype.getEmails = function () {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get(this.apiFactory("GET_EMAILS"))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    AuthService.prototype.calculatePasswordHash = function (email, password) {
        return this.calculateSHA3Hash(this.determineMessageForHashing(email, password));
    };
    AuthService.prototype.determineMessageForHashing = function (salt, password) {
        return salt + ":" + password;
    };
    AuthService.prototype.calculateSHA3Hash = function (message) {
        var hash = new sha3__WEBPACK_IMPORTED_MODULE_0__["SHA3"](512);
        var passwordHash = hash.update(message).digest("hex");
        return passwordHash;
    };
    AuthService.$inject = [
        "$window",
        "$http",
        "$q",
        "apiFactory",
    ];
    return AuthService;
}());



/***/ }),

/***/ "wDZn":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/unlock-button/unlock-button.styles.less ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".btn-bch-unlock-container {\n  cursor: pointer;\n  position: relative;\n  width: 275px;\n  height: 30px;\n}\n.btn-bch-unlock-container > button {\n  position: absolute;\n  left: 0;\n  padding: 2px 5px 2px 20px;\n  line-height: 20px;\n  z-index: 0;\n  height: 30px;\n  outline: none !important;\n  box-shadow: none !important;\n  min-width: 260px;\n  width: 260px;\n  max-width: 260px;\n  margin-left: 12px;\n  float: left;\n  overflow: hidden;\n}\n.btn-bch-unlock-container > .bch-icon {\n  width: 30px;\n  height: 30px;\n  left: 1px;\n  position: absolute;\n  z-index: 10;\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-loading {\n  display: none;\n}\n.btn-bch-unlock-container.active > button > .bch-unlock-button-loading {\n  display: inline-block;\n}\n.btn-bch-unlock-container.active > button > .bch-unlock-button-text,\n.btn-bch-unlock-container.active > button > .bch-unlock-button-amount {\n  display: none;\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-amount {\n  position: absolute;\n  top: 4px;\n  left: 0;\n  margin-left: 28px;\n  width: 68px;\n  padding-left: 4px;\n  padding-right: 4px;\n  transition: all 0.3s ease-in-out;\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-text {\n  position: absolute;\n  top: 4px;\n  left: 0;\n  margin-left: 76px;\n  width: 116px;\n  padding-left: 4px;\n  padding-right: 4px;\n  transition: all 0.3s ease-in-out;\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-amount,\n.btn-bch-unlock-container > button > .bch-unlock-button-text,\n.btn-bch-unlock-container > button > .bch-unlock-button-loading {\n  text-transform: uppercase;\n  font-weight: bold;\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-amount {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n.btn-bch-unlock-container > button > .bch-unlock-button-text {\n  opacity: 0;\n  transform: translate(100%, 0);\n}\n.btn-bch-unlock-container:hover > button > .bch-unlock-button-amount {\n  opacity: 0;\n  transform: translate(100%, 0);\n}\n.btn-bch-unlock-container:hover > button > .bch-unlock-button-text {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n.btn-bch-unlock-container.active > .bch-icon,\n.btn-bch-unlock-container.active > .bch-icon-loading,\n.btn-bch-unlock-container.disabled > .bch-icon,\n.btn-bch-unlock-container.disabled > .bch-icon-loading {\n  cursor: not-allowed;\n}\n.btn-bch-unlock-container.disabled > .btn-bch-unlock {\n  opacity: 0.65;\n}\n.btn-bch-unlock-container.active > .bch-icon-loading {\n  display: initial;\n}\n.bch-icon-loading {\n  display: none;\n  background-color: rgba(0, 0, 0, 0);\n  opacity: 0.9;\n  border-left: 2px solid rgba(0, 0, 0, 0) !important;\n  border-right: 2px solid rgba(0, 0, 0, 0) !important;\n  border-radius: 50px;\n  width: 30px;\n  z-index: 11;\n  height: 30px;\n  position: absolute;\n  left: 1px;\n  -moz-animation: spinoffPulse 1s infinite linear;\n  -webkit-animation: spinoffPulse 1s infinite linear;\n  animation: spinoffPulse 1s infinite linear;\n}\n.btn-bch-unlock-container > button {\n  background: #f7941d;\n  color: #ffffff !important;\n}\n.btn-bch-unlock-container:hover,\n.btn-bch-unlock-container > button:hover {\n  color: #ffffff !important;\n}\n.bch-icon-loading {\n  border: 2px solid #f7941d;\n}\n@-moz-keyframes spinPulse {\n  0% {\n    -moz-transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    -moz-transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    -moz-transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@-moz-keyframes spinoffPulse {\n  0% {\n    -moz-transform: rotate(0deg);\n  }\n  100% {\n    -moz-transform: rotate(360deg);\n  }\n}\n@-webkit-keyframes spinPulse {\n  0% {\n    -webkit-transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    -webkit-transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    -webkit-transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes spinoffPulse {\n  0% {\n    -webkit-transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n  }\n}\n@keyframes spinPulse {\n  0% {\n    transform: rotate(160deg);\n    opacity: 0;\n    box-shadow: 0 0 1px #f7941d;\n  }\n  50% {\n    transform: rotate(145deg);\n    opacity: 1;\n  }\n  100% {\n    transform: rotate(-320deg);\n    opacity: 0;\n  }\n}\n@keyframes spinoffPulse {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.bch-icon-outer-ring-color {\n  fill: #fafafa;\n}\n/* container background color */\n.bch-icon-inner-ring-color {\n  fill: #f7941d;\n}\n.bch-icon-color {\n  fill: #ffffff;\n}\n", ""]);

// exports


/***/ }),

/***/ "xIyu":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/styles/profile.css ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, ".clickable {\n  cursor: pointer;\n}\n.showProfileTab {\n  color: #999;\n  text-decoration: none;\n}\n.showProfileTab:visited {\n  text-decoration: none;\n}\n.profile-bio {\n  overflow-wrap: break-word;\n}\n.btn a {\n  color: inherit;\n  text-decoration: none;\n}\n.hc-profile-nav {\n  display: flex;\n}\n.hc-profile-nav ul {\n  margin: 0 auto;\n  display: flex;\n  width: 100%;\n  flex-wrap: nowrap;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n.hc-profile-nav ul li {\n  display: inline-block;\n}\n", ""]);

// exports


/***/ }),

/***/ "xRMM":
/*!**********************************************************************************************!*\
  !*** ./src/app/components/bottom-call-to-action-bar/bottom-call-to-action-bar.template.html ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"bottom-call-to-action-bar\">\n  <div id=\"bottom-call-to-action-bar-inner\">\n    <div class=\"row\">\n        <div class=\"hidden-xs col-sm-1\">\n            <?xml version=\"1.0\" encoding=\"utf-8\"?>\n            <svg\n                version=\"1.1\"\n                id=\"bch-icon-svg\"\n                xmlns=\"http://www.w3.org/2000/svg\"\n                xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n                x=\"0px\"\n                y=\"0px\"\n                viewBox=\"0 0 788 788\"\n                style=\"enable-background:new 0 0 788 788;\"\n                xml:space=\"preserve\"\n            >\n                <circle\n                class=\"bch-icon-outer-ring-color\"\n                cx=\"394.5\"\n                cy=\"394.1\"\n                r=\"394.1\"\n                />\n                <title>12-bitcoin-cash-square-crop</title>\n                <circle\n                class=\"bch-icon-inner-ring-color\"\n                cx=\"394\"\n                cy=\"394\"\n                r=\"281.4\"\n                />\n                <path\n                class=\"bch-icon-color\"\n                d=\"M551.1,407.9l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.7-0.3-1.1l0,0l0,0l0,0l0,0l0,0l0,0l0-0.1\n                            c-3.9-13.2-11.7-24.8-22.4-33.5l0,0c-0.3-0.2-0.6-0.5-1-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n                            l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.2-0.3l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n                            l-0.4-0.3l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n                            l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.4-0.3l-0.2-0.1l-0.5-0.2l-0.2-0.1l-0.5-0.2l-0.3-0.2l0,0\n                            c-0.2-0.1-0.5-0.2-0.7-0.4c-9.6-4.9-19.9-8.2-30.6-9.7c3-3.2,5.7-6.7,8.2-10.3l0.4-0.6l0,0l0.2-0.3l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n                            l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4\n                            l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1\n                            l0.2-0.3l0.1-0.1l0.2-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.1-0.3l0.1-0.1l0.2-0.3l0.2-0.4c0.2-0.3,0.3-0.7,0.4-1l0,0\n                            c4.6-11.3,5.7-23.7,3.1-35.7l0,0l0-0.1l0,0l0,0l0,0l0,0l0,0l0,0c-0.1-0.3-0.1-0.7-0.2-1V292l0,0l0,0l0,0l0,0l-0.1-0.3\n                            c-0.1-0.5-0.2-0.9-0.4-1.4c-0.1-0.5-0.2-0.9-0.4-1.4l-0.2-0.3l0-0.1c-0.1-0.3-0.2-0.6-0.3-1l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n                            c-3.5-11.7-10.4-22.1-19.9-29.8l0,0c-0.3-0.2-0.6-0.4-0.8-0.7l-0.4-0.3l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1\n                            l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.1-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1\n                            l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.3-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1\n                            l-0.4-0.2L470,251l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.2-0.1l-0.4-0.2l-0.3-0.1l0,0l-0.6-0.3\n                            c-18.3-9.5-41.5-12.4-64.9-6.4l-6.1,1.6l-15.4-59.9l-35.7,9.1l15.3,59.7l-28.5,7.3l-15.3-59.5L280,210l15.3,59.7l-73.5,18.9l9.8,38\n                            l29.6-7.6c9.8-2.5,19.8,3.4,22.3,13.2c0,0,0,0,0,0l0,0l0,0l41.1,160c1.7,6.5-2.3,13.2-8.8,14.9l-26,6.7l1.5,45.2l73.4-18.9\n                            l15.5,59.6l35.6-9.2l-15.4-59.7l28.5-7.3l15.4,59.7l35.6-9.2l-15.4-59.9c6-1.6,11.2-2.9,14.8-3.9c26.4-6.8,47.7-22.2,60.6-41.5\n                            l0.4-0.6l0,0l0.2-0.3l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.3-0.4l0.1-0.2l0.2-0.4\n                            l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2\n                            l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.4l0.1-0.2l0.2-0.3l0.1-0.2l0.2-0.3\n                            l0.1-0.1l0.2-0.4l0.2-0.5c0.2-0.4,0.3-0.7,0.5-1.1l0,0c5.2-12.7,6.4-26.7,3.5-40.1l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.3-1.1v-0.1\n                            l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l0,0l-0.1-0.1c-0.1-0.5-0.2-1.1-0.4-1.6C551.2,409.1,551.2,408.5,551.1,407.9z\n                            M341.6,300.9c6.1-1.6,31.2-7.9,39.5-10c13.2-3.4,26.2-2.1,36.3,2.8l0.3,0.2l0,0l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n                            l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n                            l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0\n                            l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.2,0.1l0.1,0l0.1,0.1l0.1,0l0.2,0.1l0.2,0.1c0.2,0.1,0.3,0.2,0.5,0.3l0,0c5.2,3.9,9,9.4,10.9,15.6\n                            l0,0l0,0.1c0,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.7c0.1,0.3,0.1,0.5,0.1,0.8l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.5\n                            l0,0.1l0,0c1.3,6.4,0.6,13-2,18.9l0,0l-0.2,0.5l-0.1,0.3l-0.1,0.2l0,0.1l-0.1,0.1l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2\n                            l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l0,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n                            l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1\n                            l-0.2,0.2l-0.1,0.1L431,342l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l0,0l-0.2,0.3c-6.6,9.2-17.3,16.6-30.5,20\n                            c-8.3,2.1-33.4,8.7-39.5,10.3L341.6,300.9z M481,423.5l0.1,0.2l0,0c0,0.2,0.1,0.4,0.1,0.6l0,0l0,0l0,0l0,0l0,0l0,0l0,0\n                            c1.4,7,0.4,14.3-2.9,20.7l0,0l-0.3,0.6L478,446l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2\n                            l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2L476,449l-0.1,0.2\n                            l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.1,0.2l-0.1,0.1l-0.2,0.2\n                            l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.1l-0.2,0.2l-0.1,0.2l0,0l-0.3,0.3c-8,10.2-20.8,18.5-36.4,22.5\n                            c-9.8,2.5-39.6,10.3-46.8,12.2l-20.2-78.7c7.2-1.9,37-9.4,46.9-11.9c15.6-4,30.9-2.9,42.8,2.2l0.4,0.2l0,0l0.2,0.1l0.3,0.1l0.1,0\n                            l0.3,0.1l0.1,0l0.3,0.1l0.1,0l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.3,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1\n                            l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1\n                            l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.1,0.1l0.2,0.1l0.2,0.2\n                            c0.2,0.1,0.4,0.2,0.6,0.4l0,0c6,4,10.4,9.9,12.5,16.8l0,0l0.1,0.1c0.1,0.2,0.1,0.3,0.2,0.5l0,0l0.1,0.2c0.1,0.3,0.1,0.5,0.2,0.8\n                            C481,422.8,481.1,423.2,481,423.5L481,423.5z\"\n                />\n            </svg>\n        </div>\n      <div class=\"col-xs-12 col-sm-8\">\n        Upvote and promote <strong>{{ post.user.username }}</strong\n        >'s story with Bitcoin and receive rewards from the next voters.\n      </div>\n      <div class=\"col-xs-12 col-sm-3\">\n        <button style=\"margin-top: 10px;\" class=\"btn btn-default bold uppercase\" ng-click=\"onClick()\">SIGN UP</button>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ "xmak":
/*!************************************************!*\
  !*** ./src/core/services/BitcoinComService.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var BitcoinComService = /** @class */ (function () {
    function BitcoinComService($http) {
        this.$http = $http;
        this.ngOnInit();
    }
    BitcoinComService.prototype.ngOnInit = function () { };
    BitcoinComService.prototype.getSLPAddressBalance = function (slpAddress) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get("https://rest.bitcoin.com/v2/slp/balancesForAddress/" + slpAddress)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    BitcoinComService.prototype.convertBCHAddressToSLPAddress = function (bchAddress) {
        return __awaiter(this, void 0, Promise, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$http.get("https://rest.bitcoin.com/v2/slp/address/convert/" + bchAddress)];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.data];
                }
            });
        });
    };
    BitcoinComService.$inject = [
        "$http"
    ];
    return BitcoinComService;
}());
/* harmony default export */ __webpack_exports__["default"] = (BitcoinComService);


/***/ }),

/***/ "xq3S":
/*!********************************************************************!*\
  !*** ./src/app/components/logout-button/logout-button.styles.less ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/css-loader!../../../../node_modules/less-loader/dist/cjs.js!./logout-button.styles.less */ "TW3w");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "ylOG":
/*!*************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/app/components/uncensorable-button/uncensorable-button.styles.less ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ })

},[["XbWe","runtime","vendors"]]]);
//# sourceMappingURL=app.cc19e96d862f222b221a.js.map