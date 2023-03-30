import axios from 'axios';
import { writeFileSync } from 'fs';

const requestUrl = 'https://unknow.news/archiwum.json';
const outputFile = 'mrugalski';

interface MrugalskiResponseItem {
  title: string;
  url: string;
  info: string;
  date: string;
}

async function getArchive(): Promise<MrugalskiResponseItem[]> {
  return axios
    .get<MrugalskiResponseItem[]>(requestUrl)
    .then((response) => response.data);
}

function itemToMd(index: number, item: MrugalskiResponseItem): string {
  return `### ${index + 1}. ${item.title}\n
[${item.url}](${item.url})

${item.info}

`;
}

function groupToMd(date: string, items: MrugalskiResponseItem[]): string {
  return `## ${date}\n
${items.map((item, index) => itemToMd(index, item)).join('')}`;
}

const itemsData: MrugalskiResponseItem[] = [
  {
    title: 'ChatGPT mo\u017ce namiesza\u0107 w 19% miejsc pracy w USA?',
    url: 'https://www.pcmag.com/news/openai-chatgpt-could-disrupt-19-of-us-jobs-is-yours-on-the-list',
    info: 'INFO: Badacze starali si\u0119 oszacowa\u0107, jaki procent zawod\u00f3w mo\u017ce by\u0107 dotkni\u0119ty (w negatywny spos\u00f3b) przez wp\u0142yw sztucznej inteligencji. Nie wygl\u0105da to dobrze, ale s\u0105 to tylko szacunki. Nie podano metodologii bada\u0144. Co ciekawe, na li\u015bcie najbardziej zagro\u017conych zawod\u00f3w mamy ca\u0142y przekr\u00f3j specjalist\u00f3w, a nie tylko najprostsze stanowiska',
    date: '2023-03-24',
  },
  {
    title:
      'Historia Visual Basica i jego wp\u0142yw na obecny \u015bwiat programowania',
    url: 'https://retool.com/visual-basic/',
    info: 'INFO: Visual Basic by\u0142 rewolucyjnym rozwi\u0105zaniem, kt\u00f3re zdominowa\u0142o rynek programistyczny. Co si\u0119 sta\u0142o, \u017ce spad\u0142 on z podium? Jaki wp\u0142yw na \u015bwiat programistyczny mia\u0142 ten j\u0119zyk i jaki nadal ma? Ciekawy artyku\u0142 przeplatany kr\u00f3tkimi, historycznymi filmami. Niez\u0142y powiew nostalgii.',
    date: '2023-03-24',
  },
  {
    title:
      'Czy AI zast\u0105pi frontendowc\u00f3w? - do\u015b\u0107 d\u0142ugie przemy\u015blenia',
    url: 'https://www.joshwcomeau.com/blog/the-end-of-frontend-development/',
    info: 'INFO: GPT-3 \u015bwietnie radzi\u0142 sobie z generowaniem kodu frontendowego. Jego nast\u0119pc\u0105 (GPT-4) robi to rewelacyjnie. Czy frontendowcy s\u0105 pierwsz\u0105 grup\u0105 programist\u00f3w nara\u017con\u0105 na zast\u0105pienie przez sztuczn\u0105 inteligencj\u0119? Autor twierdzi, \u017ce to ma\u0142o prawdopodobne i ma na poparcie tej tezy pewne argumenty.',
    date: '2023-03-24',
  },
  {
    title: 'Microsoft Loop - nadchodzi mocny konkurent dla Notion',
    url: 'https://loop.microsoft.com/learn',
    info: 'INFO: Microsoft stworzy\u0142 narz\u0119dzie \u0142udz\u0105co podobne w wygl\u0105dzie i dzia\u0142aniu do Notion, ale mocno wspierane sztuczn\u0105 inteligencj\u0105. Rozwi\u0105zanie aktualnie jest darmowe, ale tw\u00f3rcy planuj\u0105 wprowadzenie op\u0142at - kiedy i jakich, tego nie podano.',
    date: '2023-03-24',
  },
  {
    title: 'Stanford Alpaca namiesza w \u015bwiecie AI?',
    url: 'https://newatlas.com/technology/stanford-alpaca-cheap-gpt/',
    info: 'INFO: Badacze z uniwersytetu Stanford stworzyli model AI podobny w swoim dzia\u0142aniu i skuteczno\u015bci do ChatGPT. To, co jest w tej historii zaskakuj\u0105ce, to fakt, \u017ce da si\u0119 go wytrenowa\u0107 w domu w kilka godzin na jednym mocnym GPU, a ju\u017c wytrenowany model mo\u017ce dzia\u0142a\u0107 nawet z u\u017cyciem zwyk\u0142ego CPU. Istniej\u0105 nawet udane pr\u00f3by odpalenia modelu na Raspberry Pi. Alpaca jest w pe\u0142ni otwarto\u017ar\u00f3d\u0142owa. Ten projekt otwiera drog\u0119 do stworzenia kolejnych niezwykle skutecznych modeli generatywnych i mo\u017ce w pewien spos\u00f3b zagrozi\u0107 monopolowi OpenAI.',
    date: '2023-03-24',
  },
  {
    title:
      'Podmorski \u015bwiat\u0142ow\u00f3d vs samolot z dyskami twardymi - co transportuje dane szybciej?',
    url: 'https://informatykzakladowy.pl/co-jest-szybsze-podmorski-kabel-telekomunikacyjny-czy-an-124-ruslan-wypelniony-dyskami-twardymi/',
    info: "INFO: Pytanie zawarte w tytule mo\u017ce wydawa\u0107 si\u0119 absurdalne, ale odpowied\u017a wcale nie jest taka oczywista i brzmi 'to zale\u017cy'. Ciekawe rozwa\u017cania autora na temat alternatywnych metod przesy\u0142u danych. Wrzucam jako ciekawostk\u0119, bo ta wiedza raczej nie ma praktycznego zastosowania ;)",
    date: '2023-03-24',
  },
  {
    title:
      'Routing i Firewalle w godzin\u0119 - skondensowany kurs dla amdin\u00f3w i devops\u00f3w [autopromocja]',
    url: 'https://firewalle.mikr.us/',
    info: 'INFO: Dowiedz si\u0119, jak dzia\u0142a sie\u0107 w Linuksie, jak pakiety docieraj\u0105 do docelowych komputer\u00f3w, czym jest ARP, routing i jak poprawnie ustawi\u0107 firewall (iptables, nftables, shorewall i UFW).',
    date: '2023-03-24',
  },
  {
    title:
      "GitHub wprowadzi\u0142 automatyczne wykrywanie 'wyciekni\u0119tych sekret\u00f3w'",
    url: 'https://github.blog/2023-02-28-secret-scanning-alerts-are-now-available-and-free-for-all-public-repositories/',
    info: 'INFO: Programi\u015bci niekiedy wrzucaj\u0105 do repozytorium swoje klucze dost\u0119powe do API, loginy, has\u0142a itp. GitHub postanowi\u0142 pom\u00f3c w rozwi\u0105zaniu tego problemu, automatycznie wykrywaj\u0105c takie wpadki (w publicznych repozytoriach) i informuj\u0105c o tym ich w\u0142a\u015bcicieli.',
    date: '2023-03-24',
  },
  {
    title: 'Czas spowolni\u0107 rozw\u00f3j AI?',
    url: 'https://www.vox.com/the-highlight/23621198/artificial-intelligence-chatgpt-openai-existential-risk-china-ai-safety-technology',
    info: 'INFO: Sztuczna inteligencja rozwija si\u0119 z zawrotn\u0105 pr\u0119dko\u015bci\u0105. Tylko, czy to aby na pewno dobra wiadomo\u015b\u0107? D\u0142u\u017csze przemy\u015blenia na temat tego, co aktualnie dzieje si\u0119 w \u015bwiecie AI i jakie niesie to zagro\u017cenia.',
    date: '2023-03-24',
  },
  {
    title: 'Jak przetwarza\u0107 ogromne, wielogigabajtowe pliki JSON?',
    url: 'https://thenybble.de/posts/json-analysis/',
    info: 'INFO: Problem z tak ogromnymi plikami polega na tym, \u017ce najcz\u0119\u015bciej nie mieszcz\u0105 si\u0119 w RAM-ie, a ich zawarto\u015b\u0107, aby mia\u0142a sens, nie mo\u017ce niekiedy by\u0107 przetwarzana malutkimi porcjami. Jak temu zaradzi\u0107? Odpowied\u017a znajdziesz w artykule.',
    date: '2023-03-24',
  },
  {
    title: 'MySQL dla Developer\u00f3w - darmowy wideo kurs',
    url: 'https://planetscale.com/courses/mysql-for-developers/introduction/course-introduction',
    info: 'INFO: Do\u015b\u0107 rozbudowany kurs wprowadzaj\u0105cy programist\u00f3w w \u015bwiat MySQL. Od konstrukcji tabel, przez tworzenie indeks\u00f3w po budow\u0119 zapyta\u0144. Kurs jest darmowy, ale przewa\u017cnie po ogl\u0105dni\u0119ciu 3-4 dowolnych lekcji wyskakuje popup z pro\u015bb\u0105 o za\u0142o\u017cenie konta w serwisie. Musisz to zrobi\u0107, aby zobaczy\u0107 ca\u0142y kurs. To nic nie kosztuje',
    date: '2023-03-24',
  },
  {
    title: "Atakowanie nag\u0142\u00f3wk\u00f3w HTTP 'hop-by-hop'",
    url: 'https://nathandavison.com/blog/abusing-http-hop-by-hop-request-headers',
    info: 'INFO: Je\u015bli Twoja aplikacja webowa ukryta jest za warstw\u0105 serwer\u00f3w po\u015brednicz\u0105cych, to cz\u0119\u015b\u0107 nag\u0142\u00f3wk\u00f3w HTTP do niej dociera, a cz\u0119\u015b\u0107 interpretowana jest przez wspomniane serwery proxuj\u0105ce. Odpowiednio wykorzystuj\u0105c ten mechanizm, mo\u017cna spr\u00f3bowa\u0107 troch\u0119 namiesza\u0107 w atakowanej aplikacji.',
    date: '2023-03-24',
  },
  {
    title:
      "Kolekcja list 'awesome' dla hacker\u00f3w, pentester\u00f3w i ludzi z security",
    url: 'https://github.com/Hack-with-Github/Awesome-Hacking',
    info: "INFO: Czym s\u0105 listy 'awesome' z GitHuba, to chyba nikomu nie musz\u0119 t\u0142umaczy\u0107. Jest ich jednak naprawd\u0119 WIELE. Kto\u015b skomponowa\u0142 sk\u0142adaj\u0105c\u0105 si\u0119 z dziesi\u0105tek element\u00f3w 'list\u0119 list'. Regularnie \u015bledz\u0119 nowinki z list 'awesome', ale przyznam, \u017ce wielu z nich nigdy nie widzia\u0142em.",
    date: '2023-03-24',
  },
  {
    title:
      'aCropalypse - czyli bug w Pixelowym narz\u0119dziu do screenshot\u00f3w',
    url: 'https://www.engadget.com/google-pixel-vulnerability-allows-bad-actors-to-undo-markup-screenshot-edits-and-redactions-195322267.html',
    info: 'INFO: Podatno\u015bc w Google Pixel (a konkretnie w appce do screenshot\u00f3w) umo\u017cliwia\u0142a "cofni\u0119cie" zmian naniesionych na screenach. Co za tym idzie, je\u017celi robi\u0105c screena, zamazali\u015bmy przy pomocy tego narz\u0119dzia jakie\u015b dane poufne (np. numer karty kredytowej), mo\u017cliwe jest wycofanie tej zmiany i powrotu do orygina\u0142u zdj\u0119cia.',
    date: '2023-03-24',
  },
  {
    title:
      'Kolekcja materia\u0142\u00f3w do egzaminu Azure AZ-900 (Microsoft Azure Fundamentals)',
    url: 'https://github.com/Ditectrev/Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Exam-Questions-Answers',
    info: 'INFO: Nawet je\u015bli nie planujesz zrobi\u0107 certyfikacji z tematyki Azure, to i tak warto zapozna\u0107 si\u0119 z tymi materia\u0142ami. Mog\u0105 przyda\u0107 si\u0119 nie tylko do rozbudowania w\u0142asnej wiedzy, ale tak\u017ce do lepszego przygotowania si\u0119 np. do rozm\u00f3w o prac\u0119, gdzie znajomo\u015b\u0107 Azure jest jednym z wymaga\u0144.',
    date: '2023-03-24',
  },
  {
    title:
      'Por\u00f3wnanie inteligencji GPT-4 vs GPT-3 na przyk\u0142adzie gry w Wordle',
    url: 'https://twitter.com/biz84/status/1637793452879405064',
    info: 'INFO: Kt\u00f3ry model AI lepiej zrozumie zasady wspomnianej gry i sprawniej znajdzie rozwi\u0105zanie? Ciekawe por\u00f3wnanie, kt\u00f3re pozwala zobaczy\u0107 na w\u0142asne oczy r\u00f3\u017cnic\u0119 w poziomie rozumienia, jak\u0105 wprowadza GPT-4.',
    date: '2023-03-24',
  },
  {
    title:
      'Sk\u0142ad ksi\u0105\u017cki w CSS - z podzia\u0142em na strony. Jak to zrobi\u0107?',
    url: 'https://iangmcdowell.com/blog/posts/laying-out-a-book-with-css/',
    info: 'INFO: Ciekawy przyk\u0142ad wykorzystania HTML-a i CSS-a do selfpublishingu. Mo\u017ce nie jest to optymalne rozwi\u0105zanie, ale dzia\u0142a i mo\u017cna si\u0119 z niego nauczy\u0107 troch\u0119 CSS ;)',
    date: '2023-03-24',
  },
  {
    title: "Czarny rynek 'gwiazdek' na GitHubie",
    url: 'https://dagster.io/blog/fake-stars',
    info: 'INFO: Najprostszym wska\u017anikiem popularno\u015bci projektu OpenSource jest liczba gwiazdek na GitHubie. W obecnych czasach jednak kupno takich odznacze\u0144 nie jest \u017cadnym problemem. Jak cz\u0119sty jest to proceder i jak mo\u017cna go wykry\u0107?',
    date: '2023-03-24',
  },
  {
    title: 'Podr\u0119cznik do CSS Grid od FreeCodeCamp',
    url: 'https://www.freecodecamp.org/news/complete-guide-to-css-grid/',
    info: "INFO: Jedno z najbardziej 'kompletnych' wprowadze\u0144 do technologii grid, jakie widzia\u0142em. Artyku\u0142 jest skrajnie d\u0142ugi, ale nie musisz czyta\u0107 go od deski do deski, a mo\u017cesz po prostu uzupe\u0142ni\u0107 brakuj\u0105c\u0105 wiedz\u0119.",
    date: '2023-03-24',
  },
  {
    title: 'Konwerter danych tabelarycznych',
    url: 'https://tableconvert.com/',
    info: 'INFO: Wklejasz dane w jednym z obs\u0142ugiwanych format\u00f3w (np. arkusz z Excela, plik XML, JSON, czy dump z SQL), a nast\u0119pnie przerabiasz je na inny format. Mo\u017cesz np. przerobi\u0107 ogromny arkusz z Excela na inserty do bazy danych (wraz z zaprojektowaniem samych tabel pod te dane). Ciekawe narz\u0119dzie.',
    date: '2023-03-17',
  },
  {
    title: 'Co jest nie tak z Alpine Linux?',
    url: 'https://betterprogramming.pub/why-i-will-never-use-alpine-linux-ever-again-a324fd0cbfd6',
    info: 'INFO: Autor artyku\u0142u wyja\u015bnia, dlaczego dystrybucja Alpine Linux (tak cz\u0119sto u\u017cywana jako bazowa dla obraz\u00f3w kontener\u00f3w) nie jest taka bezproblemowa, jak mog\u0142oby si\u0119 wydawa\u0107. W artykule znajdziesz tak\u017ce odpowied\u017a na pytanie, czego mo\u017cna u\u017cywa\u0107 zamiast Alpine.',
    date: '2023-03-17',
  },
  {
    title: 'GPT-4 b\u0119dzie zupe\u0142nie zamkni\u0119tym oprogramowaniem?',
    url: 'https://www.theverge.com/2023/3/15/23640180/openai-gpt-4-launch-closed-research-ilya-sutskever-interview',
    info: 'INFO: OpenAI mia\u0142o by\u0107 organizacj\u0105 badawcz\u0105. Do tej pory czasami bardziej, czasami mniej ch\u0119tnie dzielili si\u0119 swoimi badaniami i rozwi\u0105zaniami technologicznymi. W przypadku GPT-4 panuje jednak zupe\u0142na cisza. Nie wiadomo nic o metodyce nauki modelu, o danych \u017ar\u00f3d\u0142owych u\u017cytych do jego trenowania (ponownie wraca temat praw autorskich), o wykorzystanej infrastrukturze itd. \u015arodowisko naukowe zwi\u0105zane z tematem sztucznej inteligencji jest tym faktem mocno zaniepokojone. Co jednak my\u015bli o tym sama firma i dlaczego podj\u0119\u0142a tak\u0105 decyzj\u0119? O tym w artykule.',
    date: '2023-03-17',
  },
  {
    title:
      'Jak za pomoc\u0105 Raspberry Pi "doda\u0107" gniazdo HDMI do laptopa',
    url: 'https://pierre-couy.dev/tinkering/2023/03/turning-rpi-into-external-monitor-driver.html',
    info: 'INFO: Tw\u00f3j laptop nie posiada gniazd HDMI lub ma tylko jedno, a koniecznie potrzebujesz wi\u0119cej? Je\u015bli masz pod r\u0119k\u0105 malink\u0119, a do tego Tw\u00f3j sprz\u0119t dzia\u0142a pod kontrol\u0105 Linuksa, to problem mo\u017cna bardzo \u0142atwo rozwi\u0105za\u0107.',
    date: '2023-03-17',
  },
  {
    title:
      'Jak przygotowa\u0107 si\u0119 do rozmowy rekrutacyjnej zwi\u0105zanej z projektowaniem system\u00f3w?',
    url: 'https://interviewing.io/guides/system-design-interview',
    info: 'INFO: Poradnik dla os\u00f3b przygotowuj\u0105cych si\u0119 do rozmowy kwalifikacyjnej na stanowisko in\u017cyniera systemowego. Ten obszerny artyku\u0142 (kilka godzin czytania ze wzgl\u0119du na podrozdzia\u0142y + jakie\u015b 3h film\u00f3w) sk\u0142ada si\u0119 z 4 cz\u0119\u015bci: jak przygotowa\u0107 si\u0119 do rozmowy kwalifikacyjnej, kluczowe poj\u0119cia, tr\u00f3jstopniowy framework do projektowania system\u00f3w oraz studium przypadku projektowania popularnych system\u00f3w.',
    date: '2023-03-17',
  },
  {
    title:
      'Czy warto pracowa\u0107 w technologicznych startupach? I czego mo\u017cna si\u0119 nauczy\u0107, pracuj\u0105c w Stripe?',
    url: 'https://steinkamp.us/post/2022/11/10/what-i-learned-at-stripe.html',
    info: 'INFO: Autor podzieli\u0142 si\u0119 swoimi wnioskami na temat pracy w Stripe. Mimo \u017ce to by\u0142 to kr\u00f3tki okres w jego karierze, to uwa\u017ca, \u017ce przez ponad 20 lat w bran\u017cy nie do\u015bwiadczy\u0142 czego\u015b podobnego, a praca w Stripe by\u0142a wyj\u0105tkowo efektywna i dobrze zorganizowana. Opisuje mi\u0119dzy innymi kultur\u0119 wdzi\u0119czno\u015bci, system przypisywania zada\u0144 (DRI), wysy\u0142anie "Shipped emails" po zako\u0144czeniu projektu, a tak\u017ce kilka innych ciekawych praktyk.',
    date: '2023-03-17',
  },
  {
    title: 'TransformersJS - uruchamiaj modele AI wprost w przegl\u0105darce',
    url: 'https://xenova.github.io/transformers.js/',
    info: 'INFO: Biblioteka do uruchamiania modeli AI w przegl\u0105darce u\u017cytkownika. Za\u0142\u0105czone demo pokazuje jak sprawnie i niezwykle szybko mo\u017ce dzia\u0142a\u0107 takie rozwi\u0105zanie. Oczywi\u015bcie pierwsze uruchomienie modelu b\u0119dzie bardzo wolne (trzeba \u015bci\u0105gn\u0105\u0107 niekiedy kilkaset MB danych!), ale ka\u017cde kolejne jest ju\u017c b\u0142yskawiczne. Testowa\u0142em model do t\u0142umaczenia tekst\u00f3w i dzia\u0142a zaskakuj\u0105co dobrze.',
    date: '2023-03-17',
  },
  {
    title:
      'Modern Font Stacks - kolekcja font\u00f3w preinstalowanych w nowoczesnych systemach',
    url: 'https://modernfontstacks.com/',
    info: 'INFO: Na Arialu, Verdanie i Tahomie \u015bwiat si\u0119 nie ko\u0144czy. Oto kilka dodatkowych font\u00f3w, kt\u00f3rych mo\u017cesz bezpiecznie u\u017cywa\u0107 w swoich aplikacjach, a kt\u00f3re z pewno\u015bci\u0105 b\u0119d\u0105 dzia\u0142a\u0107 poprawnie na wsp\u00f3\u0142czesnych systemach operacyjnych.',
    date: '2023-03-17',
  },
  {
    title: 'Copilot dla Microsoft 365 - nadchodzi nowy asystent',
    url: 'https://blogs.microsoft.com/blog/2023/03/16/introducing-microsoft-365-copilot-your-copilot-for-work/',
    info: 'INFO: Microsoft wprowadzi do swoich produkt\u00f3w nowego asystenta pomagaj\u0105cego w pisaniu tekst\u00f3w, operacjach w arkuszu kalkulacyjnym, a nawet pomagaj\u0105cego lepiej planowa\u0107 dzie\u0144 w kalendarzu, czy tworzy\u0107 slajdy do prezentacji. Us\u0142uga nazywa si\u0119 "Microsoft 365 Copilot" i jak nazwa wskazuje, jej zastosowanie i spos\u00f3b dzia\u0142ania ma by\u0107 skrajnie podobny do Copilota znanego programistom. Czy\u017cby stary, dobry \'spinacz\' mia\u0142 powr\u00f3ci\u0107 w nowej ods\u0142onie? ;)',
    date: '2023-03-17',
  },
];

const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);

async function start() {
  const response = groupBy(itemsData, (i) => i.date);
  const md = Object.keys(response).map((key) => {
    return groupToMd(key, response[key]);
  });
  const totalMd = [
    `# Archiwum Mrugalskiego na dzień ${new Date().toLocaleDateString()}\n\n`,
    ...md,
  ].join('');

  writeFileSync(`${outputFile}.md`, totalMd);
}

async function main() {
  getArchive()
    .then((response) => {
      writeFileSync(`${outputFile}.json`, JSON.stringify(response));
      return response;
    })
    .then((response) => groupBy(response, (item) => item.date))
    .then((groupedResponse) =>
      Object.keys(groupedResponse).map((key) =>
        groupToMd(key, groupedResponse[key])
      )
    )
    .then((responseMd) =>
      [
        `# Archiwum Mrugalskiego na dzień ${new Date().toLocaleDateString()}\n\n`,
        ...responseMd,
      ].join('')
    )
    .then((totalMd) => {
      writeFileSync(`${outputFile}.md`, totalMd);
    });
}

main();
