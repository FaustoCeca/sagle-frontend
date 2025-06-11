import type { Saga } from '../types/game';
import useTriedSagasStore from '../hooks/useTriedSagas';
import { useCallback, useMemo, useState } from 'react';
import useSagleStore from '../hooks/useSagle';
import { useGetSagas } from '../hooks/useGetSagas';
import { useForm } from 'react-hook-form';
import { attempt } from '../actions/attempt';
import SagasDropdown from './SagasDropdown';
import { useGetUser } from '../hooks/useGetUser';
import LoadingSpinner from './LoadingSpinners';

type SelectSagaProps = {
    searchTerm: string;
    selectedSagaId?: number;
}

const SelectSaga = () => {
    const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm<SelectSagaProps>({
        defaultValues: {
            searchTerm: '',
            selectedSagaId: undefined,
        }
    });
    const searchTerm = watch('searchTerm');
    const selectedSagaId = watch('selectedSagaId');
    const [showDropdown, setShowDropdown] = useState(false);
    const { triedSagas, addTriedSaga } = useTriedSagasStore();
    const foundedSagle = useSagleStore((state) => state.foundedSagle);
    const setFoundedSagle = useSagleStore((state) => state.setFoundedSagle);
    const { sagas, isLoading } = useGetSagas();
    const { user, fetchUserAgain } = useGetUser();

    const yesterdaySagle = useMemo(() =>
        sagas.find((saga) => saga.wasSagleYesterday),
        [sagas]
    );

    const availableSagas = useMemo(() =>
        sagas.filter(saga =>
            saga.id !== yesterdaySagle?.id &&
            !triedSagas.some(triedSaga => triedSaga.id === saga.id)
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

    const onSubmit = async (data: SelectSagaProps) => {
        const selectedSaga = availableSagas.find(saga => saga.id === data.selectedSagaId);
        if (!selectedSaga) return;

        try {
            const result = await attempt(selectedSaga.id);
            console.log('Attempt result:', result);
            addTriedSaga(selectedSaga);
            setValue('searchTerm', '');
            setValue('selectedSagaId', undefined);

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
        <form
            onSubmit={handleSubmit(onSubmit)}
            aria-label="select-saga-form"
        >
            <h2
                className="lg:text-5xl text-3xl font-bold text-center mb-4 text-amber-100 mt-5"
                aria-label="guess-sagle"
            >
                Guess the Sagle today!
            </h2>
            <p
                className="lg:text-lg text-base text-center mb-4 font-semibold text-white"
                aria-label="yesterday-sagle"
            >
                Yesterday's Sagle was: {' '}
                <a
                    href={`https://${yesterdaySagle?.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                    {yesterdaySagle?.title}
                </a>
                , good luck today!
            </p>

            <div className="relative">
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
                    placeholder={user?.hasParticipatedToday ? "You've already guessed the Sagle today! Come back tomorrow" : 'Write the name of a saga...'}
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:min-w-[420px] placeholder:lg:text-base"
                    aria-label="search-saga"
                    disabled={isSubmitting || isLoading || user?.hasParticipatedToday}
                />

                {searchTerm && showDropdown && (
                    <SagasDropdown
                        sagas={filteredSagas}
                        onClick={handleSagaSelect}
                    />
                )}
            </div>

            {selectedSagaId && (
                <button
                    className="mt-4 cursor-pointer w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="submit-guess"
                    type="submit"
                    disabled={foundedSagle || isSubmitting || isLoading || user?.hasParticipatedToday}
                >
                    Submit Guess
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
    )
}

export default SelectSaga;