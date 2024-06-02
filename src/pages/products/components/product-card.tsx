import { useEffect, useRef, useState } from 'react'
import {
  Card,
  CircularProgress,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from '@mui/joy'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckIcon from '@mui/icons-material/DoneRounded'
import {
  MasterProductsAutoComplete,
  MasterProductsAutoCompleteAPI,
} from './master-products-auto-complete'
import {
  MasterProduct,
  Product,
  useCreateMasterProduct,
  useUpdateProductMasterProduct,
} from '../../../logic'

const isTouchDevice = 'ontouchstart' in window

const SelectMasterProductContainer = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  min-height: 36px;
`

const NameAndCategoryTypography = styled(Typography)`
  &.separate-content {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span,
    p {
      width: fit-content;
    }
  }
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

  const autoCompleteRef = useRef<MasterProductsAutoCompleteAPI>()
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
    setSelectedMasterProduct(value)

    if (!value) return
    if (value.id === -1) submitChangesToMasterProduct(value)
  }

  const submitChangesToMasterProduct = async (value: MasterProduct) => {
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
    if (showEditField) autoCompleteRef.current?.focus()
  }, [showEditField])

  const mustSeparate = category.length > 20 || name.length > 20
  const separateNameAndCategory =
    mustSeparate || (category?.length > 10 && name.length > 10)

  return (
    <StyledCard sx={{ gap: 0, p: 1.5 }}>
      <Typography level="body-xs" color="neutral" mb={0.5} textAlign="start">
        id: <b>{id}</b>
      </Typography>

      <NameAndCategoryTypography
        textAlign="start"
        mb={3}
        className={separateNameAndCategory ? 'separate-content' : ''}
      >
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
      </NameAndCategoryTypography>

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
            sx={{ px: 1, py: 0.5, borderRadius: '4px' }}
          >
            {masterProduct?.categoryName && masterProduct.name ? (
              <>
                <Typography fontWeight={600}>
                  [{masterProduct.categoryName}]
                </Typography>{' '}
                {masterProduct.name}
              </>
            ) : (
              masterProduct?.name ?? 'Not Selected'
            )}
          </Typography>
        )}

        {showEditField ? (
          <EditFieldDecoratorContainer>
            {submittingEdit ? (
              <CircularProgress color="neutral" size="sm" variant="soft" />
            ) : (
              <Tooltip title="Submit Changes" variant="outlined">
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
              </Tooltip>
            )}
          </EditFieldDecoratorContainer>
        ) : (
          <Tooltip title="Select Master Product" variant="outlined">
            <IconButton
              size="sm"
              color="neutral"
              variant="plain"
              onClick={switchToEditMode}
              className={
                !isTouchDevice && !showEditField ? 'show-on-hover' : ''
              }
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </SelectMasterProductContainer>
    </StyledCard>
  )
}
