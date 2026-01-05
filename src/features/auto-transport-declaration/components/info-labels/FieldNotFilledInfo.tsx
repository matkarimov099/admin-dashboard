export function FieldNotFilledInfo() {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-5 w-5"
        >
          <path
            fillRule="evenodd"
            d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5Zm0 9a1 1 0 100-2 1 1 0 000 2Z"
            clipRule="evenodd"
          />
        </svg>
        <p className="font-semibold">Внимание!</p>
      </div>
      <p className="text-muted-foreground">В этом режиме данная графа не заполняется!</p>
    </div>
  );
}
