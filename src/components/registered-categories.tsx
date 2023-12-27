import { Autocomplete, styled } from '@mui/joy'
import { useAppStore } from '../logic'

const StyledAutocomplete = styled(Autocomplete)`
  width: 100% !important;
  height: 58px;
  margin-top: 8px;

  transition: opacity, transform;
  transition-duration: 200ms;

  opacity: 0;
  transform: translateY(-15px) scale(0.9);
  pointer-events: none;

  &[data-isVisible='true'] {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: initial;
  }
`

export function RegisteredCategories() {
  const registeredCategories = useAppStore(state => state.registeredCategories)
  const selectedMasterCategory = useAppStore(
    state => state.selectedMasterCategory,
  )

  return (
    <StyledAutocomplete
      size="lg"
      placeholder="Combo box"
      data-isVisible={selectedMasterCategory === 'custom'}
      options={registeredCategories}
      sx={{ width: 300 }}
    />
  )
}
