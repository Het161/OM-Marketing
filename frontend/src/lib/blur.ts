// frontend/src/lib/blur.ts

/**
 * A one-colour preview per photograph: the average colour of the image,
 * as a tiny SVG data URI.
 *
 * next/image paints this blurred behind the real photo, so a card carries the
 * product's colour from the first paint instead of sitting as an empty plate.
 * A solid colour rather than a thumbnail keeps the whole table near 6 KB —
 * an 8-pixel JPEG costs about 1.3 KB each in header overhead alone.
 */
const BLUR: Record<string, string> = {
  '/images/10KG-Unique-company.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28102%2C99%2C87%29%27/%3E%3C/svg%3E',
  '/images/10KG-china.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28137%2C138%2C111%29%27/%3E%3C/svg%3E',
  '/images/300*300mm-Chicken-ss.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28177%2C172%2C169%29%27/%3E%3C/svg%3E',
  '/images/30KG-Table-Top.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28149%2C148%2C152%29%27/%3E%3C/svg%3E',
  '/images/400*400mm-MS.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28133%2C130%2C123%29%27/%3E%3C/svg%3E',
  '/images/400*400mm-SS.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28166%2C165%2C161%29%27/%3E%3C/svg%3E',
  '/images/400*400mm-chicken-MS.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28138%2C129%2C124%29%27/%3E%3C/svg%3E',
  '/images/400*400mm.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28162%2C160%2C154%29%27/%3E%3C/svg%3E',
  '/images/500*500ms-chicken.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28114%2C108%2C100%29%27/%3E%3C/svg%3E',
  '/images/600*600mm-SS-chicken-top.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28138%2C135%2C135%29%27/%3E%3C/svg%3E',
  '/images/600*600mm-SS.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%2894%2C92%2C87%29%27/%3E%3C/svg%3E',
  '/images/600-600mm-ss-Regular.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28156%2C174%2C187%29%27/%3E%3C/svg%3E',
  '/images/750*750mm-MS.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28131%2C131%2C128%29%27/%3E%3C/svg%3E',
  '/images/900*900mm-1200*1200mm.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%2854%2C56%2C56%29%27/%3E%3C/svg%3E',
  '/images/ABS-20KG.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28215%2C213%2C212%29%27/%3E%3C/svg%3E',
  '/images/Basic-Note-Machine.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28148%2C145%2C136%29%27/%3E%3C/svg%3E',
  '/images/Basic-NoteMachine.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28144%2C147%2C149%29%27/%3E%3C/svg%3E',
  '/images/Floor-Scale.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28150%2C149%2C146%29%27/%3E%3C/svg%3E',
  '/images/Jewellery.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28115%2C116%2C112%29%27/%3E%3C/svg%3E',
  '/images/Jewellery2.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28153%2C163%2C164%29%27/%3E%3C/svg%3E',
  '/images/Micro-mini.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28102%2C99%2C87%29%27/%3E%3C/svg%3E',
  '/images/Mini-20KG.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28196%2C193%2C197%29%27/%3E%3C/svg%3E',
  '/images/Mini-20KG1.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%2874%2C73%2C75%29%27/%3E%3C/svg%3E',
  '/images/Multi-Currency.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28110%2C105%2C105%29%27/%3E%3C/svg%3E',
  '/images/PRC-Scale.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28164%2C169%2C175%29%27/%3E%3C/svg%3E',
  '/images/certificate-plate.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28142%2C141%2C138%29%27/%3E%3C/svg%3E',
  '/images/company-Crane-type-100KG-1year-gurantee-warranty.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28114%2C105%2C102%29%27/%3E%3C/svg%3E',
  '/images/crane-scale.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28141%2C132%2C123%29%27/%3E%3C/svg%3E',
  '/images/crane-scale.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28142%2C101%2C75%29%27/%3E%3C/svg%3E',
  '/images/explosion-proof.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28107%2C112%2C107%29%27/%3E%3C/svg%3E',
  '/images/heavy-platform-scale.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28131%2C131%2C128%29%27/%3E%3C/svg%3E',
  '/images/hero/10kg.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%2897%2C100%2C91%29%27/%3E%3C/svg%3E',
  '/images/hero/300x300.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28166%2C162%2C158%29%27/%3E%3C/svg%3E',
  '/images/hero/30kg.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28145%2C142%2C143%29%27/%3E%3C/svg%3E',
  '/images/hero/400x400.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28134%2C136%2C135%29%27/%3E%3C/svg%3E',
  '/images/ms-platform-500.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28114%2C108%2C100%29%27/%3E%3C/svg%3E',
  '/images/note-counter.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28140%2C144%2C142%29%27/%3E%3C/svg%3E',
  '/images/om-mark-white.png':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28255%2C255%2C255%29%27/%3E%3C/svg%3E',
  '/images/om-mark.png':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%2838%2C45%2C53%29%27/%3E%3C/svg%3E',
  '/images/om-solutions-logo.png':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28210%2C218%2C225%29%27/%3E%3C/svg%3E',
  '/images/platform-300x300.jpg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28177%2C172%2C169%29%27/%3E%3C/svg%3E',
  '/images/small-crane-type-60KG-chinaModel.jpeg':
    'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%274%27%20height%3D%273%27%3E%3Crect%20width%3D%274%27%20height%3D%273%27%20fill%3D%27rgb%28127%2C131%2C130%29%27/%3E%3C/svg%3E',
};

/** Blur preview for an image path, or undefined if we have none. */
export function blurFor(src?: string | null): string | undefined {
  return src ? BLUR[src] : undefined;
}
