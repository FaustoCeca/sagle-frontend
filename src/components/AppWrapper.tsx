interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  return (
    <div
      className="flex flex-col items-center min-h-dvh w-full py-8 relative lg:overflow-auto overflow-scroll"
    >
        {children}
    </div>
  )
}

export default AppWrapper