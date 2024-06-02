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
import { DescriptionTypography } from '../description-typography.tsx'
import { useAppStore, useCreateMasterProduct } from '../../logic'

const ButtonsContainer = styled('div')`
  width: fit-content;
  margin-left: auto !important;
  display: flex;
  gap: 8px;
`

export function CreateMasterProductModal() {
  const [name, setName] = useState<string>('')

  const createMutation = useCreateMasterProduct()
  const creating = createMutation.isPending

  const open = useAppStore(state => state.createMasterProductModalIsOpen)

  const onClose = () =>
    useAppStore.setState({ createMasterProductModalIsOpen: false })

  const createMasterProduct = async () => {
    // TODO: Show success/error Toast

    await createMutation.mutateAsync({ name })
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <DialogTitle sx={{ mb: 1 }}>Create master product</DialogTitle>

        <Stack spacing={2}>
          <FormControl>
            <DescriptionTypography>Name</DescriptionTypography>
            <Input
              autoFocus
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </FormControl>

          <ButtonsContainer>
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
              onClick={createMasterProduct}
            >
              Create
            </Button>
          </ButtonsContainer>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
