import { RefObject, useEffect, useRef, useState } from 'react'
import {
  Card,
  CircularProgress,
  IconButton,
  Input,
  styled,
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
  masterProduct: MasterProduct
}

export function MasterProductCard({ masterProduct }: Props) {
  const { id, name } = masterProduct
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
    await updateNameMutation.mutateAsync({ id, name }).finally(() => {
      setState('idle')
      setNewName('')
    })
  }

  useEffect(() => {
    if (state === 'edit') inputRef.current?.focus()
  }, [state])

  return (
    <StyledCard sx={{ gap: 0 }} size="sm">
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
          <Typography level="title-md" textAlign="start">
            {name}
          </Typography>
        )}

        <CardActionsContainer
          className={state === 'idle' ? 'show-on-hover' : ''}
        >
          {state == 'idle' ? (
            <>
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

              <IconButton
                size="sm"
                color="danger"
                variant="plain"
                onClick={() => setState('delete')}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : state === 'delete' ? (
            <>
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

              <IconButton
                disabled={deleting}
                size="sm"
                color="neutral"
                variant="plain"
                onClick={() => setState('idle')}
              >
                <CancelIcon />
              </IconButton>
            </>
          ) : state === 'edit' ? (
            <>
              <IconButton
                disabled={updatingName || !newName || name === newName}
                size="sm"
                color="neutral"
                variant="plain"
                onClick={submitEdit}
              >
                {updatingName ? (
                  <CircularProgress variant="soft" color="neutral" size="sm" />
                ) : (
                  <CheckIcon />
                )}
              </IconButton>

              <IconButton
                disabled={updatingName}
                size="sm"
                color="neutral"
                variant="plain"
                onClick={() => setState('idle')}
              >
                <CancelIcon />
              </IconButton>
            </>
          ) : null}
        </CardActionsContainer>

        {/*{showEditField ? (*/}
        {/*  <EditFieldDecoratorContainer>*/}
        {/*    {submittingEdit ? (*/}
        {/*      <CircularProgress color="neutral" size="sm" variant="soft" />*/}
        {/*    ) : (*/}
        {/*      <IconButton size="sm" color="neutral">*/}
        {/*        <CheckIcon />*/}
        {/*      </IconButton>*/}
        {/*    )}*/}
        {/*  </EditFieldDecoratorContainer>*/}
        {/*) : (*/}
        {/*  <IconButton*/}
        {/*    size="sm"*/}
        {/*    color="neutral"*/}
        {/*    onClick={() => setShowEditField(true)}*/}
        {/*    className={showEditField ? '' : 'show-on-hover'}*/}
        {/*  >*/}
        {/*    <EditIcon />*/}
        {/*  </IconButton>*/}
        {/*)}*/}
      </InfoContainer>
    </StyledCard>
  )
}
