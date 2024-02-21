import { ReduxState, reduxStore } from "../../store";
import { vehiclesAdapter } from "./vehiclesSlice";

const selectVehiclesState = (state: ReduxState) => state.vehicles;

export const {selectAll: selectVehicles, selectById: selectVehiclesById } = vehiclesAdapter.getSelectors(selectVehiclesState)

// export const selectVehiclesById = (id: string) => {
//     return createSelector(ReduxState, selectById(reduxStore.getState(), id)
// }
