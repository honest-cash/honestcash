(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["welcome"],{

/***/ "13N9":
/*!*******************************!*\
  !*** ./src/welcome/states.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return state; });
function state($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/signup");
    $stateProvider
        .state("login", {
        controller: "welcomeCtrl",
        controllerAs: "welcomeCtrl",
        url: "/login?code",
        templateUrl: "/templates/new-login.html"
    })
        .state("signup", {
        controller: "welcomeCtrl",
        controllerAs: "welcomeCtrl",
        url: "/signup",
        templateUrl: "/templates/welcome.html"
    })
        .state("thankyou", {
        controller: "welcomeCtrl",
        url: "/thank-you",
        templateUrl: "/templates/thankyou.html"
    });
    $stateProvider
        .state("starter", {
        templateUrl: "/templates/layout.html",
        controller: "welcomeCtrl"
    })
        .state("starter.about", {
        url: "/about",
        templateUrl: "/templates/about.html"
    });
}
;


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

/***/ "Htdk":
/*!*********************************!*\
  !*** ./src/welcome/welcome.css ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/less-loader/dist/cjs.js!./welcome.css */ "IM4G");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(/*! ../../node_modules/style-loader/addStyles.js */ "ZuTH")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "ICeO":
/*!************************************!*\
  !*** ./src/welcome/WelcomeCtrl.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert */ "GUC0");
/* harmony import */ var sweetalert__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_lib_bitcoinAuthFlow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lib/bitcoinAuthFlow */ "N3/m");
/* harmony import */ var _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lib/simpleWalletProvider */ "jAkR");
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



var WelcomeCtrl = /** @class */ (function () {
    function WelcomeCtrl($rootScope, $scope, $location, $state, authService, profileService, scopeService) {
        var _this = this;
        this.$rootScope = $rootScope;
        this.$scope = $scope;
        this.$location = $location;
        this.$state = $state;
        this.authService = authService;
        this.profileService = profileService;
        this.scopeService = scopeService;
        this.isLoading = false;
        this.forgot = false;
        this.noHeader = true;
        this.welcome = true;
        this.hideForm = false;
        this.showEmailSignup = false;
        this.isCaptchaRendered = false;
        this.goToForgotPage = function () {
            _this.forgot = true;
        };
        this.goToLoginPage = function () {
            _this.forgot = false;
        };
        this.login = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var passwordHash, authData, response_1, mnemonicEncrypted, sbw, simpleWallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        passwordHash = this.authService.calculatePasswordHash(data.loginemail, data.loginpassword);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService.login({
                                email: data.loginemail,
                                password: passwordHash
                            })];
                    case 2:
                        authData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_1 = _a.sent();
                        this.isLoading = false;
                        return [2 /*return*/, this.displayErrorMessage(response_1.data.code, response_1.data.desc)];
                    case 4:
                        this.isLoading = false;
                        if (!authData.wallet) return [3 /*break*/, 5];
                        mnemonicEncrypted = authData.wallet.mnemonicEncrypted;
                        return [3 /*break*/, 10];
                    case 5:
                        sbw = new SimpleWallet();
                        sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, data.loginpassword);
                        mnemonicEncrypted = sbw.mnemonicEncrypted;
                        return [4 /*yield*/, this.authService.setWallet({
                                mnemonicEncrypted: mnemonicEncrypted
                            })];
                    case 6:
                        _a.sent();
                        if (!!authData.user.addressBCH) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.profileService.updateUser(authData.user.id, "addressBCH", sbw.address)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, this.setAddressForTips(authData.user.id, sbw.address)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__["loadWallet"](mnemonicEncrypted, data.loginpassword);
                        simpleWallet = _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__["get"]();
                        if (!(authData.wallet && !authData.user.addressBCH)) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.setAddressForTips(authData.user.id, simpleWallet.address)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        this.$rootScope.user = authData.user;
                        location.href = "/";
                        return [2 /*return*/];
                }
            });
        }); };
        this.resetPassword = function (data) { return __awaiter(_this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService.resetPassword({
                                email: data.loginemail
                            })];
                    case 2:
                        _a.sent();
                        this.hideForm = true;
                        this.message = "Check your e-mail inbox.";
                        this.isLoading = false;
                        this.scopeService.safeApply(this.$scope);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.isLoading = false;
                        return [2 /*return*/, this.displayErrorMessage(typeof err_1.data === "string" ? err_1.data : err_1.data.code)];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.setAddressForTips = function (userId, bchAddress) { return __awaiter(_this, void 0, void 0, function () {
            var hasConfirmed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()({
                            title: "Receiving tips",
                            text: "Would you like to also receive tips to the same wallet? You can always change it in your profile.",
                            type: "warning",
                            buttons: {
                                cancel: true,
                                confirm: true
                            }
                        })];
                    case 1:
                        hasConfirmed = _a.sent();
                        if (!hasConfirmed) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.profileService.updateUser(Number(userId), "addressBCH", bchAddress)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.ngInit();
    }
    WelcomeCtrl.prototype.signupWith = function (signupMethod) {
        if (signupMethod === "email") {
            this.showEmailSignup = true;
            this.renderCaptcha();
        }
        this.scopeService.safeApply(this.$scope);
    };
    WelcomeCtrl.prototype.changePassword = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var simpleWallet, err_2, passwordHash, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (data.loginpassword !== data.loginpasswordreset) {
                            this.message = "Passwords do not match!";
                            return [2 /*return*/];
                        }
                        this.isLoading = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 5]);
                        return [4 /*yield*/, Object(_core_lib_bitcoinAuthFlow__WEBPACK_IMPORTED_MODULE_1__["default"])({
                                password: data.loginpassword
                            })];
                    case 2:
                        simpleWallet = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _a.sent();
                        return [4 /*yield*/, sweetalert__WEBPACK_IMPORTED_MODULE_0___default()("Your link is invalid!")];
                    case 4:
                        _a.sent();
                        location.href = "/login";
                        return [2 /*return*/];
                    case 5:
                        passwordHash = this.authService.calculatePasswordHash(data.loginemail, data.loginpassword);
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, this.authService.changePassword({
                                code: this.resetCode,
                                email: data.loginemail,
                                mnemonicEncrypted: simpleWallet.mnemonicEncrypted,
                                newPassword: passwordHash,
                                repeatNewPassword: passwordHash
                            })];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        this.isLoading = false;
                        return [2 /*return*/, this.displayErrorMessage(typeof err_3.data === "string" ? err_3.data : err_3.data.code)];
                    case 9:
                        this.message = "Your password has been reset and a new wallet has been generated. You can now log-in.";
                        data.loginemail = undefined;
                        data.loginpassword = undefined;
                        data.loginpasswordreset = undefined;
                        this.resetCode = undefined;
                        this.forgot = false;
                        this.isLoading = false;
                        this.scopeService.safeApply(this.$scope);
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeCtrl.prototype.signup = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var captcha, passwordHash, authData, response_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!data) {
                            return [2 /*return*/, alert("Username is required.")];
                        }
                        if (!data.username) {
                            return [2 /*return*/, alert("Username is required.")];
                        }
                        if (!this.checkUserName(data.username)) {
                            this.message = "Username: please only use standard alphanumerics";
                            return [2 /*return*/];
                        }
                        if (data.username.length > 25) {
                            this.message = "Username cannot have more than 25 characters";
                            return [2 /*return*/];
                        }
                        if (data.username.length < 3) {
                            this.message = "Username should be at least 3 characters";
                            return [2 /*return*/];
                        }
                        if (!data.email) {
                            this.message = "Email is required..";
                            return [2 /*return*/];
                        }
                        if (!data.password) {
                            this.message = "Password is required..";
                            return [2 /*return*/];
                        }
                        if (data.password.length < 8) {
                            this.message = "Password must have at least 8 characters.";
                            return [2 /*return*/];
                        }
                        captcha = grecaptcha.getResponse();
                        if (!captcha || captcha.length === 0) {
                            this.message = "Please verify captcha by checking the checkbox.";
                            grecaptcha.reset();
                            return [2 /*return*/];
                        }
                        this.isLoading = true;
                        passwordHash = this.authService.calculatePasswordHash(data.email, data.password);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.authService.signup({
                                captcha: captcha,
                                email: data.email,
                                password: passwordHash,
                                username: data.username,
                                userType: 0
                            })];
                    case 2:
                        authData = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        response_2 = _a.sent();
                        this.isLoading = false;
                        grecaptcha.reset();
                        return [2 /*return*/, this.displayErrorMessage(response_2.data.code, response_2.data.desc)];
                    case 4: return [4 /*yield*/, this.setupWalletForUser(authData.user.id, data.password)];
                    case 5:
                        _a.sent();
                        this.isLoading = false;
                        this.$rootScope.user = authData.user;
                        location.href = "/thank-you";
                        return [2 /*return*/];
                }
            });
        });
    };
    WelcomeCtrl.prototype.ngInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.message = "";
                this.$rootScope.noHeader = true;
                this.isLoading = false;
                this.forgot = false;
                this.resetCode = this.$location.search().code;
                this.welcome = true;
                this.noHeader = true;
                this.scopeService.safeApply(this.$scope);
                return [2 /*return*/];
            });
        });
    };
    WelcomeCtrl.prototype.setupWalletForUser = function (userId, password) {
        return __awaiter(this, void 0, Promise, function () {
            var sbw, mnemonicEncrypted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sbw = new SimpleWallet();
                        sbw.mnemonicEncrypted = SimpleWallet.encrypt(sbw.mnemonic, password);
                        mnemonicEncrypted = sbw.mnemonicEncrypted;
                        return [4 /*yield*/, this.authService.setWallet({
                                mnemonicEncrypted: mnemonicEncrypted
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.profileService.updateUser(userId, "addressBCH", sbw.address)];
                    case 2:
                        _a.sent();
                        _core_lib_simpleWalletProvider__WEBPACK_IMPORTED_MODULE_2__["loadWallet"](mnemonicEncrypted, password);
                        return [2 /*return*/, sbw];
                }
            });
        });
    };
    WelcomeCtrl.prototype.renderCaptcha = function () {
        var _this = this;
        if (this.isCaptchaRendered) {
            return;
        }
        try {
            grecaptcha.render("hc-captcha");
            this.isCaptchaRendered = true;
        }
        catch (err) {
            setTimeout(function () { return _this.renderCaptcha(); }, 1000);
        }
    };
    WelcomeCtrl.prototype.checkUserName = function (username) {
        // unacceptable chars
        var pattern = new RegExp(/[~`!#@$%\^&*+=. \-\[\]\\';,/{}|\\":<>\?]/);
        if (pattern.test(username)) {
            return false;
        }
        return true; // good user input
    };
    WelcomeCtrl.prototype.displayErrorMessage = function (code, desc) {
        if (desc) {
            this.message = desc;
        }
        else if (code) {
            switch (code) {
                case "NOT_ACTIVATED":
                    this.message = "The access the the platform is currently limited. " +
                        "Your account has not been activated. Tweet to @Honest_Cash for a personal invitation.";
                    break;
                case "EMAIL_EXISTS":
                    this.message = "E-Mail already exists";
                    break;
                case "EMAIL_WRONGLY_FORMATTED":
                    this.message = "E-Mail wrongly formatted!";
                    break;
                case "WRONG_PASSWORD":
                    this.message = "Incorrect email address and / or password.";
                    break;
                case "NO_USER_FOUND":
                    this.message = "Incorrect email address and / or password.";
                    break;
                case "LOG_IN_WITH_FACEBOOK":
                    this.message = "Log in with Facebook";
                    break;
                case "EMAIL_NOT_FOUND":
                    this.message = "Incorrect email address and / or password.";
                    break;
                case "PASSWORDS_DO_NOT_MATCH":
                    this.message = "Passwords do not match!";
                    break;
                case "WRONG_RESET_CODE":
                    this.message = "Could not reset the password. Is the reset link and e-mail valid?";
                    break;
                default:
                    this.message = "Login error. Try again...";
            }
        }
        this.scopeService.safeApply(this.$scope);
    };
    WelcomeCtrl.$inject = [
        "$rootScope",
        "$scope",
        "$location",
        "$state",
        "AuthService",
        "ProfileService",
        "ScopeService"
    ];
    return WelcomeCtrl;
}());
/* harmony default export */ __webpack_exports__["default"] = (WelcomeCtrl);


/***/ }),

/***/ "IM4G":
/*!**************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/welcome/welcome.css ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ "I1BE")(undefined);
// imports


// module
exports.push([module.i, "html {\n  height: 100%;\n}\n.img-circle {\n  border-radius: 50%;\n}\n.login-container {\n  margin-top: 50px;\n  margin-bottom: 30px;\n  max-width: 652px;\n  display: block;\n}\n.login-box {\n  max-width: 650px;\n  position: relative;\n  padding: 20px;\n  background: #ffffff;\n  border: 1px solid #e2e2e2;\n  box-shadow: 0 0 5px #888;\n  border-radius: 4px;\n  bottom: initial;\n  overflow-x: hidden;\n  opacity: 0.9;\n}\n.overlay {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 0px;\n}\n.overlay .overlay-content {\n  height: 100%;\n  overflow: scroll;\n}\n.background-content {\n  height: 100%;\n  overflow: auto;\n}\nbody {\n  height: 100%;\n  width: 100%;\n  font-family: 'Helvetica', sans-serif;\n  font-size: 12px;\n  font-weight: 300;\n  /* color: #777; */\n  line-height: 1.6;\n  background-color: #fafafa;\n}\nimg {\n  max-width: 100%;\n}\na {\n  /*color: #444;*/\n  text-decoration: none;\n  -webkit-transition: all 0.25s ease-out;\n  -moz-transition: all 0.25s ease-out;\n  -ms-transition: all 0.25s ease-out;\n  -o-transition: all 0.25s ease-out;\n  transition: all 0.25s ease-out;\n}\n.bg-image {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  background-image: url('/img/artwork-login.jpg');\n  background-size: cover;\n  background-repeat: no-repeat;\n}\na:hover {\n  color: #00aeff;\n  text-decoration: none;\n}\nh1 {\n  font-size: 42px;\n  font-family: 'Helvetica', sans-serif;\n}\nh2 {\n  font-size: 30px;\n  font-family: 'Helvetica', sans-serif;\n}\nh3 {\n  font-size: 23px;\n}\nh4 {\n  font-size: 16px;\n}\nh1,\nh2,\nh3,\nh4 {\n  color: #444;\n  font-weight: normal;\n  line-height: 1.2;\n  margin: 5px 0 5px 0;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.width640 {\n  width: 100%;\n  max-width: 640px !important;\n}\n.width321 {\n  width: 100%;\n  max-width: 321px !important;\n}\n/* BOOTSTRAP OVERRIDES */\n.navbar-default {\n  background-color: white;\n  border-bottom: 1px solid #eeeeee;\n}\n.header_menu {\n  padding: 5px;\n  font-size: 17px;\n  font-weight: bold !important;\n}\n.header_menu li {\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  padding-top: 3px;\n  padding-bottom: 10px;\n  margin-bottom: 10px;\n  border-bottom: 1px solid #eeeeee;\n}\n.menu-item-profile {\n  padding: 10px;\n}\nimg.lazy {\n  width: 100%;\n  /*max-height: 400px;*/\n  /* min-height: 180px; */\n  /* this causes scaling problems */\n  display: block;\n  /* optional way, set loading as background */\n  background-image: url('/img/loader-pacman.gif');\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n.navbar .navbar-form {\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-right: 0;\n  margin-left: 0;\n  border: 0;\n  -webkit-box-shadow: none;\n  box-shadow: none;\n}\n.search-results-wrapper {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  background-color: #f9f9f9;\n}\n.search-results-wrapper > .message {\n  padding: 10px 20px;\n  border-bottom: 1px solid #ddd;\n  color: #868686;\n}\n.search-results-wrapper > .dropdown-menu {\n  position: static;\n  float: none;\n  display: block;\n  min-width: 250px;\n  background-color: transparent;\n  border: none;\n  border-radius: 0;\n  box-shadow: none;\n}\n/* end header */\n.header-logo {\n  width: 134px;\n}\n.image-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.pointer {\n  cursor: pointer;\n}\n.bold {\n  font-weight: bold;\n}\n.padding-top {\n  padding-top: 5px;\n}\n.block-center {\n  margin: 0 auto;\n}\n.img-thumbnail-avatar-normal {\n  height: 100px;\n  width: 100px;\n}\n.post-content {\n  width: 100%;\n}\n.img-thumbnail-avatar-small {\n  height: 45px;\n  width: 45px;\n}\n.img-center {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.img-thumbnail-avatar-smallest {\n  height: 22px;\n  width: 22px;\n}\n.hashtag {\n  padding: 2px;\n  font-weight: bold;\n  font-size: 12px;\n}\n.hashtag-big {\n  padding: 10px;\n  font-size: 30px;\n  font-weight: bold;\n}\n.selected {\n  font-weight: bold;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.horiontal-list li {\n  display: inline;\n  list-style-type: none;\n  width: 100%;\n  padding: 15px;\n}\n.text-center {\n  text-align: center;\n}\n/* DROPZONE */\n.dz-message-style {\n  border-radius: 9px 9px 9px 9px;\n  -moz-border-radius: 9px 9px 9px 9px;\n  -webkit-border-radius: 9px 9px 9px 9px;\n  border: 2px dashed #000000;\n  height: 200px;\n  width: 95%;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n}\n.dz-message-text-style {\n  text-align: center;\n}\n.btn-outline {\n  margin-top: 40px;\n  color: #fff;\n  border: 2px solid #fff;\n  border-radius: 2px;\n  background-color: transparent;\n  width: 250px;\n  font-weight: 300;\n}\n.btn-outline:hover {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.fill-screen img {\n  width: 100%;\n}\n.textarea-bio {\n  margin-top: 10px;\n  width: 100%;\n  resize: none;\n  overflow: auto;\n  border: none;\n  background-color: transparent;\n  overflow-y: hidden;\n}\n@media (max-width: 767px) {\n  h1 {\n    font-size: 34px;\n  }\n  .text-center-sm {\n    text-align: center;\n  }\n  textarea {\n    resize: vertical;\n  }\n  div.inline {\n    float: left;\n  }\n  .rate-btn {\n    font-size: 24px;\n  }\n  .navbar .navbar-form {\n    width: 200px;\n    padding-left: 10px;\n    padding-right: 0;\n  }\n  body {\n    padding-top: 0px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar .navbar-form {\n    width: 300px;\n  }\n  .feed-hashtag {\n    font-size: 8px;\n  }\n}\n.hashtag {\n  color: #444;\n  font-weight: bold;\n  font-size: 12px;\n  cursor: pointer;\n}\n.notification-badge-button {\n  color: white;\n  display: inline-block;\n  /* Inline elements with width and height. TL;DR they make the icon buttons stack from left-to-right instead of top-to-bottom */\n  position: relative;\n  /* All 'absolute'ly positioned elements are relative to this one */\n  padding: 2px 5px;\n  /* Add some padding so it looks nice */\n}\n.notification-badge {\n  background-color: #fa3e3e;\n  border-radius: 2px;\n  color: white;\n  padding: 1px 3px;\n  font-size: 10px;\n  position: absolute;\n  /* Position the badge within the relatively positioned button */\n  top: 0;\n  right: 0;\n}\n@media (max-width: 900px) {\n  .navbar-nav > li > a {\n    line-height: 10px;\n  }\n}\n#profile-badge {\n  margin-top: 5px;\n  height: 40px;\n  line-height: 28px;\n  padding: 10px 16px;\n  border-radius: 6px;\n  background-color: white;\n  font-size: 10px;\n  padding: 6px 12px;\n  text-align: justify;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  background-image: none;\n  border: 1px solid #F0F0F0;\n}\n#profile-badge-thumbnail {\n  float: left;\n}\n#profile-badge-details {\n  float: right;\n  line-height: 14px;\n  margin-left: 5px;\n}\n#profile-badge-mobile {\n  position: relative;\n  float: right;\n  padding: 7px;\n  border: 1px solid #F0F0F0;\n  border-radius: 4px;\n  margin-top: 8px;\n  margin-right: 5px;\n}\n.list-post-actions > li {\n  height: 30px;\n  float: left;\n  line-height: 30px;\n  margin-top: 20px;\n}\n.welcome-columns {\n  margin-top: 50px;\n  margin-bottom: 30px;\n}\n.welcome-columns h3 {\n  margin-bottom: 30px;\n  text-transform: uppercase;\n}\n.welcome-columns h3 {\n  margin-top: 20px;\n}\n.welcome-columns h4 {\n  text-align: center;\n  margin-bottom: 30px;\n  margin-top: 20px;\n}\n.welcome-columns p {\n  margin-bottom: 20px;\n}\n.buy-art-btn {\n  position: absolute;\n  right: 20px;\n  bottom: 10px;\n}\n.btn-honest {\n  background-color: black;\n  color: white;\n}\n", ""]);

// exports


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

/***/ "smUH":
/*!********************************!*\
  !*** ./src/welcome/welcome.ts ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! angular */ "KHwQ");
/* harmony import */ var angular__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(angular__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-ui-router */ "VZTK");
/* harmony import */ var angular_ui_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(angular_ui_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _states__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./states */ "13N9");
/* harmony import */ var _WelcomeCtrl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./WelcomeCtrl */ "ICeO");
/* harmony import */ var _core_config_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/config/http */ "hpYq");
/* harmony import */ var _core_config_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/config/routing */ "leVX");
/* harmony import */ var _core_services_ProfileService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/services/ProfileService */ "75yq");
/* harmony import */ var _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/services/ScopeService */ "b3j/");
/* harmony import */ var _auth_AuthModule__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../auth/AuthModule */ "WPZs");
/* harmony import */ var _core_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../core/config */ "u61H");
/* harmony import */ var _welcome_welcome_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../welcome/welcome.css */ "Htdk");
/* harmony import */ var _welcome_welcome_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_welcome_welcome_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _core_layout_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../core/layout.css */ "k+s8");
/* harmony import */ var _core_layout_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_core_layout_css__WEBPACK_IMPORTED_MODULE_11__);












angular__WEBPACK_IMPORTED_MODULE_0___default.a.module("vqServices", ["vqConfig"])
    .service("ProfileService", ["$http", "API_URL", _core_services_ProfileService__WEBPACK_IMPORTED_MODULE_6__["default"]])
    .service("ScopeService", _core_services_ScopeService__WEBPACK_IMPORTED_MODULE_7__["default"]);
angular__WEBPACK_IMPORTED_MODULE_0___default.a.module("welcome-app", [
    angular_ui_router__WEBPACK_IMPORTED_MODULE_1___default.a,
    "vqAuth",
    "vqServices"
])
    .config(["$locationProvider", "$urlMatcherFactoryProvider", _core_config_routing__WEBPACK_IMPORTED_MODULE_5__["default"]])
    .config(["$httpProvider", _core_config_http__WEBPACK_IMPORTED_MODULE_4__["default"]])
    .config(["$stateProvider", "$urlRouterProvider", _states__WEBPACK_IMPORTED_MODULE_2__["default"]])
    .controller("welcomeCtrl", _WelcomeCtrl__WEBPACK_IMPORTED_MODULE_3__["default"]);


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

},[["smUH","runtime","vendors"]]]);
//# sourceMappingURL=welcome.a16168427a309000b9c9.js.map