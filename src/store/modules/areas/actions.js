import axios from 'axios'

const actions = {
	async getArea({ commit }, area_id) {
		const area = await axios
			.get(
				`${process.env.VUE_APP_FOOTBALL_DATA_BASE_URL}areas/${area_id}`,
			)
			.then((res) => res)
			.catch(() => null)

		if (area && area.status === 200) {
			commit('SET_AREA', area.data)
		} else {
			commit('SET_AREA', area)
		}
	},
	async getAreas({ commit }) {
		const areas = await axios
			.get(`${process.env.VUE_APP_FOOTBALL_DATA_BASE_URL}areas`)
			.then((res) => res)
			.catch(() => null)

		if (areas && areas.status === 200) {
			commit('SET_AREAS', areas.data.areas)
		} else {
			commit('SET_AREAS', areas)
		}
	},
}

export { actions }
