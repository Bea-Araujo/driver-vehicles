import { EntityState, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { deleteVehicleThunk, fetchVehiclesThunk, saveNewVehicleThunk, updateVehicleThunk } from "./thunks";
export const vehiclesAdapter = createEntityAdapter<Vehicle>();

const initialState = vehiclesAdapter.getInitialState({
  status: "idle",
})

export const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    vehicleAdded: vehiclesAdapter.addOne,
    vehicleDeleted: vehiclesAdapter.removeOne,
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehiclesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVehiclesThunk.fulfilled, (state, action) => {
        state.status = "idle";
        vehiclesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchVehiclesThunk.rejected, (state) => {
        state.status = "error";
      })

      .addCase(saveNewVehicleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveNewVehicleThunk.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(saveNewVehicleThunk.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(updateVehicleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVehicleThunk.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(updateVehicleThunk.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(deleteVehicleThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVehicleThunk.fulfilled, (state, action) => {
        state.status = "idle";
        vehiclesAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteVehicleThunk.rejected, (state) => {
        state.status = "failed";
      })
  },
});

export const { vehicleAdded, vehicleDeleted } = vehiclesSlice.actions

export default vehiclesSlice.reducer

export interface VehicleSliceState {
  vehicles: Vehicle[]
  status: "idle" | "loading" | "failed";
}

export class Vehicle {
  [key: string]: string
  constructor(public id: string, public carPlate: string, public brand: string){}
}

interface VehiclesState extends EntityState<Vehicle, "id">{}
