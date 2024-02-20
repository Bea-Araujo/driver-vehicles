import { NextResponse } from "next/server"

export async function GET() {
    console.log("GET REQUEST")
    try {
        // const response = await fetch('http://localhost:8000/drivers')
        // const drivers = await response.json()
        
        return NextResponse.json({
            drivers: [{id: 0, name: 'test', vehicleId: 0}]
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function POST(request: Request) {
    try {
        const {name, document, hasVehicle} = await request.json()
        
        const newUser = {
            name,
            document,
            hasVehicle
        }

        const response = await fetch('http://localhost:8000/drivers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })

        return NextResponse.json({message: "Driver added successfully"}, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}