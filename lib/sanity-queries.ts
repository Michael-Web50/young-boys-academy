import { client } from './sanity'

// Fetch all players
export async function getPlayers() {
  const query = `*[_type == "player"] | order(firstName asc)`
  return client.fetch(query)
}

// Fetch players by age group
export async function getPlayersByAgeGroup(ageGroup: string) {
  const query = `*[_type == "player" && ageGroup == $ageGroup] | order(shirtNumber asc)`
  return client.fetch(query, { ageGroup })
}

// Fetch all coaches
export async function getCoaches() {
  const query = `*[_type == "coach"] | order(role asc)`
  return client.fetch(query)
}

// Fetch all news articles
export async function getNewsArticles() {
  const query = `*[_type == "newsArticle"] | order(publishedAt desc)`
  return client.fetch(query)
}

// Fetch news by category
export async function getNewsByCategory(category: string) {
  const query = `*[_type == "newsArticle" && category == $category] | order(publishedAt desc)`
  return client.fetch(query, { category })
}

// Fetch all sponsors
export async function getSponsors() {
  const query = `*[_type == "sponsor"] | order(tier desc, name asc)`
  return client.fetch(query)
}

// Fetch sponsorship applications (admin only)
export async function getSponsorshipApplications() {
  const query = `*[_type == "sponsorshipApplication"] | order(submittedAt desc)`
  return client.fetch(query)
}

// Create sponsorship application
export async function createSponsorshipApplication(data: any) {
  const doc = {
    _type: 'sponsorshipApplication',
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  }
  return client.create(doc)
}

// Fetch all fixtures/matches
export async function getFixtures() {
  const query = `*[_type == "fixture"] | order(matchDate desc)`
  return client.fetch(query)
}

// Fetch all gallery items
export async function getGalleryItems() {
  const query = `*[_type == "galleryItem"] | order(date desc)`
  return client.fetch(query)
}
