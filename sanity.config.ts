import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schema} from './sanity/schema'
import {structure} from './sanity/structure'
import {YBFA_LOGO} from './sanity/components/YBFALogo'

export default defineConfig({
  name: 'default',
  title: 'Young Boys Football Academy',
  projectId: 'sd70wpwl',
  dataset: 'production',
  plugins: [
    structureTool({structure}),
    visionTool()
  ],
  schema: {
    types: schema.types,
  },
  studio: {
    components: {
      logo: YBFA_LOGO,
    },
  },
})
