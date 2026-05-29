import AppWrapper from "./components/AppWrapper";
import OptionsBar from "./components/OptionsBar";
import SelectSaga from "./components/SelectSaga";
import logo from '../public/sagle-logo.png';
import SelectedSagas from "./components/SelectedSagas";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useCurrentUser } from "./hooks/useCurrentUser";
import VotesSection from "./components/VotesSection";
import { useGetUser } from "./hooks/useGetUser";
import { useGetSagle } from "./hooks/useGetSagle";
import useSagleStore from "./hooks/useSagle";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import confetti from "canvas-confetti";
import { useSockets } from "./hooks/useSockets";
import ActionButton from "./components/CreateButton";
import HintSection from "./components/HintSection";
import AdSense from "./components/AdsenseAd";
import { config } from "./config/config";
import { useWindowSize } from "./hooks/useWindowSize";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";

// The QueryClient lives at module scope: creating it inside render (as it was
// before) discarded the entire cache on every re-render. The React Compiler
// handles component memoization, so no manual memo() wrappers are needed.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const SagleContentApp = () => {
  const { user: userData } = useGetUser();
  const { setUser, error } = useCurrentUser();
  const voteSectionRef = useRef<HTMLDivElement>(null);
  const { sagle } = useGetSagle();
  const setSagle = useSagleStore((state) => state.setSagle);
  // Opens the realtime socket and refetches the Sagle on vote/attempt updates.
  useSockets();
  const { width } = useWindowSize();

  if (error) {
    throw new Error(error);
  }


  // BUG-06: the grid/hint derive from the ['attempts'] query alone, so there
  // is no effect here overwriting them with stale data when userData changes.
  useEffect(() => {
    if (sagle) {
      setSagle(sagle);
    }

    if (userData) {
      setUser(userData);
    }
  }, [sagle, userData, setSagle, setUser]);


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

  const isMobile = width < 768;

  return (
    <AppWrapper>
      {
        config.nodeEnv === 'production' &&
        <AdSense
          client="ca-pub-7814206622129697"
          slot="XXXXXXXXXX" // Reemplaza con tu ID de slot para anuncios de banner
          format="horizontal"
          responsive={false}
          width={isMobile ? "320px" : "728px"}
          height={isMobile ? "50px" : "90px"}
          className="mx-auto my-4"
        />
      }
      <picture>
        <img
          src={logo}
          className="w-full h-auto max-w-[220px] lg:max-w-[300px] max-h-[220px] lg:max-h-[300px] object-contain animate-rise drop-shadow-[0_0_25px_rgba(45,226,255,0.35)]"
          alt="sagle-logo"
          aria-label="sagle-logo"
        />
      </picture>
      {
        userData && userData.isAdmin && (
          <ActionButton />
        )
      }
      <OptionsBar />
      <SelectSaga />
      <HintSection sagle={sagle} />
      <SelectedSagas
        sagle={sagle}
      />
      <div
        className="w-full"
        ref={voteSectionRef}
        id="votes-section"
        data-votes-section
      >
        <VotesSection />
      </div>
      {
        config.nodeEnv === 'production' &&
        <AdSense
          client="ca-pub-7814206622129697"
          slot="XXXXXXXXXX" // Reemplaza con tu ID de slot para anuncios de banner
          format="horizontal"
          responsive={false}
          width={isMobile ? "320px" : "728px"}
          height={isMobile ? "50px" : "90px"}
          className="mx-auto my-4"
        />
      }
    </AppWrapper>
  );
};

const SagleApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
      <SagleContentApp />
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default SagleApp;