const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="my-4">
      <div className="flex justify-between">
          <span>Course Progress</span>
          <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded h-2 mt-2">
          <div
              className="bg-blue-500 h-2 rounded"
              style={{ width: `${progress}%` }}
          ></div>
      </div>
  </div>
);

export default ProgressBar;
