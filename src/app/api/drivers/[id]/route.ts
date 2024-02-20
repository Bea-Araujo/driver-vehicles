import { NextResponse } from "next/server"

export async function GET(request: Request, context: {params: {id: string}}) {
    const driverId = context.params.id
    try {
        const res = await fetch(`http://localhost:8000/drivers/${driverId}`)
        const driver = await res.json()
        return NextResponse.json({driver}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Failed to GET driver", error}, {status: 500})
    }
    return
}

export async function PUT(request: Request, context: {params: {id: string}}) {
    console.log("PUT REQUEST")
    const driverId = context.params.id
    try {
        const {name, document, hasVehicle} = await request.json()
        const updatedUser = {
            name, 
            document, 
            hasVehicle
        }
        const res = await fetch(`http://localhost:8000/drivers/${driverId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        return NextResponse.json({message: "Driver successfully updated"}, {status: 200})
    } catch (error) {
        throw new Error("Failed to PUT driver")
    }
}

export async function DELETE(request: Request, context: {params: {id: string}}) {
    console.log("DELETE REQUEST")
    const driverId = context.params.id
    try {
        
        const res = await fetch(`http://localhost:8000/drivers/${driverId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        return NextResponse.json({message: "Driver successfully deleted"}, {status: 200})
    } catch (error) {
        throw new Error("Failed to DELETE drivers")
    }
    
}