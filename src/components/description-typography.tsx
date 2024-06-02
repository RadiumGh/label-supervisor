import { ReactNode } from 'react'
import { FormLabel, FormLabelProps } from '@mui/joy'

interface Props extends FormLabelProps {
  children: ReactNode
}
export function DescriptionTypography({ children, sx, ...rest }: Props) {
  return (
    <FormLabel sx={{ color: 'background.tooltip', ...sx }} {...rest}>
      {children}
    </FormLabel>
  )
}
