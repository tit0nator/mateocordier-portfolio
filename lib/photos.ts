export interface Photo {
  id: string;
  src: string;
  album: string;
  caption?: string;
}

export interface Album {
  id: string;
  labelKey: string;
}

export const ALBUMS: Album[] = [
  { id: "all",    labelKey: "all"    },
  { id: "travel", labelKey: "travel" },
  { id: "street", labelKey: "street" },
];

export const PHOTOS: Photo[] = [
  // Travel
  { id: "t1", src: "/photos/travel/barcelona.jpg",       album: "travel", caption: "Barcelona" },
  { id: "t2", src: "/photos/travel/mountain-sunset.jpg", album: "travel", caption: "Alpes" },
  { id: "t3", src: "/photos/travel/lake-sunset.jpg",     album: "travel", caption: "Lac, été" },
  // Street / film
  { id: "s1", src: "/photos/street/interior.jpg",        album: "street", caption: "Morning light" },
  { id: "s2", src: "/photos/street/bokeh-night.jpg",     album: "street", caption: "Nuit" },
  { id: "s3", src: "/photos/street/light-trails.jpg",    album: "street", caption: "Light trails" },
  { id: "s4", src: "/photos/street/evan-st.jpg",         album: "street", caption: "E VAN ST" },
  { id: "s5", src: "/photos/street/jordan-1.jpg",        album: "street", caption: "Air Jordan 1" },
  { id: "s6", src: "/photos/street/e-10th.jpg",          album: "street", caption: "E 10th" },
  { id: "s7", src: "/photos/street/jordan-3.jpg",        album: "street", caption: "Air Jordan 3" },
  { id: "s8", src: "/photos/street/damn-poster.jpg",     album: "street", caption: "DAMN." },
];
