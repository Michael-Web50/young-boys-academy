import {defineField, defineType} from 'sanity'

export const player = defineType({
  name: 'player',
  title: 'Player',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'middleName',
      title: 'Middle Name',
      type: 'string',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameOnShirt',
      title: 'Name on Shirt',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      options: {
        list: [
          {title: 'Goalkeeper', value: 'GK'},
          {title: 'Center Back', value: 'CB'},
          {title: 'Left Back', value: 'LB'},
          {title: 'Right Back', value: 'RB'},
          {title: 'Left Wing Back', value: 'LWB'},
          {title: 'Right Wing Back', value: 'RWB'},
          {title: 'Defensive Midfielder', value: 'CDM'},
          {title: 'Central Midfielder', value: 'CM'},
          {title: 'Attacking Midfielder', value: 'CAM'},
          {title: 'Left Winger', value: 'LW'},
          {title: 'Right Winger', value: 'RW'},
          {title: 'Second Striker', value: 'SS'},
          {title: 'Center Forward', value: 'CF'},
          {title: 'Striker', value: 'ST'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shirtNumber',
      title: 'Shirt Number',
      type: 'number',
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
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      initialValue: 'Nigerian',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      description: 'e.g., 5\'8"',
    }),
    defineField({
      name: 'photo',
      title: 'Player Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'firstName',
      subtitle: 'lastName',
      media: 'photo',
    },
  },
})
