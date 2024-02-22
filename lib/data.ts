
export const fetchDrivers = async() => {
    try {
        const response = await fetch('http://localhost:8000/drivers', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const drivers = await response.json()
        return drivers
    } catch (error) {
        throw new Error("Failed to GET drivers")
    }
}

export const fetchVehicles = async() => {
    try {
        const response = await fetch('http://localhost:8000/vehicles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        
        return data
    } catch (error) {
        throw new Error("Failed to GET vehicles")
    }
}