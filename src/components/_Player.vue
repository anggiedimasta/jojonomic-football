<template lang="pug">
.player
	TransitionRoot(
		:show='open'
		as='template'
	)
		Dialog.fixed.z-10.inset-0.overflow-y-auto(
			@close='open = false; $emit("close")'
			as='div'
		)
			.flex.items-end.justify-center.min-h-screen.pt-4.px-4.pb-20.text-center(class='sm:block sm:p-0')
				TransitionChild(
					as='template'
					enter='ease-out duration-300'
					enter-from='opacity-0'
					enter-to='opacity-100'
					leave='ease-in duration-200'
					leave-from='opacity-100'
					leave-to='opacity-0'
				)
					DialogOverlay.fixed.inset-0.bg-gray-500.bg-opacity-75.transition-opacity
				span.hidden(
					class='sm:inline-block sm:align-middle sm:h-screen'
					aria-hidden='true'
				) &#8203;
				TransitionChild(
					as='template'
					enter='ease-out duration-300'
					enter-from='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
					enter-to='opacity-100 translate-y-0 sm:scale-100'
					leave='ease-in duration-200'
					leave-from='opacity-100 translate-y-0 sm:scale-100'
					leave-to='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
				)
					.inline-block.align-bottom.bg-white.rounded-lg.px-4.pt-5.pb-4.text-left.overflow-hidden.shadow-xl.transform.transition-all.w-full(class='sm:my-8 sm:align-middle sm:max-w-3xl sm:p-6')
						div
							.divide-y.divide-gray-200
								.pb-6
									.bg-gray-100.h-32(class='sm:h-28 lg:h-36')
									.-mt-20.flow-root.px-4(class='sm:-mt-16 sm:flex sm:items-end sm:px-6 lg:-mt-24')
										div
											.-m-1.flex
												.inline-flex.rounded-lg.overflow-hidden.border-4.border-white
													img.flex-shrink-0.h-24.w-24(
														:alt='`${player.name}-avatar`'
														:src='`https://ui-avatars.com/api/?background=${getRandomColor()}&color=fff&name=${player.name}`'
														class='sm:h-40 sm:w-40 lg:w-48 lg:h-48'
													)
										.mt-6(class='sm:ml-6 sm:flex-1')
											div
												.flex.items-center
													h3.font-bold.text-xl.text-gray-900(class='sm:text-2xl') {{ player.name }}
												p.text-sm.text-gray-500(v-if='player.position')  {{ player.position }}
								.px-4.py-5(class='sm:px-0 sm:py-0')
									dl.space-y-8(class='sm:divide-y sm:divide-gray-200 sm:space-y-0')
										div(
											class='sm:flex sm:px-6 sm:py-5'
											v-if='player.countryOfBirth || player.dateOfBirth'
										)
											dt.text-sm.font-medium.text-gray-500(class='sm:w-40 sm:flex-shrink-0 lg:w-48') Birth
											dd.mt-1.text-sm.text-gray-900(class='sm:mt-0 sm:ml-6 sm:col-span-2')
												span(v-if='player.countryOfBirth')  {{ player.countryOfBirth }},&nbsp;
												span(v-if='player.dateOfBirth')  {{ formatDate(player.dateOfBirth) }}
										div(
											class='sm:flex sm:px-6 sm:py-5'
											v-if='player.nationality'
										)
											dt.text-sm.font-medium.text-gray-500(class='sm:w-40 sm:flex-shrink-0 lg:w-48') Nationality
											dd.mt-1.text-sm.text-gray-900(class='sm:mt-0 sm:ml-6 sm:col-span-2') {{ player.nationality }}
										div(
											class='sm:flex sm:px-6 sm:py-5'
											v-if='player.shirtNumber'
										)
											dt.text-sm.font-medium.text-gray-500(class='sm:w-40 sm:flex-shrink-0 lg:w-48') Shirt number
											dd.mt-1.text-sm.text-gray-900(class='sm:mt-0 sm:ml-6 sm:col-span-2') {{ player.shirtNumber }}
</template>

<script>
	import { CheckIcon } from '@heroicons/vue/outline'
	import { defineComponent, reactive, ref, watch } from 'vue'
	import { filter, flatten, isObject, map, sample } from 'underscore'

	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue'

	import tailwind from 'tailwind-config'
	const { theme } = tailwind.config(require('../../tailwind.config'))

	export default defineComponent({
		name: 'Player',
		components: {
			Dialog,
			DialogOverlay,
			DialogTitle,
			TransitionChild,
			TransitionRoot,
			CheckIcon,
		},
		props: {
			player: {
				default: () => {},
				required: true,
				type: Object,
			},
		},
		emits: ['close'],
		setup(props) {
			const player = reactive(props.player)
			let open = ref(true)

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

			function formatDate(date) {
				return new Date(date).toLocaleDateString('en-us', {
					day: 'numeric',
					month: 'numeric',
					year: 'numeric',
				})
			}

			watch(
				() => player,
				(new_player) => {
					if (new_player?.name) {
						open.value = true
					} else {
						open.value = false
					}
				},
				{
					deep: true,
					immediate: true,
				},
			)

			return { formatDate, getRandomColor, open }
		},
	})
</script>
