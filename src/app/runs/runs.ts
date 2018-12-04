import * as simpleWalletProvider from "../lib/simpleWalletProvider";

export const onStateChange = function($rootScope, $state, AuthService) {
    $rootScope.$on('$stateChangeStart', async (event, next, nextParams, fromState) => {
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

		let res;

		AuthService.loadUserCredentials();

		if (AuthService.getUserId()) {
			$rootScope.user = {
				id: AuthService.getUserId()
			};
		} else {
			if (location.pathname === "/") {
				location.href = "/signup";
			}
		}

		AuthService.validate()
		.then(res => {
			const data = res.data;    

			$rootScope.user = {
				id: data.id,
				imageUrl: data.imageUrl,
				name: data.username
			};
		}, () => {
			$rootScope.user = null;

			if (location.pathname === "/") {
				location.href = "/signup";
			}
		});

		$('#tipModal').modal('hide');
    });
};

export const initProfileUpload = function(API_URL, AuthService) {
	const changeProgress = (progress) => {
		document.getElementById("imageUploadProgressBar").setAttribute("aria-valuenow", progress);
		document.getElementById("imageUploadProgressBar").style.width = progress + "%";
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
		previewTemplate: document.querySelector('#preview-template').innerHTML,
	})
	.on("addedfile", () => {
		$("#profilePicDropzone").addClass("hidden");
	})
	.on("sending", (_, xhr) => {
		changeProgress(0);
		xhr.setRequestHeader("X-Auth-Token", AuthService.getAuthToken());
		$("#imageUploadProgress").removeClass("hidden");
	})
	.on("uploadprogress", (_, progress) => {
		changeProgress(progress);
	})
	.on("success", (_, response) => {
		changeProgress(100);

		document.getElementById("profilePic").src = response.files[0].url;

		$("#imageUploadProgress").addClass("hidden");
		$("#profilePicDropzone").removeClass("hidden");
		$('#uploadProfilePicModal').modal('hide');
	});
};

export const initBCHWallet = function($rootScope) {
	const mnemonic = localStorage.getItem("HC_BCH_MNEMONIC");
	const hdPath = localStorage.getItem("HC_BCH_HD_PATH");
	let simpleWallet;

	if (mnemonic) {
		simpleWallet = new SimpleWallet(mnemonic, {
			HdPath: hdPath || simpleWalletProvider.defaultHdPath
		});

		simpleWalletProvider.set(simpleWallet);
	}

	$rootScope.simpleWallet = mnemonic ? {
		address: simpleWallet.address
	} : null;
};
