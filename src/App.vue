<template>
	<div id="app">
		<Layout>
			<template #content>
				<router-view />
			</template>
		</Layout>
	</div>
</template>
<script>
	import { defineComponent } from 'vue'
	import { Layout } from '@/components'

	export default defineComponent({
		name: 'App',
		components: { Layout },
	})
</script>
