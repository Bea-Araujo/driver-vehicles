import { Button } from "@mui/material";
import style from './header.module.css'
import Image from "next/image";

export default function Header(){
    return (
        <header className={style.headerContainer}>
            <div className={style.navigationContainer}>
                <Button size="medium">Motoristas</Button>
                <Button size="medium">Veículos</Button>
            </div>

            <Image src="" alt="gobrax logo"/>
            <Button variant="contained" size="medium">LinkedIn</Button>
        </header>
    )
}