import {player} from './schemas/player'
import {coach} from './schemas/coach'
import {newsArticle} from './schemas/newsArticle'
import {sponsor} from './schemas/sponsor'
import {sponsorshipApplication} from './schemas/sponsorshipApplication'

export const schema = {
  types: [player, coach, newsArticle, sponsor, sponsorshipApplication],
}
