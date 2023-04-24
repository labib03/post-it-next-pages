export default function InputCommentSkeleton() {
  return (
    <div role="status" className="animate-pulse p-5 border-2 rounded-lg">
      <div>
        <div className="h-24 bg-gray-200 rounded-md w-full"></div>
      </div>

      <div className="mt-4">
        <div className="h-6 bg-gray-200 rounded-lg dark:bg-gray-700 w-24"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
}
