import { useEffect, useState } from 'react'
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
import { CategorySelect } from '../../category-select'
import { DescriptionTypography } from '../../description-typography'
import {
  Category,
  useAppStore,
  useCreateMasterProduct,
  useUpdateMasterProduct,
} from '../../../logic'

const ButtonsContainer = styled('div')`
  width: fit-content;
  margin-left: auto !important;
  display: flex;
  gap: 8px;
`

export function MasterProductModal() {
  const [editedNameValue, setEditedNameValue] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)

  const createMutation = useCreateMasterProduct()
  const updateMutation = useUpdateMasterProduct()

  const mutating = createMutation.isPending || updateMutation.isPending

  const props = useAppStore(state => state.masterProductModalProps)
  const { id, name, category, onDone, onCancel } = props || {}

  useEffect(() => {
    setEditedNameValue(name ?? '')
    setSelectedCategory(category)
  }, [name, category])

  const onClose = (canceled = true) => {
    if (canceled) onCancel?.()
    useAppStore.setState({ masterProductModalProps: undefined })
  }

  const createMasterProduct = async () => {
    if (!selectedCategory) return

    const result = await createMutation.mutateAsync({
      name: editedNameValue,
      categoryId: selectedCategory.id,
    })

    onDone?.(result)
    onClose(false)
  }

  const submitChanges = async () => {
    if (!id || !editedNameValue || !selectedCategory) return

    const result = await updateMutation.mutateAsync({
      id,
      name: editedNameValue,
      categoryId: selectedCategory.id,
    })

    onDone?.(result)
    onClose(false)
  }

  const open = !!props
  const canCreate = Boolean(editedNameValue && selectedCategory !== undefined)
  const editMode = !!id

  return (
    <Modal open={open} onClose={() => onClose()}>
      <ModalDialog>
        <DialogTitle sx={{ mb: 1 }}>
          {editMode ? 'Edit' : 'Create'} master product
        </DialogTitle>

        <Stack sx={{ gap: 2 }}>
          <FormControl>
            <DescriptionTypography>Name</DescriptionTypography>
            <Input
              autoFocus
              placeholder="Enter a name..."
              value={editedNameValue}
              onChange={event => setEditedNameValue(event.target.value)}
            />
          </FormControl>

          <FormControl>
            <DescriptionTypography>Category</DescriptionTypography>
            <CategorySelect
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            />
          </FormControl>

          <ButtonsContainer sx={{ mt: 3 }}>
            <Button
              disabled={mutating}
              type="reset"
              variant="plain"
              color="danger"
              onClick={() => onClose()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="soft"
              loading={mutating}
              disabled={mutating || !canCreate}
              onClick={() =>
                editMode ? submitChanges() : createMasterProduct()
              }
            >
              {editMode ? 'Edit' : 'Create'}
            </Button>
          </ButtonsContainer>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
