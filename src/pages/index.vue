<template>
	<div id="root"></div>
</template>

<style>
html {
	overflow: hidden;
}
body {
	margin: 0;
}
</style>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import setup from '../main'

export default defineComponent({
	setup() {
		onMounted(setup)
	},
})
</script>
