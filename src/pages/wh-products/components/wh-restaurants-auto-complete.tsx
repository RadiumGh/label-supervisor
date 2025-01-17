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
import { useDebounce } from '../../../logic'
import { WHRestaurant, useSearchWHRestaurants } from '../../../logic/waithero'

export interface RestaurantsAutoCompleteAPI {
  focus: () => void
}

interface IRestaurantOption extends WHRestaurant {
  isLoading?: boolean
}

interface Props {
  value?: WHRestaurant
  onValueChange: (restaurant?: WHRestaurant) => void
  onClose?: () => void
}
export const WHRestaurantsAutoComplete = forwardRef(function (
  { value, onValueChange, onClose }: Props,
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
    useSearchWHRestaurants({ name: debouncedQuery })

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
      onClose={() => {
        setOpen(false)
        onClose?.()
      }}
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
      filterOptions={(options: IRestaurantOption[]) => {
        if (isLoading) return []

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
      renderOption={(props, option: IRestaurantOption) => {
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
            <Typography sx={{ fontWeight: 200 }}>{option.name}</Typography>
          </AutocompleteOption>
        )
      }}
      getOptionDisabled={option =>
        Boolean('isLoading' in option && option.isLoading)
      }
      placeholder="Select Restaurant..."
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      autoComplete
      sx={{ flexGrow: 1 }}
    />
  )
})
