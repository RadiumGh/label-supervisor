import { useEffect, useRef, useState } from 'react'
import {
  Card,
  CircularProgress,
  IconButton,
  styled,
  Typography,
} from '@mui/joy'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckIcon from '@mui/icons-material/DoneRounded'
import { MasterProductsAutoComplete } from './master-products-auto-complete'
import {
  MasterProduct,
  Product,
  useCreateMasterProduct,
  useUpdateProductMasterProduct,
} from '../../../logic'

const SelectMasterProductContainer = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
`

const StyledCard = styled(Card)`
  .show-on-hover {
    display: none;
  }

  &:hover {
    .show-on-hover {
      display: inline-flex;
    }
  }
`

const EditFieldDecoratorContainer = styled('div')`
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  product: Product
}

export function ProductCard({ product }: Props) {
  const { id, name, category, masterProduct } = product

  const autoCompleteRef = useRef<HTMLInputElement>()
  const [showEditField, setShowEditField] = useState(false)

  const [selectedMasterProduct, setSelectedMasterProduct] = useState<
    MasterProduct | undefined
  >(masterProduct)

  const createMasterProductMutation = useCreateMasterProduct()
  const updateMasterProductMutation = useUpdateProductMasterProduct()

  const submittingEdit =
    createMasterProductMutation.isPending ||
    updateMasterProductMutation.isPending

  const onMasterProductChange = (value: MasterProduct | undefined) => {
    console.log('onMasterProductChange:', value)
    setSelectedMasterProduct(value)

    if (!value) return
    if (value.id === -1) submitChangesToMasterProduct(value)
  }

  const submitChangesToMasterProduct = async (value: MasterProduct) => {
    console.log('[][] submitChangesToMasterProduct')
    if (!value?.id) return

    let masterProductToSubmit = value

    const shouldCreateFirst = value.id == -1
    if (shouldCreateFirst) {
      const created = await createMasterProductMutation.mutateAsync({
        name: value.name,
      })

      if (!created.id) {
        setSelectedMasterProduct(masterProduct)
        return
      }
      masterProductToSubmit = created
    }

    await updateMasterProductMutation.mutateAsync({
      productId: id,
      masterProductId: masterProductToSubmit.id,
    })

    setShowEditField(false)
    setSelectedMasterProduct(undefined)
  }

  const switchToEditMode = () => {
    setShowEditField(true)
    setSelectedMasterProduct(masterProduct)
  }

  useEffect(() => {
    if (showEditField) autoCompleteRef?.current?.focus()
  }, [showEditField])

  return (
    <StyledCard sx={{ gap: 0 }} size="sm">
      <Typography level="body-xs" color="neutral" mb={0.5} textAlign="start">
        id: <b>{id}</b>
      </Typography>
      <Typography textAlign="start" mb={3}>
        <Typography
          variant="solid"
          color="primary"
          level="body-sm"
          textAlign="start"
          mr={1}
          p={0.5}
          sx={{ borderRadius: '4px' }}
        >
          {category}
        </Typography>

        <Typography level="title-md" textAlign="start">
          {name}
        </Typography>
      </Typography>

      <Typography
        sx={{ mb: 0.5, width: 'fit-content' }}
        level="body-xs"
        textAlign="start"
      >
        Master Product
      </Typography>

      <SelectMasterProductContainer>
        {showEditField ? (
          <MasterProductsAutoComplete
            ref={autoCompleteRef}
            productId={id}
            value={selectedMasterProduct}
            onValueChange={onMasterProductChange}
          />
        ) : (
          <Typography
            level={masterProduct?.id ? 'body-md' : 'body-sm'}
            textAlign="start"
            variant="soft"
            color={masterProduct?.id ? 'primary' : 'danger'}
          >
            {masterProduct?.name ??
              selectedMasterProduct?.name ??
              'Not Selected'}
          </Typography>
        )}

        {showEditField ? (
          <EditFieldDecoratorContainer>
            {submittingEdit ? (
              <CircularProgress color="neutral" size="sm" variant="soft" />
            ) : (
              <IconButton
                size="sm"
                color="neutral"
                variant="plain"
                disabled={!selectedMasterProduct}
                onClick={() =>
                  submitChangesToMasterProduct(selectedMasterProduct!)
                }
              >
                <CheckIcon />
              </IconButton>
            )}
          </EditFieldDecoratorContainer>
        ) : (
          <IconButton
            size="sm"
            color="neutral"
            variant="plain"
            onClick={switchToEditMode} // TODO: Focus autoComplete
            className={showEditField ? '' : 'show-on-hover'}
          >
            <EditIcon />
          </IconButton>
        )}
      </SelectMasterProductContainer>
    </StyledCard>
  )
}
