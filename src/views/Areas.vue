<template lang="pug">
.areas
	div.p-4
		h2.text-gray-500.text-xs.font-medium.uppercase.tracking-wide AREAS
		ul.mt-3.grid.grid-cols-1.gap-5(
			class='sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'
			role='list'
			v-if='filtered_areas && filtered_areas.length > 0'
		)
			router-link.flex.col-span-1(
				:to='{ name: "Teams", params: { id: area.id} }'
				:key='area.id'
				v-for='area in filtered_areas'
			)
				li.w-full.flex.shadow-sm.rounded-md
					div(
						:class='["flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md  border-t border-l border-b border-gray-200"]'
						:style='`background-color: ${getRandomColor()}`'
					) {{ area.countryCode }}
					.flex-1.flex.items-center.justify-between.border-t.border-r.border-b.border-gray-200.bg-white.rounded-r-md.truncate
						.flex-1.px-4.py-2.text-sm.truncate
							a.text-gray-900.font-medium(
								:href='area.href'
								class='hover:text-gray-600'
							) {{ area.name }}
							p.text-gray-500 {{ area.parentArea }}
		.text-center(v-else)
			EmojiSadIcon.mx-auto.h-12.w-12.text-gray-400(aria-hidden='true')
			h3.mt-2.text-sm.font-medium.text-gray-900 No areas
			p.mt-1.text-sm.text-gray-500 There is no area data available.
</template>

<script>
	import { computed, defineComponent } from 'vue'
	import { EmojiSadIcon } from '@heroicons/vue/outline'
	import { filter, flatten, isObject, map, sample } from 'underscore'
	import { useStore } from 'vuex'

	import tailwind from 'tailwind-config'
	const { theme } = tailwind.config(require('../../tailwind.config'))

	export default defineComponent({
		name: 'Areas',
		components: { EmojiSadIcon },
		setup() {
			const store = useStore()
			const filtered_areas = computed(
				() => store.getters['AREAS/filtered_areas'],
			)

			store.dispatch('AREAS/getAreas')

			let colors = filter(
				theme.colors,
				(color, color_name) => isObject(color) && color_name !== 'gray',
			)

			colors = map(colors, (color) => {
				return filter(color, (_code, intensity) => {
					return intensity > 300 && intensity < 700
				})
			})
			colors = flatten(colors)

			function getRandomColor() {
				return sample(colors)
			}

			return {
				filtered_areas,
				getRandomColor,
			}
		},
	})
</script>
