import { createVehicle, deleteVehicle, updateVehicle } from "../../../actions";
import { fetchVehicles } from "../../../data";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";

export const fetchVehiclesThunk = createAppAsyncThunk(
    "vehicles/fetchVehicles",
    async() => {
        const response = await fetchVehicles()
        return response
    }
)

export const saveNewVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/saveNewVehicle",
    async(payload: {formData: FormData}) => {
        const response = await createVehicle(payload.formData)
        return response
    }
)

export const updateVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/updateVehicle",
    async(payload: {vehicleId: string, formData: FormData}) => {
        const response = await updateVehicle(payload.formData, payload.vehicleId)
        return response
    }
)

export const deleteVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/deleteVehicle",
    async(payload: {vehicleId: string}) => {
        const response = await deleteVehicle(payload.vehicleId)
        return response
    }
)