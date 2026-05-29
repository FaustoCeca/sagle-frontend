import { CircleHelp, Gamepad } from "lucide-react";
import useHowToPlayModal from "../hooks/useHowToPlayModal";
import HowToPlayModal from "./modals/HowToPlayModal";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useEffect } from "react";
import SagasModal from "./modals/SagasModal";
import useSagasModal from "../hooks/useSagasModal";
import LanguageToggle from "./LenguageToggle";

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

  return (
    <>
      <div
        className="glass glow-amber border border-neon-amber/50 rounded-xl py-2 px-5 max-w-2xl mt-12 animate-rise"
      >
        <div
          className="flex flex-row justify-between items-center gap-7"
        >
          <div className="relative group flex items-center gap-1.5">
            <span
              className="text-2xl transform transition-transform group-hover:animate-flame cursor-default drop-shadow-[0_0_8px_rgba(255,177,61,0.7)]"
              aria-label={`Streak: ${user?.streak || 0} days`}
              title={`Streak: ${user?.streak || 0} days`}
            >
              🔥
            </span>
            <span className="font-display text-sm text-neon-amber text-glow-amber leading-none pt-0.5">
              {user?.streak || 0}
            </span>
          </div>
          <button
            onClick={openModal}
            className="cursor-pointer text-neon-cyan transition-transform hover:scale-110 hover:text-glow-cyan"
            aria-label="how-to-play"
          >
            <CircleHelp
              size={28}
              aria-label="how-to-play"
            />
          </button>
          <button
            onClick={openGamesModal}
            className="cursor-pointer text-neon-pink transition-transform hover:scale-110 hover:text-glow-pink"
            aria-label="gamepad"
          >
            <Gamepad
              size={28}
              aria-label="gamepad"
            />
          </button>
          <LanguageToggle />
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