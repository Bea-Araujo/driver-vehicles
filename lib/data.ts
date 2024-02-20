import { GET } from "@/app/api/drivers/route"

export const fetchDrivers = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/drivers', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const {drivers} = await response.json()
        return drivers
    } catch (error) {
        console.log(error)
        throw new Error("Failed to GET drivers")
    }
}

export const fetchVehicles = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/vehicles', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const {drivers} = await response.json()
        return drivers
    } catch (error) {
        console.log(error)
        throw new Error("Failed to GET vehicles")
    }
}