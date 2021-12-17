import { filter } from 'underscore'

const getters = {
	filtered_players(state, _getters, rootState, _rootGetters) {
		if (!state.team?.squad) return []
		if (rootState.search_query.length <= 0) return state.team.squad

		return filter(
			state.team.squad,
			(player) =>
				player.name
					.toLowerCase()
					.search(rootState.search_query.toLowerCase()) >= 0,
		)
	},
	filtered_teams(state, _getters, rootState, _rootGetters) {
		if (rootState.search_query.length <= 0) return state.teams

		return filter(
			state.teams,
			(team) =>
				team.name
					.toLowerCase()
					.search(rootState.search_query.toLowerCase()) >= 0,
		)
	},
	team(state) {
		return state.team
	},
}

export { getters }
