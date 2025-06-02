import { CircleHelp } from "lucide-react";
import useHowToPlayModal from "../hooks/useHowToPlayModal";
import HowToPlayModal from "./modals/HowToPlayModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";

const OptionsBar = () => {
  const { openModal, isOpen } = useHowToPlayModal();
  const user = useCurrentUser(state => state.user);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    }

    return () => {
      document.body.style.overflow = 'auto'; // Clean up on unmount
    };
  }, [isOpen]);

  return (
    <>
    <div
        className="bg-gray-600 border border-amber-300 border-solid rounded-lg py-2 px-4 max-w-2xl mt-12"
        >
        <div
            className="flex flex-row justify-between items-center gap-6"
            >
            <div>
              {user?.streak}
            </div>
            <button
              onClick={openModal}
              className="cursor-pointer"
            >
                <CircleHelp
                    className="text-amber-300"
                    size={30}
                    aria-label="how-to-play"
                />
            </button>
        </div>
    </div>
    {
      isOpen &&
      <HowToPlayModal />
    }
    </>
  )
}

export default OptionsBar;