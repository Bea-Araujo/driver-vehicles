
export const fetchDrivers = async() => {
    try {
        const response = await fetch('https://json-server-seven-psi.vercel.app/drivers', {
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
        const response = await fetch('https://json-server-seven-psi.vercel.app/vehicles', {
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