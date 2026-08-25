import {defineField, defineType} from 'sanity'

export const sponsorshipApplication = defineType({
  name: 'sponsorshipApplication',
  title: 'Sponsorship Application',
  type: 'document',
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sponsorshipType',
      title: 'Sponsorship Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Bronze (₦500,000)', value: 'bronze'},
          {title: 'Silver (₦1,500,000)', value: 'silver'},
          {title: 'Gold (3,000,000)', value: 'gold'},
          {title: 'Custom Package', value: 'custom'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Approved', value: 'approved'},
          {title: 'Rejected', value: 'rejected'},
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
      description: 'Notes for admin use only',
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'contactPerson',
    },
  },
})
