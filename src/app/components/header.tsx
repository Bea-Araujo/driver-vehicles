import { Button } from "@mui/material";
import style from './header.module.css'
import Image from "next/image";
import Link from "next/link";

import gobraxLogo from '@/../public/gobraxLogo.png'

export default function Header(){
    return (
        <header className={style.headerContainer}>
            <div className={style.navigationContainer}>
            <Link href="/drivers">
                <Button size="medium">Motoristas</Button>
            </Link>
            <Link href="/vehicles">
                <Button size="medium">Veículos</Button>
            </Link>
            </div>

            <Image src={gobraxLogo} width={100} alt="gobrax logo"/>
            <Link href="https://www.linkedin.com/in/beatriz-araujo-dev/">
               <Button variant="contained" size="medium">LinkedIn</Button>
            </Link>
        </header>
    )
}