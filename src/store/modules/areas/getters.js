import { filter } from 'underscore'

const getters = {
	area(state) {
		return state.area
	},
	filtered_areas(state, _getters, rootState, _rootGetters) {
		if (rootState.search_query.length <= 0) return state.areas

		return filter(
			state.areas,
			(area) =>
				area.name
					.toLowerCase()
					.search(rootState.search_query.toLowerCase()) >= 0,
		)
	},
}

export { getters }
