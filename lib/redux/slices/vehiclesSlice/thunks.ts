import { createVehicle, deleteVehicle, updateVehicle } from "../../../actions";
import { fetchVehicles } from "../../../data";
import { createAppAsyncThunk } from "../../createAppAsyncThunk";
import { reduxStore } from "../../store";

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
        try {            
            await updateVehicle(payload.formData, payload.vehicleId)
            const data = await fetchVehicles()

            return data
        } catch (error) {
            console.log('CATCHUP')
            throw new Error('deu ruim')
        }
    }
)

export const deleteVehicleThunk = createAppAsyncThunk(
    "vehicles/DB/deleteVehicle",
    async(payload: {vehicleId: string}) => {
        const response = await deleteVehicle(payload.vehicleId)
        return payload.vehicleId
    }
)