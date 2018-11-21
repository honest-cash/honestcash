export default function routing ($locationProvider, $urlMatcherFactoryProvider) {
	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
	$urlMatcherFactoryProvider.strictMode(false)
};
