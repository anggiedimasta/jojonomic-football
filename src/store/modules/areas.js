import { actions as actions_module } from './areas/actions'
import { getters as getters_module } from './areas/getters'
import { mutations as mutations_module } from './areas/mutations'
import { state as state_module } from './areas/state'

export default {
	actions: actions_module,
	getters: getters_module,
	mutations: mutations_module,
	state: state_module,
}
