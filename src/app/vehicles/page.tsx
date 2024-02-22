'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { fetchVehicles } from "../../../lib/data";
import { createVehicle, deleteDriver, updateVehicle } from "../../../lib/actions";
import EnhancedTable, { MinimumTableProps } from "../components/enhancedTable";
import { useDispatch, useSelector } from "react-redux";
import { selectVehicleStatus, selectVehicles, selectVehiclesById } from "../../../lib/redux/slices/vehiclesSlice/selectors";

import { deleteVehicleThunk, fetchVehiclesThunk, saveNewVehicleThunk, updateVehicleThunk } from "../../../lib/redux/slices/vehiclesSlice/thunks";
import { ReduxDispatch, ReduxState } from "../../../lib/redux/store";
import { Vehicle, vehicleAdded, vehicleDeleted } from "../../../lib/redux/slices";
import VehiclesTable, { VehicleTableRow } from "../components/Tables/vehiclesTable";
import TablePaperContainer from "../components/TablePaperContainer/tablePaperContainer";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import { useSnackbar } from "notistack";

export default function Page() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<ReduxDispatch>()

    const rows = useSelector(selectVehicles)
    const status = useSelector(selectVehicleStatus)

    const [selectedId, setSelectedId] = useState<string>()

    const [editFormValues, setEditFormValues] = useState<VehicleTableRow>({
        id: "",
        carPlate: "",
        brand: ""
    })

    const [error, setError] = useState({ status: false, message: '' })

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])


    // const test = useSelector((state: ReduxState) => selectVehiclesById(state, "0"))
    // console.log(test)

    const updateEditFormValues = () => {
        setEditFormValues(rows.find(row => row.id === selectedId) || new VehicleTableRow())
    }

    const fetchData = (): void => {
        dispatch(fetchVehiclesThunk());
    }

    useEffect(fetchData, []);

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };


    async function handleSubmitCreateForm(formData: FormData) {
        const payload = {
            formData: formData,
        }
        try {
            await dispatch(saveNewVehicleThunk(payload)).unwrap();
            fetchData()
            toggleCreateModal()
            enqueueSnackbar("deu boa", { variant: "success" })
        } catch (e) {
            const error: Error = e as Error
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    async function handleSubmitEditForm(formData: FormData) {
        const payload = {
            vehicleId: editFormValues.id,
            formData: formData,
        }
        try {
            await dispatch(updateVehicleThunk(payload)).unwrap()
            fetchData()
            setIsEditModalOpen(false)
            enqueueSnackbar("Veículo atualizado com sucesso!", { variant: "success" })
        } catch (e) {
            const error: Error = e as Error
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    async function handleVehicleDeletion() {
        const payload = {
            vehicleId: editFormValues.id
        }
        try {
            await dispatch(deleteVehicleThunk(payload)).unwrap()
            if (status === 'failed') throw new Error("Falha ao deletar veículo")
            enqueueSnackbar("Veículo deletado com sucesso!", { variant: "success" })
        } catch (e) {
            const error: Error = e as Error
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    function handleClickEditModal() {
        updateEditFormValues()
        setIsEditModalOpen((prev) => !prev)
    }

    function toggleCreateModal() {
        setIsCreateModalOpen((prev) => !prev)
    }

    return (
        <Box sx={{width: "95%", mx: "auto"}}>
            <Typography variant="h4" component="h1">
                Veículos
            </Typography>
            
            <TablePaperContainer
                areButtonsActive={areButtonsActive}
                handleClickCreate={toggleCreateModal}
                handleClickEdit={handleClickEditModal}
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
                onClose={handleClickEditModal}
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
                        <Button onClick={handleClickEditModal}>Cancelar</Button>
                        <Button variant="outlined" type="submit">Salvar</Button>
                    </Box>
                </form>
            </ModalContainer>

        </Box>
    )
}