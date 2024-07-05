'use client';

import Link from 'next/link';
import { useUIStore } from '@/store/ui/ui-store';
import { logout } from '@/actions';
import clsx from 'clsx';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'
import { Session } from 'next-auth';
import { useAddressStore } from '@/store';

interface Props {
    session?: Session | undefined;
}

export const Sidebar = ({session} : Props) => {

  const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
  const closeMenu = useUIStore(state => state.closeSideMenu);
  const clearAddress = useAddressStore(state => state.clearAddres);

  let isAuthenticated = false;
  let isAdmin = false;
  
  if(session?.user) {
    isAuthenticated = !!session?.user;
    isAdmin = session?.user.role === 'admin';
  }

  const onLogout = async () => {
    await logout();
    clearAddress();
    closeMenu();
  }

  return (
    <>
        {/* Background Black */}
        {
            isSideMenuOpen && (
                <div
                    className="fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30"
                />
            )
        }

        {/* Blur*/}
        {
            isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )
        }
        
        {/* SideMenu */}
        <nav 
            // todo: efecto de slide
            className={
                clsx(
                    "fixed p-3 sm:p-6 overflow-y-auto right-0 top-0 w-full max-w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }
        >
            <IoCloseOutline 
                size={50}
                className="absolute top-5 right-5 cursor-pointer"
                onClick={() => closeMenu()}
            />

            {/* Input */}
            <div className="relative mt-14">
                <IoSearchOutline size={20} className="absolute top-3 left-2"/>
                <input 
                    type="text" 
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded pl-10 py-2 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Menu */}

            {isAuthenticated && (
                <>
                    <Link
                        href="/profile"
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoPersonOutline size={30} />
                        <span className="ml-3 text-xl">Perfil</span>
                    </Link>

                    <Link
                        href="/orders"
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoTicketOutline size={30} />
                        <span className="ml-3 text-xl">Ordenes</span>
                    </Link>
                </>
            )}

            {
                isAuthenticated && (
                    <button
                        type='button'
                        className='flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                        onClick={() => onLogout()}
                    >
                        <IoLogOutOutline size={30} />
                        <span className="ml-3 text-xl">Salir</span>
                    </button>
                )
            }

            {
                !isAuthenticated && (
                    <Link
                        href="/auth/login"
                        onClick={() => closeMenu()}
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoLogInOutline size={30} />
                        <span className="ml-3 text-xl">Ingresar</span>
                    </Link>
                )
            }

            {/* Line Separator */}
            <div className="w-full h-px bg-gray-200 my-10" />

            {isAdmin && (
                <>
                    <Link
                        href="/admin/products"
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoShirtOutline size={30} />
                        <span className="ml-3 text-xl">Productos</span>
                    </Link>

                    <Link
                        href="/admin/orders"
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoTicketOutline size={30} />
                        <span className="ml-3 text-xl">Ordenes</span>
                    </Link>

                    <Link
                        href="/admin/users"
                        className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
                    >
                        <IoPeopleOutline size={30} />
                        <span className="ml-3 text-xl">Usuarios</span>
                    </Link>
                </>
            )}
        </nav>
    </>
  )
}
