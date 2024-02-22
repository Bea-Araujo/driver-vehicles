import { Box, Card } from "@mui/material";
import { VehicleTableRow } from "../Tables/vehiclesTable";
import { DriverTableRow } from "../Tables/driversTable";

interface CardGroupProps {
    driverDataObject: DriverTableRow;
    vehicleDataObject: VehicleTableRow;
    isShowing: boolean;
}
export default function CardGroup({ isShowing, driverDataObject, vehicleDataObject }: CardGroupProps) {
    const driverFieldLabels: Record<keyof DriverTableRow, string> = {id: 'id', name: 'nome', document: 'documento', vehicleId: 'id do veículo'}

    const vehicleFieldLabels: Record<keyof VehicleTableRow, string> = {id: 'id', carPlate: 'Placa do carro', brand: 'Marca'}
    if (isShowing) return (
        <Box sx={{ width: '95%', display: 'flex', justifyContent: 'space-evenly', mx: 'auto', gap: 2 }}>
            <Card variant="outlined" sx={{ width: '50%', p: 1 }}>
                <h4 style={{ marginBottom: '.5rem' }}>Informação do motorista</h4>
                {Object.entries(driverDataObject).map(([key, value], i) => (
                    <Box key={`driver-page__data-card-view__driver-${key}`} sx={{ ml: 1, gap: 1, display: 'flex' }}>
                        <span style={{ fontWeight: 500, marginRight: '1rem', color: 'grey' }}>
                            {driverFieldLabels[key]}
                        </span>
                        <span>{value || 'Nenhum valor encontrado'}</span>
                    </Box>
                )
                )}
            </Card>

            <Card variant="outlined" sx={{ width: '50%', p: 1 }}>
                <h4>Informação do veículo</h4>
                {vehicleDataObject ?
                    Object.entries(vehicleDataObject || new VehicleTableRow()).map(([key, value]) => (
                        <Box key={`driver-page__data-card-view__vehicle-${key}`} sx={{ ml: 1, gap: 1, display: 'flex' }}>
                            <span style={{ fontWeight: 500, marginRight: '1rem', color: 'grey' }}>{vehicleFieldLabels[key]}</span>
                            <span>{value}</span>
                        </Box>))
                    :
                    <span>Nenhum veículo encontrado</span>
                }
            </Card>
        </Box>
    )
}