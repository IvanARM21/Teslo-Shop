'use client';

import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props { 
    totalPages: number;
}

export const Pagination = ({ totalPages } : Props) => {

    const pathname = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;

    const isNan = isNaN(+pageString);
    let currentPage = isNan ? 1 : +pageString;

    if(currentPage < 1 || isNan) {
        redirect(pathname);
    }

    const allPages = generatePaginationNumbers(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        if( pageNumber === '...' ) {
            return `${ pathname }?${ params.toString() }`
        }

        if( +pageNumber <= 0 ) {
            return `${ pathname }`; // href="/women"
        }

        if( +pageNumber > totalPages) { // Next > 
            return `${pathname}?${params.toString()}`; // href="/women"
        }

        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }
  
  return (
    <div className="flex text-center mt-10 mb-20 justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex justify-center items-center list-style-none gap-1">
        <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
                <IoChevronBackOutline size={30} />
            </Link>
          </li>

        {allPages.map((page, index) => (
            <li className="page-item" key={`${page}-${index}`}>
                <Link 
                    href={createPageUrl(page)} 
                    className={
                        clsx(
                            "page-link relative block py-1 5 px-3 border-0 outline-none rounded texr-gray-800 hover:bg-gray-200 transition-all duration-300",
                            {
                                'bg-blue-600 shadow-md text-white h hover:bg-blue-700': page === currentPage
                            }
                        )
                    }
                >{page}</Link>
            </li>
        ))}

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
                <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
