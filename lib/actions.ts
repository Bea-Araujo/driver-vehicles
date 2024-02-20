
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
        console.log(Object.fromEntries(formData))
        const { name, document, vehicleId } = Object.fromEntries(formData)
        console.log(vehicleId)
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

}

export const createVehicle = async (formData: FormData) => {

}

export const updateVehicle = async (formData: FormData) => {

}

export const deleteVehicle = async (vehicleId: string) => {

}


