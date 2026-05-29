import type { Saga } from "../types/game";

interface SagasDropdownProps {
    sagas: Saga[];
    onClick: (saga: Saga) => void;
}


const SagasDropdown = ({ sagas, onClick }: SagasDropdownProps) => {
    return (
        <ul className="absolute w-full mt-2 max-h-60 overflow-auto hide-scrollbar glass-strong border border-neon-cyan/40 rounded-lg glow-cyan z-50">
            {sagas.map(saga => (
                <li
                    key={saga.id}
                    translate='no'
                    onClick={() => onClick(saga)}
                    className="p-2 cursor-pointer text-arcade-ink font-medium flex items-center gap-3 border-b border-white/5 last:border-b-0 transition-colors hover:bg-neon-cyan/15 hover:text-glow-cyan"
                >
                    <picture>
                        <img
                            src={saga.imageUrl}
                            alt={saga.title}
                            className="object-cover w-14 h-14 rounded-md border border-neon-cyan/40"
                        />
                    </picture>
                    {saga.title}
                </li>
            ))}
        </ul>
    )
}

export default SagasDropdown