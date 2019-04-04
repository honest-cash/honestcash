(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["editor"],{

/***/ 0:
/*!*********************************!*\
  !*** readable-stream (ignored) ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

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

/***/ "9rkc":
/*!**********************************!*\
  !*** ./src/editor/EditorCtrl.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tippy.js */ "Qy2J");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "Ut/D");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! async */ "cfFl");
/* harmony import */ var async__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(async__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var medium_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! medium-editor */ "Zz8k");
/* harmony import */ var medium_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(medium_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! showdown */ "M55E");
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var medium_editor_insert_plugin_dist_css_medium_editor_insert_plugin_min_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! medium-editor-insert-plugin/dist/css/medium-editor-insert-plugin.min.css */ "FkQg");
/* harmony import */ var medium_editor_insert_plugin_dist_css_medium_editor_insert_plugin_min_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(medium_editor_insert_plugin_dist_css_medium_editor_insert_plugin_min_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var medium_editor_dist_css_medium_editor_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! medium-editor/dist/css/medium-editor.min.css */ "b6Sd");
/* harmony import */ var medium_editor_dist_css_medium_editor_min_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(medium_editor_dist_css_medium_editor_min_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var medium_editor_dist_css_themes_default_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! medium-editor/dist/css/themes/default.min.css */ "6hgr");
/* harmony import */ var medium_editor_dist_css_themes_default_min_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(medium_editor_dist_css_themes_default_min_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/config/toastr */ "mRKG");
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









var converter = new showdown__WEBPACK_IMPORTED_MODULE_4__["Converter"]({
    simpleLineBreaks: true,
    noHeaderId: true,
});
var EditorCtrl = /** @class */ (function () {
    function EditorCtrl($scope, $sce, $http, $timeout, postService, authService, editorService, walletService, scopeService, API_URL) {
        var _this = this;
        this.$scope = $scope;
        this.$sce = $sce;
        this.$http = $http;
        this.$timeout = $timeout;
        this.postService = postService;
        this.authService = authService;
        this.editorService = editorService;
        this.walletService = walletService;
        this.scopeService = scopeService;
        this.API_URL = API_URL;
        var titleEditor;
        var bodyEditor;
        var fixedBody;
        $scope.isLoading = false;
        $scope.draft = {};
        $scope.ready = false;
        $scope.Saving = {
            body: false,
            title: false
        };
        $scope.isFullPostShown = false;
        $scope.hasPaidSection = false;
        $scope.publishTouched = false;
        $scope.paidSectionLineBreakTouched = false;
        $scope.paidSectionCostInBCH = 0;
        $scope.paidSectionCostInUSD = 0;
        $scope.showPaidSectionCostInUSD = false;
        $scope.toggleFullPost = function () { return $scope.isFullPostShown = !$scope.isFullPostShown; };
        $scope.trustAsHtml = function (html) {
            return $sce.trustAsHtml(html);
        };
        var setPaidSectionLinebreakEnd = function () {
            $scope.paidSectionLinebreakEnd = $(fixedBody).length;
        };
        var adjustPaidSectionLinebreak = function (action) {
            if (action === "increment") {
                $scope.draft.paidSectionLinebreak += 1;
            }
            else if (action === "decrement") {
                $scope.draft.paidSectionLinebreak -= 1;
            }
            $scope.paidSectionLineBreakTouched = true;
        };
        var scrollToLinebreak = function (action, toLinebreak) {
            var $container = $('.post-paid-section-preview-paid-section');
            var $scrollTo = $container.children().eq($scope.draft.paidSectionLinebreak - 1);
            if (toLinebreak === null || toLinebreak === undefined) {
                $container.animate({
                    scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                });
                var $sibling = void 0;
                if (action === "increment") {
                    $sibling = $scrollTo.prev();
                }
                else if (action === "decrement") {
                    $sibling = $scrollTo.next();
                }
                if ($sibling) {
                    $sibling.removeClass("bb-2 bb-dashed bb-red");
                }
                $scrollTo.addClass("bb-2 bb-dashed bb-red");
            }
            else {
                // timeout is required
                setTimeout(function () {
                    var $scrollTo = $container.children().eq(toLinebreak - 1);
                    $container.scrollTop($scrollTo.offset().top - $container.offset().top + $container.scrollTop());
                    $scrollTo.addClass("bb-2 bb-dashed bb-red");
                }, 0);
            }
        };
        $scope.switchLinebreak = function (action) {
            switch (action) {
                case ("increment"):
                    if ($scope.draft.paidSectionLinebreak < $scope.paidSectionLinebreakEnd - 1) {
                        adjustPaidSectionLinebreak(action);
                        refreshBodies();
                        scrollToLinebreak(action);
                    }
                    break;
                case ("decrement"):
                    if ($scope.draft.paidSectionLinebreak > 0) {
                        adjustPaidSectionLinebreak(action);
                        refreshBodies();
                        scrollToLinebreak(action);
                    }
                    break;
                default:
                    break;
            }
        };
        $scope.setPaidSectionCost = function (currency) { return __awaiter(_this, void 0, void 0, function () {
            var cost, usd, bch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(currency === 'bch')) return [3 /*break*/, 2];
                        // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
                        cost = document.getElementById("paidSectionCostInBCH").valueAsNumber || 0;
                        return [4 /*yield*/, this.walletService.convertBCHtoUSD(cost)];
                    case 1:
                        usd = (_a.sent()).usd;
                        document.getElementById("paidSectionCostInUSD").valueAsNumber = usd;
                        $scope.paidSectionCostInUSD = usd;
                        this.scopeService.safeApply($scope);
                        return [3 /*break*/, 4];
                    case 2:
                        if (!(currency === 'usd')) return [3 /*break*/, 4];
                        // bug in mozilla or angular itself that ng-model does not update when clicking arrows in input number
                        cost = document.getElementById("paidSectionCostInUSD").valueAsNumber || 0;
                        return [4 /*yield*/, this.walletService.convertUSDtoBCH(cost)];
                    case 3:
                        bch = (_a.sent()).bch;
                        document.getElementById("paidSectionCostInBCH").valueAsNumber = bch;
                        $scope.draft.paidSectionCost = bch;
                        this.scopeService.safeApply($scope);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        $scope.togglePaidSection = function () {
            $scope.draft.hasPaidSection = !$scope.draft.hasPaidSection;
            if ($scope.draft.hasPaidSection) {
                if ($scope.draft.paidSectionLinebreak === null) {
                    $scope.draft.paidSectionLinebreak = 1;
                }
                checkForCurrencyConversion();
                var linebreak_1 = $scope.draft.paidSectionLinebreak !== null ? $scope.draft.paidSectionLinebreak : 0;
                setTimeout(function () {
                    scrollToLinebreak(undefined, linebreak_1);
                }, 0);
            }
        };
        var checkForCurrencyConversion = function () {
            _this.walletService.convertBCHtoUSD($scope.draft.paidSectionCost).then(function (currencies) {
                $scope.$apply(function () {
                    $scope.showPaidSectionCostInUSD = true;
                    $scope.paidSectionCostInUSD = currencies.usd;
                    $scope.setPaidSectionCost('bch');
                });
            });
        };
        var refreshBodies = function (externalHtml) {
            fixedBody = _this.editorService.getFixedBody(bodyEditor, externalHtml);
            $scope.fixedBody = fixedBody;
            $scope.freeBodyCut = _this.editorService.getSectionHtml("free", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
            $scope.paidBodyCut = _this.editorService.getSectionHtml("paid", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
            $scope.paidBodyCutEnd = _this.editorService.getSectionHtml("paidEnd", $scope.paidSectionLinebreak, $scope.paidSectionLinebreakEnd);
            setPaidSectionLinebreakEnd();
        };
        var parentPostId;
        var postId;
        var editingMode = "write";
        var locPath = location.pathname.split("/");
        var locQuery = location.search;
        var isFreshDraft = locQuery.indexOf("new=true") !== -1;
        if (isFreshDraft) {
            editingMode = "writeFresh";
        }
        if (locPath[1] === "write" && locPath[2] === "response") {
            parentPostId = locPath[3];
            editingMode = "response";
        }
        if (locPath[1] === "edit") {
            postId = locPath[2];
            editingMode = "edit";
        }
        var saveDraftElement = function (element, cb) {
            refreshBodies();
            var md = converter.makeMd(_this.editorService.getFixedBody(bodyEditor));
            var post = {
                body: md,
                hashtags: $("input#description").val() || "",
                title: document.getElementById("title").innerText,
                hasPaidSection: $scope.draft.hasPaidSection,
                paidSectionLinebreak: $scope.draft.paidSectionLinebreak,
                paidSectionCost: $scope.draft.paidSectionCost
            };
            if (!post.body && !post.title && !post.hashtags) {
                $scope.saving = null;
                return cb && cb();
            }
            if (element === "paidSection" && post.hasPaidSection && $scope.paidSectionLineBreakTouched && post.paidSectionCost === 0) {
                $scope.saving = null;
                return cb && cb();
            }
            $http.put(API_URL + "/draft/" + $scope.draft.id + "/" + element, post)
                .then(function (response) {
                $scope.saving = null;
                return cb && cb();
            }, cb);
        };
        $scope.displayFeedBody = function (html) { return _this.postService.displayHTML(html); };
        $scope.readyToPublish = function () {
            if (!document.getElementById("title").innerText) {
                return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].error("The story needs to have a title");
            }
            if (bodyEditor.serialize().body.value.length < 50) {
                return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].error("The story needs to be at least 50 characters.");
            }
            refreshBodies();
            bodyEditor.setContent(fixedBody, 0);
            $("#publishModal").modal("show");
            if ($scope.draft.hasPaidSection && $scope.draft.paidSectionLinebreak) {
                checkForCurrencyConversion();
                var linebreak = $scope.draft.paidSectionLinebreak !== null ? $scope.draft.paidSectionLinebreak : 0;
                scrollToLinebreak(undefined, linebreak);
            }
        };
        $scope.publishPost = function (postId) {
            if ($scope.hasPaidSection && !$scope.paidSectionLineBreakTouched) {
                $scope.publishTouched = true;
                return;
            }
            if ($scope.isLoading === true) {
                return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].info("Saving...");
            }
            $scope.isLoading = true;
            var publishedPost;
            async__WEBPACK_IMPORTED_MODULE_2__["series"]([
                function (cb) {
                    async__WEBPACK_IMPORTED_MODULE_2__["parallel"]([
                        function (cb) { return saveDraftElement("title", cb); },
                        function (cb) { return saveDraftElement("body", cb); },
                        function (cb) { return saveDraftElement("hashtags", cb); },
                        function (cb) { return saveDraftElement("paidSection", cb); },
                    ], cb);
                },
                function (cb) {
                    $http.put(API_URL + "/draft/" + postId + "/publish")
                        .then(function (response) {
                        if (response.status !== 200) {
                            return cb(response);
                        }
                        publishedPost = response.data;
                        return cb();
                    }, cb);
                }
            ], function (errResponse) {
                $scope.isLoading = false;
                if (errResponse) {
                    if (errResponse.status == 400) {
                        if (errResponse.data.code == "TITLE_TOO_SHORT") {
                            return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].warning("Title is too short.");
                        }
                        if (errResponse.data.code == "POST_TOO_SHORT") {
                            return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].warning("Your story is too short. The minimum number of characters is 50.");
                        }
                    }
                    return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].warning(errResponse.data.desc || errResponse.data.code);
                }
                _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].success("You have successfully published your story.");
                $("#publishModal").modal("hide");
                $timeout(function () {
                    location.href = "/" + publishedPost.user.username + "/" + publishedPost.alias + "/";
                }, 500);
            });
        };
        $scope.switchEditor = function () {
            if (editingMode === "write") {
                window.location.href = "/markdown/write";
            }
            else if (editingMode === "writeFresh") {
                window.location.href = "/markdown/write?new=true";
            }
            else if (editingMode === "edit") {
                window.location.href = "/markdown/edit/" + postId;
            }
            else if (editingMode === "response") {
                window.location.href = "/markdown/write/response/" + parentPostId;
            }
        };
        var onContentChangedFactory = function (element) { return function () {
            if ($scope.draft.status === "published") {
                return;
            }
            if ($scope.Saving[element]) {
                clearTimeout($scope.Saving[element]);
            }
            $scope.Saving[element] = setTimeout(function () {
                saveDraftElement(element, function () { return _core_config_toastr__WEBPACK_IMPORTED_MODULE_8__["default"].success("Draft has been saved."); });
            }, 3000);
        }; };
        var initMediumEditor = function (title, bodyMD) {
            titleEditor = new medium_editor__WEBPACK_IMPORTED_MODULE_3___default.a("#title", {
                buttons: [],
                disableDoubleReturn: true,
                disableReturn: true,
                paste: {
                    cleanAttrs: ["class", "style"],
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanTags: [
                        "meta", "dir", "h1", "h4", "h5", "h6", "table", "tr", "td", "a", "ul", "li", "code", "pre"
                    ],
                    forcePlainText: true,
                    unwrapTags: []
                },
                placeholder: {
                    hideOnClick: true,
                    text: "Title"
                },
                toolbar: false
            });
            bodyEditor = new medium_editor__WEBPACK_IMPORTED_MODULE_3___default.a("#body", {
                anchorPreview: true,
                // disabled because broken on markdown
                autoLink: false,
                buttonLabels: "fontawesome",
                extensions: {},
                placeholder: {
                    hideOnClick: true,
                    text: $scope.draft.parentPostId ? "Write your comment" : "Tell your story...",
                },
                toolbar: {
                    buttons: ["bold", "italic", "unorderedlist", "anchor", "h2", "h3", "pre"]
                },
                paste: {
                    cleanAttrs: ["id", "class", "style"],
                    cleanPastedHTML: true,
                    cleanReplacements: [],
                    cleanTags: [
                        "img",
                        "meta",
                        "div",
                        "h1",
                        "h4",
                        "h5",
                        "h6",
                        "table",
                        "tr",
                        "td",
                        "code"
                    ],
                    forcePlainText: true,
                    unwrapTags: []
                }
            });
            $("#body").mediumInsert({
                addons: {
                    embeds: false,
                    images: {
                        autoGrid: 3,
                        captionPlaceholder: "",
                        captions: false,
                        deleteMethod: "",
                        deleteScript: "",
                        // (object) extra parameters send on the delete ajax request
                        // see http://api.jquery.com/jquery.ajax/
                        fileDeleteOptions: {},
                        formData: {},
                        label: "<span class='fa fa-camera'></span>",
                        uploadScript: null,
                        preview: false,
                        fileUploadOptions: {
                            // (object) File upload configuration.
                            // See https://github.com/blueimp/jQuery-File-Upload/wiki/Options
                            url: API_URL + "/upload/image",
                            acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                            headers: {
                                "x-auth-token": _this.authService.getAuthToken()
                            },
                        },
                        actions: {
                            remove: {
                                label: "<span class='fa fa-times'></span>",
                                // (function) Callback function called when an action is selected
                                clicked: function ($el) {
                                    var $event = $.Event("keydown");
                                    $event.which = 8;
                                    $(document).trigger($event);
                                }
                            }
                        },
                        messages: {
                            acceptFileTypesError: "This file is not in a supported format: ",
                            maxFileSizeError: "This file is too big: "
                        },
                        uploadCompleted: function ($el, data) {
                            console.log($el, data);
                        },
                        uploadFailed: function (uploadErrors, data) {
                            console.log(uploadErrors, data);
                        }
                    }
                },
                editor: bodyEditor
            });
            if (title) {
                document.getElementById("title").setAttribute("data-placeholder", "");
                titleEditor.setContent(title, 0);
            }
            if (!title && _this.$scope.draft.parentPostId) {
                titleEditor.setContent(title || "RE: " + _this.$scope.draft.parentPost.title, 0);
            }
            if (bodyMD) {
                document.getElementById("body").setAttribute("data-placeholder", "");
                var html = converter.makeHtml(bodyMD);
                refreshBodies(html);
                setPaidSectionLinebreakEnd();
                bodyEditor.setContent(fixedBody, 0);
            }
            bodyEditor.subscribe("editableInput", onContentChangedFactory("body"));
            titleEditor.subscribe("editableInput", onContentChangedFactory("title"));
        };
        var initEditor = function (postId) {
            if (!postId) {
                alert("Editor cannot be initialized");
            }
            $("#description").tagit({
                tagLimit: 6,
                afterTagAdded: function (event, ui) {
                    if ($scope.ready) {
                        saveDraftElement("hashtags");
                    }
                }
            });
            var hashtags = $scope.draft.userPostHashtags || [];
            hashtags.forEach(function (hashtag) {
                $("#description").tagit("createTag", hashtag.hashtag);
            });
            initMediumEditor($scope.draft.title, $scope.draft.bodyMD);
            _this.initTippy();
            $scope.ready = true;
        };
        var loadPostDraft = function (lPostId) {
            var url = API_URL;
            url += parentPostId ?
                "/draft?parentPostId=" + parentPostId :
                lPostId ? "/post/" + lPostId : "/draft";
            $http.get(url)
                .then(function (response) {
                $scope.draft = response.data;
                initEditor($scope.draft.id);
            }, function (err) {
                console.log(err);
            });
        };
        var loadNewPostDraft = function () {
            var url = API_URL + "/draft";
            $http.post(url, {})
                .then(function (response) {
                $scope.draft = response.data;
                initEditor($scope.draft.id);
            }, function (err) {
                console.log(err);
            });
        };
        if (editingMode === "writeFresh") {
            loadNewPostDraft();
        }
        else {
            loadPostDraft(postId);
        }
    }
    EditorCtrl.prototype.initTippy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Object(tippy_js__WEBPACK_IMPORTED_MODULE_0__["default"])(".hc-tooltip");
                return [2 /*return*/];
            });
        });
    };
    EditorCtrl.$inject = [
        "$scope",
        "$sce",
        "$http",
        "$timeout",
        "PostService",
        "AuthService",
        "EditorService",
        "WalletService",
        "ScopeService",
        "API_URL"
    ];
    return EditorCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (EditorCtrl);


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

/***/ "NNU/":
/*!**********************************************!*\
  !*** ./src/editor/services/EditorService.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! showdown */ "M55E");
/* harmony import */ var showdown__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(showdown__WEBPACK_IMPORTED_MODULE_0__);

var converter = new showdown__WEBPACK_IMPORTED_MODULE_0__["Converter"]({
    simpleLineBreaks: true,
    noHeaderId: true,
});
var EditorService = /** @class */ (function () {
    function EditorService() {
        var _this = this;
        this.stringIncludes = function (string, find) {
            return string.indexOf(find) !== -1;
        };
        this.getFixedBody = function (editor, externalHtml) {
            // converting from html to md to html cleans the body
            var bodyHtml = externalHtml ? externalHtml : editor.serialize().body.value;
            var $bodyHtml = $(bodyHtml);
            // the html is to replace the body in the editor
            var _fixedBody = '';
            $bodyHtml.map(function (i) {
                var _elem = $bodyHtml[i];
                var $elem = $($bodyHtml[i]);
                // find divs that are inserted by the mediumeditor mediuminsert plugin
                // with showdown converted syntax
                // showdown only has img inside a p tag
                // we rewrap the div with p tag here
                if ($elem.prop("nodeName") === "DIV" && _this.stringIncludes($elem.prop("className"), "medium-insert-images")) {
                    var content = $elem;
                    var img = _this.getOuterHtml($(content).find('img'));
                    var imgWrapped = "<p>" + img + "</p>";
                    _fixedBody += imgWrapped;
                }
                else if (_elem.nodeName === "P" && $elem.prop("childNodes").length === 1) {
                    //check for tags that only has br tags in it
                    if ($elem.children().first().prop("nodeName") !== "BR") {
                        _fixedBody += _this.getOuterHtml($elem);
                    }
                }
                else if (!_this.stringIncludes(_elem.nodeName, "#text") && !_this.stringIncludes(_elem.nodeName, "#comment")) {
                    // we form our last new html
                    _fixedBody += _this.getOuterHtml($elem);
                }
            });
            // elements and html is returned as tuple
            _this.fixedBody = _fixedBody;
            return _fixedBody;
        };
        this.getContextElement = function (n, linebreak, linebreakEnd) {
            switch (n) {
                case "free":
                    return $(_this.elements).eq(linebreak);
                case "paid":
                    return $(_this.elements).eq(linebreak + 1);
                case "paidEnd":
                    return $(_this.elements).eq(linebreakEnd - 1);
                default:
                    break;
            }
        };
        this.getOuterHtml = function (element) {
            if (element[0]) {
                element = element[0];
            }
            return $(element).prop("outerHTML");
        };
        this.getSectionHtml = function (n, linebreak, linebreakEnd) {
            return _this.getOuterHtml(_this.getContextElement(n, linebreak, linebreakEnd));
        };
        this.ngOnInit();
    }
    EditorService.prototype.ngOnInit = function () {
    };
    EditorService.$inject = [];
    return EditorService;
}());
/* harmony default export */ __webpack_exports__["default"] = (EditorService);


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

/***/ "f29u":
/*!******************************!*\
  !*** ./src/editor/states.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return state; });
function state($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('editor', {
        abstract: true,
        controller: "EditorCtrl",
        templateUrl: "/templates/layout_write.html",
    })
        .state('editor.write', {
        url: "/write",
        templateUrl: "/templates/write.html",
    })
        .state('editor.response', {
        url: "/write/response/:parentPostId",
        templateUrl: "/templates/write.html",
    })
        .state('editor.edit', {
        url: "/edit/:postId",
        templateUrl: "/templates/write.html",
    });
}
;


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

/***/ "ji1u":
/*!******************************!*\
  !*** ./src/editor/editor.ts ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular-ui-router */ "VZTK");
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular_ui_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/style.css */ "hZLO");
/* harmony import */ var _core_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.css */ "srSP");
/* harmony import */ var _editor_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_editor_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _EditorCtrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EditorCtrl */ "9rkc");
/* harmony import */ var _core_config_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/config/routing */ "leVX");
/* harmony import */ var _core_config_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/config/http */ "hpYq");
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./states */ "f29u");
/* harmony import */ var _auth_AuthModule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../auth/AuthModule */ "WPZs");
/* harmony import */ var _core_services_PostService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../core/services/PostService */ "TNtq");
/* harmony import */ var _core_services_WalletService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/services/WalletService */ "Axmg");
/* harmony import */ var _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/services/ScopeService */ "b3j/");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/config */ "u61H");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services */ "vyEK");
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
// import angular from 'angular';













angular.module("editor-app", [
    angular_ui_router__WEBPACK_IMPORTED_MODULE_0___default.a,
    'ui.bootstrap',
    "vqAuth",
    "vqConfig",
    "vqServices"
])
    .config(["$locationProvider", "$urlMatcherFactoryProvider", _core_config_routing__WEBPACK_IMPORTED_MODULE_4__["default"]])
    .config(["$httpProvider", _core_config_http__WEBPACK_IMPORTED_MODULE_5__["default"]])
    .config(["$stateProvider", "$urlRouterProvider", _states__WEBPACK_IMPORTED_MODULE_6__["default"]])
    .service("PostService", _core_services_PostService__WEBPACK_IMPORTED_MODULE_8__["default"])
    .service("WalletService", _core_services_WalletService__WEBPACK_IMPORTED_MODULE_9__["default"])
    .service("ScopeService", _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_10__["default"])
    .controller("EditorCtrl", _EditorCtrl__WEBPACK_IMPORTED_MODULE_3__["default"])
    .run(["$rootScope", "AuthService", function ($rootScope, AuthService) { return __awaiter(_this, void 0, void 0, function () {
        var res, err_1, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, AuthService.validate(function () { })];
                case 1:
                    res = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, location.href = "/login"];
                case 3:
                    data = res.data;
                    $rootScope.user = {
                        id: data.id,
                        imageUrl: data.imageUrl,
                        username: data.username
                    };
                    return [2 /*return*/];
            }
        });
    }); }]);


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

/***/ "m64I":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/editor/editor.css ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "#title:focus,\narticle:focus {\n  outline: none;\n}\n.medium-insert-images-toolbar {\n  display: none !important;\n}\n.hr-text {\n  line-height: 1em;\n  position: relative;\n  cursor: pointer;\n  outline: 0;\n  border: 0;\n  color: black;\n  text-align: center;\n  height: 1.5em;\n  opacity: 0.5;\n}\n.hr-text:before {\n  content: \"\";\n  background: linear-gradient(to right, transparent, #818078, transparent);\n  position: absolute;\n  left: 0;\n  top: 50%;\n  width: 100%;\n  height: 1px;\n}\n.hr-text:after {\n  content: attr(data-content);\n  position: relative;\n  display: inline-block;\n  color: black;\n  padding: 0 0.5em;\n  line-height: 1.5em;\n  color: #000;\n  background-color: #fcfcfa;\n}\n#post-toggleable-container .panel-body {\n  padding-bottom: 0px;\n}\n#post-toggleable-container .panel-footer {\n  padding-bottom: 0px;\n  text-align: center;\n  border: none;\n  padding-top: 0px;\n  background-color: #fff;\n}\n#post-toggleable-container.post-toggled .panel-body {\n  padding-bottom: 15px;\n}\n#post-toggleable-container #editor-post-reference {\n  color: #333;\n  max-height: 30vh;\n  overflow-y: hidden;\n  padding-left: 0px;\n  padding-right: 0px;\n  position: relative;\n}\n#post-toggleable-container.post-toggled #editor-post-reference {\n  max-height: 100vh;\n}\n#post-toggleable-container:not(.post-toggled) #editor-post-reference:before {\n  content: \"\";\n  position: absolute;\n  width: 100%;\n  height: 20em;\n  left: 0;\n  bottom: 0;\n  background: linear-gradient(transparent 0, #fff);\n  border-radius: 2px;\n  z-index: 1;\n  padding-left: 15px;\n  padding-right: 15px;\n}\nh1,\n.h1,\n.medium-editor-element > h1,\n.medium-editor-element > .h1 {\n  font-size: 22px;\n  margin: 5px 0px 5px 0px;\n}\nh2,\n.h2,\n.medium-editor-element > h2,\n.medium-editor-element > .h2 {\n  font-size: 20px;\n  margin: 5px 0px 5px 0px;\n}\nh3,\n.h3,\n.medium-editor-element > h3,\n.medium-editor-element > .h3 {\n  font-size: 18px;\n  margin: 5px 0px 5px 0px;\n}\nh4,\n.h4,\n.medium-editor-element > h4,\n.medium-editor-element > .h4 {\n  font-size: 16px;\n  margin: 5px 0px 5px 0px;\n}\nh5,\n.h5,\n.medium-editor-element > h5,\n.medium-editor-element > .h5 {\n  font-size: 14px;\n  margin: 10px 0px 10px 0px;\n}\nh6,\n.h6,\n.medium-editor-element > h6,\n.medium-editor-element > .h6 {\n  font-size: 12px;\n  margin: 10px 0px 10px 0px;\n}\np,\n.p,\n.medium-editor-element > p,\n.medium-editor-element > .p,\n.medium-editor-element.medium-editor-insert-plugin > .p {\n  font-size: 15px;\n  margin: 0 0 10px !important;\n}\nspan,\n.span,\n.medium-editor-element > span,\n.medium-editor-element > .span {\n  font-size: 15px;\n  margin: 0 0 10px !important;\n}\nul,\nul > li,\nli,\n.medium-editor-element > ul,\n.medium-editor-element > ul > li,\n.medium-editor-element > li {\n  font-size: 15px;\n}\nol,\nol > li,\nli,\n.medium-editor-element > ol,\n.medium-editor-element > ol > li,\n.medium-editor-element > li {\n  font-size: 15px;\n}\n.editor ul,\n.editor ul li,\n.editor li,\n.preview ul,\n.preview ul li,\n.preview li {\n  font-size: 15px;\n  margin: 0 0 10px !important;\n}\n.editor ol,\n.editor ol li,\n.editor li,\n.preview ol,\n.preview ol li,\n.preview li {\n  font-size: 15px;\n  margin: 0 0 10px !important;\n}\n.editor pre,\n.preview pre,\n.post-paid-section-preview-paid-section pre {\n  font-size: 15px;\n  margin: 0 10px 10px 10px !important;\n}\n.post-paid-section-preview-paid-section pre {\n  font-size: 13px;\n}\n.post-paid-section-preview-paid-section li > p {\n  display: initial;\n}\n.modal-body,\n.modal-body > p,\n.modal-body > span,\n.medium-editor-element > p,\n.medium-editor-element > span,\n.medium-editor-element > ul,\n.medium-editor-element > ul > li,\n.medium-editor-element > ol,\n.medium-editor-element > ol > li,\n.medium-editor-element > li {\n  font-size: 15px;\n}\n#publishModal .alert {\n  padding: 5px;\n  margin-bottom: 0px;\n}\n.opacity-0 {\n  opacity: 0;\n}\n.mb-0 {\n  margin-bottom: 0px !important;\n}\n.mb-1 {\n  margin-bottom: 10px !important;\n}\n.mb-2 {\n  margin-bottom: 20px !important;\n}\n.mt-2 {\n  margin-top: 20px !important;\n}\n.br-1 {\n  border-right-width: 1px;\n  border-right-style: solid;\n}\n.br-grey {\n  border-right-color: #c5c5c5;\n}\n.bb-1 {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n.bb-2 {\n  border-bottom-width: 2px;\n  border-bottom-style: solid;\n}\n.bb-dashed {\n  border-bottom-style: dashed;\n}\n.bb-grey {\n  border-bottom-color: #c5c5c5;\n}\n.bb-red {\n  border-bottom-color: red;\n}\n.bt-1 {\n  border-top-width: 1px;\n  border-top-style: solid;\n}\n.bt-grey {\n  border-top-color: #c5c5c5;\n}\n.bl-1 {\n  border-left-width: 1px;\n  border-left-style: solid;\n}\n.bl-grey {\n  border-left-color: #c5c5c5;\n}\n.b-red {\n  border-color: #a94442 !important;\n}\n.b-2 {\n  border-width: 2px !important;\n}\n.b-collapse {\n  border-collapse: collapse;\n}\n.c-red {\n  color: #a94442;\n}\n.flex {\n  display: flex;\n}\n.flex-wrap {\n  flex-wrap: wrap;\n}\n.flex-vertical-center {\n  align-items: center;\n  justify-content: center;\n}\n.flex-vertical-end {\n  align-items: flex-end;\n}\n.f-normal {\n  font-weight: initial;\n}\n.h-100 {\n  height: 100%;\n}\n.post-paid-section-preview-wrapper {\n  border: 1px solid #c5c5c5;\n  border-radius: 3px;\n  padding: 0px;\n}\n.post-paid-section-preview-paid-section,\n.post-paid-section-preview-free-section {\n  font-weight: initial;\n}\n.post-paid-section-preview-paid-section {\n  max-height: 300px;\n  overflow: auto;\n  width: 100%;\n}\n.post-paid-section-preview-paid-section > * {\n  padding: 0px 15px;\n}\n.post-paid-section-preview-paid-section > ul,\n.post-paid-section-preview-paid-section > ul > li,\n.post-paid-section-preview-paid-section > ol,\n.post-paid-section-preview-paid-section > ol > li {\n  list-style-position: inside;\n  padding-left: 20px;\n}\n.post-paid-section-preview-paid-section > blockquote {\n  margin-left: 15px;\n}\n/* hide scrollbars */\n.post-paid-section-preview-paid-section {\n  overflow-y: scroll;\n  scrollbar-width: none;\n  /* Firefox */\n  -ms-overflow-style: none;\n  /* IE 10+ */\n}\n.post-paid-section-preview-paid-section::-webkit-scrollbar {\n  /* WebKit */\n  width: 0;\n  height: 0;\n}\n/* hide scrollbars end*/\n.post-paid-section-arrows {\n  height: 100%;\n  padding: 0 20px;\n}\n.post-paid-section-arrows-mobile {\n  margin-top: 20px;\n  padding: 0px;\n  border: 1px solid #c5c5c5;\n  border-radius: 3px;\n}\n.post-paid-section-arrows-mobile > .post-paid-section-up-arrow,\n.post-paid-section-arrows-mobile > .post-paid-section-down-arrow {\n  float: left;\n  width: 50%;\n  background-color: #ededed;\n  padding: 10px 0px;\n}\n.post-paid-section-arrows > .post-paid-section-up-arrow,\n.post-paid-section-arrows > .post-paid-section-down-arrow,\n.post-paid-section-arrows-mobile > .post-paid-section-up-arrow,\n.post-paid-section-arrows-mobile > .post-paid-section-down-arrow {\n  transition: font-size 0.2s;\n  cursor: pointer;\n}\n.post-paid-section-arrows > .post-paid-section-up-arrow {\n  align-self: end;\n}\n.post-paid-section-arrows > .post-paid-section-up-arrow:hover,\n.post-paid-section-arrows > .post-paid-section-down-arrow:hover {\n  font-size: 16px;\n}\n.post-paid-section-linebreak {\n  position: absolute;\n  top: 42%;\n  left: 23px;\n}\n.post-paid-section-preview-wrapper p {\n  margin-bottom: 0px;\n}\n.linebreak-switch-disabled {\n  color: grey;\n  cursor: not-allowed !important;\n}\ninput:invalid {\n  outline: 0px;\n  box-shadow: none;\n}\n", ""]);

// exports


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

/***/ "srSP":
/*!*******************************!*\
  !*** ./src/editor/editor.css ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/less-loader/dist/cjs.js!./editor.css */ "m64I");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

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

/***/ "vyEK":
/*!**************************************!*\
  !*** ./src/editor/services/index.ts ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _EditorService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EditorService */ "NNU/");
/* harmony import */ var _core_services_WalletService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/WalletService */ "Axmg");
/* harmony import */ var _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/services/ScopeService */ "b3j/");



angular.module("vqServices", ["vqConfig"])
    .service("EditorService", _EditorService__WEBPACK_IMPORTED_MODULE_0__["default"])
    .service("ScopeService", _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_2__["default"])
    .service("WalletService", _core_services_WalletService__WEBPACK_IMPORTED_MODULE_1__["default"]);


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



/***/ })

},[["ji1u","runtime","vendors"]]]);
//# sourceMappingURL=editor.5fe1956b991b281e78bd.js.map