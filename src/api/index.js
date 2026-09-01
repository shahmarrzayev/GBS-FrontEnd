import { get, post, query } from "./client";
import {
  normalizeAboutPage,
  normalizeCategory,
  normalizeGlobal,
  normalizeHomePage,
  normalizeListingPage,
  normalizeLogo,
  normalizeOverview,
  normalizeProduct,
  normalizeProject,
} from "./normalize";

// Seed order is the display order everywhere, so sort by creation.
const BY_CREATION = "createdAt:asc";

const mapList = (normalize) => (list) => (list ?? []).map(normalize);

// ---------------------------------------------------------------- single types

export const getGlobal = async (options) =>
  normalizeGlobal(await get(`/global${query({ populate: "*" })}`, options));

export const getHomePage = async (options) =>
  normalizeHomePage(await get(`/home-page${query({ populate: "*" })}`, options));

export const getAboutPage = async (options) =>
  normalizeAboutPage(
    await get(`/about-page${query({ populate: "*" })}`, options)
  );

export const getProductsPage = async (options) =>
  normalizeListingPage(
    await get(`/products-page${query({ populate: "*" })}`, options)
  );

export const getProjectsPage = async (options) =>
  normalizeListingPage(
    await get(`/projects-page${query({ populate: "*" })}`, options)
  );

// ------------------------------------------------------------------- taxonomy

export const getCategories = async (options) =>
  mapList(normalizeCategory)(
    await get(
      `/categories${query({ populate: "subcategories", sort: BY_CREATION })}`,
      options
    )
  );

// ------------------------------------------------------------------- products

/**
 * Listing/carousel query. Cards need the cover image; the taxonomy relations are
 * populated so `categoryId`/`subcategoryId` are populated consistently with the
 * detail query. The gallery and long-form fields stay unpopulated.
 */
export const getProducts = async (
  { categoryId, subcategoryId, excludeSlug, limit } = {},
  options
) =>
  mapList(normalizeProduct)(
    await get(
      `/products${query({
        "populate[image]": "true",
        "populate[category][fields][0]": "name",
        "populate[subcategory][fields][0]": "name",
        "filters[category][documentId][$eq]": categoryId,
        "filters[subcategory][documentId][$eq]": subcategoryId,
        "filters[slug][$ne]": excludeSlug,
        "pagination[pageSize]": limit,
        sort: BY_CREATION,
      })}`,
      options
    )
  );

export const getProductBySlug = async (slug, options) => {
  const results = await get(
    `/products${query({
      populate: "*",
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    })}`,
    options
  );

  return normalizeProduct(results?.[0]) ?? null;
};

// ------------------------------------------------------------------- projects

export const getProjects = async ({ excludeSlug, limit } = {}, options) =>
  mapList(normalizeProject)(
    await get(
      `/projects${query({
        "populate[image]": "true",
        "filters[slug][$ne]": excludeSlug,
        "pagination[pageSize]": limit,
        sort: BY_CREATION,
      })}`,
      options
    )
  );

export const getProjectBySlug = async (slug, options) => {
  const results = await get(
    `/projects${query({
      populate: "*",
      "filters[slug][$eq]": slug,
      "pagination[pageSize]": 1,
    })}`,
    options
  );

  return normalizeProject(results?.[0]) ?? null;
};

// --------------------------------------------------------------- home sliders

export const getOverviews = async (options) =>
  mapList(normalizeOverview)(
    await get(
      `/overviews${query({ populate: "*", sort: BY_CREATION })}`,
      options
    )
  );

export const getPartners = async (options) =>
  mapList(normalizeLogo)(
    await get(
      `/partners${query({ populate: "logo", sort: BY_CREATION })}`,
      options
    )
  );

export const getConsumers = async (options) =>
  mapList(normalizeLogo)(
    await get(
      `/consumers${query({ populate: "logo", sort: BY_CREATION })}`,
      options
    )
  );

// ---------------------------------------------------------------- submissions

export const createContactSubmission = (payload, options) =>
  post("/contact-submissions", payload, options);
