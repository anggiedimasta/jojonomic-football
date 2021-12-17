import axios from 'axios'

const actions = {
	async getTeam({ commit }, team_id) {
		const team = await axios
			.get(
				`${process.env.VUE_APP_FOOTBALL_DATA_BASE_URL}teams/${team_id}`,
				{
					params: {
						areas: team_id,
					},
				},
			)
			.then((res) => res)
			.catch(() => null)

		if (team && team.status === 200) {
			commit('SET_TEAM', team.data)
		} else {
			commit('SET_TEAM', team)
		}
	},
	async getTeams({ commit, dispatch }, area_id) {
		dispatch('AREAS/getArea', area_id, { root: true })

		const teams = await axios
			.get(`${process.env.VUE_APP_FOOTBALL_DATA_BASE_URL}teams`, {
				params: {
					areas: area_id,
				},
			})
			.then((res) => res)
			.catch(() => null)

		if (teams && teams.status === 200) {
			commit('SET_TEAMS', teams.data.teams)
		} else {
			commit('SET_TEAMS', teams)
		}
	},
}

export { actions }
