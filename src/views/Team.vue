<template lang="pug">
.team
	Player(
		:player='player'
		@close='hidePlayerModal'
	)
	div.p-4
		article
			div(v-if='team')
				div.h-32.w-full.rounded-t-xl(:class='`bg-${getBgColor(team.clubColors)}`')
				.max-w-5xl.mx-auto.px-4(class='sm:px-6 lg:px-8')
					.-mt-12(class='sm:-mt-16 sm:flex sm:items-end sm:space-x-5')
						.flex
							img.w-24(
								:alt='`${team.name}-crest`'
								:src='team.crestUrl'
								class='sm:w-32'
							)
						.mt-6(class='sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1')
							.mt-6.min-w-0.flex-1(class='sm:hidden 2xl:block')
								h1.text-2xl.font-bold.text-gray-900.truncate {{ team.name }}
							.mt-6.flex.flex-col.justify-stretch.space-y-3(class='sm:flex-row sm:space-y-0 sm:space-x-4')
								a(
									:href='`tel:${team.phone}`'
									rel='noopener noreferrer nofollow'
									target='_blank'
								)
									button.inline-flex.justify-center.px-4.py-2.border.border-gray-300.shadow-sm.text-sm.font-medium.rounded-md.text-gray-700.bg-white(
										class='hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
										type='button'
									)
										PhoneIcon.-ml-1.mr-2.h-5.w-5.text-gray-400(aria-hidden='true')
										span Phone
								a(
									:href='`mailto:${team.email}`'
									rel='noopener noreferrer nofollow'
									target='_blank'
								)
									button.inline-flex.justify-center.px-4.py-2.border.border-gray-300.shadow-sm.text-sm.font-medium.rounded-md.text-gray-700.bg-white(
										class='hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
										type='button'
									)
										MailIcon.-ml-1.mr-2.h-5.w-5.text-gray-400(aria-hidden='true')
										span Email
								a(
									:href='team.website'
									rel='noopener noreferrer nofollow'
									target='_blank'
								)
									button.inline-flex.justify-center.px-4.py-2.border.border-gray-300.shadow-sm.text-sm.font-medium.rounded-md.text-gray-700.bg-white(
										class='hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
										type='button'
									)
										span.-ml-1.mr-2 Website
										ArrowUpIcon.h-5.w-5.text-gray-400.transform.rotate-45(aria-hidden='true')
					.hidden.mt-6.min-w-0.flex-1(class='sm:block 2xl:hidden')
						h1.text-2xl.font-bold.text-gray-900.truncate {{ team.name }}
				.mt-6.max-w-5xl.mx-auto.px-4(class='sm:px-6 lg:px-8')
					dl.grid.grid-cols-1.gap-x-4.gap-y-8(class='sm:grid-cols-2')
						div(class='sm:col-span-1')
							dt.text-sm.font-medium.text-gray-500 Address
							dd.mt-1.text-sm.text-gray-900 {{ team.address }}
						div(class='sm:col-span-1')
							dt.text-sm.font-medium.text-gray-500 Area
							dd.mt-1.text-sm.text-gray-900 {{ team.area.name }}
						div(class='sm:col-span-1')
							dt.text-sm.font-medium.text-gray-500 Colors
							dd.mt-1.text-sm.text-gray-900 {{ team.clubColors }}
						div(class='sm:col-span-1')
							dt.text-sm.font-medium.text-gray-500 Founded
							dd.mt-1.text-sm.text-gray-900 {{ team.founded }}
						div(class='sm:col-span-1')
							dt.text-sm.font-medium.text-gray-500 Venue
							dd.mt-1.text-sm.text-gray-900 {{ team.venue }}
		.max-w-5xl.mx-auto.px-4.mt-8(class='sm:px-6 lg:px-8')
			.text-sm.font-medium.text-gray-500 Players
			ul.mt-3.grid.grid-cols-1.gap-6(
				class='sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
				role='list'
				v-if='filtered_players && filtered_players.length > 0'
			)
				li.cursor-pointer.col-span-1.flex.flex-col.text-center.bg-white.rounded-lg.shadow.divide-y.divide-gray-200(
					:key='player.id'
					@click='showPlayerModal(player)'
					v-for='player in filtered_players'
				)
					.flex-1.flex.flex-col.p-8
						img.w-32.h-32.flex-shrink-0.mx-auto.rounded-full(
							:alt='`${player.name}-avatar`'
							:src='`https://ui-avatars.com/api/?background=${getRandomColor()}&color=fff&name=${player.name}`'
						)
						h3.mt-6.text-gray-900.text-sm.font-medium {{ player.name }}
						dl.mt-1.flex-grow.flex.flex-col.justify-between
							dt.sr-only(v-if='player.dateOfBirth') Birth
							dd.text-gray-500.text-sm
								span(v-if='player.countryOfBirth')  {{ player.countryOfBirth }},&nbsp;
								span(v-if='player.dateOfBirth')  {{ formatDate(player.dateOfBirth) }}
							dt.sr-only(v-if='player.shirtNumber') Shirt number
							dd.mt-3(v-if='player.shirtNumber')
								.px-2.py-1.text-gray-600.text-xs.bg-gray-50.rounded-full.inline-flex.items-center
									IdentificationIcon.inline-flex.h-3.w-3.mr-1(aria-hidden='true')
									.inline-flex {{ player.shirtNumber }}
							dt.sr-only(v-if='player.position') Position
							dd.mt-3(v-if='player.position')
								.px-2.py-1.text-gray-600.text-xs.bg-gray-50.rounded-full.inline-flex.items-center
									UserIcon.inline-flex.h-3.w-3.mr-1(aria-hidden='true')
									.inline-flex {{ player.position }}
							dt.sr-only(v-if='player.nationality') Nationality
							dd.mt-3(v-if='player.nationality')
								.px-2.py-1.text-gray-600.text-xs.bg-gray-50.rounded-full.inline-flex.items-center
									GlobeIcon.inline-flex.h-3.w-3.mr-1(aria-hidden='true')
									.inline-flex {{ player.nationality }}
			.text-center(v-else)
				EmojiSadIcon.mx-auto.h-12.w-12.text-gray-400(aria-hidden='true')
				h3.mt-2.text-sm.font-medium.text-gray-900 No players
				p.mt-1.text-sm.text-gray-500
					span There is no player data available in&nbsp;
					span(v-if='team?.name') {{ team.name }}.
					span(v-else) this team.
</template>

<script>
	import {
		ArrowUpIcon,
		GlobeIcon,
		IdentificationIcon,
		MailIcon,
		PhoneIcon,
		UserIcon,
	} from '@heroicons/vue/solid'
	import { computed, defineComponent, reactive } from 'vue'
	import { EmojiSadIcon } from '@heroicons/vue/outline'
	import { filter, flatten, isObject, map, sample } from 'underscore'
	import { useRoute } from 'vue-router'
	import { useStore } from 'vuex'

	import { Player } from '@/components'

	import tailwind from 'tailwind-config'
	const { theme } = tailwind.config(require('../../tailwind.config'))

	export default defineComponent({
		name: 'Team',
		components: {
			ArrowUpIcon,
			EmojiSadIcon,
			GlobeIcon,
			IdentificationIcon,
			MailIcon,
			PhoneIcon,
			Player,
			UserIcon,
		},
		setup() {
			const route = useRoute()
			const store = useStore()
			const filtered_players = computed(
				() => store.getters['TEAMS/filtered_players'],
			)
			const team = computed(() => store.getters['TEAMS/team'])
			let player = reactive({
				countryOfBirth: '',
				dateOfBirth: '',
				name: '',
				nationality: '',
				position: '',
				shirtNumber: '',
			})

			store.dispatch('TEAMS/getTeam', route.params.id)

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
				return String(sample(colors)).slice(1)
			}

			function getBgColor(clrs) {
				if (!clrs) return 'white'

				let color = clrs.split(' /')[0]
				color = color.toLowerCase()

				return color !== 'black' && color !== 'white'
					? `${color}-500`
					: color
			}

			function formatDate(date) {
				return new Date(date).toLocaleDateString('en-us', {
					day: 'numeric',
					month: 'numeric',
					year: 'numeric',
				})
			}

			function hidePlayerModal() {
				player.countryOfBirth = ''
				player.dateOfBirth = ''
				player.name = ''
				player.nationality = ''
				player.position = ''
				player.shirtNumber = ''
			}

			function showPlayerModal(plyr) {
				player.countryOfBirth = plyr?.countryOfBirth
				player.dateOfBirth = plyr?.dateOfBirth
				player.name = plyr?.name
				player.nationality = plyr?.nationality
				player.position = plyr?.position
				player.shirtNumber = plyr?.shirtNumber
			}

			return {
				filtered_players,
				formatDate,
				getBgColor,
				getRandomColor,
				hidePlayerModal,
				player,
				showPlayerModal,
				team,
			}
		},
	})
</script>
