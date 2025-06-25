import BaseModal from './BaseModal';
import useCreateModal from '../../hooks/useCreateModal';
import { useState } from 'react';
import { useGetSagas } from '../../hooks/useGetSagas';
import CreateModalContent from '../CreateModalContent';

const CreateModal = () => {
    const closeModal = useCreateModal(state => state.closeModal);
    const [mode, setMode] = useState<"update" | "create">("create");
    const { sagas } = useGetSagas();
    
    return (
        <BaseModal
            onClose={closeModal}
        >
            <select
                onChange={(e) => setMode(e.target.value as "update" | "create")}
            >
                <option value="create">Crear</option>
                <option value="update">Actualizar</option>
            </select>

            {
                mode === "create" && <CreateModalContent />           
            }

            {
                mode === "update" && (
                    <>
                        <h2>
                            Saga a actualizar
                        </h2>
                        <select
                            value={sagas.map(saga => saga.id).join(",")}
                            className="mb-4 p-2 border border-gray-300 rounded"
                        >
                            {
                                sagas.map(saga => (
                                    <option key={saga.id} value={saga.id}>
                                        {saga.title} ({saga.id})
                                    </option>
                                ))
                            }
                        </select>
                    </>
                )
            }

        </BaseModal>
    )
}

export default CreateModal;