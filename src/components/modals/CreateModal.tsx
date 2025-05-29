import BaseModal from './BaseModal';
import useCreateModal from '../../hooks/useCreateModal';
import { ArtStyleForm, CategoryForm, GameForm, PerspectiveForm, SagaForm } from '../CreateForms';

const CreateModal = () => {
    const closeModal = useCreateModal(state => state.closeModal);
    const formType = useCreateModal(state => state.formType);
    const setFormType = useCreateModal(state => state.setFormType);

    console.log("CreateModal rendered with formType:", formType);
  return (
    <BaseModal
        onClose={closeModal}
    >
        <h2>
            Crea un nuevo: {formType}
        </h2>

        <select
            onChange={(e) => setFormType(e.target.value as "saga" | "game" | "category" | "perspective" | "artStyle")}
            value={formType}
            className="mb-4 p-2 border border-gray-300 rounded"
        >
            <option value="saga">
                Saga
            </option>
            <option value="game">
                Game
            </option>
            <option value="category">
                Category
            </option>
            <option value="perspective">
                Perspective
            </option>
            <option value="artStyle">
                Art Style
            </option>
        </select>
        {
            formType === "saga" && <SagaForm />
        }
        {
            formType === "game" && <GameForm />
        }
        {
            formType === "category" && <CategoryForm />
        }
        {
            formType === "perspective" && <PerspectiveForm />
        }
        {
            formType === "artStyle" && <ArtStyleForm />
        }
    </BaseModal>
  )
}

export default CreateModal;