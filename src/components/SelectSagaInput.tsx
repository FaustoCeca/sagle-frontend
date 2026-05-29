import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useGetUser } from '../hooks/useGetUser';
import { useTranslation } from 'react-i18next';
import { useGetSagas } from '../hooks/useGetSagas';
import { useGetAttempts } from '../hooks/useGetAttempts';
import SagasDropdown from './SagasDropdown';
import type { AttemptResult, Saga } from '../types/game';
import useSagleStore from '../hooks/useSagle';
import { attempt } from '../actions/attempt';
import LoadingSpinner from './LoadingSpinners';

type SelectSagaProps = {
    searchTerm: string;
    selectedSagaId?: number;
}

interface SelectSagaInputProps {
    yesterdaySagle: Saga | undefined;
}

const SelectSagaInput = ({ yesterdaySagle }: SelectSagaInputProps) => {
    // react-hook-form's `watch()` reads from an internal mutable subscription
    // that the React Compiler can't track, so it would memoize `selectedSagaId`
    // (and the submit button it gates) to its initial value. Opt this single
    // component out of the compiler; it re-renders on each keystroke anyway.
    "use no memo";
    const { register, handleSubmit, setValue, watch, formState: { isSubmitting }, reset } = useForm<SelectSagaProps>({
        defaultValues: {
            searchTerm: '',
            selectedSagaId: undefined,
        }
    });
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, fetchUserAgain } = useGetUser();
    const { t } = useTranslation('game');
    const { sagas, isLoading } = useGetSagas();
    const { attempts } = useGetAttempts();
    const queryClient = useQueryClient();

    const triedIds = new Set(attempts.map((attempt) => attempt.sagaId));

    const searchTerm = watch('searchTerm');
    const selectedSagaId = watch('selectedSagaId');
    const foundedSagle = useSagleStore((state) => state.foundedSagle);
    const setFoundedSagle = useSagleStore((state) => state.setFoundedSagle)



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('searchTerm', e.target.value);
        setShowDropdown(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setShowDropdown(false);
        }
    };

    const availableSagas = sagas.filter(saga =>
        saga.id !== yesterdaySagle?.id &&
        !triedIds.has(saga.id) &&
        saga.games.length > 0
    );

    const filteredSagas = availableSagas.filter(saga =>
        saga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSagaSelect = (saga: Saga) => {
        setValue('selectedSagaId', saga.id);
        setValue('searchTerm', saga.title);
        setShowDropdown(false);
    };

    const onSubmit = async (data: SelectSagaProps) => {
        const selectedSaga = availableSagas.find(saga => saga.id === data.selectedSagaId);
        if (!selectedSaga) return;

        try {
            const result = await attempt(selectedSaga.id);

            // BUG-06: the attempts query is the single source of truth. Prepend
            // the new (server-computed) result so the grid updates immediately.
            queryClient.setQueryData<AttemptResult[]>(['attempts'], (old = []) => [
                result.result,
                ...(old ?? []).filter((a) => a.sagaId !== result.result.sagaId),
            ]);
            reset({ searchTerm: '', selectedSagaId: undefined });

            if (result.haveFoundSagle) {
                fetchUserAgain();
                // Keep the grid in sync and fetch the now-unmasked Sagle for the
                // win reveal / voting (BUG-03, BUG-06).
                queryClient.invalidateQueries({ queryKey: ['attempts'] });
                queryClient.invalidateQueries({ queryKey: ['sagle'] });
                setFoundedSagle(true);
                localStorage.setItem('foundedSagle', 'true');
            }
        } catch (error) {
            console.error('Error attempting saga:', error);
            alert('There was an error processing your guess. Please try again later.');
        }
    }

    return (
        <>

            <form
                className="relative md:px-0 px-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    type="text"
                    {...register('searchTerm', {
                        required: 'Please enter a saga name',
                        validate: value => value.trim() !== '' || 'Saga name cannot be empty',
                    })}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    onFocus={() => setShowDropdown(true)}
                    autoComplete='off'
                    translate='no'
                    placeholder={user?.hasParticipatedToday ? t("guessedSagle") : t("notGuessedSagle")}
                    className="w-full px-4 py-3 rounded-lg glass border border-neon-cyan/40 text-arcade-ink font-medium tracking-wide transition-all focus:outline-none focus:border-neon-cyan focus:glow-cyan disabled:opacity-50 disabled:cursor-not-allowed lg:min-w-[420px] placeholder:lg:text-base placeholder:text-sm placeholder:text-arcade-muted/70"
                    aria-label="search-saga"
                    disabled={isSubmitting || isLoading || user?.hasParticipatedToday}
                />

                {searchTerm && showDropdown && (
                    <SagasDropdown
                        sagas={filteredSagas}
                        onClick={handleSagaSelect}
                    />
                )}
                {selectedSagaId && (
                    <button
                        className="btn-arcade mt-4 cursor-pointer w-full p-3 rounded-lg"
                        aria-label="submit-guess"
                        type="submit"
                        disabled={foundedSagle || isSubmitting || isLoading || user?.hasParticipatedToday}
                    >
                        {t("submitGuess")}
                    </button>
                )}


                {
                    isSubmitting && (
                        <div className="mt-4 flex items-center w-full justify-center">
                            <LoadingSpinner size="medium" />
                        </div>
                    )
                }
            </form>
        </>
    )
}

export default SelectSagaInput;