
export const createDriver = async (formData: FormData) => {
    try {
        const { name, document, vehicleId } = Object.fromEntries(formData)
        const newDriver = {
            name,
            document,
            vehicleId
        }
    
        const response = await fetch('http://localhost:3000/api/drivers', {
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

        console.log(updatedDriverData)
    
        const response = await fetch(`http://localhost:3000/api/drivers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDriverData)
        })
    } catch(e) {
        throw new Error('Failed to create driver')
    }
}

export const deleteDriver = async (driverId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/api/drivers/${driverId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
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
    
        const response = await fetch('http://localhost:8000/vehicle', {
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

        const response = await fetch(`http://localhost:8000/vehicle/${vehicleId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedVehicleData)
        })
    } catch(e) {
        throw new Error('Failed to create vehicle')
    }
}

export const deleteVehicle = async (vehicleId: string) => {
    try {
        const response = await fetch(`http://localhost:8000/vehicle/${vehicleId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    } catch (error) {
        throw new Error('Failed to delete vehicle')
    }
}


