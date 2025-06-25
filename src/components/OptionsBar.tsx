import { CircleHelp, Gamepad } from "lucide-react";
import useHowToPlayModal from "../hooks/useHowToPlayModal";
import HowToPlayModal from "./modals/HowToPlayModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";
import SagasModal from "./modals/SagasModal";
import useSagasModal from "../hooks/useSagasModal";

const OptionsBar = () => {
  const { openModal, isOpen } = useHowToPlayModal();
  const { openModal: openGamesModal, isOpen: isGamesModalOpen } = useSagasModal();
  const user = useCurrentUser(state => state.user);

  useEffect(() => {
    if (isOpen || isGamesModalOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isOpen, isGamesModalOpen]);

  console.log('isGamesModalOpen', isGamesModalOpen);

  return (
    <>
      <div
        className="bg-gray-600 border border-amber-300 border-solid rounded-lg py-2 px-4 max-w-2xl mt-12"
      >
        <div
          className="flex flex-row justify-between items-center gap-8"
        >
          <div className="relative group mb-1">
            <span
              className="text-2xl transform transition-transform group-hover:animate-flame cursor-default"
              aria-label={`Streak: ${user?.streak || 0} days`}
              title={`Streak: ${user?.streak || 0} days`}
            >
              🔥
            </span>
            <span className="ml-0.5 font-bold text-amber-300">
              {user?.streak || 0}
            </span>
          </div>
          <button
            onClick={openModal}
            className="cursor-pointer"
            aria-label="how-to-play"
          >
            <CircleHelp
              className="text-amber-300"
              size={30}
              aria-label="how-to-play"
            />
          </button>
          <button
            onClick={openGamesModal}
            className="cursor-pointer"
            aria-label="gamepad"
          >
            <Gamepad
              className="text-amber-300"
              size={30}
              aria-label="gamepad"
            />
          </button>
        </div>
      </div>
      {
        isOpen &&
        <HowToPlayModal />
      }
      {
        isGamesModalOpen &&
        <SagasModal />
      }
    </>
  )
}

export default OptionsBar;