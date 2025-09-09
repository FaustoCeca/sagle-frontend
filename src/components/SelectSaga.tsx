import { useMemo } from 'react';
import { useGetSagas } from '../hooks/useGetSagas';
import { useGetUser } from '../hooks/useGetUser';
import LoadingSpinner from './LoadingSpinners';
import { useTranslation } from 'react-i18next';
import SelectSagaInput from './SelectSagaInput';


const SelectSaga = () => {

    
    const { sagas, isLoading } = useGetSagas();
    const { user } = useGetUser();
    const { t } = useTranslation('game');
    
    const yesterdaySagle = useMemo(() =>
        sagas?.find((saga) => saga.wasSagleYesterday),
        [sagas]
    );
    
    if (!user && isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner size="large" />
            </div>
        );
    }



    return (
        <div
            aria-label="select-saga-form"
        >
            <h2
                className="lg:text-5xl text-3xl font-bold text-center mb-6 text-amber-100 mt-5"
                aria-label="guess-sagle"
            >
                {t("selectSagaTitle")}
            </h2>
            {
                yesterdaySagle && (

                    <p
                        className="lg:text-lg text-base text-center mb-4 font-semibold text-white lg:px-0 px-4"
                        aria-label="yesterday-sagle"
                    >
                            {/* TODO: Fix this link */}
                        {/* Yesterday's Sagle was: {' '}
                        <a
                            href={`https://${yesterdaySagle.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                        >
                            {yesterdaySagle.title}
                        </a>
                        , good luck today! */}
                        {t("yesterdaySagle")} <span className="text-blue-500">{yesterdaySagle.title}</span>, {t("goodLuck")}
                    </p>
                )
            }

            <SelectSagaInput 
                yesterdaySagle={yesterdaySagle}
            />
        </div>
    )
}

export default SelectSaga;