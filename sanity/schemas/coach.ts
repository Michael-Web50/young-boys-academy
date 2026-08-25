import {defineField, defineType} from 'sanity'

export const coach = defineType({
  name: 'coach',
  title: 'Coach',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          'Head Coach',
          'Assistant Coach',
          'Goalkeeper Coach',
          'Fitness Coach',
          'Youth Coach',
          'Tactical Coach',
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Coach Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'license',
      title: 'Coaching License',
      type: 'string',
      description: 'e.g., CAF License A',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'experience',
      title: 'Years of Experience',
      type: 'string',
      description: 'e.g., 10+ Years',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'text',
      description: 'e.g., Tactical Training, Youth Development',
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
