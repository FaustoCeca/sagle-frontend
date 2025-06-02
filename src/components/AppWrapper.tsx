
interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {


  return (
    <div
      // className="flex flex-col items-center min-h-dvh w-full bg-gradient-to-b from-slate-900 to-slate-800 text-white dark:from-slate-900 dark:to-slate-800 py-8"
      className="flex flex-col items-center min-h-dvh w-full py-8 lg:overflow-auto overflow-scroll"
    >
      {children}
    </div>
  )
}

export default AppWrapper