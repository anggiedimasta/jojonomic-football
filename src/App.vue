<template lang="pug">
#app
	Layout
		template(#content)
			router-view
</template>
<script>
	import { defineComponent } from 'vue'
	import { Layout } from '@/components'

	export default defineComponent({
		name: 'App',
		components: { Layout },
	})
</script>
