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
import ModalContainer from "../components/ModalContainer/ModalContainer";
import { useSnackbar } from "notistack";


export class VehicleTableRow extends Vehicle {
    [key: string]: string
    constructor(input?: { id: string, carPlate: string, brand: string }) {
        super(input?.id || "", input?.carPlate || "", input?.brand || "")
    }
}


export default function Page() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<ReduxDispatch>()

    const rows = useSelector(selectVehicles)
    
    const [selectedId, setSelectedId] = useState<string>()
    
    const [editFormValues, setEditFormValues] = useState<VehicleTableRow>({
        id: "",
        carPlate: "",
        brand: ""
    })

    const [error, setError] = useState({status: false, message: ''})

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])


    // const test = useSelector((state: ReduxState) => selectVehiclesById(state, "0"))
    // console.log(test)

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
        try {
            dispatch(saveNewVehicleThunk(payload))
            fetchData()
            toggleCreateModal()
            //TODO: show success alert or success snackbar
        } catch (error) {
            //TODO: show error alert or error snackbar
        }
    }

    function handleSubmitEditForm(formData: FormData) {
        const payload = {
            vehicleId: editFormValues.id,
            formData: formData,
        }
        try {
            dispatch(updateVehicleThunk(payload))
            fetchData()
            toggleEditModal()
            //TODO: show success alert or success snackbar
        } catch (error) {
            //TODO: show error alert or error snackbar
        }
    }

    const handleVehicleDeletion = () => {
        const payload = {
            vehicleId: editFormValues.id
        }
        try {
            dispatch(deleteVehicleThunk(payload))
            dispatch(vehicleDeleted(editFormValues.id))
            //TODO: show success alert or success snackbar
        } catch (error) {
            //TODO: show error alert or error snackbar
        }
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
                areButtonsActive={areButtonsActive}
                handleClickCreate={toggleCreateModal}
                handleClickEdit={toggleEditModal}
                handleClickDelete={handleVehicleDeletion}
            >
                <VehiclesTable
                    rows={rows}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />
            </TablePaperContainer>

            <ModalContainer
                isOpen={isCreateModalOpen}
                onClose={toggleCreateModal}
                title="Criar um veículo"
            >
                <form action={handleSubmitCreateForm}>
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                        <TextField id="create-vehicle-form__car-plate" label="Placa" variant="outlined" name="carPlate" />
                        <TextField id="create-vehicle-form__brand" label="Marca" variant="outlined" name="brand" />
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={toggleCreateModal}>Cancelar</Button>
                        <Button variant="outlined" type="submit">Criar</Button>
                    </Box>
                </form>
            </ModalContainer>

            <ModalContainer
                isOpen={isEditModalOpen}
                onClose={toggleEditModal}
                title="Editar um veículo"
            > 
                  <form action={handleSubmitEditForm}>
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                        <TextField
                            id="edit-vehicle-form__car-plate"
                            label="Placa"
                            variant="outlined"
                            name="carPlate"
                            value={editFormValues?.carPlate}
                            onChange={handleEditFormChange}
                            />
                        <TextField
                            id="edit-vehicle-form__brand"
                            label="Marca"
                            variant="outlined"
                            name="brand"
                            value={editFormValues?.brand}
                            onChange={handleEditFormChange}
                            />
                    </Box>
                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={toggleCreateModal}>Cancelar</Button>
                        <Button variant="outlined" type="submit">Salvar</Button>
                    </Box>
                </form>
            </ModalContainer>

        </main>
    )
}