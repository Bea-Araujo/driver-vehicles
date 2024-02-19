
export async function getDriversData(){
    try {
        const res = await fetch('http://localhost:8000/drivers')
        return res.json()
    } catch (error) {
        throw new Error("Failed to fetch drivers")
    }
}