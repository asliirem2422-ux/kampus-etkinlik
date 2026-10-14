import type { CampusEvent } from "../types/campus-event";

export const events: CampusEvent[] = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    capacity: 100,
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
    image: "/afis.jpg"
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    capacity: 20,
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    capacity: 50,
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet."
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    capacity: 30,
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    description: "HTML ve CSS ile ilk kişisel sayfanı yap."
  },
  {
    id: "event-5",
    title: "Yapay Zeka Semineri",
    category: "Seminer",
    capacity: 150,
    date: "10-11-2026",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    description: "Büyük dil modelleri ve geleceğin meslekleri."
  },
  {
    id: "event-6",
    title: "Girişimcilik Söyleşisi",
    category: "Söyleşi",
    capacity: 80,
    date: "24-11-2026",
    time: "13:30",
    location: "B Blok Amfi 2",
    description: "Genç girişimcilerle tanışma ve soru-cevap."
  }
];