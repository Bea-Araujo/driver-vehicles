'use client'

import { createDriver, deleteDriver, updateDriver } from "../../../lib/actions";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { fetchDrivers } from "../../../lib/data";
import DriversTable, { DriverTableRow } from "../components/Tables/driversTable";
import TablePaperContainer from "../components/TablePaperContainer/tablePaperContainer";
import ModalContainer from "../components/ModalContainer/ModalContainer";

import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch, ReduxState } from "../../../lib/redux/store";
import { fetchVehiclesThunk, selectVehicles, selectVehiclesById } from "../../../lib/redux/slices";
import CardGroup from "../components/CardGroup/cardGroup";

export default function Page() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch<ReduxDispatch>()

    const [rows, setRows] = useState<DriverTableRow[]>([])
    const [selectedId, setSelectedId] = useState<string>()

    const [editFormValues, setEditFormValues] = useState<DriverTableRow>(new DriverTableRow())

    const [error, setError] = useState({ status: false, message: '' })

    const isDriverSelected = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const selectedDriverDisplayData = useMemo(() => {
        const blankData = new DriverTableRow()
        const currentDriverData = rows.find(row => row.id === selectedId)
        return { ...blankData, ...currentDriverData }
    }, [selectedId])

    const driversVehicle = useSelector((state: ReduxState) => selectVehiclesById(state, selectedDriverDisplayData.vehicleId))

    async function fetchData() {
        try {
            const response = await fetchDrivers()
            if (!response) throw new Error("Erro ao carregar dados")
            if (response.length === 0) setError({ status: true, message: "Nenhum motorista encontrado" })
            setRows(response)
        } catch (e) {
            const error: Error = e as Error;
            setError({ status: true, message: error.message })
            enqueueSnackbar(error.message, { variant: "error" })
            setRows([])
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    function handleSubmitCreateForm(formData: FormData) {
        try {
            console.log(formData)
            assertFirstDriverAndCreate(formData)
            fetchData()
            toggleCreateModal()
            enqueueSnackbar("Motorista criado com sucesso!", { variant: "success" })
        } catch (e) {
            enqueueSnackbar("Erro ao criar motorista", { variant: "error" })
        }
    }

    function assertFirstDriverAndCreate(formData: FormData) {
        const isFirstDriver = rows.length === 0
        isFirstDriver ? createDriver(formData, '81SaHMe') : createDriver(formData)
    }

    function handleSubmitEditForm(formData: FormData) {
        try {
            updateDriver(formData, editFormValues.id)
            fetchData()
            setIsEditModalOpen(false)
            enqueueSnackbar("Motorista atualizar com sucesso!", { variant: "success" })
        } catch (e) {
            enqueueSnackbar("Erro ao atualizar motorista", { variant: "error" })

        }
    }

    async function handleDriverDeletion() {
        try {
            if (!selectedId) return
            await deleteDriver(selectedId)
            await fetchData()
            assertDeletedLastUser()
            enqueueSnackbar("Motorista deletado com sucesso!", { variant: "success" })
        } catch (error) {
            enqueueSnackbar("Erro ao deletar motorista", { variant: "error" })
        }
    }

    function assertDeletedLastUser() {
        //TODO: review
        const isRowsEmpty = rows.length === 1
        isRowsEmpty && setError({ status: true, message: "Nnehum motorista encontrado" })
        setSelectedId('')
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    function handleClickEditModal() {
        updateSelectedDriverValues()
        setIsEditModalOpen((prev) => !prev)
    }

    const updateSelectedDriverValues = () => {
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new DriverTableRow())
    }

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    function toggleCreateModal() {
        setIsCreateModalOpen((prev) => !prev)
        setSelectedVehicleId('')
        vehicleIds.length === 0 && dispatch(fetchVehiclesThunk());
    }

    const [selectedVehicleId, setSelectedVehicleId] = useState('')
    const handleVehicleIdSelection = (event: SelectChangeEvent) => {
        setSelectedVehicleId(event.target.value as string);
    };

    const vehicleIds = useSelector(selectVehicles)

    return (
        <main>
            <TablePaperContainer
                areButtonsActive={isDriverSelected}
                handleClickCreate={toggleCreateModal}
                handleClickEdit={handleClickEditModal}
                handleClickDelete={handleDriverDeletion}
            >
                <DriversTable
                    rows={rows}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    error={error}
                />
            </TablePaperContainer>

            <CardGroup
                driverDataObject={selectedDriverDisplayData}
                vehicleDataObject={driversVehicle}
                isShowing={isDriverSelected}
            />

            <ModalContainer
                isOpen={isCreateModalOpen}
                onClose={toggleCreateModal}
                title="Criar um motorista"
            >
                <Box component="form" action={handleSubmitCreateForm}>
                    <Box sx={{ width: "100%", display: 'flex', flexWrap: "wrap", justifyContent: 'space-between', justifySelf: 'center', my: 2, gap: 1 }}>
                        <TextField id="create-driver-form__name" label="Nome" variant="outlined" name="name" />
                        <TextField id="create-driver-form__document" label="Documento" variant="outlined" name="document" />

                        <FormControl sx={{ minWidth: 206 }}>
                            <InputLabel id="create-driver-form__select__label">Veículo</InputLabel>
                            <Select
                                labelId="create-driver-form__select__label"
                                id="create-driver-form__select__input"
                                value={selectedVehicleId}
                                label="Age"
                                onChange={handleVehicleIdSelection}
                                name="vehicleId"
                            >
                                {
                                    vehicleIds.map(el => (
                                        <MenuItem key={`create-driver-form__select__option-${el.id}`} value={el.id}>
                                            {el.carPlate}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={toggleCreateModal}>Cancelar</Button>
                        <Button variant="outlined" type="submit">Criar</Button>
                    </Box>
                </Box>
            </ModalContainer>

            <ModalContainer
                isOpen={isEditModalOpen}
                onClose={handleClickEditModal}
                title="Editar um motorista"
            >
                <form action={handleSubmitEditForm}>
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                        <TextField
                            id="edit-driver-form__id"
                            label="ID do motorista"
                            variant="outlined"
                            name="driverId"
                            value={editFormValues?.id}
                            disabled
                        />

                        <TextField
                            id="edit-driver-form__name"
                            label="Nome"
                            variant="outlined"
                            name="name"
                            value={editFormValues?.name}
                            onChange={handleEditFormChange}
                        />
                        <TextField
                            id="edit-driver-form__document"
                            label="Documento"
                            variant="outlined"
                            name="document"
                            value={editFormValues?.document}
                            onChange={handleEditFormChange}
                        />

                        <TextField
                            id="edit-driver-form__vehicle-id"
                            label="Veículo"
                            variant="outlined"
                            name="vehicleId"
                            value={editFormValues?.vehicleId}
                            onChange={handleEditFormChange}
                        />

                        <FormControl sx={{ minWidth: 206 }}>
                            <InputLabel id="edit-driver-form__select__label">Veículo</InputLabel>
                            <Select
                                labelId="edit-driver-form__select__label"
                                id="edit-driver-form__select__input"
                                value={selectedVehicleId}
                                label="Age"
                                onChange={handleVehicleIdSelection}
                                name="vehicleId"
                            >
                                {
                                    vehicleIds.map(el => (
                                        <MenuItem key={`edit-driver-form__select__option-${el.id}`} value={el.id}>
                                            {el.carPlate}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
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