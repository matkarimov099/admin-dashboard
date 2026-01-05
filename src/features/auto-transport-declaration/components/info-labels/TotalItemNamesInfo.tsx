export function TotalItemNamesInfo() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">графа 5. «Всего наименований товаров»</p>

      <p>
        В графе проставляется общее число наименований товаров, указанных в графах 31 ГТД. Это
        число должно соответствовать количеству заполненных граф 31 ГТД.
      </p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Примечание:</span> Каждая позиция товара в графе 31
          считается отдельным наименованием
        </p>
      </div>
    </div>
  );
}
