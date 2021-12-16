<template lang="pug">
.area
	div.p-4
		h2.text-gray-500.text-xs.font-medium.uppercase.tracking-wide TEAMS
		ul.mt-3.grid.grid-cols-1.gap-6(
			class='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
			role='list'
			v-if='teams.length > 0'
		)
			li.col-span-1.flex.flex-col.text-center.bg-white.rounded-lg.shadow.divide-y.divide-gray-200(
				:key='team.id'
				v-for='team in teams'
			)
				.w-full.h-24.rounded-t-lg.flex(:class='`bg-${getBgColor(team.clubColors)}`')
				.flex-1.flex.flex-col.p-8.-mt-24
					img.w-32.h-32.flex-shrink-0.mx-auto(
						:src='team.crestUrl'
						:alt='`${team.name}-crest`'
						v-if='team.crestUrl'
					)
					FlagIcon.mx-auto.w-32.h-32.text-gray-400(
						aria-hidden='true'
						v-else
					)
					h3.mt-6.text-gray-900.text-sm.font-medium {{ team.name }}
					dl.mt-1.flex-grow.flex.flex-col.justify-between
						dt.sr-only Address
						dd.text-gray-500.text-sm {{ team.address }}
						dt.sr-only Phone
						dd.mt-3
							span.px-2.py-1.text-gray-600.text-xs.bg-gray-50.rounded-full {{ team.phone }}
						dt.sr-only Email
						dd.mt-1
							span.px-2.py-1.text-gray-600.text-xs.bg-gray-50.rounded-full {{ team.email }}
						dt.sr-only Website
						dd.mt-1
							a.px-2.py-1.text-xs.text-green-500.font-medium.bg-green-50.rounded-full(
								:href='team.website'
								rel='noopener noreferrer nofollow'
								target='_blank'
							)
								span.inline-flex Website
								ArrowUpIcon.inline-flex.h-3.w-3.transform.rotate-45(aria-hidden='true')
		.text-center(v-else)
			EmojiSadIcon.mx-auto.h-12.w-12.text-gray-400(aria-hidden='true')
			h3.mt-2.text-sm.font-medium.text-gray-900 No teams
			p.mt-1.text-sm.text-gray-500 There is no team data available in this area.
</template>

<script>
	import { ArrowUpIcon } from '@heroicons/vue/solid'
	import { EmojiSadIcon, FlagIcon } from '@heroicons/vue/outline'
	import { computed, defineComponent } from 'vue'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'

	export default defineComponent({
		name: 'Area',
		components: { ArrowUpIcon, EmojiSadIcon, FlagIcon },
		setup() {
			const route = useRoute()
			const store = useStore()
			const teams = computed(() => store.getters['TEAMS/teams'])

			store.dispatch('TEAMS/getTeams', route.params.id)

			function getBgColor(colors) {
				if (!colors) return 'white'

				let color = colors.split(' /')[0]
				color = color.toLowerCase()

				return color !== 'black' && color !== 'white'
					? `${color}-500`
					: color
			}

			return { getBgColor, teams }
		},
	})
</script>
