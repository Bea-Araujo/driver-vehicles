import { ReduxState, reduxStore } from "../../store";
import { vehiclesAdapter } from "./vehiclesSlice";

export const selectVehicleStatus = (state: ReduxState) => state.vehicles.status;

const selectVehiclesState = (state: ReduxState) => state.vehicles;

export const {selectAll: selectVehicles, selectById: selectVehiclesById } = vehiclesAdapter.getSelectors(selectVehiclesState)

// export const selectVehiclesById = (id: string) => {
//     return createSelector(ReduxState, selectById(reduxStore.getState(), id)
// }
