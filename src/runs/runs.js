import * as simpleWalletProvider from "../lib/simpleWalletProvider";
import SimpleWallet from "../lib/SimpleWallet";

export const onStateChange = function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
        if (next.name == "starter.welcome") {
            $rootScope.welcome = true;
        } else {
            $rootScope.welcome = false;
        }

        if (next.name == "starter.login" || next.name == "starter.signup" || next.name == "blog" || next.name == "starter.welcome" || next.name == "starter.thankyou") {
            $rootScope.noHeader = true;
        } else {
            $rootScope.noHeader = false;
        }

        AuthService.validate((data) => {
            if (data) {
                $rootScope.user = {
                    id: data.id,
                    imageUrl: data.imageUrl,
                    name: data.username
                };

                return;
            }

            $rootScope.user = false;
		});

		// close all popups
		$('#tipModal').modal('hide');
    });
};

export const initProfileUpload = function(API_URL, AuthService) {
	const changeProgress = (progress) => {
		document.getElementById("imageUploadProgressBar").setAttribute("aria-valuenow", progress);
		document.getElementById("imageUploadProgressBar").style.width = progress + "%";
	};

	new Dropzone("#profilePicDropzone", {
		url: `${API_URL}/upload/image?isProfileAvatar=true`,
		maxFiles: 10,
		maxfilesexceeded: (file) => {
			this.removeAllFiles();
			this.addFile(file);
		},
		thumbnailWidth: null,
		previewTemplate: document.querySelector('#preview-template').innerHTML,
	})
	.on("addedfile", function(file) {
		$("#profilePicDropzone").addClass("hidden");
	})
	.on("sending", (file, xhr) => {
		changeProgress(0);
		xhr.setRequestHeader("X-Auth-Token", AuthService.getAuthToken());
		$("#imageUploadProgress").removeClass("hidden");
	})
	.on("uploadprogress", (_, progress) => {
		changeProgress(progress);
	})
	.on("success", (file, response) => {
		changeProgress(100);

		document.getElementById("profilePic").src = response.url;
		
		$("#imageUploadProgress").addClass("hidden");
		$("#profilePicDropzone").removeClass("hidden");
		$('#uploadProfilePicModal').modal('hide');
	});
};

export const initBCHWallet = function($rootScope) {
	const bchPrivateKey = localStorage.getItem("HC_BCH_PRIVATE_KEY");
	let simpleWallet;

	if (bchPrivateKey) {
		simpleWallet = new SimpleWallet(bchPrivateKey);

		simpleWalletProvider.set(simpleWallet);
	}

	$rootScope.simpleWallet = bchPrivateKey ? {
		address: simpleWallet.address
	} : null;
};
