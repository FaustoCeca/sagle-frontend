import useActionModal from "../hooks/useActionModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import ActionModal from "./modals/ActionsModal";

const CreateButton = () => {
  const currentUser = useCurrentUser(state => state.user);
  const openActionModal = useActionModal(state => state.openModal);
  const isOpen = useActionModal(state => state.isOpen);

  return (
    <>
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            aria-label="Create new saga"
            title="Create new saga"
            onClick={openActionModal}
        >
            Actions
        </button>
        {
          isOpen && currentUser?.isAdmin && (
            <ActionModal />
          )
        }
    </>
  )
}

export default CreateButton;