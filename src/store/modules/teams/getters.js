import { filter } from 'underscore'

const getters = {
	filtered_teams(state, _getters, rootState, _rootGetters) {
		if (rootState.search_query.length <= 0) return state.teams

		return filter(
			state.teams,
			(area) =>
				area.name
					.toLowerCase()
					.search(rootState.search_query.toLowerCase()) >= 0,
		)
	},
}

export { getters }
