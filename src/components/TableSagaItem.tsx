import useTriedSagasStore from '../hooks/useTriedSagas';
import type { Saga } from '../types/game';
import SquareResult from './SquareResult';

interface TableSagaItemProps {
    title: string;
    ariaLabel: string;
    renderLogic: (saga: Saga) => {
        state: "correct" | "incorrect" | "partial";
        showArrow?: boolean;
        higher?: boolean;
        lower?: boolean;
    };
    getDisplayValue: (saga: Saga) => string | string[];
}

const TableSagaItem = ({ 
    title, 
    ariaLabel, 
    renderLogic,
    getDisplayValue 
}: TableSagaItemProps) => {
    const triedSagas = useTriedSagasStore((state) => state.triedSagas);

    return (
        <div className="text-center">
            <span
                className="text-base font-bold mb-4 text-white"
                aria-label={ariaLabel}
            >
                {title}
            </span>
            {triedSagas.map((saga) => {
                const { state, showArrow, higher, lower } = renderLogic(saga);
                return (
                    <SquareResult
                        key={saga.id}
                        title={getDisplayValue(saga)}
                        showArrow={showArrow || false}
                        state={state}
                        higher={higher}
                        lower={lower}
                    />
                );
            })}
        </div>
    );
};

export default TableSagaItem;