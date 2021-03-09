export default {
	srcDir: 'src',
	components: true,
	target: 'static',
	buildModules: [
		'@nuxt/typescript-build',
		'@nuxtjs/pwa',
		'@nuxtjs/composition-api',
	],
	pwa: {
		manifest: {
			name: 'Cats Game',
			short_name: 'Cats Game',
		},
	},
	generate: {
		interval: 2000,
	},
	router: {
		base: '/cats-game/'
	}
}
