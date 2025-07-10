import { useMemo, useState } from 'react'
import useTriedSagasStore from '../hooks/useTriedSagas';
import { useGetHint } from '../hooks/useGetHint';
import type { Saga } from '../types/game';

interface UnlockHintProps {
    title: string;
}

interface HintSectionProps {
    sagle: Saga | null;
}

const UnlockHint = (
    { title }: UnlockHintProps
) => {
    return (
        <div
            className='text-white mt-4 p-4 shadow-lg rounded-md w-fit backdrop-blur-md'
        >
            <p className='text-sm'>
                {title}
                {/* You need {requiredTries - tries} tries to unlock a hint! */}
            </p>
        </div>
    )
}

const HintSection = ({ sagle }: HintSectionProps) => {
    const triedSagas = useTriedSagasStore((state) => state.triedSagas);
    const memoizedTriedSagas = useMemo(() => triedSagas, [triedSagas]);
    const [showHint, setShowHint] = useState(false);
    const { fetchHint, hint, isPending, error } = useGetHint();

    const requiredTries = 3;
    const canUnlockHint = memoizedTriedSagas.length >= requiredTries;

    if (!sagle) {
        return <UnlockHint
            title='Loading your attempts...'
        />
    }

    if (!canUnlockHint && sagle) {
        return <UnlockHint
            title={`You need ${requiredTries - memoizedTriedSagas.length} tries to unlock a hint!`}
        />
    }

    const handleUnlockHint = async () => {
        if (!hint) {
            try {
                await fetchHint();
                setShowHint(true);
            } catch (err) {
                console.error("Error fetching hint:", err);
            }
        } else {
            setShowHint(!showHint);
        }
    }

    console.log("Hint:", hint);

    return (
        <button
            className={`text-white mt-4 p-4 px-8 rounded-md shadow-lg w-fit backdrop-blur-md
                ${!showHint ? 'cursor-pointer' : ''}
                `}
            onClick={handleUnlockHint}
            disabled={isPending || showHint}
        >
            {!showHint ? (
                <>
                    {
                        isPending ? (
                            <span>Loading hint...</span>
                        ) : (
                            <span>
                                Unlock hint
                            </span>
                        )
                    }
                </>
            ) : (
                <>
                    {error ? (
                        <p className='text-red-400'>Error loading hint: {error.message}</p>
                    ) : (
                        <>
                            <p className='font-semibold'>Hint:</p>
                            {hint?.text}
                        </>
                    )}
                </>
            )}
        </button>
    )
}

export default HintSection;