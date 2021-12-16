import { createStore } from 'vuex'
import modules from './modules'

export default createStore({
	modules,
	namespaced: true,
	state: {
		search_query: '',
	},
	getters: {},
	mutations: {
		SET_SEARCH_QUERY(state, search_query) {
			state.search_query = search_query
		},
	},
	actions: {
		setSearchQuery({ commit }, search_query) {
			commit('SET_SEARCH_QUERY', search_query)
		},
	},
})
