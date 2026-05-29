import { useGetSagas } from '../hooks/useGetSagas';
import { useGetUser } from '../hooks/useGetUser';
import LoadingSpinner from './LoadingSpinners';
import { useTranslation } from 'react-i18next';
import SelectSagaInput from './SelectSagaInput';


const SelectSaga = () => {

    
    const { sagas, isLoading } = useGetSagas();
    const { user } = useGetUser();
    const { t } = useTranslation('game');
    
    const yesterdaySagle = sagas?.find((saga) => saga.wasSagleYesterday);
    
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
                className="font-heading uppercase tracking-wide lg:text-5xl text-3xl font-bold text-center mb-6 text-neon-cyan text-glow-cyan animate-flicker mt-5"
                aria-label="guess-sagle"
            >
                {t("selectSagaTitle")}
            </h2>
            {
                yesterdaySagle && (

                    <p
                        className="lg:text-lg text-base text-center mb-4 font-medium text-arcade-muted lg:px-0 px-4"
                        aria-label="yesterday-sagle"
                    >
                        {t("yesterdaySagle")} <span className="font-semibold text-neon-pink text-glow-pink">{yesterdaySagle.title}</span>, {t("goodLuck")}
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