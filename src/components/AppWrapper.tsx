import { useQuery } from '@tanstack/react-query';
import bg from '../../public/bg.png';
import { getSagle } from '../mock/api/getSagle';
import useSagleStore from '../hooks/useSagle';
import { useEffect } from 'react';

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const { data: sagle } = useQuery({
    queryKey: ['sagle'],
    queryFn: getSagle,
  });

  const setSagle = useSagleStore((state) => state.setSagle);

  useEffect(() => {
    if (sagle) {
      setSagle(sagle);
    }
  }, [sagle, setSagle]);

  
  return (
    <div
      // className="flex flex-col items-center min-h-dvh w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white dark:from-slate-900 dark:to-slate-800 py-8"
      className="flex flex-col items-center min-h-dvh w-full py-8 overflow-scroll"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {children}
    </div>
  )
}

export default AppWrapper