import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import { AuthService } from "../../auth/AuthService";
import { IModalElement } from "../lib/dependency-interfaces";

declare const Dropzone;

export const onStateChange = function ($rootScope, $state, authService: AuthService) {
  $rootScope.$on("$stateChangeStart", async (event, next, nextParams, fromState) => {
    if (next.name === "starter.welcome") {
      $rootScope.welcome = true;
    } else {
      $rootScope.welcome = false;
    }

    if (next.name.indexOf("starter.") > -1) {
      $rootScope.noHeader = true;
    } else {
      $rootScope.noHeader = false;
    }

    if (!$rootScope.user) {
      authService.loadUserCredentials();

      if (authService.getUserId() && authService.getAuthToken()) {
        $rootScope.user = {
          id: authService.getUserId(),
        };
      } else {
        if (location.pathname === "/") {
          location.href = "/v2";

          return;
        }
      }

      const response = await authService.validate();
      const user = response.data;

      $rootScope.user = user || null;

      if (!user && location.pathname === "/") {
        return location.href = "/v2";
      }

      if (user.status !== "11" && user.status !== "10" && location.pathname === "/") {
        return location.href = "/v2/thank-you";
      }
    }

    if (next.name === "vicigo.profileEdit") {
      if (!$rootScope.user || $rootScope.user.username !== nextParams.profileId) {
        location.href = `/profile/${nextParams.profileId}`;
      }
    }
  });
};

export const initProfileUpload = function (API_URL, authService: AuthService) {
  const changeProgress = (progress) => {
    document.getElementById("imageUploadProgressBar").setAttribute("aria-valuenow", progress);
    document.getElementById("imageUploadProgressBar").style.width = `${progress}%`;
  };

  new Dropzone("#profilePicDropzone", {
    paramName: "files[]",
    url: `${API_URL}/upload/image?isProfileAvatar=true`,
    maxFiles: 10,
    maxfilesexceeded: (file) => {
      this.removeAllFiles();
      this.addFile(file);
    },
    thumbnailWidth: null,
  })
  .on("addedfile", () => {
    $("#profilePicDropzone").addClass("hidden");
  })
  .on("sending", (_, xhr) => {
    changeProgress(0);
    xhr.setRequestHeader("X-Auth-Token", authService.getAuthToken());
    $("#imageUploadProgress").removeClass("hidden");
  })
  .on("uploadprogress", (_, progress) => {
    changeProgress(progress);
  })
  .on("success", (_, response) => {
    changeProgress(100);

    (document.getElementById("profilePic") as HTMLImageElement).src = response.files[0].url;

    $("#imageUploadProgress").addClass("hidden");
    $("#profilePicDropzone").removeClass("hidden");
    ($("#uploadProfilePicModal") as IModalElement).modal("hide");
  });
};

export const initBCHWallet = function ($rootScope) {
  $rootScope.simpleWallet = simpleWalletProvider.loadWallet();
};
