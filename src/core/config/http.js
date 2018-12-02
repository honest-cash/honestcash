export default function http ($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.interceptors.push('AuthInterceptor');
};
