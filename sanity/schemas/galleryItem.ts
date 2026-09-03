import {defineField, defineType} from 'sanity'

export const galleryItem = defineType({
  name: 'galleryItem',
  title: 'Gallery / Highlight',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Match Day', value: 'Match'},
          {title: 'Training', value: 'Training'},
          {title: 'Event', value: 'Event'},
          {title: 'Team Photo', value: 'Team'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (Rule) => Rule.required().custom((value, context) => {
        if (context.parent?.mediaType === 'image' && !value) return 'Image is required for image media type'
        return true
      }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (YouTube/Vimeo/Pexels)',
      type: 'url',
      hidden: ({parent}) => parent?.mediaType !== 'video',
      description: 'Paste the direct link to the video',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      subtitle: 'category',
    },
  },
})
