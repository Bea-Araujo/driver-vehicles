'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, Paper, TextField } from "@mui/material";
import { fetchVehicles } from "../../../lib/data";
import { createVehicle, deleteDriver, updateVehicle } from "../../../lib/actions";
import EnhancedTable, { MinimumTableProps } from "../components/enhancedTable";
import { useDispatch, useSelector } from "react-redux";
import { selectVehicles, selectVehiclesById } from "../../../lib/redux/slices/vehiclesSlice/selectors";

import { deleteVehicleThunk, fetchVehiclesThunk, saveNewVehicleThunk, updateVehicleThunk } from "../../../lib/redux/slices/vehiclesSlice/thunks";
import { ReduxDispatch, ReduxState } from "../../../lib/redux/store";
import { Vehicle, vehicleAdded, vehicleDeleted } from "../../../lib/redux/slices";
import VehiclesTable from "../components/Tables/vehiclesTable";
import TablePaperContainer from "../components/TablePaperContainer/tablePaperContainer";


export class VehicleTableRow extends Vehicle {
    [key: string]: string
    constructor(input?: { id: string, carPlate: string, brand: string }) {
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


    function handleSubmitCreateForm(formData: FormData) {
        const payload = {
            formData: formData,
        }
        dispatch(saveNewVehicleThunk(payload))
        fetchData()
    }

    function handleSubmitEditForm(formData: FormData) {
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    function toggleEditModal() {
        setIsEditModalOpen((prev) => !prev)
    }

    function toggleCreateModal() {
        setIsCreateModalOpen((prev) => !prev)
    }

    return (
        <main>
            <TablePaperContainer
                areButtonsActive
                handleClickCreate={toggleCreateModal}
                handleClickEdit={toggleEditModal}
                handleClickDelete={handleDriverDeletion}
            >


                <VehiclesTable
                    rows={rows}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </TablePaperContainer>


            <Modal
                open={isCreateModalOpen}
                onClose={toggleEditModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box sx={{ width: "max-content", justifySelf: 'center' }}>
                    <Paper sx={{ p: 2 }}>
                        <h2 id="parent-modal-title">Criar um veículo</h2>
                        <form action={handleSubmitCreateForm}>
                            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                                <TextField id="outlined-basic" label="Placa" variant="outlined" name="carPlate" />
                                <TextField id="outlined-basic" label="Marca" variant="outlined" name="brand" />
                            </Box>


                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button onClick={toggleCreateModal}>Cancelar</Button>
                                <Button variant="outlined" type="submit">Criar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>

            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Editar um veículo</h2>
                <form action={handleSubmitEditForm}>
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