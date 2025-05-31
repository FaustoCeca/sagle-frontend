import AppWrapper from "./components/AppWrapper";
import OptionsBar from "./components/OptionsBar";
import SelectSaga from "./components/SelectSaga";
import logo from '../public/sagle-logo.png';
import SelectedSagas from "./components/SelectedSagas";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { registerUser } from "./actions/register";
import { useEffect } from "react";
import { useCurrentUser } from "./hooks/useCurrentUser";
import CreateButton from "./components/CreateButton";
import bg from '../public/bg.png';


const SagleContentApp = () => {
  const { isLoading, error, data: userData } = useQuery({
    queryKey: ['register'],
    queryFn: registerUser,
    // Only try once and don't retry on error
    retry: false,
    // Don't refetch automatically
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const { setUser, user } = useCurrentUser();

  useEffect(() => {
    setUser(userData || null);
  }, [userData, setUser]);
  
  console.log("SagleContentApp user", user);

  if (isLoading) return (
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