export default function InputPostSkeleton() {
  return (
    <div role="status" className="animate-pulse p-5 border-2 rounded-lg">
      <div>
        <div className="h-24 bg-gray-200 rounded-md w-full"></div>
      </div>

      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="h-4 ml-1 bg-gray-200 rounded-full dark:bg-gray-700 w-14"></div>
        <div className="h-7 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
