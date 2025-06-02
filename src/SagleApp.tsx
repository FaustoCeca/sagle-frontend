import AppWrapper from "./components/AppWrapper";
import OptionsBar from "./components/OptionsBar";
import SelectSaga from "./components/SelectSaga";
import logo from '../public/sagle-logo.png';
import SelectedSagas from "./components/SelectedSagas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useCurrentUser } from "./hooks/useCurrentUser";
import CreateButton from "./components/CreateButton";
import bg from '../public/bg.png';
import VotesSection from "./components/VotesSection";
import { useGetUser } from "./hooks/useGetUser";
import { useGetSagle } from "./hooks/useGetSagle";
import useSagleStore from "./hooks/useSagle";


const SagleContentApp = () => {
  const { isLoading: isUserLoading, error, user: userData } = useGetUser();
  const { setUser, user } = useCurrentUser();
  const voteSectionRef = useRef<HTMLDivElement>(null);
  const { sagle, isLoading: isSagleLoading } = useGetSagle();
  const setSagle = useSagleStore((state) => state.setSagle);

  useEffect(() => {
    if (sagle) {
      setSagle(sagle);
    }
  }, [sagle, setSagle]);

  useEffect(() => {
    setUser(userData || null);
  }, [userData, setUser]);

  useEffect(() => {
    if (user?.hasParticipatedToday && voteSectionRef.current && !isSagleLoading) {
      voteSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [user, voteSectionRef, isSagleLoading]);
  
  if (
    isUserLoading 
  ) return (
    <div
      className="flex flex-col items-center min-h-dvh w-full py-8 lg:overflow-auto overflow-scroll"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
    </div>
  )

  if (error) return <div>Error registering user</div>;

  return (
    <AppWrapper>
      <picture>
        <img 
          src={logo}
          className="w-full h-auto max-w-[300px] max-h-[300px] object-contain"
          alt="sagle-logo"
          aria-label="sagle-logo"
        />
      </picture>
      {
        user && user.isAdmin && (
          <CreateButton />
        )
      }
      <OptionsBar />
      <SelectSaga />
      <SelectedSagas />
      {
        user?.hasParticipatedToday && (
          <div
            ref={voteSectionRef}
          >
            <VotesSection />
          </div>
        )
      }
    </AppWrapper>
  );
};

const SagleApp = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SagleContentApp />
    </QueryClientProvider>
  )
}

export default SagleApp;