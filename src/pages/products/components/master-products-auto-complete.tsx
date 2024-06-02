import { Waypoint } from 'react-waypoint'
import { forwardRef, RefObject, useMemo } from 'react'
import {
  Autocomplete,
  AutocompleteOption,
  createFilterOptions,
  ListItemDecorator,
} from '@mui/joy'
import { AddRounded } from '@mui/icons-material'
import { MasterProduct, useSearchMasterProducts } from '../../../logic'

const filterOptions = createFilterOptions<IMasterProductOption>()

interface IMasterProductOption extends MasterProduct {
  inputValue?: string
  isLoading?: boolean
}

interface Props {
  value?: MasterProduct
  productId: number
  onValueChange: (masterProduct?: MasterProduct) => void
}
export const MasterProductsAutoComplete = forwardRef(function (
  { value, productId, onValueChange }: Props,
  ref,
) {
  const { data, isLoading, hasNextPage, fetchNextPage } =
    useSearchMasterProducts({
      similarTo: productId,
    })

  const items = useMemo(
    () => data?.pages.reduce((acc, page) => acc.concat(page), []) || [],
    [data],
  )

  return (
    <Autocomplete
      slotProps={{ input: { ref: ref as RefObject<HTMLInputElement> } }}
      value={value}
      loading={isLoading}
      options={items}
      getOptionLabel={option =>
        typeof option === 'string'
          ? option
          : option.name
            ? option.name
            : 'inputValue' in option
              ? (option.inputValue as string)
              : ''
      }
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterOptions={(options, params) => {
        const filtered = filterOptions(options, params)
        const { inputValue } = params

        const isExisting = options.some(option => inputValue === option.name)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            id: -1,
            inputValue,
            name: `Add "${inputValue}"`,
          })
        }

        if (hasNextPage)
          filtered.push({
            id: -1,
            name: 'loading more...',
            isLoading: true,
          })

        return filtered
      }}
      onChange={(_, option) => {
        if (!option) onValueChange(undefined)
        else if (typeof option === 'string' || 'inputValue' in option) {
          const name =
            typeof option === 'string'
              ? option
              : 'inputValue' in option
                ? (option.inputValue as string)
                : ''

          onValueChange({ id: -1, name })
        } else onValueChange(option)
      }}
      renderOption={(props, option: IMasterProductOption) => {
        if (option.isLoading)
          return (
            <Waypoint onEnter={() => fetchNextPage()}>
              <AutocompleteOption {...props}>{option.name}</AutocompleteOption>
            </Waypoint>
          )

        return (
          <AutocompleteOption {...props}>
            {option.name?.startsWith('Add "') && (
              <ListItemDecorator>
                <AddRounded />
              </ListItemDecorator>
            )}

            {option.name}
          </AutocompleteOption>
        )
      }}
      getOptionDisabled={option =>
        Boolean('isLoading' in option && option.isLoading)
      }
      placeholder="Select or Create a new One"
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      autoComplete
      sx={{ flexGrow: 1 }}
    />
  )
})
