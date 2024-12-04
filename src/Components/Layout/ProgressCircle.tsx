export const ProgressCircle = ({
  usePercentage = false,
  progress,
}: {
  usePercentage: boolean;
  progress: number;
}) => {
  return (
    <>
      <div className="relative size-40">
        <svg
          className="size-full -rotate-90"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-gray-200"
            strokeWidth="2"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className="stroke-current text-blue-600"
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - progress}
            strokeLinecap="round"
          />
        </svg>

        {usePercentage && (
          <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <span className="text-center text-2xl font-bold text-blue-600">
              {progress}%
            </span>
          </div>
        )}
      </div>
    </>
  );
};
