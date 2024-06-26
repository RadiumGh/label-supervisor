import { useMemo, useState } from 'react'
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
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded'
import CancelIcon from '@mui/icons-material/ClearRounded'
import { MasterProduct, useDeleteMasterProduct } from '../../../logic'
import { showMasterProductModal } from '../../../components/modals'

const isTouchDevice = 'ontouchstart' in window

const StyledCard = styled(Card)`
  .show-on-hover {
    visibility: hidden;
    pointer-events: none;
  }

  &:hover {
    .show-on-hover {
      visibility: visible;
      pointer-events: auto;
    }
  }
`

const InfoContainer = styled('div')`
  display: flex;
  gap: 12px;
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

const CardActionsContainer = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`

interface Props {
  masterProduct: MasterProduct
}

export function MasterProductCard({ masterProduct }: Props) {
  const { id, name, categoryName } = masterProduct

  const [state, setState] = useState<'idle' | 'delete'>('idle')

  const deleteMutation = useDeleteMasterProduct()
  const deleting = deleteMutation.isPending

  const deleteMasterProduct = () =>
    deleteMutation.mutateAsync(id).finally(() => setState('idle'))

  const separateNameAndCategory = useMemo(() => {
    if (!categoryName) return false

    const mustSeparate = categoryName.length > 20 || name.length > 20
    return mustSeparate || (categoryName?.length > 10 && name.length > 10)
  }, [name, categoryName])

  return (
    <StyledCard sx={{ gap: 0, p: 1.5 }}>
      <Typography level="body-xs" textAlign="start" mb={0.5}>
        Name
      </Typography>

      <InfoContainer>
        <NameAndCategoryTypography
          textAlign="start"
          mb={0.5}
          className={separateNameAndCategory ? 'separate-content' : ''}
        >
          <Typography
            variant="solid"
            color={categoryName ? 'primary' : 'danger'}
            level="body-sm"
            textAlign="start"
            mr={1}
            p={0.5}
            sx={{ borderRadius: '4px' }}
          >
            {categoryName}
          </Typography>

          <Typography level="title-md">{name}</Typography>
        </NameAndCategoryTypography>

        <CardActionsContainer
          className={!isTouchDevice && state === 'idle' ? 'show-on-hover' : ''}
        >
          {state == 'idle' ? (
            <>
              <Tooltip title="Edit" variant="outlined">
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="plain"
                  onClick={() => showMasterProductModal(masterProduct)}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete" variant="outlined">
                <IconButton
                  size="sm"
                  color="danger"
                  variant="plain"
                  onClick={() => setState('delete')}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : state === 'delete' ? (
            <>
              <Tooltip title="Confirm Delete" variant="outlined">
                <IconButton
                  disabled={deleting}
                  size="sm"
                  color="danger"
                  variant="plain"
                  onClick={deleteMasterProduct}
                >
                  {deleting ? (
                    <CircularProgress variant="soft" color="danger" size="sm" />
                  ) : (
                    <CheckIcon />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title="Cancel" variant="outlined">
                <IconButton
                  disabled={deleting}
                  size="sm"
                  color="neutral"
                  variant="plain"
                  onClick={() => setState('idle')}
                >
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : null}
        </CardActionsContainer>
      </InfoContainer>
    </StyledCard>
  )
}
