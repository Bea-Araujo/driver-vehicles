import { fetchDrivers } from "./data"

export const createDriver = async (formData: FormData, id?: string) => {
    try {
        const { name, document, vehicleId } = Object.fromEntries(formData)
        const newDriver = {
            id,
            name,
            document,
            vehicleId: vehicleId || ''
        }
    
        const response = await fetch('https://json-server-seven-psi.vercel.app/drivers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newDriver)
        })
    } catch(e) {
        throw new Error('Failed to create driver')
    }
}

export const updateDriver = async (formData: FormData, id:string) => {
    try {
        const { name, document, vehicleId } = Object.fromEntries(formData)
        const updatedDriverData = {
            id,
            name,
            document,
            vehicleId
        }

        const response = await fetch(`https://json-server-seven-psi.vercel.app/drivers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDriverData)
        })
    } catch(e) {
        console.log('ERROR')
        console.error(e)
        throw new Error('Failed to update driver')
    }
}

export const deleteDriver = async (driverId: string) => {
    try {
        const response = await fetch(`https://json-server-seven-psi.vercel.app/drivers/${driverId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

    } catch (error) {
        console.error(error)
        throw new Error('Failed to delete driver')
    }
}

export const createVehicle = async (formData: FormData) => {
    try {
        const { carPlate, brand } = Object.fromEntries(formData)
        const newVehicle = {
            carPlate,
            brand,
        }
    
        const response = await fetch('https://json-server-seven-psi.vercel.app/vehicles', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newVehicle)
        })
    } catch(e) {
        throw new Error('Failed to create vehicle')
    }
}

export const updateVehicle = async (formData: FormData, vehicleId: string) => {
    try {
        const { carPlate, brand } = Object.fromEntries(formData)
        const updatedVehicleData = {
            carPlate,
            brand,
        }


        const response = await fetch(`https://json-server-seven-psi.vercel.app/vehicles/${vehicleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedVehicleData)
        })
    } catch(e) {
        throw new Error('Failed to update vehicle')
    }
}

export const deleteVehicle = async (vehicleId: string) => {
    try {
        const response = await fetch(`https://json-server-seven-psi.vercel.app/vehicles/${vehicleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        throw new Error('Failed to delete vehicle')
    }
}


