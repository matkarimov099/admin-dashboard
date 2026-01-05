export function AdditionalSheetInfo() {
  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">графа 3. «Добавочные листы»</p>

      <p>
        В первом подразделе графы указывается порядковый номер листа, во втором — общее
        количество представляемых листов ГТД, включая основной и все добавочные.
      </p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="mb-2 font-medium">Например:</p>
        <div className="space-y-1 text-muted-foreground">
          <p>
            Если имеется одна ГТД с двумя добавочными листами, в самой ГТД следует указать —{' '}
            <span className="font-medium">«1/3»</span>, в первом добавочном листе —{' '}
            <span className="font-medium">«2/3»</span>, во втором — <span className="font-medium">«3/3»</span>
          </p>
          <p>
            Если ГТД не имеет добавочных листов, указывается <span className="font-medium">«1/1»</span>
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        При декларировании товаров в электронной форме в графе, в порядке установленной в
        настоящем подпункте, указывается порядковый номер листа и общее количество листов ГТД,
        если бы электронная ГТД распечатывалась на бумажный носитель.
      </p>
    </div>
  );
}
