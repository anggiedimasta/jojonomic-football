<template lang="pug">
.layout.min-h-full
	Popover.pb-24.bg-teal-600(
		as='header'
		v-slot='{ open }'
	)
		.max-w-3xl.mx-auto.px-4(class='sm:px-6 lg:max-w-7xl lg:px-8')
			.relative.py-5.flex.items-center.justify-center(class='lg:justify-between')
				.absolute.left-0.flex-shrink-0(class='lg:static')
					a(href='#')
						span.sr-only Workflow
						img.h-8.w-auto(src='favicon.ico' alt='Workflow')
				.flex-1.min-w-0.px-12(class='lg:hidden')
					.max-w-xs.w-full.mx-auto
						label.sr-only(for='desktop-search') Search
						.relative.text-white(class='focus-within:text-gray-600')
							.pointer-events-none.absolute.inset-y-0.left-0.pl-3.flex.items-center
								SearchIcon.h-5.w-5(aria-hidden='true')
							input.block.w-full.bg-white.bg-opacity-20.py-2.pl-10.pr-3.border.border-transparent.rounded-md.leading-5.placeholder-white.text-white(
								@input='onSearch'
								autocomplete='area'
								class='focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm focus:text-gray-700'
								placeholder='Search'
								type='search'
								name='search'
								v-model='search_query'
							)
				.absolute.right-0.flex-shrink-0(class='lg:hidden')
					PopoverButton.bg-transparent.p-2.rounded-md.inline-flex.items-center.justify-center.text-indigo-200(class='hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white')
						span.sr-only Open main menu
						MenuIcon.block.h-6.w-6(v-if='!open' aria-hidden='true')
						XIcon.block.h-6.w-6(v-else aria-hidden='true')
			.hidden.border-t.border-white.border-opacity-20.py-5(class='lg:block')
				.grid.grid-cols-3.gap-8.items-center
					.col-span-2
						nav.flex.space-x-4
							router-link(
								:aria-current='r.name === route.name ? "page" : undefined'
								:class='[r.name === route.name ? "text-white" : "text-teal-100", "text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10"]'
								:key='r.name'
								:to='{ name: r.name }'
								v-for='r in routes'
							) {{ r.name }}
					div
						.max-w-md.w-full.mx-auto
							label.sr-only(for='mobile-search') Search
							.relative.text-white(class='focus-within:text-gray-600')
								.pointer-events-none.absolute.inset-y-0.left-0.pl-3.flex.items-center
									SearchIcon.h-5.w-5(aria-hidden='true')
								input.block.w-full.bg-white.bg-opacity-20.py-2.pl-10.pr-3.border.border-transparent.rounded-md.leading-5.placeholder-white.text-white(
									@input='onSearch'
									autocomplete='area'
									class='focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm focus:text-gray-700'
									placeholder='Search'
									type='search'
									name='search'
									v-model='search_query'
								)
		TransitionRoot(as='template' :show='open')
			div(class='lg:hidden')
				TransitionChild(as='template' enter='duration-150 ease-out' enter-from='opacity-0' enter-to='opacity-100' leave='duration-150 ease-in' leave-from='opacity-100' leave-to='opacity-0')
					PopoverOverlay.z-20.fixed.inset-0.bg-black.bg-opacity-25
				TransitionChild(as='template' enter='duration-150 ease-out' enter-from='opacity-0 scale-95' enter-to='opacity-100 scale-100' leave='duration-150 ease-in' leave-from='opacity-100 scale-100' leave-to='opacity-0 scale-95')
					PopoverPanel.z-30.absolute.top-0.inset-x-0.max-w-3xl.mx-auto.w-full.p-2.transition.transform.origin-top(focus)
						.rounded-lg.shadow-lg.ring-1.ring-black.ring-opacity-5.bg-white.divide-y.divide-gray-200
							.pt-3.pb-2
								.flex.items-center.justify-between.px-4
									div
										img.h-8.w-auto(src='favicon.ico' alt='Workflow')
									.-mr-2
										PopoverButton.bg-white.rounded-md.p-2.inline-flex.items-center.justify-center.text-gray-400(class='hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500')
											span.sr-only Close menu
											XIcon.h-6.w-6(aria-hidden='true')
								.mt-3.px-2.space-y-1
									router-link.block.rounded-md.px-3.py-2.text-base.text-gray-900.font-medium(
										class='hover:bg-gray-100 hover:text-gray-800'
										:key='r.name'
										:to='{ name: r.name }'
										v-for='r in routes'
									) {{ r.name }}
	main.-mt-24.pb-8
		.max-w-3xl.mx-auto.px-4(class='sm:px-6 lg:max-w-7xl lg:px-8')
			h1.sr-only Page title
			.rounded-lg.bg-white.overflow-hidden.shadow.p-6
				slot(name='content')
	footer
		.max-w-3xl.mx-auto.px-4(class='sm:px-6 lg:px-8 lg:max-w-7xl')
			.border-t.border-gray-200.py-8.text-sm.text-gray-500.text-center(class='sm:text-left')
				span.block.font-semibold(class='sm:inline') 2021 Jojonomic
				span.block(class='sm:inline') &nbsp;Football Data.
</template>

<script>
	import { defineComponent, ref } from 'vue'
	import { filter } from 'underscore'
	import { MenuIcon, XIcon } from '@heroicons/vue/outline'
	import { useRoute, useRouter } from 'vue-router'
	import { useStore } from 'vuex'

	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Popover,
		PopoverButton,
		PopoverOverlay,
		PopoverPanel,
		TransitionChild,
		TransitionRoot,
	} from '@headlessui/vue'

	import { SearchIcon } from '@heroicons/vue/solid'

	export default defineComponent({
		name: 'Layout',
		components: {
			Menu,
			MenuButton,
			MenuIcon,
			MenuItem,
			MenuItems,
			Popover,
			PopoverButton,
			PopoverOverlay,
			PopoverPanel,
			SearchIcon,
			TransitionChild,
			TransitionRoot,
			XIcon,
		},
		setup() {
			const route = useRoute()
			const router = useRouter()
			const store = useStore()
			let search_query = ref('')

			const routes = filter(
				router.options.routes,
				(r) => !r.meta || !r.meta.hide,
			)

			function onSearch() {
				store.dispatch('setSearchQuery', search_query.value)
			}

			return {
				onSearch,
				route,
				routes,
				search_query,
			}
		},
	})
</script>
