import { Waypoint } from 'react-waypoint'
import {
  forwardRef,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
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
import { AddRounded } from '@mui/icons-material'
import {
  MasterProduct,
  useDebounce,
  useSearchMasterProducts,
} from '../../../logic'

export interface MasterProductsAutoCompleteAPI {
  focus: () => void
}

interface IMasterProductOption extends MasterProduct {
  shouldCreate?: boolean
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
  const inputRef = useRef<HTMLInputElement>()
  const [open, setOpen] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [inputIsChanging, setInputIsChanging] = useState(false)
  const debouncedQuery = useDebounce(inputValue)

  useEffect(() => {
    setInputIsChanging(false)
  }, [debouncedQuery])

  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useSearchMasterProducts({
      search: debouncedQuery,
      similarTo: productId,
    })

  const items = useMemo(
    () => data?.pages.reduce((acc, page) => acc.concat(page), []) || [],
    [data],
  )

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

  const isLoading = inputIsChanging || (isFetching && !isFetchingNextPage)

  return (
    <Autocomplete
      open={open}
      slotProps={{ input: { ref: inputRef as RefObject<HTMLInputElement> } }}
      value={value}
      loading={isLoading}
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
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue)
        setInputIsChanging(true)
      }}
      options={isLoading ? [] : items}
      getOptionLabel={option =>
        typeof option === 'string' ? option : option.name
      }
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      filterOptions={(options: IMasterProductOption[], params) => {
        if (isLoading) return []

        const { inputValue } = params

        const isExisting = options.some(option => inputValue === option.name)
        if (inputValue !== '' && !isExisting) {
          options.push({
            id: -1,
            name: inputValue,
            shouldCreate: true,
          })
        }

        if (hasNextPage)
          options.push({
            id: -1,
            name: 'loading more...',
            isLoading: true,
          })

        return options
      }}
      onChange={(_, option) =>
        onValueChange(
          !option
            ? undefined
            : typeof option === 'string'
              ? { id: -1, name: option }
              : option,
        )
      }
      renderOption={(props, option: IMasterProductOption) => {
        if (option.isLoading)
          return (
            <Waypoint onEnter={() => fetchNextPage()} {...props}>
              <AutocompleteOption {...props}>
                <ListItemDecorator>
                  <CircularProgress size="sm" color="neutral" />
                </ListItemDecorator>

                {option.name}
              </AutocompleteOption>
            </Waypoint>
          )

        return (
          <AutocompleteOption {...props}>
            {option.shouldCreate && (
              <ListItemDecorator>
                <AddRounded />
              </ListItemDecorator>
            )}

            <Typography textAlign="start">
              {option.categoryName && (
                <Typography sx={{ fontWeight: 600, mr: 0.5 }}>
                  [{option.categoryName}]
                </Typography>
              )}

              <Typography sx={{ fontWeight: 200 }}>
                {option.shouldCreate ? `Add "${option.name}"` : option.name}
              </Typography>
            </Typography>
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
