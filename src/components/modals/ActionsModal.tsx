import BaseModal from './BaseModal';
import { useState } from 'react';
import SetFormModal from '../SetFormModal';
import { ArtStyleForm, CategoryForm, GameForm, PerspectiveForm, SagaForm } from '../CreateForms';
import {
    SagaForm as UpdateSagaForm,
    GameForm as UpdateGameForm,
} from '../UpdateForms'
import {
    SagaForm as DeleteSagaForm,
    GameForm as DeleteGameForm,
    CategoryForm as DeleteCategoryForm,
    PerspectiveForm as DeletePerspectiveForm,
    ArtStylesForm as DeleteArtStyleForm
} from '../DeleteForms';
import useActionModal from '../../hooks/useActionModal';

type CRUDMode = "create" | "update" | "delete";

const ActionModal = () => {
    const closeModal = useActionModal(state => state.closeModal);
    const [mode, setMode] = useState<CRUDMode>("create");

    return (
        <BaseModal
            onClose={closeModal}
        >
            <select
                onChange={(e) => setMode(e.target.value as CRUDMode)}
            >
                <option value="create">Crear</option>
                <option value="update">Actualizar</option>
                <option value="delete">Eliminar</option>
            </select>

            {
                mode === "create" && <SetFormModal
                    title="Crear un nuevo elemento"
                    sagaForm={SagaForm}
                    gameForm={GameForm}
                    categoryForm={CategoryForm}
                    perspectiveForm={PerspectiveForm}
                    artStyleForm={ArtStyleForm}
                />
            }

            {
                mode === "update" && <SetFormModal
                    title='Actualizar un elemento existente'
                    sagaForm={UpdateSagaForm}
                    gameForm={UpdateGameForm}
                />
            }
            {
                mode === "delete" && <SetFormModal
                    title='Eliminar un elemento existente'
                    sagaForm={DeleteSagaForm}
                    gameForm={DeleteGameForm}
                    categoryForm={DeleteCategoryForm}
                    perspectiveForm={DeletePerspectiveForm}
                    artStyleForm={DeleteArtStyleForm}
                />
            }
        </BaseModal>
    )
}

export default ActionModal;