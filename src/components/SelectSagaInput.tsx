import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUser } from '../hooks/useGetUser';
import { useTranslation } from 'react-i18next';
import { useGetSagas } from '../hooks/useGetSagas';
import SagasDropdown from './SagasDropdown';
import useTriedSagasStore from '../hooks/useTriedSagas';
import type { Saga } from '../types/game';
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
    const { triedSagas, addTriedSaga } = useTriedSagasStore();

    const searchTerm = watch('searchTerm');
    const selectedSagaId = watch('selectedSagaId');
    const foundedSagle = useSagleStore((state) => state.foundedSagle);
    const setFoundedSagle = useSagleStore((state) => state.setFoundedSagle)



    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('searchTerm', e.target.value);
        setShowDropdown(true);
    }, [setValue]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setShowDropdown(false);
        }

        // TODO: esta funcionando mal, revisarla despues
        // } else if (e.key === 'Enter' && selectedSaga) {
        //     // Handle guess submission here
        //     console.log('Selected saga:', selectedSaga);
        // }
    }, []);

    const availableSagas = useMemo(() =>
        sagas.filter(saga =>
            saga.id !== yesterdaySagle?.id &&
            !triedSagas.some(triedSaga => triedSaga.id === saga.id)
            && saga.games.length > 0
        ),
        [sagas, yesterdaySagle?.id, triedSagas]
    );

    const filteredSagas = useMemo(() =>
        availableSagas.filter(saga =>
            saga.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
        [availableSagas, searchTerm]
    );

    const handleSagaSelect = useCallback((saga: Saga) => {
        setValue('selectedSagaId', saga.id);
        setValue('searchTerm', saga.title);
        setShowDropdown(false);
    }, [setValue]);

    const onSubmit = async (data: SelectSagaProps) => {
        const selectedSaga = availableSagas.find(saga => saga.id === data.selectedSagaId);
        if (!selectedSaga) return;

        try {
            const result = await attempt(selectedSaga.id);
            addTriedSaga(selectedSaga);
            reset({ searchTerm: '', selectedSagaId: undefined });

            if (result.haveFoundSagle) {
                fetchUserAgain();
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
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:min-w-[420px] placeholder:lg:text-base placeholder:text-sm placeholder:text-gray-700"
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
                        className="mt-4 cursor-pointer w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors mx-4 md:mx-0"
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