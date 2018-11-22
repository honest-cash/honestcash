export const onStateChange = function($rootScope, $state, ViciAuth) {
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

        ViciAuth.validate((data) => {
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
    });
};
