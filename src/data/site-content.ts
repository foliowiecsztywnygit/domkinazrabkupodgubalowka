const photoExteriorWide = new URL("../../Nowe Bystre - gotowe/DSC07230.jpg", import.meta.url).href;
const photoTerrace = new URL("../../Nowe Bystre - gotowe/DSC07227.jpg", import.meta.url).href;
const photoLivingRoom = new URL("../../Nowe Bystre - gotowe/DSC07067.jpg", import.meta.url).href;
const photoBedroom = new URL("../../Nowe Bystre - gotowe/DSC07088.jpg", import.meta.url).href;
const photoKitchen = new URL("../../Nowe Bystre - gotowe/DSC07165.jpg", import.meta.url).href;
const photoBathroom = new URL("../../Nowe Bystre - gotowe/DSC07149.jpg", import.meta.url).href;
const photoLivingDining = new URL("../../Nowe Bystre - gotowe/DSC07071.jpg", import.meta.url).href;
const galleryModules = import.meta.glob("../../Nowe Bystre - gotowe/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type GalleryPhoto = {
  fileName: string;
  src: string;
  alt: string;
  title: string;
  description: string;
};

type GalleryPhotoMeta = Omit<GalleryPhoto, "fileName" | "src">;

type HeroSlide = {
  src: string;
  alt: string;
};

const createBookingWidgetUrl = ({ header = 1 }: { header?: 0 | 1 } = {}) => {
  const params = new URLSearchParams({
    fh: "68228cb250f36a66ed16139d1a760cbb20a46a37",
    arrival: "2026-06-13",
    departure: "2026-06-15",
    "rooms[0][numberOfGuests]": "2",
    style: JSON.stringify({
      color_accent: "#7b5730",
      color_bg: "#fbf7f0",
    }),
    header: String(header),
    src: "googlehc",
    lang: "pl",
  });

  return `https://roomadmin.pl/widget/reservation-v2/start?${params.toString()}`;
};

const explicitGalleryMeta: Record<string, GalleryPhotoMeta> = {
  "DSC07041.jpg": {
    alt: "Drewniana ściana z archiwalną fotografią i detalami wnętrza",
    title: "Detal drewna i historii",
    description: "Zbliżenie na wypalane drewno i dekoracyjny akcent we wnętrzach domków.",
  },
  "DSC07054.jpg": {
    alt: "Stół jadalniany z kieliszkami i drewnianym tłem",
    title: "Stół w części dziennej",
    description: "Kadr jadalni pokazujący drewniany stół i przytulny charakter wnętrza.",
  },
  "DSC07067.jpg": {
    alt: "Salon z narożnikiem, jasnym drewnem i schodami na piętro",
    title: "Strefa dzienna",
    description: "Salon z narożnikiem i schodami, czyli centrum wspólnego odpoczynku.",
  },
  "DSC07071.jpg": {
    alt: "Salon z jadalnią, jasnym drewnem i narożnikiem w jednym z domków",
    title: "Salon z jadalnią",
    description: "Połączona strefa wypoczynku i jadalni z naturalnym drewnem w roli głównej.",
  },
  "DSC07079.jpg": {
    alt: "Sypialnia na poddaszu z dwoma pojedynczymi łóżkami",
    title: "Sypialnia na poddaszu",
    description: "Jeden z kadrów sypialni z jasnym drewnem i prostym, spokojnym układem.",
  },
  "DSC07088.jpg": {
    alt: "Sypialnia na poddaszu z trzema łóżkami i wyjściem balkonowym",
    title: "Pokój na poddaszu",
    description: "Jasna sypialnia z łóżkami i miękkim światłem wpadającym przez balkonowe drzwi.",
  },
  "DSC07098.jpg": {
    alt: "Sypialnia z łóżkami pod drewnianym skosem",
    title: "Układ sypialni",
    description: "Kadr pokazujący rozmieszczenie łóżek i wykończenie drewnianego poddasza.",
  },
  "DSC07114.jpg": {
    alt: "Umywalka i ręcznik na drewnianym blacie w łazience",
    title: "Łazienka i blat",
    description: "Detal łazienki z drewnianym blatem i jasnym wykończeniem.",
  },
  "DSC07135.jpg": {
    alt: "Kabina prysznicowa z grafitową płytką",
    title: "Strefa prysznica",
    description: "Zbliżenie na prysznic i minimalistyczne wykończenie łazienki.",
  },
  "DSC07149.jpg": {
    alt: "Detal łazienki z ręcznikami, drewnianym blatem i nowoczesną umywalką",
    title: "Detal łazienki",
    description: "Zbliżenie na wykończenie łazienki, które podkreśla czystość i standard wnętrz.",
  },
  "DSC07157.jpg": {
    alt: "Nowoczesna łazienka z umywalką i ręcznikami na blacie",
    title: "Łazienka",
    description: "Kadr łazienki pokazujący połączenie prostych form i drewnianych akcentów.",
  },
  "DSC07159.jpg": {
    alt: "Ręczniki ułożone przy oknie i drewnianym wykończeniu łazienki",
    title: "Detal przy oknie",
    description: "Fragment łazienki z ręcznikami i wyraźnym, drewnianym akcentem.",
  },
  "DSC07165.jpg": {
    alt: "Jasny aneks kuchenny z drewnianym blatem i górskim motywem na szkle",
    title: "Aneks kuchenny",
    description: "Nowoczesna kuchnia z pełnym blatem roboczym i charakterystycznym detalem pod szkłem.",
  },
  "DSC07173.jpg": {
    alt: "Drewniany blat kuchenny z kieliszkami i tłem aneksu",
    title: "Kuchenny detal",
    description: "Zbliżenie na blat i część roboczą aneksu kuchennego.",
  },
  "DSC07185.jpg": {
    alt: "Widok do aneksu kuchennego z drewnianymi drzwiami i stołkami",
    title: "Wejście do kuchni",
    description: "Szerszy kadr pokazujący aneks i przejście pomiędzy pomieszczeniami.",
  },
  "DSC07194.jpg": {
    alt: "Zimowy taras wejściowy z drewnianymi drzwiami",
    title: "Taras wejściowy",
    description: "Zimowy kadr przy wejściu do jednego z domków z drewnianymi detalami i śniegiem.",
  },
  "DSC07206.jpg": {
    alt: "Ganek i wejście z ławką oraz drewnianym wykończeniem",
    title: "Ganek",
    description: "Kadr wejścia z ławką, drewnem i osłoniętą strefą przed drzwiami.",
  },
  "DSC07221.jpg": {
    alt: "Zaśnieżona ścieżka prowadząca w stronę domków",
    title: "Ścieżka zimą",
    description: "Widok na dojście do domków i zimowe otoczenie pełne śniegu.",
  },
  "DSC07227.jpg": {
    alt: "Drewniany taras jednego z domków z widokiem na śnieg i altanę",
    title: "Taras przy domkach",
    description: "Drewniany taras wejściowy, który dobrze oddaje klimat pobytu także zimą.",
  },
  "DSC07230.jpg": {
    alt: "Szeroki zimowy kadr domków z altaną i zaśnieżonym ogrodem",
    title: "Zimowy plan ogólny",
    description: "Szeroki kadr pokazujący budynek, altanę i otoczenie po obfitym śniegu.",
  },
  "DSC07236.jpg": {
    alt: "Zaśnieżona altana przy obiekcie i widok na okolicę",
    title: "Altana w śniegu",
    description: "Zewnętrzny kadr altany i zimowego krajobrazu wokół domków.",
  },
};

const fallbackGalleryMeta = (fileName: string): GalleryPhotoMeta => {
  const numericId = Number(fileName.replace(/\D/g, ""));

  if (numericId >= 72000) {
    return {
      alt: "Zimowy widok domków i ich otoczenia",
      title: "Zimowy widok",
      description: "Zimowy kadr pokazujący domki, wejście lub najbliższe otoczenie.",
    };
  }

  if (numericId >= 71750) {
    return {
      alt: "Widok wejścia i najbliższego otoczenia domków",
      title: "Przy domkach",
      description: "Widok dojścia, wejścia lub spokojnego otoczenia wokół domków.",
    };
  }

  if (numericId >= 71400) {
    return {
      alt: "Detal wnętrza, kuchni lub łazienki",
      title: "Detal wnętrza",
      description: "Zbliżenie na wyposażenie i wykończenie jednego z domków.",
    };
  }

  if (numericId >= 70770) {
    return {
      alt: "Widok sypialni lub części dziennej z drewnianym wykończeniem",
      title: "Wnętrze domku",
      description: "Wnętrze pokazujące sypialnię lub część dzienną jednego z domków.",
    };
  }

  return {
    alt: "Wnętrze jednego z domków z drewnianym wykończeniem",
    title: "Spokojne wnętrze",
    description: "Jedno ze zdjęć wnętrza pokazujących drewno, detale i spokojny charakter miejsca.",
  };
};

export const contactDetails = {
  name: "Domki na Zrąbku Pod Gubałówką",
  address: "Nowe Bystre 201B, 34-521 Ząb",
  phone: "696 253 669",
  phoneHref: "tel:+48696253669",
  rating: "4,9/5",
  reviewCount: 27,
};

export const hotresIntegrationEnabled = false;
export const bookingWidgetUrl = createBookingWidgetUrl({ header: 1 });
export const heroBookingWidgetUrl = createBookingWidgetUrl({ header: 0 });

export const navItems = [
  { label: "O nas", href: "#o-nas" },
  { label: "Galeria", href: "#galeria" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const heroPhoto = {
  src: photoExteriorWide,
  alt: "Zimowy widok na domki i altanę przy Domkach na Zrąbku Pod Gubałówką",
};

export const heroSlides: HeroSlide[] = [
  {
    src: photoExteriorWide,
    alt: "Zimowy widok na domki i altanę przy Domkach na Zrąbku Pod Gubałówką",
  },
  {
    src: photoLivingDining,
    alt: "Salon z jadalnią, jasnym drewnem i narożnikiem w jednym z domków",
  },
  {
    src: photoKitchen,
    alt: "Jasny aneks kuchenny z drewnianym blatem w jednym z domków",
  },
  {
    src: photoTerrace,
    alt: "Taras wejściowy i zimowe otoczenie domków",
  },
];

export const aboutPhoto = {
  src: photoLivingDining,
  alt: "Salon z jadalnią, jasnym drewnem i narożnikiem w jednym z domków",
  note: "Salon połączony z jadalnią pokazuje naturalne drewno, spokojną kolorystykę i układ stworzony do długich, niespiesznych wieczorów.",
};

export const galleryPhotos = Object.entries(galleryModules)
  .sort(([leftPath], [rightPath]) => leftPath.localeCompare(rightPath))
  .map(([path, src]) => {
    const fileName = path.split("/").pop() ?? path;
    const meta = explicitGalleryMeta[fileName] ?? fallbackGalleryMeta(fileName);

    return {
      fileName,
      src,
      ...meta,
    };
  }) satisfies GalleryPhoto[];

const homeGalleryFileNames = [
  "DSC07230.jpg",
  "DSC07071.jpg",
  "DSC07067.jpg",
  "DSC07088.jpg",
  "DSC07165.jpg",
  "DSC07227.jpg",
] as const;

export const homeGalleryPhotos = homeGalleryFileNames
  .map((fileName) => galleryPhotos.find((photo) => photo.fileName === fileName))
  .filter((photo): photo is (typeof galleryPhotos)[number] => Boolean(photo));

export const valueProps = [
  {
    title: "Doskonała lokalizacja",
    description: "Spokojny adres pod Gubałówką, który pozwala szybko dotrzeć do Zakopanego i równie łatwo wrócić do ciszy.",
    icon: "map",
  },
  {
    title: "Cisza i spokój",
    description: "Widok, światło i rytm dnia z dala od zgiełku, z atmosferą stworzoną do prawdziwego odpoczynku.",
    icon: "pine",
  },
  {
    title: "Nowoczesne wyposażenie",
    description: "Dopieszczone wnętrza, praktyczne udogodnienia i estetyka, która nie idzie na kompromisy.",
    icon: "sparkles",
  },
  {
    title: "Bezpłatny parking",
    description: "Wygodny dojazd i bezproblemowe parkowanie na miejscu dla gości przyjeżdżających przez cały rok.",
    icon: "car",
  },
] as const;

export const locationBadges = [
  "Nowe Bystre 201B, Ząb",
  "Spokojna lokalizacja",
  "Blisko natury",
  "Górski klimat przez cały rok",
] as const;

export const reviews = [
  {
    author: "Agnieszka S.",
    quote: "Piękne miejsce, polecam z całym sercem. Cisza, światło i atmosfera robią ogromne wrażenie od pierwszej chwili.",
  },
  {
    author: "Rodzyn1991",
    quote: "Polecam gorąco. Miejsce super, cisza i spokój, a jednocześnie świetna lokalizacja na wypady po okolicy.",
  },
  {
    author: "Krzysztof Ś.",
    quote: "Super miejsce, wszystko czyste i zadbane, a cały pobyt był naprawdę dopieszczony w każdym detalu.",
  },
] as const;

export const faqItems = [
  {
    question: "Gdzie zatrzymać się blisko Gubałówki, ale z dala od centrum Zakopanego?",
    answer:
      "Domki na Zrąbku w Nowem Bystrym koło Zębu są dobrą odpowiedzią dla osób, które chcą mieć szybki dostęp do Gubałówki, ale wracać wieczorem do ciszy, widoku i spokojniejszej części Podhala.",
  },
  {
    question: "Czy Ząb i Nowe Bystre to dobra alternatywa dla noclegu w Zakopanem?",
    answer:
      "Tak. To rozwiązanie dla gości, którzy wolą panoramę, swobodę parkowania i spokojniejszy rytm pobytu niż ścisłe centrum Zakopanego, a jednocześnie chcą pozostać blisko najważniejszych atrakcji regionu.",
  },
  {
    question: "Czy akceptujecie zwierzęta?",
    answer:
      "Zasady pobytu ze zwierzętami warto potwierdzić przed przyjazdem telefonicznie, aby dopasować pobyt do aktualnych warunków domków.",
  },
  {
    question: "Czy w obiekcie jest Wi-Fi?",
    answer:
      "Wygodny pobyt zakłada dostęp do podstawowych udogodnień, a szczegóły dotyczące sieci najlepiej potwierdzić przy rezerwacji.",
  },
  {
    question: "Ile zajmuje spacer na Gubałówkę z okolicy?",
    answer:
      "W zależności od wybranego dojścia spacerowe trasy z Zębu i Nowego Bystrego na grzbiet Gubałówki zajmują zwykle około 30 do 40 minut, co czyni tę lokalizację bardzo wygodną bazą dla osób ceniących poranne wyjścia bez tłumów.",
  },
  {
    question: "Jakie są formy płatności?",
    answer:
      "Szczegóły rozliczenia ustalane są przy potwierdzeniu rezerwacji telefonicznie lub przez formularz kontaktowy.",
  },
  {
    question: "Czy domki mają kuchnię?",
    answer: "Na miejscu są aneksy kuchenne widoczne również na zdjęciach. Szczegóły wyposażenia najlepiej potwierdzić przy rezerwacji.",
  },
  {
    question: "Czy to dobra baza na romantyczny weekend w górach?",
    answer:
      "Tak. Lokalizacja pod Gubałówką dobrze sprawdza się na spokojny pobyt we dwoje, bo łączy prywatność, widok i szybki dostęp do restauracji oraz spacerowych tras bez konieczności nocowania w zatłoczonym centrum.",
  },
  {
    question: "Czy w pobliżu są restauracje i miejsca na kolację?",
    answer:
      "Tak. W zasięgu krótkiego dojazdu znajdują się restauracje w Zakopanem i przy Gubałówce, więc łatwo połączyć spokojny nocleg w Zębie z dopracowaną kolacją bez potrzeby spędzania całego dnia w mieście.",
  },
  {
    question: "Czy zimą to wygodna lokalizacja na narty i kuligi?",
    answer:
      "Tak. Okolica daje dostęp do kameralniejszych stoków, spacerowych tras i zimowych atrakcji Podhala, a sam adres sprawdza się jako spokojna baza wypadowa na ferie bez nadmiernej logistyki.",
  },
] as const;
export const socialItems = [{ label: "Mapa Google", href: "#lokalizacja" }] as const;

export const googleMapsEmbed =
  "https://www.google.com/maps?q=Nowe+Bystre+201B,+34-521+Z%C4%85b&output=embed";
