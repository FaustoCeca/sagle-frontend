import { useEffect, useState } from 'react';
import type { AttemptField, AttemptResult } from '../types/game';
import SquareResult from './SquareResult';

interface TableSagaItemProps {
    title: string;
    ariaLabel: string;
    attempts: AttemptResult[];
    getField?: (attempt: AttemptResult) => AttemptField;
    showImage?: boolean;
}

const TableSagaItem = ({
    title,
    ariaLabel,
    attempts,
    getField,
    showImage = false,
}: TableSagaItemProps) => {
    const [animateId, setAnimateId] = useState<number>(0);

    useEffect(() => {
        if (attempts.length === 0) return;
        const newest = attempts[0];

        setAnimateId(newest.sagaId);

        const timer = setTimeout(() => {
            setAnimateId(0);
        }, 1000);

        return () => clearTimeout(timer);
    }, [attempts]);

    return (
        <div className="text-center">
            <span
                className="block text-xs font-bold uppercase tracking-widest text-neon-cyan/90 pb-1"
                aria-label={ariaLabel}
            >
                {title}
            </span>
            {
                attempts.length > 0 && !showImage && getField &&
                <div className="flex flex-col items-center mt-2">
                    {
                        attempts.map((attempt) => {
                            const field = getField(attempt);
                            return (
                                <div
                                    key={attempt.sagaId}
                                    className={`square-result-container ${animateId == attempt.sagaId ? 'animate-fade-in' : ''}`}
                                >
                                    <SquareResult
                                        title={field.value}
                                        showArrow={!!field.arrow}
                                        state={field.state}
                                        higher={field.arrow === 'up'}
                                        lower={field.arrow === 'down'}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
            }
            {
                showImage && attempts.length > 0 && (
                    <div className="flex flex-col items-center">
                        {attempts.map((attempt) => (
                            <div
                                key={attempt.sagaId}
                                className={`${animateId == attempt.sagaId ? 'animate-fade-in' : ''} mt-2 text-[0px] h-full w-full flex items-center justify-center`}
                            >
                                <img
                                    src={attempt.imageUrl}
                                    alt={attempt.title}
                                    className="w-[110px] h-[110px] object-cover rounded-lg border-2 border-neon-cyan/50 glow-cyan"
                                />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default TableSagaItem;
