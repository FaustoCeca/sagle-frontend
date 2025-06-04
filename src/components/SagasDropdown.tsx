import type { Saga } from "../types/game";

interface SagasDropdownProps {
    sagas: Saga[];
    onClick: (saga: Saga) => void;
}


const SagasDropdown = ({ sagas, onClick }: SagasDropdownProps) => {
    return (
        <ul className="absolute w-full mt-1 max-h-60 overflow-scroll bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
            {sagas.map(saga => (
                <li
                    key={saga.id}
                    translate='no'
                    onClick={() => onClick(saga)}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-black flex items-center gap-2"
                >
                    <picture>
                        <img
                            src={saga.imageUrl}
                            alt={saga.title}
                            className="object-cover w-16 h-16 border-solid border-2 border-black"
                        />
                    </picture>
                    {saga.title}
                </li>
            ))}
        </ul>
    )
}

export default SagasDropdown