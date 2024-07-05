import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex justify-around flex-wrap-reverse w-full items-center gap-5 px-5 border-t py-4">
        <div>
            <p className="text-center">
                <Link
                    href="/"
                >
                    <span className={`${titleFont.className} antialiased font-bold`}>Teslo </span>
                    <span>| shop </span>
                </Link>
                <span> {' '} All Rights Reserverd {new Date().getFullYear()}, design by</span>
                <span className="font-bold"> {' '} Iván Rodríguez</span>
            </p>
        </div>
        <div className="text-center flex gap-3">
            <Link
                href="/"
            >Privacidad & Legal</Link>

            <Link
                href="/"
            >Ubicaciones</Link>
        </div>
    </div>
  )
}
