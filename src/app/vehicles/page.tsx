'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { fetchVehicles } from "../../../lib/data";
import { createVehicle, deleteDriver, updateVehicle } from "../../../lib/actions";
import EnhancedTable, { MinimumTableProps } from "../components/enhancedTable";
import { useDispatch, useSelector } from "react-redux";
import { selectVehicles, selectVehiclesById } from "../../../lib/redux/slices/vehiclesSlice/selectors";

import { deleteVehicleThunk, fetchVehiclesThunk, saveNewVehicleThunk, updateVehicleThunk } from "../../../lib/redux/slices/vehiclesSlice/thunks";
import { ReduxDispatch, ReduxState } from "../../../lib/redux/store";
import { Vehicle, vehicleAdded, vehicleDeleted } from "../../../lib/redux/slices";
import VehiclesTable from "../components/Tables/vehiclesTable";


export class VehicleTableRow extends Vehicle {
    [key: string]: string
    constructor(input?: { id: string, carPlate: string, brand: string}){
        super(input?.id || "", input?.carPlate || "", input?.brand || "")
    }
}


export default function Page() {
    const [selectedId, setSelectedId] = useState<string>()

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const dispatch = useDispatch<ReduxDispatch>()
    const rows = useSelector(selectVehicles)

    // const test = useSelector((state: ReduxState) => selectVehiclesById(state, "0"))
    // console.log(test)

    const [editFormValues, setEditFormValues] = useState<VehicleTableRow>({
        id: "",
        carPlate: "",
        brand: ""
    })

    const updateSelectedVehicleValues = useCallback(() => {
        if (!rows) return
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new VehicleTableRow())
    }, [selectedId, rows])

    const fetchData = useCallback(() => {
        dispatch(fetchVehiclesThunk())
    }, [dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    useEffect(() => {
        updateSelectedVehicleValues()
    }, [selectedId, updateSelectedVehicleValues])

    const [isOpen, setIsOpen] = useState(false)
    function toggleModal() {
        setIsOpen((prev) => !prev)
    }

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };


    function handleSubmitCreateForm(formData: FormData){
        const payload = {
            formData: formData,
        }
        dispatch(saveNewVehicleThunk(payload))
        fetchData()
    }

    function handleEditCreateForm(formData: FormData){
        const payload = {
            vehicleId: editFormValues.id, 
            formData: formData,
        }
        dispatch(updateVehicleThunk(payload))
        fetchData()
    }

    const handleDriverDeletion = () => {
        const payload = {
            vehicleId: editFormValues.id
        }
        dispatch(deleteVehicleThunk(payload))
        dispatch(vehicleDeleted(editFormValues.id))
        // fetchData()
    }

    return (
        <main>

            <VehiclesTable 
                rows={rows}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
            />
            {areButtonsActive}
            <Button onClick={toggleModal}>Criar</Button>
            <Button disabled={!areButtonsActive}>Editar</Button>
            <Button disabled={!areButtonsActive} onClick={handleDriverDeletion}>Deletar</Button>

            <Modal
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <p>
                    this is a model
                </p>
            </Modal>
            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Criar um motorista</h2>
                <form action={handleSubmitCreateForm}>
                    <TextField id="outlined-basic" label="Placa" variant="outlined" name="carPlate" />
                    <TextField id="outlined-basic" label="Marca" variant="outlined" name="brand" />
                    <Button type="submit">Send</Button>
                </form>

            </Box>

            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Editar um motorista</h2>
                <form action={handleEditCreateForm}>
                    <TextField
                        id="outlined-basic"
                        label="Placa"
                        variant="outlined"
                        name="carPlate"
                        value={editFormValues?.carPlate}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Marca"
                        variant="outlined"
                        name="brand"
                        value={editFormValues?.brand} 
                        onChange={handleEditFormChange}
                        />
                    <Button type="submit">Send</Button>
                </form>

            </Box>

        </main>
    )
}