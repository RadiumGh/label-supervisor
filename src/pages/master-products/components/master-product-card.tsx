import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import {
  Card,
  CircularProgress,
  IconButton,
  Input,
  styled,
  Tooltip,
  Typography,
} from '@mui/joy'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckIcon from '@mui/icons-material/DoneRounded'
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded'
import CancelIcon from '@mui/icons-material/ClearRounded'
import {
  MasterProduct,
  useDeleteMasterProduct,
  useUpdateMasterProductName,
} from '../../../logic'

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
  const inputRef = useRef<HTMLInputElement>()

  const [state, setState] = useState<'idle' | 'edit' | 'delete'>('idle')
  const [newName, setNewName] = useState<string>('')

  const deleteMutation = useDeleteMasterProduct()
  const deleting = deleteMutation.isPending

  const updateNameMutation = useUpdateMasterProductName()
  const updatingName = updateNameMutation.isPending

  const deleteMasterProduct = () =>
    deleteMutation.mutateAsync(id).finally(() => setState('idle'))

  const submitEdit = async () => {
    await updateNameMutation.mutateAsync({ id, name: newName }).finally(() => {
      setState('idle')
      setNewName('')
    })
  }

  useEffect(() => {
    if (state === 'edit') inputRef.current?.focus()
  }, [state])

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
        {state === 'edit' ? (
          <Input
            slotProps={{
              input: { ref: inputRef as RefObject<HTMLInputElement> },
            }}
            sx={{
              [`&.MuiInput-root`]: {
                padding: '0 6px',
              },
            }}
            value={newName}
            onChange={e => setNewName(e.target.value)}
            disabled={updatingName}
            placeholder="Enter new name..."
          />
        ) : (
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
        )}

        <CardActionsContainer
          className={!isTouchDevice && state === 'idle' ? 'show-on-hover' : ''}
        >
          {state == 'idle' ? (
            <>
              <Tooltip title="Edit Name" variant="outlined">
                <IconButton
                  size="sm"
                  color="neutral"
                  variant="plain"
                  onClick={() => {
                    setNewName(name)
                    setState('edit')
                  }}
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
          ) : state === 'edit' ? (
            <>
              <Tooltip title="Submit Changes" variant="outlined">
                <IconButton
                  disabled={updatingName || !newName || name === newName}
                  size="sm"
                  color="neutral"
                  variant="plain"
                  onClick={submitEdit}
                >
                  {updatingName ? (
                    <CircularProgress
                      variant="soft"
                      color="neutral"
                      size="sm"
                    />
                  ) : (
                    <CheckIcon />
                  )}
                </IconButton>
              </Tooltip>

              <Tooltip title="Cancel" variant="outlined">
                <IconButton
                  disabled={updatingName}
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
