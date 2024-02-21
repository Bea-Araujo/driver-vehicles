import { GET } from "@/app/api/drivers/route"

export const fetchDrivers = async() => {
    //TODO: substituir por chamada ao banco de dados do vercel
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
        throw new Error("Failed to GET drivers")
    }
}

export const fetchVehicles = async() => {
    // TODO: refactor this method using vercel db
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