import { useEffect, useState } from 'react';
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
    const [animateId, setAnimateId] = useState<number>(0);

    useEffect(() => {
        if (triedSagas.length == 0) return;
        const newSaga = triedSagas[0];

        setAnimateId(newSaga.id);

        const timer = setTimeout(() => {
            setAnimateId(0);
        }, 1000);

        return () => clearTimeout(timer);
    }, [triedSagas]);

    return (
        <div className="text-center">
            <span
                className="text-base font-bold text-white"
                aria-label={ariaLabel}
            >
                {title}
            </span>
            {
                triedSagas.length > 0 && !showImage &&
                <div className="flex flex-col items-center mt-2">
                    {
                        triedSagas.map((saga) => {
                            const { state, showArrow, higher, lower } = renderLogic(saga);
                            return (
                                <div
                                    key={saga.id}
                                    className={`square-result-container ${animateId == saga?.id ? 'animate-fade-in' : ''}`}
                                >
                                    <SquareResult
                                        title={getDisplayValue(saga)}
                                        showArrow={showArrow || false}
                                        state={state}
                                        higher={higher}
                                        lower={lower}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            }
            {
                showImage && triedSagas.length > 0 && (
                    <div className="flex flex-col items-center">
                        {triedSagas.map((saga, index) => (
                            <>
                                <div
                                    key={index}
                                    className={`${animateId == saga?.id ? 'animate-fade-in' : ''} mt-2 text-[0px] h-full w-full flex items-center justify-center`}
                                >
                                    <img
                                        src={saga.imageUrl}
                                        alt={saga.title}
                                        className="w-[110px] h-[110px] object-cover border-solid border-2 border-black"
                                    />
                                </div>
                            </>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default TableSagaItem;