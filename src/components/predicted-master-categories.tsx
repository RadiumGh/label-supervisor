import { FormLabel, List, ListItem, Radio, RadioGroup } from '@mui/joy'
import { RegisteredCategories } from './registered-categories'
import { useAppStore } from '../logic'

export function PredictedMasterCategories() {
  const masterCategories = useAppStore(state => state.predictedMasterCategories)

  const selectedMasterCategory = useAppStore(
    state => state.selectedMasterCategory,
  )

  const selectMasterCategory = (value: string) =>
    useAppStore.setState({ selectedMasterCategory: value })

  return (
    <div>
      <FormLabel sx={{ color: 'background.tooltip' }}>
        Predicted master categories
      </FormLabel>

      <RadioGroup
        size="lg"
        aria-label="Your plan"
        name="master-category"
        value={selectedMasterCategory}
        onChange={e => selectMasterCategory(e.target.value)}
      >
        <List
          sx={{
            minWidth: 240,
            '--List-gap': '0.5rem',
            '--ListItem-paddingY': '1rem',
            '--ListItem-radius': '8px',
            '--ListItemDecorator-size': '32px',
          }}
        >
          {masterCategories.map(item => (
            <ListItem variant="outlined" key={item.id} sx={{ boxShadow: 'sm' }}>
              <Radio
                overlay
                value={item.id}
                label={item.label}
                checked={selectedMasterCategory === item.id}
                sx={{
                  flexGrow: 1,
                  flexDirection: 'row-reverse',
                  textAlign: 'left',
                }}
              />
            </ListItem>
          ))}

          <ListItem variant="outlined" sx={{ boxShadow: 'sm', marginTop: 2 }}>
            <Radio
              overlay
              value="custom"
              label="choose category..."
              checked={selectedMasterCategory === 'custom'}
              sx={{
                flexGrow: 1,
                flexDirection: 'row-reverse',
                textAlign: 'left',
              }}
            />
          </ListItem>

          <RegisteredCategories />
        </List>
      </RadioGroup>
    </div>
  )
}
