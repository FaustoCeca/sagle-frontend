import { useGetSagas } from '../../hooks/useGetSagas';
import BaseModal from './BaseModal';
import useSagasModal from '../../hooks/useSagasModal';
import { useTranslation } from 'react-i18next';


const SagasModal = () => {
  const { closeModal } = useSagasModal();
  const { sagas, isLoading, error } = useGetSagas();
  const selectableSagas = sagas?.filter(saga => saga.games.length > 0) || [];
  const {t} = useTranslation('modals');

  return (
    <BaseModal
      onClose={closeModal}
    >
      <div
        className='flex flex-col items-center justify-center p-4'
      >
        <h2 className="text-4xl font-bold mb-4">Sagas</h2>
        <p className="text-lg mb-4">
          {t("sagasModalTitle")}
        </p>
        {isLoading && <p>Loading sagas...</p>}
        {error && <p className="text-red-500">Error loading sagas: {error.message}</p>}
        {
          sagas && sagas.length > 0 && (
            <div className="mb-4 flex flex-col items-start justify-start w-full gap-2">
              {selectableSagas.map((saga) => (
                <a 
                  key={saga.id} 
                  className="text-lg font-bold flex items-center gap-2 text-blue-500 hover:text-blue-700"
                  href={saga.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`View saga in Wikipedia: ${saga.title}`}
                >
                  {saga.title}
                </a>
              ))}
            </div>
          )
        }
      </div>
    </BaseModal>
  )
}

export default SagasModal;