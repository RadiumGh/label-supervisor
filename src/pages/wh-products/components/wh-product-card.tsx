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
  MasterProductsAutoCompleteAPI,
  WHMasterProductsAutoComplete,
} from './wh-master-products-auto-complete.tsx'
import {
  SearchWHProductsResponse,
  useUpdateWHProductMasterProduct,
  WHMasterProduct,
  WHProduct,
} from '../../../logic/waithero'
import { showToast } from '../../../components/toast'
import { queryClient } from '../../../main.tsx'

const isTouchDevice = 'ontouchstart' in window

const SelectMasterProductContainer = styled('div')`
  gap: 8px;
  width: 100%;
  min-height: 36px;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

  align-self: flex-end;
  margin-bottom: 4px;
`

interface Props {
  product: WHProduct
}

export function WHProductCard({ product }: Props) {
  const { id, name, category, masterProduct } = product

  const autoCompleteRef = useRef<MasterProductsAutoCompleteAPI>()
  const [showEditField, setShowEditField] = useState(false)

  const [selectedMasterProduct, setSelectedMasterProduct] = useState<
    WHMasterProduct | undefined
  >(masterProduct)

  const updateMasterProductMutation = useUpdateWHProductMasterProduct()
  const submittingEdit = updateMasterProductMutation.isPending

  const onMasterProductChange = (value: WHMasterProduct | undefined) =>
    setSelectedMasterProduct(value)

  const submitChangesToMasterProduct = async (value: WHMasterProduct) => {
    if (!value?.id) return

    await updateMasterProductMutation.mutateAsync(
      {
        productId: id,
        masterProductId: value.id,
      },
      {
        // NOTE: There is a bug server side, So we need to update the master product in client when master product is updated
        onSuccess(product) {
          const updatedProduct = { ...product, masterProduct: value }
          showToast('Product Updated', 'success')

          queryClient.setQueriesData(
            { queryKey: ['wh-products'] },
            (
              oldData: { pages: Array<SearchWHProductsResponse> } | undefined,
            ) => {
              if (!oldData) return undefined

              return {
                ...oldData,
                pages: oldData.pages.map(page => ({
                  ...page,
                  products: page.products?.map(p =>
                    p.id === product.id ? updatedProduct : p,
                  ),
                })),
              }
            },
          )
        },
      },
    )

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
          <div style={{ flexGrow: 1, width: 'calc(100% - 40px)' }}>
            <WHMasterProductsAutoComplete
              ref={autoCompleteRef}
              productId={id}
              value={selectedMasterProduct}
              onValueChange={onMasterProductChange}
            />
          </div>
        ) : (
          <Typography
            level={masterProduct?.id ? 'body-md' : 'body-sm'}
            textAlign="start"
            variant="soft"
            color={masterProduct?.id ? 'primary' : 'danger'}
            sx={{ px: 1, py: 0.5, borderRadius: '4px' }}
          >
            {masterProduct?.name ?? 'Not Selected'}
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
