const STRAPI_URL = "http://localhost:1337";

export async function getArticles(locale = "en") {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?locale=${locale}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const result = await response.json();

  return result.data;
}

export async function getArticleBySlug(slug, locale = "en") {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&locale=${locale}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const result = await response.json();

  return result.data?.[0] || null;
}

export async function getCategories(locale = "en") {
  const response = await fetch(
    `${STRAPI_URL}/api/categories?locale=${locale}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const result = await response.json();

  return result.data;
}

export async function getArticlesByCategory(
  categoryName,
  locale = "en"
) {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[category][name][$eq]=${encodeURIComponent(
      categoryName
    )}&locale=${locale}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category articles");
  }

  const result = await response.json();

  return result.data;
}

export async function searchArticles(searchTerm, locale = "en") {
  const response = await fetch(
    `${STRAPI_URL}/api/articles?filters[title][$containsi]=${encodeURIComponent(
      searchTerm
    )}&locale=${locale}&populate=*`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search articles");
  }

  const result = await response.json();

  return result.data;
}

export async function getArticleLocalizations(documentId) {
  const locales = ["en", "gu"];

  const requests = locales.map(async (locale) => {
    const response = await fetch(
      `${STRAPI_URL}/api/articles?filters[documentId][$eq]=${encodeURIComponent(
        documentId
      )}&locale=${locale}&populate=*`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();

    return result.data || [];
  });

  const results = await Promise.all(requests);

  return results.flat();
}