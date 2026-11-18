/**
 * Texty prezentace KBP. Sazba čte tento soubor a slova odjinud nebere.
 *
 * Korektura v novém chatu, jeden řádek na pole:
 *   03 / titulek: nové znění
 *   03 / text: nové znění
 *   08 / karty: celé nové pole karet
 *
 * Pole slidu: kicker, titulek, text, poznamka, zaver, podpis, znacky, sloupce, materialy, karty.
 * materialy: titulek, puvodni { url, popisek }, navrh { nahled, soubor, popisek }.
 * Karta: kicker, titulek, text, klic, oblast a buňky podle klíče sloupce.
 * klic se na slidu neukazuje. Určuje místo v diagramu, proto ho při úpravě textu karty ponech.
 * znacky je seznam oddělený čárkami a používá ho jen slide 03.
 * sloupce používá pohled tabulka. Položka má klic a nazev.
 * U slidu 12 je oblast popisek řádku, buňky jsou puvodni, navrh a prinos.
 * Nový řádek v titulku nebo textu se zapíše jako \n.
 */
window.KBP = {
  chrome: {
    titulek: "KBP — strategická studie brandu a ekosystému",
    znacka: "KBP",
    studie: "Strategická studie brandu a ekosystému",
    vstup: "Prezentace",
    dalsi: "Další slide",
    predchozi: "Předchozí slide",
    cela: "Celá obrazovka",
    sekce: "Sekce prezentace"
  },
  uvod: {
    kicker: "Pavlína Pařízková",
    titulek: "",
    text: "Síla vzniká propojením.",
    odkaz: "Prezentace"
  },
  sekce: [
    { id: "dnes", nazev: "Dnes" },
    { id: "model", nazev: "Model" },
    { id: "firmy", nazev: "Firmy" },
    { id: "znacka", nazev: "Značka" },
    { id: "rozvoj", nazev: "Rozvoj" }
  ],
  slidy: [
    {
      id: "01",
      sekce: "dnes",
      kicker: "Hlavní myšlenka",
      titulek: "Síla vzniká propojením",
      text: "KBP tvoří skupina specializovaných společností. Každá z nich přináší vlastní odbornost, zkušenosti a schopnosti.\nSkupina propojuje čtyři klíčové oblasti: vývoj, výrobu, produkt a trh.\nPrávě prostředí, ve kterém se tyto schopnosti potkávají a vzájemně doplňují, vytváří potenciál celé skupiny.",
      podpis: "Pavlína Pařízková"
    },
    {
      id: "02",
      sekce: "dnes",
      kicker: "Veřejný obraz",
      titulek: "KBP má obsah.\nChybí mu odpověď.",
      text: "Skupina o sobě mluví jako o technologickém koncernu a pojmenovává poslání. Jednoduchá otázka přesto zůstává otevřená: co přesně KBP je?",
      karty: [
        {
          kicker: "Definice na kbp.eu",
          titulek: "Inovativní a technologický koncern pro výzkum, vývoj, výrobu a dodávky technologických a vojenských řešení.",
          text: ""
        },
        {
          kicker: "Poslání",
          titulek: "Ochrana. Důvěra. Bezpečnost.",
          text: ""
        }
      ]
    },
    {
      id: "03",
      sekce: "dnes",
      kicker: "Otázka zvenku",
      titulek: "KBP je mnoho firem.\nProč jsou spolu?",
      text: "Na kariérním webu stojí značky vedle sebe. Jméno na nabídce práce ukazuje, kam inzerát patří. Neukazuje, proč tyto firmy tvoří jeden celek.",
      znacky: "KBP/BO, Aircraft, SOL, KRILL B.P., New Space Technologies, MVVS, KBP INTERNATIONAL",
      karty: [
        { klic: "vyrok", kicker: "Dojem", titulek: "KBP je mnoho firem.", text: "" },
        { klic: "vyrok", kicker: "Chybí", titulek: "Proč právě tyto firmy tvoří jeden celek.", text: "" }
      ]
    },
    {
      id: "04",
      sekce: "model",
      kicker: "Strategický model",
      titulek: "Platforma schopností",
      text: "Takto bych vztahy vysvětlovala. Je to model pro komunikaci, ne popis dnešního organigramu.",
      karty: [
        { klic: "kbp", kicker: "Skupina", titulek: "KBP", text: "Strategie, kapitál, propojení" },
        { klic: "vyvoj", kicker: "Vývoj", titulek: "New Space Technologies", text: "Koncepce a konstrukce" },
        { klic: "vyroba", kicker: "Výroba", titulek: "KBP Machinery", text: "Výroba a integrace" },
        { klic: "produkty", kicker: "Produkty", titulek: "MVVS a KRILL Aircraft", text: "Vlastní značky a výrobky" },
        { klic: "trh", kicker: "Trh", titulek: "KBP INTERNATIONAL", text: "Systém, trh, partner" }
      ]
    },
    {
      id: "05",
      sekce: "model",
      kicker: "Architektura značky",
      titulek: "Dům schopností",
      text: "Každá společnost má vlastní účel, vlastní zákazníky a vlastní identitu. Společný je základ a vztah ke skupině.",
      karty: [
        { klic: "zaklad", kicker: "Společný základ", titulek: "KBP", text: "Strategie, zázemí, kapitál, rozvoj, propojení a důvěra" },
        { klic: "pokoj", kicker: "Vývoj", titulek: "NST", text: "" },
        { klic: "pokoj", kicker: "Pohon", titulek: "MVVS", text: "" },
        { klic: "pokoj", kicker: "Výroba", titulek: "Machinery", text: "" },
        { klic: "pokoj", kicker: "Produkt", titulek: "Aircraft", text: "" },
        { klic: "vystup", kicker: "Když se schopnosti potkají", titulek: "Společné projekty", text: "Zákazník" }
      ]
    },
    {
      id: "06",
      sekce: "model",
      kicker: "Architektura claimů",
      titulek: "Many strengths. One vision.",
      karty: [
        { klic: "vrstva", kicker: "Strategická myšlenka", titulek: "Síla vzniká propojením.", text: "Vnitřní princip" },
        { klic: "vrstva", kicker: "Brandový claim", titulek: "Many strengths. One vision.", text: "Identita KBP" },
        { klic: "vrstva", kicker: "Zákaznická komunikace", titulek: "Propojujeme odbornost, technologie a zkušenosti.", text: "Přínos pro zákazníka" },
        { klic: "master", kicker: "Master brand", titulek: "KBP", text: "Many strengths. One vision.\nMnoho schopností. Jeden společný směr." },
        { klic: "hodnota", kicker: "Zákaznická hodnota", titulek: "Odbornost, která otevírá nové možnosti.", text: "" },
        { klic: "doporuceni", text: "Claim skupiny ponechat jako zastřešující vyjádření identity KBP. Zákaznickou komunikaci stavět na konkrétních schopnostech jednotlivých společností a jejich přínosu pro zákazníka." }
      ]
    },
    {
      id: "07",
      sekce: "firmy",
      kicker: "Čtyři schopnosti",
      titulek: "Co skupina umí rozdělit a znovu spojit",
      text: "Čtyři role vycházejí z veřejných webů firem.",
      poznamka: "Veřejné zdroje: newspacetechnologies.cz, kbp-machinery.com, mvvs.cz, kbp.eu.",
      karty: [
        { kicker: "Vývoj", titulek: "New Space Technologies", text: "Koncepce, konstrukce, výpočty, simulace, dokumentace, testování a příprava výroby." },
        { kicker: "Výroba", titulek: "KBP Machinery", text: "Konstrukce, obrábění, svařování, montáž, elektroinstalace, integrace řízení a servis." },
        { kicker: "Produkt", titulek: "MVVS a KRILL Aircraft", text: "Vlastní značka, vlastní výrobek a vlastní zákazníci. MVVS má historii od roku 1953 a dnes dodává i motory pro UAV." },
        { kicker: "Trh", titulek: "KBP INTERNATIONAL", text: "GRYF, spolupráce s MILKOR a propojení vývojových a výrobních kapacit skupiny." }
      ]
    },
    {
      id: "08",
      sekce: "firmy",
      kicker: "Role ve skupině",
      titulek: "Každá firma odpovídá na jinou otázku",
      text: "Proč existuje, komu slouží a co umí jinak než ostatní.",
      karty: [
        { kicker: "Vývoj a engineering", titulek: "New Space Technologies", text: "Umíme věc vymyslet a technicky ji rozpracovat. Vlastní projekt KALAN otevřel spolupráci na MEANDER." },
        { kicker: "Pohon", titulek: "MVVS", text: "Produktová značka motorů od roku 1953 a zároveň kompetence pro UAV i vývoj podle zadání zákazníka." },
        { kicker: "Letecký produkt", titulek: "KRILL Aircraft", text: "Letecké konstrukce a modelářská letadla. V ekosystému je to produktová kompetence." },
        { kicker: "Výroba a integrace", titulek: "KBP Machinery", text: "Umíme vyrobit a integrovat strojní celek, od konstrukce po uvedení do provozu." },
        { kicker: "Obchodní rozvoj", titulek: "KBP INTERNATIONAL", text: "Business development, zahraniční partneři a system solutions. Roli matky ostatních firem jí nepřipisuji." }
      ]
    },
    {
      id: "09",
      sekce: "firmy",
      kicker: "Zákaznická cesta",
      titulek: "Zákazník přinese problém.\nKBP složí schopnosti.",
      text: "Nemusí přijít s požadavkem na konkrétní firmu. Řekne, jaké řešení potřebuje.",
      karty: [
        { klic: "zakaznik", kicker: "Vstup", titulek: "Zákazník", text: "Problém a potřeba" },
        { klic: "kbp", kicker: "Skupina", titulek: "KBP", text: "Vybere kompetence" },
        { klic: "schopnost", kicker: "Vývoj", titulek: "NST", text: "" },
        { klic: "schopnost", kicker: "Pohon", titulek: "MVVS", text: "" },
        { klic: "schopnost", kicker: "Výroba", titulek: "Kapacity", text: "" },
        { klic: "reseni", kicker: "Výstup", titulek: "Integrované řešení", text: "" },
        { klic: "projekt", kicker: "Projekt", titulek: "KALAN a MEANDER", text: "Vývoj NST otevřel spolupráci s EXCALIBUR ARMY na obojživelném vozidle MEANDER." },
        { klic: "projekt", kicker: "Projekt", titulek: "GRYF", text: "KBP INTERNATIONAL spojuje vývojové a výrobní kapacity skupiny s partnery." },
        { klic: "overit", kicker: "Role k ověření", titulek: "SOL, BO, KRILL B.P. a další značky z kariérního webu", text: "Logo na inzerátu beru jako jméno k ověření. Před architekturou značky zjistím, kdo vstupuje do společných obchodů a kdo je vlastnická nebo podpůrná struktura." }
      ]
    },
    {
      id: "10",
      sekce: "znacka",
      kicker: "Archetyp",
      titulek: "Tvůrce, který má sílu Vládce a rozum Mudrce.",
      text: "Navenek komunikuji Tvůrce. Jeho věta zní: dokážeme z toho něco vytvořit.",
      karty: [
        { kicker: "Primární", titulek: "Tvůrce", text: "Vyvíjet, konstruovat, vyrábět, zkoušet a zdokonalovat." },
        { kicker: "Sekundární", titulek: "Vládce", text: "Dát věcem strukturu, zdroje a odpovědnost, aby řešení vzniklo a udrželo se." },
        { kicker: "Třetí vrstva", titulek: "Mudrc", text: "Know-how, přesnost a schopnost řešit složité zadání." }
      ]
    },
    {
      id: "11",
      sekce: "znacka",
      kicker: "Princip značky",
      titulek: "Specialisté, které KBP umí spojit.",
      text: "Některé věci vytvoří jeden tým. Složitější vzniknou propojením odborností. KBP je prostředí, ve kterém se tyto schopnosti mohou potkat.",
      karty: [
        { kicker: "01", titulek: "Společný význam", text: "Propojujeme specializované schopnosti, aby vzniklo řešení, které jedna společnost sama nenabídne." },
        { kicker: "02", titulek: "Společný charakter", text: "Technologický, kompetentní, spolehlivý, odvážný a praktický." },
        { kicker: "03", titulek: "Způsob komunikace", text: "Skupina mluví o schopnosti. Firma o svém řešení. Projekt o tom, co vzniklo spojením." },
        { kicker: "04", titulek: "Vizuální DNA", text: "Jasná příslušnost ke KBP a samostatná identita společnosti. Společná pravidla platí pro společné projekty." },
        { kicker: "05", titulek: "Obchodní logika", text: "Firma má svého zákazníka a svou nabídku. KBP má příležitost, ve které kompetence spojí." }
      ]
    },
    {
      id: "12",
      sekce: "rozvoj",
      kicker: "Dva články",
      titulek: "Obchodní přínos",
      text: "Ověření na příkladech GRYF a MILKOR. Podklady otevřete odkazem pod názvem článku.",
      materialy: [
        {
          titulek: "GRYF",
          puvodni: {
            popisek: "Původní na webu",
            url: "https://www.kbp.eu/post/kbp-international-p%C5%99edstavuje-nov%C3%BD-bezpilotn%C3%AD-prost%C5%99edek-gryf-pro-modern%C3%AD-protivzdu%C5%A1nou-obranu"
          },
          navrh: {
            popisek: "Návrh — náhled",
            nahled: "clanky/gryf.html",
            soubor: "KBP INTERNATIONAL představuje GRYF.docx"
          }
        },
        {
          titulek: "MILKOR",
          puvodni: {
            popisek: "Původní na webu",
            url: "https://www.kbp.eu/post/kbp-international-a-milkor-roz%C5%A1i%C5%99uj%C3%AD-spolupr%C3%A1ci-v-oblasti-bezpilotn%C3%ADch-syst%C3%A9m%C5%AF-a-obrann%C3%BDch-technolog"
          },
          navrh: {
            popisek: "Návrh — náhled",
            nahled: "clanky/milkor.html",
            soubor: "KBP INTERNATIONAL a MILKOR rozvíjejí partnerství.docx"
          }
        }
      ],
      sloupce: [
        { klic: "puvodni", nazev: "Původní článek" },
        { klic: "navrh", nazev: "Navržený článek" },
        { klic: "prinos", nazev: "Obchodní přínos" }
      ],
      karty: [
        { oblast: "Hlavní sdělení", puvodni: "Informují o produktu nebo partnerství.", navrh: "Ukazují i místo ve směřování skupiny.", prinos: "Obraz KBP jako technologické skupiny." },
        { oblast: "KBP INTERNATIONAL", puvodni: "Představí projekt a spolupráci.", navrh: "Rozvíjí obchody a zahraniční partnerství.", prinos: "Posiluje pozici a důvěru partnerů." },
        { oblast: "Skupina KBP", puvodni: "Zmíněna hlavně jako zastřešující subjekt.", navrh: "Ukazuje vývojové a výrobní schopnosti.", prinos: "Otevírá prostor pro další zakázky." },
        { oblast: "Propojení společností", puvodni: "Vazby mezi subjekty nejsou vždy zřejmé.", navrh: "Kompetence se potkají na projektu.", prinos: "Podporuje synergie a využití kapacit." },
        { oblast: "Produkt a partnerství", puvodni: "Důraz na popis produktu nebo dohody.", navrh: "Zasazeno do obchodního kontextu.", prinos: "Pro zákazníky, partnery i investory." },
        { oblast: "Budoucí rozvoj", puvodni: "Příležitosti jsou spíš doplněk textu.", navrh: "Vazba na výrobu, technologie a vztahy.", prinos: "Podporuje nové kontakty a projekty." },
        { oblast: "Jazyk a tón", puvodni: "Převážně informační a popisný.", navrh: "Sebevědomě: schopnosti a příležitosti.", prinos: "Zapamatovatelnější obraz značky." },
        { oblast: "Představení skupiny", puvodni: "Počty lidí, obrat a obecná činnost.", navrh: "Co skupina umí a jakou hodnotu přináší.", prinos: "Partner lépe vidí potenciál spolupráce." }
      ],
      zaver: "Očekávaný dopad budeme sledovat na poptávkách, kontaktech, obchodních jednáních a návštěvnosti."
    },
    {
      id: "13",
      sekce: "rozvoj",
      kicker: "Přínos pro skupinu",
      titulek: "Od informování k obchodu",
      karty: [
        { kicker: "01", titulek: "Zviditelnění firem", text: "Jednotlivé společnosti získávají prostor představit své schopnosti, technologie a konkrétní řešení." },
        { kicker: "02", titulek: "Značka skupiny", text: "Každá komunikace posiluje povědomí o KBP a jeho propojeném ekosystému." },
        { kicker: "03", titulek: "Obchodní příležitosti", text: "Srozumitelná komunikace pomáhá zákazníkům rozpoznat relevantní schopnosti a možnosti spolupráce." },
        { kicker: "04", titulek: "Nové projekty", text: "Propojení odborností vytváří prostor pro další spolupráci a nové obchodní příležitosti." }
      ],
      zaver: "Článek je součást obchodní komunikace, ne jen oznámení."
    },
    {
      id: "14",
      sekce: "rozvoj",
      kicker: "Jak komunikace pomáhá",
      titulek: "Brand a obchod",
      karty: [
        { kicker: "01", titulek: "Značka", text: "Jasná identita a srozumitelná pozice skupiny." },
        { kicker: "02", titulek: "Jednotná komunikace", text: "Konzistentní předávání informací napříč společnostmi." },
        { kicker: "03", titulek: "Důvěryhodnost", text: "Opakovaná a srozumitelná komunikace buduje důvěru zákazníků a partnerů." },
        { kicker: "04", titulek: "Příležitosti", text: "Důvěra a znalost schopností skupiny usnadňují vznik nových obchodních jednání." },
        { klic: "radek", kicker: "GRYF", titulek: "Komunikační úloha: představit konkrétní řešení a jeho schopnosti.", text: "Obchodní přínos: podpořit zájem o řešení a navazující jednání." },
        { klic: "radek", kicker: "MILKOR", titulek: "Komunikační úloha: představit produkt, technologii a možnosti spolupráce.", text: "Obchodní přínos: posílit důvěru a otevřít prostor pro nové obchodní příležitosti." }
      ]
    },
    {
      id: "15",
      sekce: "rozvoj",
      kicker: "Další postup",
      titulek: "Etapy rozvoje",
      sloupce: [
        { klic: "etapa", nazev: "Etapa" },
        { klic: "zamereni", nazev: "Zaměření" },
        { klic: "vysledek", nazev: "Výsledek" }
      ],
      karty: [
        { etapa: "Strategické ukotvení", zamereni: "Identita, pozice skupiny a role značek.", vysledek: "Je jasné, kdo je KBP a kam firmy patří." },
        { etapa: "Komunikační systém", zamereni: "Sdělení, tón a pravidla pro web a PR.", vysledek: "Skupina mluví srozumitelně a stejně." },
        { etapa: "Obchodní podpora", zamereni: "Kompetence, reference a materiály pro obchod.", vysledek: "Obchod má podklady pro jednání." },
        { etapa: "Budování reputace", zamereni: "Odborný obsah, prezentace, partneři a média.", vysledek: "Silnější důvěra a pozice na trhu." },
        { etapa: "Dlouhodobý rozvoj", zamereni: "Vyhodnocení, příležitosti a společné projekty.", vysledek: "Brand je součást obchodního růstu." }
      ],
      zaver: "Silná značka nevytváří obchod za obchodní tým. Vytváří prostředí, ve kterém se obchodní příležitosti lépe otevírají, vysvětlují a rozvíjejí."
    },
    {
      id: "16",
      sekce: "rozvoj",
      titulek: "Děkuji za pozornost",
      podpis: "Pavlína Pařízková"
    }
  ]
};
