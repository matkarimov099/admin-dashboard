export function DeclarationStatusInfo() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">Статусы декларации:</p>
      <div className="space-y-1">
        <div>
          <span className="font-medium">Новая</span> — первичная подача декларации
        </div>
        <div>
          <span className="font-medium">Перерегистрация</span> — изменение сведений о
          товарах до выпуска
        </div>
        <div>
          <span className="font-medium">Переоформления</span> — изменение сведений после
          выпуска товаров
        </div>
      </div>
    </div>
  );
}
