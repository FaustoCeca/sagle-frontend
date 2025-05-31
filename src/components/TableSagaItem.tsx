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
    showImage?: boolean;
    triedSagas: Saga[];
}

const TableSagaItem = ({
    title,
    ariaLabel,
    renderLogic,
    getDisplayValue,
    showImage = false,
    triedSagas = []
}: TableSagaItemProps) => {

    return (
        <div className="text-center">
            <span
                className="text-base font-bold mb-4 text-white"
                aria-label={ariaLabel}
            >
                {title}
            </span>
            {
                triedSagas.length > 0 && !showImage &&
                triedSagas.map((saga) => {
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
                })
            }
            {
                showImage && triedSagas.length > 0 && (
                    <div className="flex flex-col items-center">
                        {triedSagas.map((saga) => (
                            <img
                                key={saga.id}
                                src={saga.imageUrl}
                                alt={saga.title}
                                className="w-20 h-20 object-cover mb-2 border-solid border-2 border-black"
                            />
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default TableSagaItem;