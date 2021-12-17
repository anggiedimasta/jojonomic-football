import axios from 'axios'

const actions = {
	async getPlayer({ commit }, player_id) {
		const player = await axios
			.get(
				`${process.env.VUE_APP_FOOTBALL_DATA_BASE_URL}players/${player_id}`,
			)
			.then((res) => res)
			.catch(() => null)

		if (player && player.status === 200) {
			commit('SET_PLAYER', player.data)
		} else {
			commit('SET_PLAYER', player)
		}
	},
}

export { actions }
