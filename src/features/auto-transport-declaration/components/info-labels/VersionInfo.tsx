export function VersionInfo() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">Версии декларации:</p>
      <div className="space-y-1">
        <div>
          <span className="font-medium">Рабочая</span> — черновик, в процессе заполнения
        </div>
        <div>
          <span className="font-medium">Оформленная</span> — готовая к подаче декларация
        </div>
        <div>
          <span className="font-medium">Аннулированная</span> — отмененная декларация
        </div>
        <div>
          <span className="font-medium">Черновик</span> — начальная стадия заполнения
        </div>
      </div>
    </div>
  );
}
