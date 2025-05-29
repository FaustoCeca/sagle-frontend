import useHowToPlayModal from "../hooks/useHowToPlayModal";
import HowToPlayModal from "./modals/HowToPlayModal";

const OptionsBar = () => {
  const { openModal, isOpen } = useHowToPlayModal();
  return (
    <>
    <div
        className="bg-gray-600 border border-amber-300 border-solid rounded-lg py-2 px-4 max-w-2xl mt-12"
        >
        <div
            className="flex flex-row justify-between items-center gap-6"
            >
            {/* Racha */}
            <div>
              Racha
            </div>
            <button
            onClick={openModal}
            >
              How to play
            </button>
            {/* How to play modal */}
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