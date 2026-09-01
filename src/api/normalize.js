import { mediaUrl } from "./config";

/**
 * Flattens Strapi payloads into the plain shapes the components render, so that
 * media become absolute URLs, components become arrays of primitives, and
 * relations become the fields actually used in the UI.
 */

const mediaUrls = (value) =>
  Array.isArray(value) ? value.map(mediaUrl).filter(Boolean) : [];

export const normalizeProduct = (raw) =>
  raw && {
    id: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    bannerDescription: raw.bannerDescription,
    longDescription: raw.longDescription,
    image: mediaUrl(raw.image),
    images: mediaUrls(raw.images),
    categoryId: raw.category?.documentId ?? null,
    subcategoryId: raw.subcategory?.documentId ?? null,
    features: (raw.features ?? []).map((feature) => feature.text),
    specifications: (raw.specifications ?? []).map(({ parameter, value }) => ({
      parameter,
      value,
    })),
  };

export const normalizeProject = (raw) =>
  raw && {
    id: raw.documentId,
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    image: mediaUrl(raw.image),
    images: mediaUrls(raw.images),
    videoSrc: raw.videoSrc,
  };

export const normalizeCategory = (raw) =>
  raw && {
    id: raw.documentId,
    name: raw.name,
    // Kept as `subcategory` because ProductFilter reads that key.
    subcategory: (raw.subcategories ?? []).map((sub) => ({
      id: sub.documentId,
      name: sub.name,
    })),
  };

export const normalizeOverview = (raw) =>
  raw && {
    id: raw.documentId,
    title: raw.title,
    description: raw.description,
    images: mediaUrls(raw.images),
    videoSrc: raw.videoSrc,
  };

/** Partners and consumers share a shape; `image` matches SliderComponent. */
export const normalizeLogo = (raw) =>
  raw && {
    id: raw.documentId,
    name: raw.name,
    image: mediaUrl(raw.logo),
  };

export const normalizeGlobal = (raw) =>
  raw && {
    siteName: raw.siteName,
    logo: mediaUrl(raw.logo),
    phoneNumber: raw.phoneNumber,
    email: raw.email,
    address: raw.address,
    footerDescription: raw.footerDescription,
    socialLinks: (raw.socialLinks ?? []).map(({ platform, url }) => ({
      platform,
      url,
    })),
  };

export const normalizeHomePage = (raw) =>
  raw && {
    bannerHeading: raw.bannerHeading,
    bannerSubheading: raw.bannerSubheading,
    bannerImage: mediaUrl(raw.bannerImage),
    overviewTitle: raw.overviewTitle,
    overviewDescription: raw.overviewDescription,
    productsSectionTitle: raw.productsSectionTitle,
    productsSectionDescription: raw.productsSectionDescription,
    projectSectionTitle: raw.projectSectionTitle,
    promoCards: (raw.promoCards ?? []).map(({ tag, title, link }) => ({
      tag,
      title,
      link,
    })),
  };

export const normalizeAboutPage = (raw) =>
  raw && {
    heroTitle: raw.heroTitle,
    heroDescription: raw.heroDescription,
    heroImage: mediaUrl(raw.heroImage),
    stats: (raw.stats ?? []).map(({ value, label }) => ({ value, label })),
    taglineImage: mediaUrl(raw.taglineImage),
    tagline: raw.tagline,
    secondBlockTitle: raw.secondBlockTitle,
    secondBlockDescription: raw.secondBlockDescription,
    bulletServices: (raw.bulletServices ?? []).map((service) => ({
      id: service.documentId,
      text: service.text,
    })),
  };

/** Shared by the products and projects listing pages. */
export const normalizeListingPage = (raw) =>
  raw && {
    title: raw.title,
    bannerImage: mediaUrl(raw.bannerImage),
  };
