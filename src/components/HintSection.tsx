import { useState } from 'react'
import { useGetAttempts } from '../hooks/useGetAttempts';
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
            className='glass border border-white/10 text-arcade-muted mt-4 py-3 px-5 rounded-lg w-fit'
        >
            <p className='text-sm font-medium tracking-wide'>
                {title}
            </p>
        </div>
    )
}

const HintSection = ({ sagle }: HintSectionProps) => {
    const { attempts } = useGetAttempts();
    const [showHint, setShowHint] = useState(false);
    const { fetchHint, hints, isPending, error } = useGetHint();
    const { i18n, t } = useTranslation('game');

    const requiredTries = 3;
    const remainingTries = requiredTries - attempts.length;
    const canUnlockHint = attempts.length >= requiredTries;

    if (!sagle) {
        return <UnlockHint
            title={t('loadingAttempts')}
        />
    }

    if (!canUnlockHint && sagle) {
        return <UnlockHint
            title={t('youNeed', { count: remainingTries })}
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
    // BUG-09: fall back to any available hint (e.g. EN) when there is none in
    // the active language, so the box is never empty.
    const currentLanguageHint = hints?.find(hint => hint.language === i18n.language) ?? hints?.[0];

    return (
        <button
            className={`glass border border-neon-amber/50 text-arcade-ink mt-4 py-3 px-8 rounded-lg w-fit max-w-md transition-all
                ${!showHint ? 'cursor-pointer glow-amber hover:bg-neon-amber/10 active:scale-95' : 'border-neon-amber/30'}
                `}
            onClick={handleUnlockHint}
            disabled={isPending || showHint}
        >
            {!showHint ? (
                <span className="font-heading font-semibold uppercase tracking-wider text-neon-amber text-glow-amber flex items-center gap-2">
                    {isPending ? t("loadingHint") : <>💡 {t("unlockHint")}</>}
                </span>
            ) : (
                <>
                    {error ? (
                        <p className='text-neon-red'>Error loading hint: {error.message}</p>
                    ) : (
                        <p className='text-arcade-ink italic'>{currentLanguageHint?.text ?? t('hintNotAvailable')}</p>
                    )}
                </>
            )}
        </button>
    )
}

export default HintSection;