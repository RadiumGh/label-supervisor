import { useState } from 'react'
import {
  Button,
  DialogTitle,
  FormControl,
  Input,
  Modal,
  ModalDialog,
  Stack,
  styled,
} from '@mui/joy'
import { DescriptionTypography } from '../../description-typography.tsx'
import { useAppStore, useCreateCategory } from '../../../logic'

const ButtonsContainer = styled('div')`
  width: fit-content;
  margin-left: auto !important;
  display: flex;
  gap: 8px;
`

export function CreateCategoryModal() {
  const [name, setName] = useState<string>('')

  const createMutation = useCreateCategory()
  const creating = createMutation.isPending

  const open = useAppStore(state => state.createCategoryModalIsOpen)

  const onClose = () =>
    useAppStore.setState({ createCategoryModalIsOpen: false })

  const createCategory = async () => {
    await createMutation.mutateAsync({ name })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle sx={{ mb: 1 }}>Create category</DialogTitle>

        <Stack spacing={2}>
          <FormControl>
            <DescriptionTypography>Name</DescriptionTypography>
            <Input
              autoFocus
              value={name}
              placeholder="Enter a name..."
              onChange={event => setName(event.target.value)}
            />
          </FormControl>

          <ButtonsContainer sx={{ mt: 3 }}>
            <Button
              disabled={creating}
              type="reset"
              variant="plain"
              color="danger"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="soft"
              loading={creating}
              disabled={!name || creating}
              onClick={createCategory}
            >
              Create
            </Button>
          </ButtonsContainer>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
