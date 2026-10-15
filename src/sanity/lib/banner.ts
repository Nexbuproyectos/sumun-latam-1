import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import { urlFor } from "./image";

export type BannerSlide = {
  id: string;
  title: PortableTextBlock[];
  text: PortableTextBlock[];
  buttonLabel: string;
  buttonHref: string;
  imageUrl: string;
  imageAlt: string;
  backgroundUrl?: string;
};

const fallbackImage = "/images/banner/nino.webp";
const fallbackBackground = "/images/banner/anillo.webp";

function block(
  key: string,
  children: { key: string; text: string; marks?: string[] }[],
): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: children.map((child) => ({
      _type: "span",
      _key: child.key,
      text: child.text,
      marks: child.marks ?? [],
    })),
  };
}

export const defaultBannerSlides: BannerSlide[] = [
  {
    id: "lideramos",
    title: [
      block("title", [
        { key: "a", text: "Lideramos " },
        {
          key: "b",
          text: "la nueva revolución educativa ",
          marks: ["strong"],
        },
        { key: "c", text: "con IA y datos" },
      ]),
    ],
    text: [
      block("text", [
        { key: "a", text: "Sumun ", marks: ["strong"] },
        { key: "b", text: "impulsa " },
        {
          key: "c",
          text: "la mejor versión de toda la comunidad ",
          marks: ["strong"],
        },
        { key: "d", text: "educativa ", marks: ["strong"] },
        { key: "e", text: "para lograr mejores resultados y aprendizajes" },
      ]),
    ],
    buttonLabel: "Conoce la marca",
    buttonHref: "#",
    imageUrl: fallbackImage,
    imageAlt: "",
    backgroundUrl: fallbackBackground,
  },
];

type SanitySlide = {
  _key: string;
  buttonLabel?: string;
  buttonHref?: string;
  title?: PortableTextBlock[];
  text?: PortableTextBlock[];
  image?: SanityImageSource & { alt?: string; asset?: { _ref?: string } };
};

type HomeBanner = {
  banner?: SanitySlide[];
};

const bannerQuery = `*[_id == "home"][0]{
  banner[]{
    _key,
    buttonLabel,
    buttonHref,
    title,
    text,
    image
  }
}`;

export async function getBannerSlides(): Promise<BannerSlide[]> {
  try {
    const home = await client.fetch<HomeBanner | null>(bannerQuery);
    const slides = home?.banner?.filter((slide) => slide.title && slide.text) ?? [];

    if (slides.length === 0) {
      return defaultBannerSlides;
    }

    return slides.map((slide) => ({
      id: slide._key,
      title: slide.title ?? [],
      text: slide.text ?? [],
      buttonLabel: slide.buttonLabel || "Conoce la marca",
      buttonHref: slide.buttonHref || "#",
      imageUrl: slide.image?.asset
        ? urlFor(slide.image).width(1608).auto("format").url()
        : fallbackImage,
      imageAlt: slide.image?.alt || "",
    }));
  } catch {
    return defaultBannerSlides;
  }
}
