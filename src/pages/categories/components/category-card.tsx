import { RefObject, useEffect, useRef, useState } from 'react'
import {
  Card,
  Input,
  styled,
  Tooltip,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/joy'
import EditIcon from '@mui/icons-material/EditRounded'
import CheckIcon from '@mui/icons-material/DoneRounded'
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded'
import CancelIcon from '@mui/icons-material/ClearRounded'
import {
  Category,
  useDeleteCategory,
  useUpdateCategoryName,
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

const CardActionsContainer = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`

interface Props {
  category: Category
}

export function CategoryCard({ category }: Props) {
  const { id, name } = category
  const inputRef = useRef<HTMLInputElement>()

  const [state, setState] = useState<'idle' | 'edit' | 'delete'>('idle')
  const [newName, setNewName] = useState<string>('')

  const deleteMutation = useDeleteCategory()
  const deleting = deleteMutation.isPending

  const updateNameMutation = useUpdateCategoryName()
  const updatingName = updateNameMutation.isPending

  const deleteCategory = () =>
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
          <Typography level="title-md" textAlign="start" mb={0.5}>
            {name}
          </Typography>
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
                  onClick={deleteCategory}
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
