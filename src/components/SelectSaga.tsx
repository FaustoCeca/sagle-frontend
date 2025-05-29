import { Sagas } from '../mock/mocks';
import dayjs from 'dayjs';
import type { Saga } from '../types/game';
import useTriedSagasStore from '../hooks/useTriedSagas';
import { useEffect, useState } from 'react';
import useSagleStore from '../hooks/useSagle';


const SelectSaga = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedSaga, setSelectedSaga] = useState<Saga | null>(null);
    const { triedSagas, addTriedSaga } = useTriedSagasStore();
    const sagle = useSagleStore((state) => state.sagle);
    const foundedSagle = useSagleStore((state) => state.foundedSagle);
    const setFoundedSagle = useSagleStore((state) => state.setFoundedSagle);

    console.log('triedSagas', triedSagas);


    const yesterdaySagle = Sagas.find((saga) => {
        const yesterday = dayjs().subtract(1, "day").format("DD-MM-YYYY");
        const sagaDate = dayjs(saga.lastTimeBeingSagle).add(1, "day").format("DD-MM-YYYY");

        return sagaDate == yesterday;
    })

    const availableSagas = Sagas.filter(saga => saga.id !== yesterdaySagle?.id && !triedSagas.some(triedSaga => triedSaga.id === saga.id));

    const filteredSagas = availableSagas.filter(saga =>
        saga.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setShowDropdown(true);
    };

    const handleSagaSelect = (saga: Saga) => {
        setSelectedSaga(saga);
        setSearchTerm(saga.title);
        setShowDropdown(false);
    };

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

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!selectedSaga) return;

        if (selectedSaga) {
            addTriedSaga(selectedSaga);
            setSelectedSaga(null);
            setSearchTerm('');
        }

        if (selectedSaga.id === sagle?.id) {
            setFoundedSagle(true);
        }
    }

    useEffect(() => {
        if (foundedSagle) {
            localStorage.setItem('foundedSagle', 'true');
        }
    }, [foundedSagle]);

    useEffect(() => {
        const localStorageFoundedSagle = localStorage.getItem('foundedSagle');
        if (localStorageFoundedSagle === 'true') {
            setFoundedSagle(true);
        }
    }, []);

    return (
        <div>
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
                El sagle de ayer fue: {' '}
                <a
                    href={`https://${yesterdaySagle?.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                >
                    {yesterdaySagle?.title}
                </a>
                , buena suerte hoy!
            </p>

            <div className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    autoComplete='off'
                    translate='no'
                    placeholder="Write the name of the saga"
                    className="w-full p-2 border border-gray-300 rounded-lg bg-white text-black disabled:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onFocus={() => setShowDropdown(true)}
                    aria-label="search-saga"
                    disabled={foundedSagle}
                />

                {showDropdown && searchTerm && (
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
                                        src={saga.games[0].imageUrl}
                                        alt={saga.title}
                                        className="w-10 h-10 rounded-full"
                                    />
                                </picture>
                                {saga.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {selectedSaga && (
                <button
                    className="mt-4 w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                    aria-label="submit-guess"
                >
                    Submit Guess
                </button>
            )}
        </div>
    )
}

export default SelectSaga;