import AppWrapper from "./components/AppWrapper";
import OptionsBar from "./components/OptionsBar";
import SelectSaga from "./components/SelectSaga";
import logo from '../public/sagle-logo.png';
import SelectedSagas from "./components/SelectedSagas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { memo, useEffect, useRef } from "react";
import { useCurrentUser } from "./hooks/useCurrentUser";
import CreateButton from "./components/CreateButton";
import VotesSection from "./components/VotesSection";
import { useGetUser } from "./hooks/useGetUser";
import { useGetSagle } from "./hooks/useGetSagle";
import useSagleStore from "./hooks/useSagle";
import useTriedSagasStore from "./hooks/useTriedSagas";
import { useGetAttempts } from "./hooks/useGetAttempts";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import confetti from "canvas-confetti";
import { useSockets } from "./hooks/useSockets";

const SagleContentApp = () => {
  const { error, user: userData } = useGetUser();
  const { setUser } = useCurrentUser();
  const voteSectionRef = useRef<HTMLDivElement>(null);
  const { sagle } = useGetSagle();
  const setSagle = useSagleStore((state) => state.setSagle);
  const setTriedSagas = useTriedSagasStore((state) => state.setTriedSagas);
  const { attemptedSagas } = useGetAttempts();
  const { isConnected } = useSockets(); 

  // console.log(isConnected);

  useEffect(() => {
    if (sagle) setSagle(sagle);
    if (userData) setUser(userData);
  }, [sagle, userData, setSagle, setUser]);

  useEffect(() => {
    if (!userData || !attemptedSagas?.length) return;
    // @ts-ignore 
    setTriedSagas(attemptedSagas);
  }, [userData, attemptedSagas, setTriedSagas]);


  useEffect(() => {
    if (userData?.hasParticipatedToday) {
      const scrollToVotes = () => {
        voteSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }

      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff0', '#f00', '#0f0', '#00f', '#ff00ff'],
      })

      requestAnimationFrame(scrollToVotes);
    }
  }, [userData?.hasParticipatedToday]);

  const MemoizedOptionsBar = memo(OptionsBar);
  const MemoizedSelectSaga = memo(SelectSaga);
  const MemoizedSelectedSagas = memo(SelectedSagas);
  const MemoizedVotesSection = memo(VotesSection);

  if (error) return <div>Error registering userData</div>;

  return (
    <AppWrapper>
      <picture>
        <img
          src={logo}
          className="w-full h-auto max-w-[220px] lg:max-w-[300px] max-h-[220px] lg:max-h-[300px] object-contain"
          alt="sagle-logo"
          aria-label="sagle-logo"
        />
      </picture>
      {
        userData && userData.isAdmin && (
          <CreateButton />
        )
      }
      <MemoizedOptionsBar />
      {/* <MemoizedSelectSaga /> */}
      <MemoizedSelectedSagas 
        sagle={sagle}
      />
      {

        <div
          className="w-full"
          ref={voteSectionRef}
          id="votes-section"
          data-votes-section
        >
          <MemoizedVotesSection />
        </div>
      }
    </AppWrapper>
  );
};

const SagleApp = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SagleContentApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default SagleApp;