import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged:(size: Size) => void 
}

export const SizeSelector = ({selectedSize, availableSizes, onSizeChanged} : Props) => {
  return (
    <div className="my-5">
        <h3 className="font-bold mb-4">Tallas disponibles</h3>

        <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
                <button 
                    key={size}
                    onClick={() => onSizeChanged(size)}
                    type="button"
                    className={
                        clsx(
                            " hover:border-black hover:bg-black hover:text-white text-lg border-2 font-medium w-16 transition-all duration-500 rounded-xl",
                            {
                                'bg-black text-white border-black': size === selectedSize
                            }
                        )
                    }
                >{size}</button>
            ))}
        </div>
    </div>
  )
}
