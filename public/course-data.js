export const COURSE = {
  id: 'db-quest-ridelab-2026',
  title: 'DB Quest – RideLab Leipzig',
  subtitle: 'Kosten verstehen, Deckungsbeiträge steuern, Break-even meistern',
  caseTitle: 'RideLab Leipzig GmbH',
  caseIntro: `
    <p>Die <strong>RideLab Leipzig GmbH</strong> entwickelt und montiert urbane Fahrradhelme, Reflektor-Sets und Zubehör für den Onlinehandel und regionale Fachgeschäfte. Im Mittelpunkt des Kurses steht das neue Helm-Modell <strong>StreetShield</strong>. Sie begleiten das Controlling-Team bei Kostenfragen, Preisentscheidungen und der Einführung neuer Produkte.</p>
    <p>Alle Zahlen in den Fallbeispielen sind didaktisch erstellt. Die Situationen orientieren sich an typischen Entscheidungen aus Produktion, Handel und Controlling.</p>
  `,
  coreTaskCount: 48,
  chapters: [
    {
      id: 'c1', title: '1 · Kosten sicher unterscheiden', icon: '🧾', color: '#e97a6b',
      description: 'Fixe und variable Kosten, Gesamt- und Stückkosten sowie Fixkostendegression.',
      lessons: [
        {
          id: 'l1', title: '1.1 Fixe und variable Kosten', icon: '🧩',
          intro: 'Bevor Sie Deckungsbeiträge berechnen können, müssen Sie erkennen, welche Kosten von der Menge abhängen.',
          html: `
            <section class="explain-grid two">
              <article class="definition-card"><h3>Fixe Kosten <span class="symbol">K<sub>F</sub></span></h3><p><strong>Fixe Kosten</strong> fallen innerhalb eines betrachteten Zeitraums <strong>unabhängig von der produzierten Menge</strong> an. Typische Beispiele sind Miete, pauschale Wartungsverträge, Versicherungen oder feste Gehälter.</p></article>
              <article class="definition-card"><h3>Variable Kosten <span class="symbol">K<sub>v</sub></span></h3><p><strong>Variable Kosten</strong> hängen von der <strong>Produktions- oder Absatzmenge</strong> ab. Bei proportionalem Verlauf steigen sie mit jeder zusätzlichen Einheit gleichmäßig, z. B. Material, Verpackung oder stückabhängige Provisionen.</p></article>
            </section>
            <div class="formula-strip"><span>K<sub>G</sub> = K<sub>F</sub> + K<sub>v</sub></span><span>K<sub>v</sub> = k<sub>v</sub> · x</span></div>
            <article class="story-card"><h3>RideLab-Beispiel</h3><p>Für den StreetShield-Helm kostet das Verpackungsset 3,20 € je Stück. Bei 800 Helmen entstehen damit <strong>2.560 € variable Verpackungskosten</strong>. Die monatliche Hallenmiete von 6.000 € bleibt dagegen auch dann bestehen, wenn nur 500 statt 800 Helme produziert werden.</p></article>
            <div class="mini-diagram cost-lines" aria-label="Schaubild Fixkosten, variable Kosten und Gesamtkosten">
              <div class="axis y">Kosten</div><div class="axis x">Menge</div>
              <div class="line fixed">Fixkosten</div><div class="line variable">variable Kosten</div><div class="line total">Gesamtkosten</div>
            </div>
            <aside class="note"><strong>Wichtig:</strong> Ob Kosten fix oder variabel sind, hängt von der betrachteten Bezugsgröße und dem Zeitraum ab. Eine Stromrechnung kann z. B. einen fixen Grundpreis und einen verbrauchsabhängigen Anteil enthalten.</aside>
          `,
          tasks: ['t1','t2','t3','t4']
        },
        {
          id: 'l2', title: '1.2 Gesamt- und Stückkosten', icon: '📉',
          intro: 'Fixkosten bleiben insgesamt konstant, verteilen sich aber bei steigender Menge auf mehr Stück.',
          html: `
            <section class="explain-grid two">
              <article class="definition-card"><h3>Gesamtkosten</h3><p><strong>Gesamtkosten K<sub>G</sub></strong> bestehen aus fixen und variablen Kosten.</p><div class="formula">K<sub>G</sub> = K<sub>F</sub> + k<sub>v</sub> · x</div></article>
              <article class="definition-card"><h3>Stückkosten</h3><p><strong>Gesamtstückkosten k<sub>g</sub></strong> entstehen, indem die Gesamtkosten auf die produzierte Menge verteilt werden.</p><div class="formula">k<sub>g</sub> = K<sub>G</sub> / x</div></article>
            </section>
            <div class="formula-strip"><span>k<sub>f</sub> = K<sub>F</sub> / x</span><span>k<sub>g</sub> = k<sub>v</sub> + k<sub>f</sub></span></div>
            <article class="worked-example"><h3>Beispiel: Fixkostendegression</h3><ol><li>Fixkosten: 9.000 €</li><li>Variable Stückkosten: 22 €</li><li>Bei 300 Stück: k<sub>f</sub> = 9.000 / 300 = 30 € → k<sub>g</sub> = 52 €</li><li>Bei 600 Stück: k<sub>f</sub> = 9.000 / 600 = 15 € → k<sub>g</sub> = 37 €</li></ol><p>Die variablen Stückkosten bleiben gleich. Die sinkenden Gesamtstückkosten entstehen durch die <strong>Fixkostendegression</strong>.</p></article>
            <div class="bar-compare"><div><span>300 Stück</span><div class="bar fixed-part" style="--w:58%">Fixkosten/Stück 30 €</div><div class="bar var-part" style="--w:42%">kᵥ 22 €</div></div><div><span>600 Stück</span><div class="bar fixed-part" style="--w:41%">Fixkosten/Stück 15 €</div><div class="bar var-part" style="--w:59%">kᵥ 22 €</div></div></div>
            <aside class="note"><strong>Gesetz der Massenproduktion:</strong> Bei steigender Produktionsmenge verteilen sich die konstanten Fixkosten auf mehr Einheiten. Dadurch sinken die fixen Kosten pro Stück und damit – bei konstanten variablen Stückkosten – auch die Gesamtstückkosten.</aside>
          `,
          tasks: ['t5','t6','t7','t8']
        }
      ], bonusTask: 'b1'
    },
    {
      id: 'c2', title: '2 · Teilkostenrechnung verstehen', icon: '⚖️', color: '#7b74d8',
      description: 'Vollkosten- und Teilkostenrechnung vergleichen und ihre Aussagekraft einordnen.',
      lessons: [
        {
          id: 'l3', title: '2.1 Vollkosten- und Teilkostenrechnung', icon: '🔍',
          intro: 'Die beiden Systeme beantworten unterschiedliche Fragen.',
          html: `
            <section class="compare-panel">
              <article><h3>Vollkostenrechnung</h3><p>Bei der <strong>Vollkostenrechnung</strong> werden <strong>variable und fixe Kosten</strong> den Produkten zugerechnet. Ziel ist die Ermittlung der <strong>Selbstkosten pro Stück</strong>. Sie ist wichtig für langfristige Betrachtungen.</p><div class="formula">Selbstkosten = variable Stückkosten + fixe Kosten pro Stück</div></article>
              <article><h3>Teilkostenrechnung</h3><p>Bei der <strong>Teilkostenrechnung</strong> werden den Produkten zunächst nur die <strong>variablen Kosten</strong> zugerechnet. Die Fixkosten werden anschließend als Block betrachtet. Dadurch lässt sich der <strong>Deckungsbeitrag</strong> ermitteln.</p><div class="formula">Deckungsbeitrag = Erlös − variable Kosten</div></article>
            </section>
            <article class="worked-example"><h3>Warum das bei kurzfristigen Entscheidungen wichtig ist</h3><p>Ein Zubehörteil wird für 58 € verkauft. Variable Stückkosten: 42 €. Selbstkosten: 66 €. Die Vollkostenrechnung zeigt 8 € Verlust je Stück. Die Teilkostenrechnung zeigt dagegen einen positiven Stückdeckungsbeitrag von <strong>16 €</strong>. Wenn die Fixkosten kurzfristig ohnehin anfallen und ausreichend Kapazität vorhanden ist, verbessert jedes zusätzlich verkaufte Stück das Betriebsergebnis um 16 €.</p></article>
            <aside class="note"><strong>Merke:</strong> Ein positiver Deckungsbeitrag bedeutet nicht automatisch, dass ein Produkt langfristig wirtschaftlich ist. Er zeigt zunächst nur, dass der Verkauf zur Deckung der Fixkosten beiträgt.</aside>
          `,
          tasks: ['t9','t10','t11','t12']
        },
        {
          id: 'l4', title: '2.2 Chancen und Grenzen der Teilkostenrechnung', icon: '🧠',
          intro: 'Teilkostenrechnung hilft bei kurzfristigen Entscheidungen, hat aber klare Grenzen.',
          html: `
            <section class="explain-grid three">
              <article class="definition-card"><h3>Vorteil 1</h3><p><strong>Fixkostenverteilung wird vermieden.</strong> Produkte werden nicht durch willkürlich verteilte Fixkosten künstlich schlechter dargestellt.</p></article>
              <article class="definition-card"><h3>Vorteil 2</h3><p><strong>Kurzfristige Entscheidungen</strong> werden erleichtert: Entscheidend ist zunächst, ob der Erlös die variablen Kosten übersteigt.</p></article>
              <article class="definition-card"><h3>Vorteil 3</h3><p>Bei knappen Kapazitäten kann die Teilkostenrechnung helfen, Produkte nach ihrem Beitrag zum Ergebnis zu beurteilen.</p></article>
            </section>
            <section class="explain-grid three">
              <article class="warning-card"><h3>Grenze 1</h3><p>Die <strong>Trennung in fixe und variable Kosten</strong> ist in der Praxis nicht immer eindeutig.</p></article>
              <article class="warning-card"><h3>Grenze 2</h3><p>Für den Deckungsbeitrag muss ein <strong>Verkaufspreis</strong> bekannt oder kalkuliert sein.</p></article>
              <article class="warning-card"><h3>Grenze 3</h3><p>Für <strong>langfristige Entscheidungen</strong> reicht ein positiver Deckungsbeitrag allein nicht aus, weil auch die Fixkosten gedeckt werden müssen.</p></article>
            </section>
            <article class="story-card"><h3>RideLab-Entscheidung</h3><p>Ein Onlinehändler möchte 600 Helmhalterungen abnehmen. Der angebotene Preis liegt über den variablen Stückkosten, aber unter den Vollkosten. Kurzfristig kann der Auftrag sinnvoll sein, wenn freie Kapazität vorhanden ist und die Fixkosten ohnehin anfallen. Langfristig müsste RideLab dagegen prüfen, ob der Preis auch die gesamten Kosten deckt.</p></article>
          `,
          tasks: ['t13','t14','t15','t16']
        }
      ], bonusTask: 'b2'
    },
    {
      id: 'c3', title: '3 · Stückdeckungsbeitrag beherrschen', icon: '📦', color: '#35a9c7',
      description: 'Stückdeckungsbeitrag, Einflussgrößen und prozentualer Deckungsbeitrag.',
      lessons: [
        {
          id: 'l5', title: '3.1 Absoluter Stückdeckungsbeitrag', icon: '💠',
          intro: 'Der Stückdeckungsbeitrag zeigt, was ein einzelnes verkauftes Stück zur Deckung der Fixkosten beiträgt.',
          html: `
            <article class="definition-card hero"><h3>Stückdeckungsbeitrag <span class="symbol">db</span></h3><p>Der <strong>Stückdeckungsbeitrag</strong> ist die Differenz zwischen dem <strong>Verkaufspreis je Stück</strong> und den <strong>variablen Stückkosten</strong>.</p><div class="formula big">db = e − k<sub>v</sub></div><p>Er steht zur Deckung der Fixkosten und – sobald diese gedeckt sind – zur Gewinnerzielung zur Verfügung.</p></article>
            <div class="formula-strip"><span>e = k<sub>v</sub> + db</span><span>db &gt; 0 → Verkauf verbessert kurzfristig das Ergebnis</span></div>
            <article class="worked-example"><h3>RideLab-Beispiel</h3><p>StreetShield wird für 84 € verkauft. Die variablen Stückkosten betragen 51 €. Somit gilt: <strong>db = 84 − 51 = 33 €</strong>. Jedes verkaufte Stück trägt 33 € zur Deckung der Fixkosten bei.</p></article>
            <figure class="course-figure"><img src="assets/images/stueck-db-diagramm.png" alt="Stückkostenbetrachtung mit variablen Stückkosten, fixen Stückkosten und Stückdeckungsbeitrag"><figcaption>Das Schaubild zeigt den Stückdeckungsbeitrag als Abstand zwischen Verkaufspreis und variablen Stückkosten. Die fixen Kosten pro Stück sinken mit steigender Menge.</figcaption></figure>
          `,
          tasks: ['t17','t18','t19','t20']
        },
        {
          id: 'l6', title: '3.2 Veränderungen und DB in Prozent', icon: '📊',
          intro: 'Preis und variable Stückkosten verändern den Stückdeckungsbeitrag direkt; Fixkosten dagegen nicht.',
          html: `
            <section class="explain-grid two">
              <article class="definition-card"><h3>Was verändert db?</h3><ul><li>Verkaufspreis <strong>steigt</strong> → db steigt.</li><li>Verkaufspreis <strong>sinkt</strong> → db sinkt.</li><li>Variable Stückkosten <strong>steigen</strong> → db sinkt.</li><li>Variable Stückkosten <strong>sinken</strong> → db steigt.</li></ul><div class="formula">db = e − k<sub>v</sub></div></article>
              <article class="definition-card"><h3>Was verändern Fixkosten?</h3><p>Fixkosten stehen <strong>nicht</strong> in der Formel des Stückdeckungsbeitrags. Eine Änderung der Fixkosten verändert db daher nicht unmittelbar. Steigende Fixkosten senken bei gleichem Gesamtdeckungsbeitrag jedoch das Betriebsergebnis.</p></article>
            </section>
            <article class="definition-card"><h3>Prozentualer Stückdeckungsbeitrag</h3><p>Der prozentuale Stückdeckungsbeitrag zeigt, welcher Anteil des Verkaufspreises zur Fixkostendeckung und Gewinnerzielung zur Verfügung steht.</p><div class="formula-strip"><span>db% = (db / e) · 100</span><span>k<sub>v</sub> = e · (1 − db%)</span></div></article>
            <article class="worked-example"><h3>Beispiel</h3><p>Preis: 125 €, variable Stückkosten: 80 €. db = 45 €. Damit gilt: db% = 45 / 125 · 100 = <strong>36 %</strong>. Der variable Kostenanteil beträgt 64 %.</p></article>
            <aside class="note"><strong>Bei Prozentaufgaben:</strong> Achten Sie darauf, dass sich Prozentangaben auf dieselbe Preisbasis beziehen. Wenn ein Bruttoverkaufspreis gegeben ist, muss für eine Nettokalkulation zuerst auf netto umgerechnet werden.</aside>
          `,
          tasks: ['t21','t22','t23','t24']
        }
      ], bonusTask: 'b3'
    },
    {
      id: 'c4', title: '4 · Vom Stück zum Betriebsergebnis', icon: '🏭', color: '#57b85a',
      description: 'Periodendeckungsbeitrag und Betriebsergebnis bei einem oder mehreren Produkten.',
      lessons: [
        {
          id: 'l7', title: '4.1 Periodendeckungsbeitrag und Gewinn', icon: '💶',
          intro: 'Aus dem Beitrag eines einzelnen Stücks wird über die Absatzmenge der Gesamtdeckungsbeitrag.',
          html: `
            <article class="definition-card hero"><h3>Periodendeckungsbeitrag <span class="symbol">DB</span></h3><p>Der <strong>Periodendeckungsbeitrag</strong> ist die Differenz aus gesamten Erlösen und gesamten variablen Kosten einer Periode.</p><div class="formula-strip"><span>DB = E − K<sub>v</sub></span><span>DB = db · x</span></div></article>
            <article class="definition-card"><h3>Betriebsergebnis</h3><p>Vom Gesamtdeckungsbeitrag werden anschließend die Fixkosten abgezogen.</p><div class="formula big">G = DB − K<sub>F</sub></div><p><strong>DB &gt; K<sub>F</sub></strong> → Gewinn · <strong>DB = K<sub>F</sub></strong> → Gewinnschwelle · <strong>DB &lt; K<sub>F</sub></strong> → Verlust</p></article>
            <article class="worked-example"><h3>RideLab-Beispiel</h3><p>Preis 76 €, variable Stückkosten 44 €, Absatz 900 Stück, Fixkosten 20.000 €. Daraus: db = 32 €, DB = 28.800 €, Betriebsergebnis = <strong>8.800 € Gewinn</strong>.</p></article>
            <figure class="course-figure"><img src="assets/images/perioden-db-diagramm.png" alt="Gesamtkostenbetrachtung mit Periodendeckungsbeitrag"><figcaption>Der Gesamtdeckungsbeitrag ist die Differenz zwischen Erlösen und variablen Gesamtkosten. Zuerst deckt er die Fixkosten; ein darüber hinausgehender Betrag ist Gewinn.</figcaption></figure>
          `,
          tasks: ['t25','t26','t27','t28']
        },
        {
          id: 'l8', title: '4.2 Mehrere Produkte zusammenführen', icon: '🧮',
          intro: 'Bei mehreren Produkten wird der Deckungsbeitrag jedes Produkts ermittelt und anschließend addiert.',
          html: `
            <div class="step-flow"><div><b>1</b><span>db je Produkt</span><small>e − kᵥ</small></div><div><b>2</b><span>DB je Produkt</span><small>db · x</small></div><div><b>3</b><span>DB gesamt</span><small>Σ DB</small></div><div><b>4</b><span>Betriebsergebnis</span><small>DB gesamt − Kf</small></div></div>
            <article class="worked-example"><h3>Beispiel mit drei RideLab-Produkten</h3><table class="content-table"><thead><tr><th>Produkt</th><th>db</th><th>Menge</th><th>DB</th></tr></thead><tbody><tr><td>StreetShield S</td><td>32 €</td><td>500</td><td>16.000 €</td></tr><tr><td>StreetShield Air</td><td>36 €</td><td>400</td><td>14.400 €</td></tr><tr><td>StreetShield Pro</td><td>47 €</td><td>300</td><td>14.100 €</td></tr></tbody></table><p>DB gesamt = 44.500 €. Bei Fixkosten von 31.000 € ergibt sich ein <strong>Betriebsergebnis von 13.500 €</strong>.</p></article>
            <aside class="note"><strong>Wichtig:</strong> Ein hoher Stückdeckungsbeitrag bedeutet nicht automatisch den höchsten Gesamtdeckungsbeitrag. Die Absatzmenge spielt ebenfalls eine Rolle.</aside>
            <article class="story-card"><h3>Produktstreichung kurzfristig beurteilen</h3><p>Wird ein Produkt mit positivem DB gestrichen und bleiben die Fixkosten unverändert, fehlt künftig genau dieser Deckungsbeitrag. Das Betriebsergebnis verschlechtert sich entsprechend.</p></article>
          `,
          tasks: ['t29','t30','t31','t32']
        }
      ], bonusTask: 'b4'
    },
    {
      id: 'c5', title: '5 · Kostenfunktion aus Daten ableiten', icon: '📐', color: '#f2a541',
      description: 'Kostenauflösung, Kostenfunktion, Kapazität und Beschäftigungsgrad.',
      lessons: [
        {
          id: 'l9', title: '5.1 Kostenauflösung aus zwei Gesamtkostenwerten', icon: '📏',
          intro: 'Wenn variable Stückkosten und Fixkosten nicht direkt gegeben sind, können Sie sie aus zwei Beobachtungen ermitteln.',
          html: `
            <article class="definition-card hero"><h3>Kostenauflösung</h3><p>Bei proportionalen variablen Kosten ist die Steigung der linearen Gesamtkostenfunktion gleich den <strong>variablen Stückkosten</strong>.</p><div class="formula big">k<sub>v</sub> = (K₂ − K₁) / (x₂ − x₁)</div></article>
            <div class="step-flow"><div><b>1</b><span>Mengendifferenz</span><small>Δx</small></div><div><b>2</b><span>Kostendifferenz</span><small>ΔK</small></div><div><b>3</b><span>kᵥ bestimmen</span><small>ΔK / Δx</small></div><div><b>4</b><span>Kf bestimmen</span><small>K − kᵥ·x</small></div></div>
            <article class="worked-example"><h3>Beispiel</h3><p>800 Stück verursachen 29.000 € Gesamtkosten, 1.200 Stück verursachen 37.000 €. Dann gilt: kᵥ = (37.000 − 29.000) / (1.200 − 800) = <strong>20 €/Stück</strong>. Fixkosten: 29.000 − 20 · 800 = <strong>13.000 €</strong>.</p></article>
            <aside class="note"><strong>Voraussetzung:</strong> Die variablen Kosten müssen im betrachteten Bereich proportional verlaufen. Sonst lässt sich aus zwei Punkten keine konstante variable Kostenrate ableiten.</aside><aside class="note"><strong>Wenn Auslastungsprozente gegeben sind:</strong> Rechnen Sie zuerst in Mengen um: x = Kapazität · Auslastungsgrad. Erst danach verwenden Sie die Kostenauflösungsformel.</aside>
          `,
          tasks: ['t33','t34','t35','t36']
        },
        {
          id: 'l10', title: '5.2 Kostenfunktion, Kapazität und Beschäftigungsgrad', icon: '🔋',
          intro: 'Mit kᵥ und Kf können Sie Kosten prognostizieren und die Kapazitätsauslastung beurteilen.',
          html: `
            <section class="explain-grid two"><article class="definition-card"><h3>Kostenfunktion</h3><p>Die lineare Gesamtkostenfunktion lautet:</p><div class="formula big">K<sub>G</sub>(x) = K<sub>F</sub> + k<sub>v</sub> · x</div></article><article class="definition-card"><h3>Beschäftigungsgrad</h3><p>Der <strong>Beschäftigungsgrad</strong> gibt an, zu welchem Anteil die maximale Kapazität genutzt wird.</p><div class="formula big">BG = x / Kapazität · 100</div></article></section>
            <article class="worked-example"><h3>Beispiel</h3><p>Kf = 15.000 €, kᵥ = 18 €, Produktion = 700 Stück. Gesamtkosten: 15.000 + 18 · 700 = <strong>27.600 €</strong>. Bei einer Kapazität von 1.200 Stück und einer Produktion von 900 Stück beträgt der Beschäftigungsgrad <strong>75 %</strong>.</p></article>
            <div class="capacity-gauge"><div class="fill" style="--fill:75%"></div><span>75 % Kapazitätsnutzung</span></div>
            <aside class="note"><strong>Interpretation:</strong> Ein Beschäftigungsgrad von 62,5 % bedeutet, dass 62,5 % der maximal möglichen Ausbringungsmenge genutzt werden.</aside><article class="definition-card"><h3>Vertiefung: Übergangsmenge zweier Verfahren</h3><p>Werden zwei lineare Kostenfunktionen verglichen, liegt die <strong>Übergangsmenge</strong> dort, wo beide Verfahren gleich hohe Gesamtkosten verursachen. Dazu werden die Kostenfunktionen <strong>gleichgesetzt</strong> und nach x aufgelöst.</p><div class="formula">K<sub>A</sub>(x) = K<sub>B</sub>(x)</div></article>
          `,
          tasks: ['t37','t38','t39','t40']
        }
      ], bonusTask: 'b5'
    },
    {
      id: 'c6', title: '6 · Break-even sicher anwenden', icon: '🎯', color: '#2abf88',
      description: 'Gewinnschwelle, Rundung, Einheiten, Zeiträume, Break-even-Preis und Diagramme.',
      lessons: [
        {
          id: 'l11', title: '6.1 Break-even-Menge und Gewinnzonen', icon: '⚫',
          intro: 'Am Break-even-Point sind Erlös und Gesamtkosten gleich. Der Gewinn ist dort genau null.',
          html: `
            <article class="definition-card hero"><h3>Break-even-Point / Gewinnschwelle</h3><p>Am <strong>Break-even-Point</strong> gilt: <strong>Erlöse = Gesamtkosten</strong>. Damit ist der Gewinn null.</p><div class="formula-strip"><span>x<sub>BE</sub> = K<sub>F</sub> / (e − k<sub>v</sub>)</span><span>x<sub>BE</sub> = K<sub>F</sub> / db</span></div></article>
            <section class="explain-grid two"><article class="warning-card"><h3>Unterhalb</h3><p>DB gesamt &lt; Fixkosten → <strong>Verlustzone</strong></p></article><article class="definition-card"><h3>Oberhalb</h3><p>DB gesamt &gt; Fixkosten → <strong>Gewinnzone</strong></p></article></section>
            <article class="worked-example"><h3>Rundungsregel</h3><p>Ergibt sich rechnerisch x<sub>BE</sub> = 414,81 Stück, kann kein Bruchteil verkauft werden. <strong>Ab 415 Stück</strong> wird Gewinn erzielt. Liegt die Gewinnschwelle dagegen exakt bei 300 Stück, gilt bei 300 Stück G = 0 und <strong>erst ab 301 Stück</strong> entsteht Gewinn.</p></article><aside class="note"><strong>Wirkung einer Preissenkung:</strong> Sinkt e bei unveränderten Kosten, sinkt db = e − kᵥ. Weil x<sub>BE</sub> = K<sub>F</sub>/db gilt, steigt dadurch die Break-even-Menge.</aside>
            <figure class="course-figure"><img src="assets/images/break-even-gesamt.png" alt="Break-even-Diagramm in der Gesamtkostenbetrachtung"><figcaption>Im Gesamtkostendiagramm liegt die Gewinnschwelle am Schnittpunkt von Erlös- und Gesamtkostenfunktion.</figcaption></figure>
          `,
          tasks: ['t41','t42','t43','t44']
        },
        {
          id: 'l12', title: '6.2 Transfer: Einheiten, Zeiträume und Break-even-Preis', icon: '🛠️',
          intro: 'Viele Prüfungsaufgaben werden anspruchsvoll, weil Angaben erst auf dieselbe Basis gebracht werden müssen.',
          html: `
            <section class="explain-grid two"><article class="definition-card"><h3>1. Gleiche Mengeneinheit</h3><p>€/500 g und €/kg dürfen nicht direkt kombiniert werden. Rechnen Sie zuerst auf eine gemeinsame Einheit um.</p><p><strong>Beispiel:</strong> 2,95 € je 500 g = 5,90 € je kg.</p></article><article class="definition-card"><h3>2. Gleicher Zeitraum</h3><p>Monatliche und jährliche Fixkosten müssen vor der Berechnung auf denselben Zeitraum gebracht werden.</p><p><strong>Beispiel:</strong> 600 € pro Monat = 7.200 € pro Jahr.</p></article></section>
            <article class="definition-card hero"><h3>Break-even-Preis</h3><p>Ist die gewünschte Break-even-Menge vorgegeben, kann die Gleichung nach dem Preis aufgelöst werden.</p><div class="formula big">e = K<sub>F</sub> / x<sub>BE</sub> + k<sub>v</sub></div></article>
            <figure class="course-figure"><img src="assets/images/break-even-stueck.png" alt="Break-even-Diagramm in der Stückkostenbetrachtung"><figcaption>In der Stückkostenbetrachtung liegt die Gewinnschwelle dort, wo der Verkaufspreis die Gesamtstückkosten schneidet.</figcaption></figure>
            <article class="worked-example"><h3>Vom Gleichgewicht zur Formel</h3><p>Am Break-even gilt e · x = K<sub>F</sub> + k<sub>v</sub> · x. Nach x aufgelöst ergibt sich x = K<sub>F</sub> / (e − k<sub>v</sub>). Nach e aufgelöst ergibt sich e = K<sub>F</sub> / x + k<sub>v</sub>.</p></article>
            <aside class="note"><strong>Kontrollfrage:</strong> Stimmen Zeitraum und Mengeneinheit? Ist der Stückdeckungsbeitrag positiv? Wurde bei Stückzahlen korrekt auf ganze Einheiten gerundet?</aside>
          `,
          tasks: ['t45','t46','t47','t48']
        }
      ], bonusTask: 'b6'
    }
  ],
  tasks: {
    t1:{lesson:'l1',type:'classify',afb:1,xp:20,prompt:'Ordnen Sie die Kosten der RideLab Leipzig GmbH als fix oder variabel ein.',items:[['Hallenmiete','fix'],['Verpackung je Helm','variabel'],['Pauschale Maschinenversicherung','fix'],['Stückabhängige Verkaufsprovision','variabel'],['Akkordlohn pro montiertem Helm','variabel']],categories:[['fix','Fixe Kosten'],['variabel','Variable Kosten']],solution:'Fix: Hallenmiete, pauschale Maschinenversicherung. Variabel: Verpackung je Helm, stückabhängige Provision, Akkordlohn.'},
    t2:{lesson:'l1',type:'numeric',afb:2,xp:35,prompt:'Die variablen Stückkosten eines Reflektor-Sets betragen 18,40 €. RideLab produziert 750 Sets. Wie hoch sind die variablen Gesamtkosten?',answer:13800,tolerance:0.01,unit:'€',solution:'Kᵥ = 18,40 € · 750 = 13.800 €.'},
    t3:{lesson:'l1',type:'multi',afb:2,xp:35,prompt:'Die Produktion steigt von 1.000 auf 1.200 Helme. Welche Aussagen treffen bei proportionalen variablen Kosten zu?',options:['Die gesamten variablen Kosten steigen.','Die fixen Gesamtkosten bleiben innerhalb des betrachteten Zeitraums gleich.','Die variablen Stückkosten steigen automatisch.','Die Hallenmiete wird automatisch um 20 % höher.'],answer:[0,1],solution:'Bei proportionalen variablen Kosten steigen die gesamten variablen Kosten mit der Menge. Die Fixkosten bleiben insgesamt konstant. kᵥ ändert sich dadurch nicht.'},
    t4:{lesson:'l1',type:'freeText',afb:3,xp:50,prompt:'Eine Stromrechnung besteht aus einem monatlichen Grundpreis und einem verbrauchsabhängigen Anteil. Erklären Sie, warum diese Kosten nicht vollständig nur „fix“ oder nur „variabel“ genannt werden sollten.',placeholder:'Formulieren Sie Ihre Begründung in 2–4 Sätzen.',solution:'Der Grundpreis fällt unabhängig von der Produktionsmenge an und ist damit fix. Der verbrauchsabhängige Anteil steigt mit der Nutzung bzw. Produktionsmenge und ist variabel. Die Stromrechnung enthält daher einen fixen und einen variablen Bestandteil.'},
    t5:{lesson:'l2',type:'matching',afb:1,xp:20,prompt:'Ordnen Sie die Größen der passenden Formel zu.',pairs:[['Fixe Stückkosten','Kf = KF / x'],['Gesamtstückkosten','kg = KG / x'],['Variable Gesamtkosten','Kv = kv · x'],['Gesamtkosten','KG = KF + Kv']],solution:'k_f = K_F/x; k_g = K_G/x; K_v = k_v·x; K_G = K_F + K_v.'},
    t6:{lesson:'l2',type:'multiNumeric',afb:2,xp:35,prompt:'Fixkosten: 9.000 €, variable Stückkosten: 22 €, Menge: 600 Stück. Berechnen Sie fixe Stückkosten und Gesamtstückkosten.',fields:[['Fixe Stückkosten',15,'€/Stück'],['Gesamtstückkosten',37,'€/Stück']],solution:'k_f = 9.000/600 = 15 €/Stück. k_g = 15 + 22 = 37 €/Stück.'},
    t7:{lesson:'l2',type:'single',afb:2,xp:35,prompt:'Die Fixkosten bleiben bei 9.000 €, kᵥ bei 22 €. Was ist der Hauptgrund dafür, dass die Gesamtstückkosten bei 600 Stück niedriger sind als bei 300 Stück?',options:['Die variablen Stückkosten sinken automatisch.','Die Fixkosten verteilen sich auf mehr Stück.','Die Fixkosten verschwinden.','Der Verkaufspreis steigt.'],answer:1,solution:'Die konstanten Fixkosten verteilen sich auf eine größere Menge. Dadurch sinken die fixen Kosten pro Stück.'},
    t8:{lesson:'l2',type:'freeText',afb:3,xp:50,prompt:'Erklären Sie die Fixkostendegression und ihren Einfluss auf die Gesamtstückkosten, wenn die variablen Stückkosten konstant bleiben.',placeholder:'Erklären Sie Ursache und Wirkung.',solution:'Mit steigender Produktionsmenge verteilen sich die konstanten Fixkosten auf mehr Einheiten. Dadurch sinken die fixen Kosten pro Stück. Wenn kᵥ konstant bleibt, sinken deshalb auch die Gesamtstückkosten.'},
    t9:{lesson:'l3',type:'single',afb:1,xp:20,prompt:'Welche Kosten werden den Produkten in der Teilkostenrechnung zunächst zugerechnet?',options:['Nur Fixkosten','Nur variable Kosten','Alle fixen und variablen Kosten','Nur kalkulatorische Kosten'],answer:1,solution:'In der Teilkostenrechnung werden den Produkten zunächst nur die variablen Kosten zugerechnet.'},
    t10:{lesson:'l3',type:'matching',afb:2,xp:35,prompt:'Ordnen Sie Zweck und Verfahren.',pairs:[['Selbstkosten je Stück bestimmen','Vollkostenrechnung'],['Deckungsbeitrag bestimmen','Teilkostenrechnung'],['Langfristige Kostendeckung prüfen','Vollkostenrechnung'],['Kurzfristige Entscheidung unterstützen','Teilkostenrechnung']],solution:'Vollkostenrechnung: Selbstkosten und langfristige Kostendeckung. Teilkostenrechnung: Deckungsbeitrag und kurzfristige Entscheidungen.'},
    t11:{lesson:'l3',type:'numeric',afb:2,xp:35,prompt:'Ein Zubehörteil wird für 58 € verkauft. Die variablen Stückkosten betragen 42 €. Wie hoch ist der Stückdeckungsbeitrag?',answer:16,tolerance:0.01,unit:'€/Stück',solution:'db = 58 € − 42 € = 16 €/Stück.'},
    t12:{lesson:'l3',type:'freeText',afb:3,xp:50,prompt:'Die Selbstkosten eines Zubehörteils betragen 66 €, der Verkaufspreis 58 €, die variablen Stückkosten 42 €. Die Fixkosten fallen kurzfristig ohnehin an und es besteht freie Kapazität. Beurteilen Sie aus Sicht der Teilkostenrechnung, ob zusätzliche Verkäufe sinnvoll sein können.',placeholder:'Nennen Sie Rechnung und Begründung.',solution:'Der Stückdeckungsbeitrag beträgt 58 − 42 = 16 €. Er ist positiv. Wenn die Fixkosten kurzfristig ohnehin anfallen und freie Kapazität vorhanden ist, verbessert jedes zusätzliche verkaufte Stück das Betriebsergebnis um 16 €. Langfristig müsste der Preis jedoch auch die gesamten Kosten decken.'},
    t13:{lesson:'l4',type:'multi',afb:1,xp:20,prompt:'Welche Punkte gehören zu den Vorteilen der Teilkostenrechnung?',options:['Vermeidung problematischer Fixkostenverteilungen','Gute Grundlage für kurzfristige Entscheidungen','Fixkosten werden vollständig ignoriert und müssen nie gedeckt werden','Sie kann bei Produktionsentscheidungen unterstützen'],answer:[0,1,3],solution:'Vorteile sind die Vermeidung problematischer Fixkostenverteilungen, Unterstützung kurzfristiger Entscheidungen und Hilfe bei Produktionsentscheidungen. Fixkosten bleiben dennoch relevant.'},
    t14:{lesson:'l4',type:'classify',afb:2,xp:35,prompt:'Ordnen Sie die Aussagen als Vorteil oder Grenze der Teilkostenrechnung ein.',items:[['Fixkosten werden nicht willkürlich auf Produkte verteilt.','vorteil'],['Mischkosten lassen sich schwer trennen.','grenze'],['Kurzfristige Zusatzentscheidungen werden transparenter.','vorteil'],['Langfristige Kostendeckung lässt sich nicht allein aus positivem DB ableiten.','grenze']],categories:[['vorteil','Vorteil'],['grenze','Grenze']],solution:'Vorteile: keine willkürliche Fixkostenverteilung, bessere kurzfristige Entscheidungen. Grenzen: schwierige Kostentrennung, positiver DB reicht langfristig nicht aus.'},
    t15:{lesson:'l4',type:'truefalse',afb:2,xp:35,prompt:'Steigen nur die Fixkosten, während Preis und variable Stückkosten unverändert bleiben, sinkt der Stückdeckungsbeitrag.',answer:false,solution:'Falsch. db = e − kᵥ. Fixkosten sind nicht Bestandteil dieser Formel. Das Betriebsergebnis kann jedoch sinken.'},
    t16:{lesson:'l4',type:'freeText',afb:3,xp:50,prompt:'Erklären Sie, warum ein Produkt mit positivem Stückdeckungsbeitrag trotzdem langfristig problematisch sein kann.',placeholder:'Beziehen Sie Fixkosten und langfristige Kostendeckung ein.',solution:'Ein positiver Stückdeckungsbeitrag zeigt nur, dass der Verkaufspreis über den variablen Stückkosten liegt. Langfristig müssen zusätzlich die Fixkosten gedeckt werden. Reicht der Gesamtdeckungsbeitrag dauerhaft nicht dafür aus, ist das Produkt bzw. Programm langfristig nicht kostendeckend.'},
    t17:{lesson:'l5',type:'numeric',afb:1,xp:20,prompt:'Ein StreetShield-Helm wird für 84 € verkauft. Die variablen Stückkosten betragen 51 €. Berechnen Sie db.',answer:33,tolerance:0.01,unit:'€/Stück',solution:'db = 84 − 51 = 33 €/Stück.'},
    t18:{lesson:'l5',type:'truefalse',afb:2,xp:35,prompt:'Ein positiver Stückdeckungsbeitrag bedeutet, dass ein zusätzlich verkauftes Stück kurzfristig zur Deckung der Fixkosten beiträgt.',answer:true,solution:'Richtig. Ein positiver db ist der Betrag, der nach Abzug der variablen Stückkosten zur Fixkostendeckung und später zum Gewinn beiträgt.'},
    t19:{lesson:'l5',type:'multiNumeric',afb:2,xp:35,prompt:'Preis bisher 88 €, kᵥ = 54 €. Der Preis steigt auf 93 €, kᵥ bleibt gleich. Berechnen Sie alten und neuen db.',fields:[['Alter db',34,'€'],['Neuer db',39,'€']],solution:'Alt: 88 − 54 = 34 €. Neu: 93 − 54 = 39 €.'},
    t20:{lesson:'l5',type:'freeText',afb:3,xp:50,prompt:'Ein Produkt wird unter seinen Selbstkosten verkauft, hat aber einen positiven Stückdeckungsbeitrag. Erklären Sie, warum die Produktion kurzfristig dennoch sinnvoll sein kann.',placeholder:'Erläutern Sie den Beitrag zur Fixkostendeckung.',solution:'Wenn der Preis über den variablen Stückkosten liegt, ist db positiv. Jedes verkaufte Stück trägt dann zur Deckung ohnehin anfallender Fixkosten bei und kann den Verlust verringern oder den Gewinn erhöhen. Langfristig müssen jedoch auch die gesamten Kosten gedeckt werden.'},
    t21:{lesson:'l6',type:'numeric',afb:1,xp:20,prompt:'Preis 125 €, kᵥ = 80 €. Wie hoch ist der prozentuale Stückdeckungsbeitrag?',answer:36,tolerance:0.05,unit:'%',solution:'db = 125 − 80 = 45 €. db% = 45/125 · 100 = 36 %.'},
    t22:{lesson:'l6',type:'numeric',afb:2,xp:35,prompt:'Der Nettoverkaufspreis beträgt 140 €. Der Stückdeckungsbeitrag soll 25 % des Preises betragen. Wie hoch dürfen die variablen Stückkosten maximal sein?',answer:105,tolerance:0.01,unit:'€',solution:'Variable Kostenanteil = 75 %. kᵥ = 140 · 0,75 = 105 €.'},
    t23:{lesson:'l6',type:'multiNumeric',afb:2,xp:35,prompt:'Preis sinkt von 95 € auf 90 €, kᵥ bleibt 55 €. Berechnen Sie neuen db und neuen db%-Satz.',fields:[['Neuer db',35,'€'],['Neuer db%',38.89,'%']],tolerance:0.05,solution:'db = 90 − 55 = 35 €. db% = 35/90 · 100 ≈ 38,89 %.'},
    t24:{lesson:'l6',type:'freeText',afb:3,xp:50,prompt:'Die monatlichen Fixkosten steigen um 8 %, Preis und variable Stückkosten bleiben gleich. Erklären Sie die Auswirkungen auf Stückdeckungsbeitrag und Betriebsergebnis.',placeholder:'Trennen Sie die Wirkung auf db und auf den Gewinn.',solution:'Der Stückdeckungsbeitrag bleibt unverändert, weil db = e − kᵥ ist. Bei unverändertem Gesamtdeckungsbeitrag sinkt jedoch das Betriebsergebnis, weil höhere Fixkosten abgezogen werden müssen.'},
    t25:{lesson:'l7',type:'order',afb:1,xp:20,prompt:'Bringen Sie die Schritte der Deckungsbeitragsrechnung bei mehreren Produkten in die richtige Reihenfolge.',items:['Stückdeckungsbeitrag je Produkt berechnen: db = e − kᵥ','Deckungsbeitrag je Produkt berechnen: DB = db · x','Gesamtdeckungsbeitrag als Summe aller DB bilden','Fixkosten vom Gesamtdeckungsbeitrag abziehen'],startOrder:[2,0,3,1],answer:[0,1,2,3],solution:'1. db je Produkt, 2. DB je Produkt, 3. alle DB addieren, 4. Fixkosten abziehen.'},
    t26:{lesson:'l7',type:'numeric',afb:2,xp:35,prompt:'db = 28 € und Absatzmenge = 850 Stück. Wie hoch ist der Periodendeckungsbeitrag?',answer:23800,tolerance:0.01,unit:'€',solution:'DB = 28 · 850 = 23.800 €.'},
    t27:{lesson:'l7',type:'multiNumeric',afb:2,xp:35,prompt:'Preis 76 €, kᵥ 44 €, Absatz 900 Stück, Fixkosten 20.000 €. Berechnen Sie db, DB und Betriebsergebnis.',fields:[['db',32,'€'],['DB',28800,'€'],['Betriebsergebnis',8800,'€']],solution:'db = 32 €. DB = 32 · 900 = 28.800 €. G = 28.800 − 20.000 = 8.800 €.'},
    t28:{lesson:'l7',type:'freeText',afb:3,xp:50,prompt:'Erklären Sie, warum bei DB = Kf genau die Gewinnschwelle erreicht ist.',placeholder:'Beziehen Sie die Formel für das Betriebsergebnis ein.',solution:'Das Betriebsergebnis lautet G = DB − Kf. Wenn DB genau so hoch wie Kf ist, ergibt sich G = 0. Es liegt weder Gewinn noch Verlust vor; damit ist die Gewinnschwelle erreicht.'},
    t29:{lesson:'l8',type:'numeric',afb:1,xp:20,prompt:'Produkt A: db = 24 €, Absatz 500 Stück. Wie hoch ist der Gesamtdeckungsbeitrag des Produkts?',answer:12000,tolerance:0.01,unit:'€',solution:'DB = 24 · 500 = 12.000 €.'},
    t30:{lesson:'l8',type:'multiNumeric',afb:2,xp:35,prompt:'Drei Produkte erzielen DB von 16.000 €, 14.400 € und 14.100 €. Die Fixkosten betragen 31.000 €. Berechnen Sie DB gesamt und Betriebsergebnis.',fields:[['DB gesamt',44500,'€'],['Betriebsergebnis',13500,'€']],solution:'DB gesamt = 44.500 €. Betriebsergebnis = 44.500 − 31.000 = 13.500 €.'},
    t31:{lesson:'l8',type:'single',afb:2,xp:35,prompt:'Produkt A hat db = 30 € bei 200 Stück. Produkt B hat db = 18 € bei 500 Stück. Welches Produkt erzielt den höheren Gesamtdeckungsbeitrag?',options:['Produkt A','Produkt B','Beide gleich','Nicht bestimmbar'],answer:1,solution:'A: 30 · 200 = 6.000 €. B: 18 · 500 = 9.000 €. Produkt B hat trotz niedrigerem db den höheren DB.'},
    t32:{lesson:'l8',type:'freeText',afb:3,xp:50,prompt:'Ein Produkt mit positivem Gesamtdeckungsbeitrag soll gestrichen werden. Die Fixkosten bleiben unverändert. Erklären Sie die unmittelbare Wirkung auf das Betriebsergebnis.',placeholder:'Beschreiben Sie die Veränderung des Gesamt-DB und des Ergebnisses.',solution:'Der positive Deckungsbeitrag des gestrichenen Produkts entfällt. Bleiben die Fixkosten unverändert, sinkt das Betriebsergebnis genau um diesen entfallenden Deckungsbeitrag.'},
    t33:{lesson:'l9',type:'single',afb:1,xp:20,prompt:'Welche Formel bestimmt bei proportionalen variablen Kosten die variablen Stückkosten aus zwei Gesamtkostenwerten?',options:['(K₂ − K₁) / (x₂ − x₁)','K₂ / x₁','(x₂ − x₁) / (K₂ − K₁)','K₁ + K₂'],answer:0,solution:'kᵥ = (K₂ − K₁) / (x₂ − x₁).'},
    t34:{lesson:'l9',type:'multiNumeric',afb:2,xp:35,prompt:'Bei 700 Stück betragen die Gesamtkosten 25.400 €, bei 1.000 Stück 31.100 €. Ermitteln Sie kᵥ und Kf.',fields:[['kᵥ',19,'€/Stück'],['Kf',12100,'€']],solution:'kᵥ = (31.100−25.400)/(1.000−700) = 5.700/300 = 19 €. Kf = 25.400 − 19·700 = 12.100 €.'},
    t35:{lesson:'l9',type:'multiNumeric',afb:2,xp:35,prompt:'Maximale Kapazität: 2.500 Stück. Bei 72 % Auslastung entstehen 39.600 € Gesamtkosten, bei 88 % Auslastung 44.400 €. Ermitteln Sie kᵥ und Kf.',fields:[['kᵥ',12,'€/Stück'],['Kf',18000,'€']],solution:'72 % = 1.800 Stück, 88 % = 2.200 Stück. kᵥ = 4.800/400 = 12 €. Kf = 39.600 − 12·1.800 = 18.000 €.'},
    t36:{lesson:'l9',type:'freeText',afb:3,xp:50,prompt:'Begründen Sie, warum die Kostenauflösung aus zwei Punkten die Annahme proportionaler variabler Kosten benötigt.',placeholder:'Erläutern Sie die Bedeutung einer konstanten Steigung.',solution:'Nur bei proportionalen variablen Kosten ist die Steigung der Gesamtkostenfunktion konstant. Dann kann die Kostendifferenz je Mengendifferenz als konstante variable Stückkosten interpretiert werden. Bei nichtlinearem Verlauf wäre die Rate zwischen zwei Punkten nicht allgemein gültig.'},
    t37:{lesson:'l10',type:'numeric',afb:1,xp:20,prompt:'Kf = 15.000 €, kᵥ = 18 €, x = 700. Wie hoch sind die Gesamtkosten?',answer:27600,tolerance:0.01,unit:'€',solution:'KG = 15.000 + 18 · 700 = 27.600 €.'},
    t38:{lesson:'l10',type:'numeric',afb:2,xp:35,prompt:'Kapazität 1.200 Stück, tatsächliche Produktion 900 Stück. Wie hoch ist der Beschäftigungsgrad?',answer:75,tolerance:0.01,unit:'%',solution:'BG = 900/1.200 · 100 = 75 %.'},
    t39:{lesson:'l10',type:'multiNumeric',afb:2,xp:35,prompt:'Kapazität 1.500 Stück, Beschäftigungsgrad 80 %, Kf 24.000 €, kᵥ 16 €. Bestimmen Sie Produktionsmenge und Gesamtkosten.',fields:[['Produktionsmenge',1200,'Stück'],['Gesamtkosten',43200,'€']],solution:'x = 1.500 · 0,80 = 1.200 Stück. KG = 24.000 + 16·1.200 = 43.200 €.'},
    t40:{lesson:'l10',type:'freeText',afb:3,xp:50,prompt:'Interpretieren Sie einen Beschäftigungsgrad von 62,5 % in einem Satz und nennen Sie, was die restlichen 37,5 % bedeuten.',placeholder:'Formulieren Sie betriebswirtschaftlich.',solution:'62,5 % der maximal möglichen Ausbringungsmenge werden genutzt. 37,5 % der Kapazität bleiben ungenutzt bzw. stehen noch als freie Kapazität zur Verfügung.'},
    t41:{lesson:'l11',type:'numeric',afb:1,xp:20,prompt:'Fixkosten 9.600 €, Preis 64 €, kᵥ 40 €. Berechnen Sie die Break-even-Menge.',answer:400,tolerance:0.01,unit:'Stück',solution:'db = 64−40 = 24 €. xBE = 9.600/24 = 400 Stück. Bei genau 400 Stück gilt G = 0.'},
    t42:{lesson:'l11',type:'numeric',afb:2,xp:35,prompt:'Fixkosten 11.200 €, db = 27 €. Ab wie vielen ganzen Stück wird Gewinn erzielt?',answer:415,tolerance:0.01,unit:'Stück',solution:'xBE = 11.200/27 ≈ 414,81. Da nur ganze Stück verkauft werden, wird ab 415 Stück Gewinn erzielt.'},
    t43:{lesson:'l11',type:'truefalse',afb:2,xp:35,prompt:'Liegt die Break-even-Menge exakt bei 300 Stück, entsteht bereits beim Verkauf des 300. Stücks Gewinn.',answer:false,solution:'Falsch. Bei 300 Stück gilt G = 0. Gewinn entsteht erst ab 301 Stück.'},
    t44:{lesson:'l11',type:'freeText',afb:3,xp:50,prompt:'Erklären Sie die Wirkung einer Preissenkung auf Stückdeckungsbeitrag und Break-even-Menge, wenn alle Kosten unverändert bleiben.',placeholder:'Beschreiben Sie die Wirkungskette.',solution:'Ein niedrigerer Verkaufspreis senkt bei konstantem kᵥ den Stückdeckungsbeitrag. Da xBE = Kf/db gilt, führt ein kleinerer db zu einer höheren Break-even-Menge. Es müssen also mehr Stück verkauft werden, um die Fixkosten zu decken.'},
    t45:{lesson:'l12',type:'multiNumeric',afb:1,xp:20,prompt:'20 % von 12.000 € monatlichen Fixkosten entfallen auf ein neues Produkt. Wie hoch sind die zurechenbaren Fixkosten pro Monat und pro Jahr?',fields:[['Monat',2400,'€'],['Jahr',28800,'€']],solution:'Monat: 12.000 · 0,20 = 2.400 €. Jahr: 2.400 · 12 = 28.800 €.'},
    t46:{lesson:'l12',type:'multiNumeric',afb:2,xp:35,prompt:'Ein Produkt kostet 2,95 € je 500 g. Pflückkosten: 18 € je 12 kg. Sonstige variable Kosten: 2,40 €/kg. Fixkosten: 2.500 €. Berechnen Sie Verkaufspreis je kg, kᵥ je kg und Break-even-Menge.',fields:[['Preis je kg',5.90,'€/kg'],['kᵥ je kg',3.90,'€/kg'],['Break-even-Menge',1250,'kg']],tolerance:0.02,solution:'Preis: 2,95/0,5 = 5,90 €/kg. Pflücken: 18/12 = 1,50 €/kg. kᵥ = 1,50+2,40 = 3,90 €/kg. db = 2,00 €/kg. xBE = 2.500/2,00 = 1.250 kg.'},
    t47:{lesson:'l12',type:'numeric',afb:2,xp:35,prompt:'Fixkosten 14.400 €, gewünschte Break-even-Menge 600 Stück, kᵥ = 38 €. Welcher Verkaufspreis ist erforderlich?',answer:62,tolerance:0.01,unit:'€/Stück',solution:'e = 14.400/600 + 38 = 24 + 38 = 62 €/Stück.'},
    t48:{lesson:'l12',type:'freeText',afb:3,xp:50,prompt:'Beschreiben Sie anhand eines Break-even-Diagramms, was am Schnittpunkt von Erlös- und Gesamtkostenfunktion gilt und wie sich Verlust- und Gewinnzone dazu verhalten.',placeholder:'Beschreiben Sie Schnittpunkt, Gewinn und die beiden Zonen.',solution:'Am Schnittpunkt gilt E = KG und damit G = 0. Links bzw. unterhalb der Break-even-Menge liegen die Gesamtkosten über den Erlösen: Verlustzone. Rechts bzw. oberhalb liegen die Erlöse über den Gesamtkosten: Gewinnzone.'},

    b1:{lesson:'l2',type:'classify',bonus:true,afb:2,xp:70,prompt:'Bonus: Ordnen Sie die Kostenbestandteile eines Liefervertrags.',items:[['Monatliche Grundgebühr des Kurierdienstes','fix'],['1,20 € pro verschicktem Paket','variabel'],['Jahresversicherung des Lagers','fix'],['Etikett je ausgeliefertem Paket','variabel']],categories:[['fix','Fix'],['variabel','Variabel']],solution:'Grundgebühr und Jahresversicherung sind fix; Paketgebühr und Etiketten sind variabel.'},
    b2:{lesson:'l4',type:'freeText',bonus:true,afb:3,xp:80,prompt:'Bonus: RideLab hat freie Kapazität. Ein Sonderkunde bietet einen Preis, der unter den Selbstkosten, aber über den variablen Stückkosten liegt. Formulieren Sie zwei Bedingungen, unter denen der Auftrag kurzfristig sinnvoll sein kann.',placeholder:'Nennen Sie zwei Bedingungen und begründen Sie kurz.',solution:'Mögliche Bedingungen: Es bestehen freie Kapazitäten; der angebotene Preis liegt über den variablen Stückkosten, sodass ein positiver Deckungsbeitrag entsteht; die Fixkosten fallen kurzfristig ohnehin an. Langfristig müsste trotzdem geprüft werden, ob die gesamten Kosten gedeckt werden.'},
    b3:{lesson:'l6',type:'multiNumeric',bonus:true,afb:2,xp:70,prompt:'Bonus: Bruttolistenpreis 142,80 € inkl. 19 % USt. Der gewünschte db beträgt 35 % des Nettoverkaufspreises. Bestimmen Sie Nettopreis und maximale variable Stückkosten.',fields:[['Nettopreis',120,'€'],['Max. kᵥ',78,'€']],tolerance:0.02,solution:'Netto = 142,80/1,19 = 120 €. Variable Kostenanteil = 65 %. kᵥ = 120·0,65 = 78 €.'},
    b4:{lesson:'l8',type:'multiNumeric',bonus:true,afb:3,xp:80,prompt:'Bonus: Produkt X hat db 26 € bei 300 Stück, Produkt Y db 18 € bei 700 Stück. Fixkosten 15.000 €. Berechnen Sie DB gesamt und Betriebsergebnis. Beurteilen Sie außerdem, welches Produkt den größeren Gesamtbeitrag liefert.',fields:[['DB gesamt',20400,'€'],['Betriebsergebnis',5400,'€']],solution:'X: 26·300 = 7.800 €. Y: 18·700 = 12.600 €. DB gesamt = 20.400 €, G = 5.400 €. Produkt Y liefert wegen der höheren Menge den größeren Gesamtdeckungsbeitrag.'},
    b5:{lesson:'l10',type:'multiNumeric',bonus:true,afb:3,xp:80,prompt:'Bonus: Verfahren A: K(x)=18.000+14x. Verfahren B: K(x)=30.000+8x. Bestimmen Sie die Übergangsmenge und die Gesamtkosten an diesem Punkt.',fields:[['Übergangsmenge',2000,'Stück'],['Gesamtkosten',46000,'€']],solution:'18.000+14x = 30.000+8x → 6x = 12.000 → x = 2.000. Kosten: 18.000+14·2.000 = 46.000 €.'},
    b6:{lesson:'l12',type:'multiNumeric',bonus:true,afb:3,xp:90,prompt:'Finale Bonusmission: Bei 1.000 Stück entstehen 48.000 € Gesamtkosten, bei 1.500 Stück 58.000 €. Der Verkaufspreis beträgt 52 €. Bestimmen Sie kᵥ, Kf und die Break-even-Menge.',fields:[['kᵥ',20,'€/Stück'],['Kf',28000,'€'],['Break-even-Menge',875,'Stück']],solution:'kᵥ = (58.000−48.000)/(1.500−1.000)=20 €. Kf = 48.000−20·1.000=28.000 €. db = 52−20=32 €. xBE = 28.000/32 = 875 Stück.'}
  },
  shop: [
    {id:'theme-sunset',kind:'theme',name:'Sunset-Theme',icon:'🌇',require:250,css:'theme-sunset',description:'Warme Orange- und Rosétöne.'},
    {id:'avatar-analyst',kind:'avatar',name:'Controlling-Analyst',icon:'🧑‍💼',require:400,description:'Ein neuer Avatar für Ihr Profil.'},
    {id:'pet-fox',kind:'pet',name:'Fuchs „Kivi“',icon:'🦊',require:650,description:'Ihr Begleiter im Kurs.'},
    {id:'theme-forest',kind:'theme',name:'Forest-Theme',icon:'🌲',require:850,css:'theme-forest',description:'Ruhige Grün- und Naturtöne.'},
    {id:'avatar-tech',kind:'avatar',name:'Tech-Controller',icon:'🧑‍💻',require:1100,description:'Für Zahlen und Systeme.'},
    {id:'pet-bot',kind:'pet',name:'DB-Bot',icon:'🤖',require:1400,description:'Ein kleiner Controlling-Roboter.'},
    {id:'theme-night',kind:'theme',name:'Night-Theme',icon:'🌙',require:1700,css:'theme-night',description:'Dunkle Oberfläche mit klaren Kontrasten.'},
    {id:'avatar-hero',kind:'avatar',name:'Break-even-Hero',icon:'🦸',require:2100,description:'Der finale Avatar für Kursprofis.'}
  ],
  badges: [
    {id:'first',name:'Erster Schritt',icon:'🌱',test:p=>p.completedCount>=1},
    {id:'ten',name:'Zehner-Serie',icon:'🔟',test:p=>p.completedCount>=10},
    {id:'half',name:'Halbzeit',icon:'🧭',test:p=>p.completedCount>=24},
    {id:'all',name:'DB-Profi',icon:'🏆',test:p=>p.completedCount>=48},
    {id:'bonus',name:'Bonusjäger',icon:'💎',test:p=>p.bonusCount>=3}
  ]
};
