import { Box, Modal, Paper } from "@mui/material";
import { ReactNode } from "react";

interface ModalContainerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children?: ReactNode
}

export default function ModalContainer({isOpen, onClose, title, children}: ModalContainerProps) {
    return (
        <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
        <Box sx={{ width: "fit-content", justifySelf: 'center' }}>
            <Paper sx={{ p: 2 }}>
                <h2 id="parent-modal-title">{title}</h2>
                {children}
            </Paper>

        </Box>
    </Modal>
    )
}