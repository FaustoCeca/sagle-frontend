interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  color = '#2de2ff', // neon-cyan
  className = ''
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div 
        className={`${spinnerSize} border-4 border-t-transparent rounded-full animate-spin`} 
        style={{ borderColor: `transparent ${color} ${color} ${color}` }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;