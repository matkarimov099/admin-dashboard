export function CustomsPostCodeInfo() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">графа 7. «Регистрационный номер ГТД»</p>

      <p>
        В графе указывается <span className="font-medium">пятизначный цифровой код</span>{' '}
        таможенного поста, на который будет подана ГТД, согласно Классификатору таможенных
        постов.
      </p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="mb-1 font-medium">Пример кода:</p>
        <p className="font-mono text-muted-foreground">12345</p>
      </div>

      <p className="text-muted-foreground text-xs">
        Код состоит из 5 цифр и определяется таможенным постом, в котором происходит
        оформление товаров
      </p>
    </div>
  );
}
