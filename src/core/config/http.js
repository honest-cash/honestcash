export default function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.interceptors.push('AuthInterceptor');
}
