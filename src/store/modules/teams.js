import { actions as actions_module } from './teams/actions'
import { getters as getters_module } from './teams/getters'
import { mutations as mutations_module } from './teams/mutations'
import { state as state_module } from './teams/state'

export default {
	actions: actions_module,
	getters: getters_module,
	mutations: mutations_module,
	state: state_module,
}
