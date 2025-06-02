import type { Saga } from '../types/game';
import useTriedSagasStore from '../hooks/useTriedSagas';
import { useState } from 'react';
import useSagleStore from '../hooks/useSagle';
import { useGetSagas } from '../hooks/useGetSagas';
import { winSagle } from '../actions/winSagle';
import { useForm } from 'react-hook-form';
import { useCurrentUser } from '../hooks/useCurrentUser';

type SelectSagaProps = {
    searchTerm: string;
    selectedSagaId?: number;
}

const SelectSaga = () => {
    const { register, handleSubmit, setValue, watch, formState: {isSubmitting} } = useForm<SelectSagaProps>({
        defaultValues: {
            searchTerm: '',
            selectedSagaId: undefined,
        }
    });
    const searchTerm = watch('searchTerm');
    const selectedSagaId = watch('selectedSagaId');
    const [showDropdown, setShowDropdown] = useState(false);
    const { triedSagas, addTriedSaga } = useTriedSagasStore();
    const sagle = useSagleStore((state) => state.sagle);
    const foundedSagle = useSagleStore((state) => state.foundedSagle);
    const setFoundedSagle = useSagleStore((state) => state.setFoundedSagle);
    const {sagas, isLoading} = useGetSagas();
    const user = useCurrentUser(state => state.user);
    
    const yesterdaySagle = sagas.find((saga) => saga.wasSagleYesterday);

    const availableSagas = sagas.filter(saga => saga.id !== yesterdaySagle?.id && !triedSagas.some(triedSaga => triedSaga.id === saga.id));

    const filteredSagas = availableSagas.filter(saga =>
        saga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSagaSelect = (saga: Saga) => {
        setValue('selectedSagaId', saga.id);
        setValue('searchTerm', saga.title);
        setShowDropdown(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue('searchTerm', e.target.value);
        setShowDropdown(true);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            setShowDropdown(false);
        }
        // TODO: esta funcionando mal, revisarla despues
        // } else if (e.key === 'Enter' && selectedSaga) {
        //     // Handle guess submission here
        //     console.log('Selected saga:', selectedSaga);
        // }
    };

    const onSubmit = async (data: SelectSagaProps) => {
        const selectedSaga = availableSagas.find(saga => saga.id === data.selectedSagaId);
        if (!selectedSaga) return;

        addTriedSaga(selectedSaga);
        setValue('searchTerm', '');
        setValue('selectedSagaId', undefined);

        if (selectedSaga.id === sagle?.id) {
            setFoundedSagle(true);
            try {
                await winSagle();
                localStorage.setItem('foundedSagle', 'true');
            } catch (error) {
                console.error('Error winning Sagle:', error);
                alert('There was an error processing your guess. Please try again later.');
                // TODO: implementar
                // toast.error('Error processing your guess. Please try again.');
            }
        }
    }

    return (
        <form 
            onSubmit={handleSubmit(onSubmit)}
            aria-label="select-saga-form"
        >
            <h2
                className="text-2xl font-bold text-center mb-4"
                aria-label="guess-sagle"
            >
                Guess the Sagle today!
            </h2>
            <p
                className="text-lg text-center mb-4"
                aria-label="yesterday-sagle"
            >
                Yesterday's Sagle was:
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
                    placeholder="Write the name of the saga"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:min-w-[420px]"
                    aria-label="search-saga"
                    disabled={foundedSagle || isSubmitting || isLoading || user?.hasParticipatedToday}
                />

                {searchTerm && showDropdown && (
                    <ul className="absolute w-full mt-1 max-h-60 overflow-scroll bg-white border border-gray-300 rounded-lg shadow-lg z-10 ">
                        {filteredSagas.map(saga => (
                            <li
                                key={saga.id}
                                translate='no'
                                onClick={() => handleSagaSelect(saga)}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-black flex items-center gap-2"
                            >
                                <picture>
                                    <img
                                        src={saga.imageUrl}
                                        alt={saga.title}
                                        className="object-cover w-16 h-16 border-solid border-2 border-black"
                                    />
                                </picture>
                                {saga.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedSagaId && (
                <button
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    aria-label="submit-guess"
                    type="submit"
                    disabled={foundedSagle || isSubmitting || isLoading || user?.hasParticipatedToday}
                >
                    Submit Guess
                </button>
            )}
        </form>
    )
}

export default SelectSaga;