import { useMemo, useState } from 'react'
import useTriedSagasStore from '../hooks/useTriedSagas';
import { useGetHint } from '../hooks/useGetHint';
import type { Saga } from '../types/game';
import { useTranslation } from 'react-i18next';

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
    const { fetchHint, hints, isPending, error } = useGetHint();
    const { i18n, t } = useTranslation('game');

    const requiredTries = 3;
    const canUnlockHint = memoizedTriedSagas.length >= requiredTries;

    if (!sagle) {
        return <UnlockHint
            title={t('loadingAttempts')}
        />
    }

    if (!canUnlockHint && sagle) {
        return <UnlockHint
            title={t('youNeed', { count: requiredTries - memoizedTriedSagas.length }) + ' ' + t('triesHint')}
        />
    }

    const handleUnlockHint = async () => {
        if (!hints || hints.length === 0) {
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
    const currentLanguageHint = hints?.find(hint => hint.language === i18n.language);

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
                            <span>{t("loadingHint")}</span>
                        ) : (
                            <span>
                                {t("unlockHint")}
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
                            <p className='font-semibold'></p>
                            <p className='text-gray-300'>{currentLanguageHint?.text}</p>
                        </>
                    )}
                </>
            )}
        </button>
    )
}

export default HintSection;