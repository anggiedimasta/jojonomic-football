import axios from 'axios'

const actions = {
	async getTeams({ commit }, area_id) {
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
