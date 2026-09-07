import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('YBFA Command Center')
    .items([
      S.listItem()
        .title(' Team Management')
        .child(
          S.list()
            .title('Team Management')
            .items([
              S.listItem().title('Players').child(S.documentTypeList('player').title('All Players')),
              S.listItem().title('Coaching Staff').child(S.documentTypeList('coach').title('All Coaches')),
            ])
        ),
      S.listItem()
        .title('📰 Content & Media')
        .child(
          S.list()
            .title('Content & Media')
            .items([
              S.listItem().title('News Articles').child(S.documentTypeList('newsArticle').title('All News')),
              S.listItem().title('Gallery / Highlights').child(S.documentTypeList('galleryItem').title('All Gallery Items')),
            ])
        ),
      S.listItem()
        .title(' Matches & Partners')
        .child(
          S.list()
            .title('Matches & Partners')
            .items([
              S.listItem().title('Fixtures & Results').child(S.documentTypeList('fixture').title('All Matches')),
              S.listItem().title('Sponsors').child(S.documentTypeList('sponsor').title('All Sponsors')),
              S.listItem().title('Sponsorship Applications').child(S.documentTypeList('sponsorshipApplication').title('All Applications')),
            ])
        ),
      S.divider(),
      // Fallback for any other document types
      ...S.documentTypeListItems().filter(
        (listItem) => !['player', 'coach', 'newsArticle', 'galleryItem', 'fixture', 'sponsor', 'sponsorshipApplication'].includes(listItem.getId() || '')
      ),
    ])
