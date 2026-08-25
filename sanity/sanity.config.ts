import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './schema'

export default defineConfig({
  name: 'default',
  title: 'Young Boys Football Academy',
  projectId: 'sd70wpwl', // Replace with your actual project ID
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schema.types,
  },
})
