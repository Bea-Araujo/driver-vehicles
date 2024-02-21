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
    async(formData: FormData) => {
        const response = await createVehicle(formData)
        return response
    }
)

export const updateVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/updateVehicle",
    async(payload: {id: string, formData: FormData}) => {
        const response = await updateVehicle(payload.formData, payload.id)
        return response
    }
)

export const deleteVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/deleteVehicle",
    async(payload: {id: string}) => {
        const response = await deleteVehicle(payload.id)
        return response
    }
)