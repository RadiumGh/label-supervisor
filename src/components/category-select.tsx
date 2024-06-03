import {
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import {
  Autocomplete,
  AutocompleteOption,
  CircularProgress,
  ListItemDecorator,
  Typography,
} from '@mui/joy'
import { Category, useCategories } from '../logic'

export interface CategorySelectAPI {
  focus: () => void
}

interface ICategoryOption extends Category {
  shouldCreate?: boolean
  isLoading?: boolean
}

interface Props {
  value?: Category
  onValueChange: (value?: Category) => void
}
export const CategorySelect = forwardRef(function (
  { value, onValueChange }: Props,
  ref,
) {
  const inputRef = useRef<HTMLInputElement>()
  const [open, setOpen] = useState(false)

  const { data: items, isFetching } = useCategories()

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef?.current?.focus()
        setOpen(true)
      },
    }),
    [],
  )

  return (
    <Autocomplete
      open={open}
      slotProps={{ input: { ref: inputRef as RefObject<HTMLInputElement> } }}
      value={value ?? { name: '', id: -1 }}
      loading={isFetching}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      loadingText={
        <AutocompleteOption sx={{ pointerEvents: 'none' }}>
          <ListItemDecorator>
            <CircularProgress size="sm" color="neutral" />
          </ListItemDecorator>
          Loading...
        </AutocompleteOption>
      }
      options={items ?? []}
      getOptionLabel={(option: Category) => option.name}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={(_, option) => onValueChange(option ?? undefined)}
      renderOption={(props, option: ICategoryOption) => {
        return (
          <AutocompleteOption {...props}>
            <Typography textAlign="start">{option.name}</Typography>
          </AutocompleteOption>
        )
      }}
      placeholder="Select Category"
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      autoComplete
      sx={{ flexGrow: 1, py: 1 }}
    />
  )
})
