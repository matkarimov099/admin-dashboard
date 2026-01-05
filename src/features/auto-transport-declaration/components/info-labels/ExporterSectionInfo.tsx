export function ExporterSectionInfo() {
  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">графа 2. «Экспортер/грузоотправитель»</p>

      <p>
        В графе указываются сведения о лице, указанном в транспортных документах в качестве
        отправителя товаров.
      </p>

      <div className="space-y-2">
        <p className="font-medium">В графе указываются:</p>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">Если грузоотправитель физическое лицо:</p>
          <p className="text-muted-foreground">
            фамилия, имя, отчество физического лица, его место жительства (краткое наименование
            страны согласно Классификатору стран мира и адрес)
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">Если грузоотправитель юридическое лицо:</p>
          <p className="text-muted-foreground">
            его краткое наименование и местонахождение (краткое наименование страны согласно
            Классификатору стран мира и адрес)
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">Например:</p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">Физическое лицо:</span>
            <br />
            «Алибаев Нуридин Камалович
            <br />
            Казахстан, г. Алма-Аты, проспект Суюнбая, дом 450»
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">Юридическое лицо:</span>
            <br />
            «ООО «Ros-Torg»
            <br />
            Россия, г.Иваново, ул.Смирнова, д.62»
          </p>
        </div>
      </div>

      <p>
        Если грузоотправитель отправляет товар по поручению другого лица или в других аналогичных
        случаях в графе сначала указывается краткое наименование и местонахождение (юридический
        адрес) грузоотправителя, затем краткое наименование и местонахождение (юридический адрес)
        лица, по поручению которого отправитель отправляет товар.
      </p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="text-muted-foreground text-sm">
          «ООО «Ros-Torg»
          <br />
          Россия, г. Химки, ул. Карлова, д. 362
          <br />
          по поручению ООО «Faraon»
          <br />
          Россия, г. Москва, ул. Большая полянка, 563»
        </p>
      </div>

      <p className="text-muted-foreground text-xs">
        В электронной ГТД каждое сведение об отправителе и лице, по поручению которого отправитель
        принимает товар (лицо, заключившее внешнеторговый контракт (договор, соглашение) с лицом,
        указанным в графе 9 ГТД), и других лицах, указанных в товаросопроводительных документах,
        указывается в отдельно выделенном поле.
      </p>

      <p className="text-muted-foreground text-xs">
        При декларировании товаров в бумажной форме на добавочных листах графа не заполняется.
      </p>
    </div>
  );
}
