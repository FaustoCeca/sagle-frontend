import useCreateModal from "../hooks/useCreateModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import CreateModal from "./modals/CreateModal";

const CreateButton = () => {
  const currentUser = useCurrentUser(state => state.user);
  const openCreateModal = useCreateModal(state => state.openModal);
  const isOpen = useCreateModal(state => state.isOpen);

  return (
    <>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            aria-label="Create new saga"
            title="Create new saga"
            onClick={openCreateModal}
        >
            Create
        </button>
        {
          isOpen && currentUser?.isAdmin && (
            <CreateModal />
          )
        }
    </>
  )
}

export default CreateButton;