import {defineField, defineType} from 'sanity'

export const fixture = defineType({
  name: 'fixture',
  title: 'Match / Fixture',
  type: 'document',
  fields: [
    defineField({
      name: 'opponentName',
      title: 'Opponent Team Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ageGroup',
      title: 'Age Group',
      type: 'string',
      options: {
        list: [
          {title: 'Under 12', value: 'U12'},
          {title: 'Under 15', value: 'U15'},
          {title: 'Under 17', value: 'U17'},
          {title: 'Under 20', value: 'U20'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'matchDate',
      title: 'Match Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'matchTime',
      title: 'Kick-off Time',
      type: 'string',
      description: 'e.g., 4:00 PM',
    }),
    defineField({
      name: 'location',
      title: 'Location / Venue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isHomeGame',
      title: 'Is this a Home Game?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'status',
      title: 'Match Status',
      type: 'string',
      options: {
        list: [
          {title: 'Upcoming', value: 'upcoming'},
          {title: 'Completed', value: 'completed'},
          {title: 'Postponed', value: 'postponed'},
        ],
      },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ourScore',
      title: 'Our Score (YBFA)',
      type: 'number',
      hidden: ({value, parent}) => parent?.status !== 'completed',
    }),
    defineField({
      name: 'opponentScore',
      title: 'Opponent Score',
      type: 'number',
      hidden: ({value, parent}) => parent?.status !== 'completed',
    }),
  ],
  preview: {
    select: {
      title: 'opponentName',
      subtitle: 'matchDate',
    },
  },
})
