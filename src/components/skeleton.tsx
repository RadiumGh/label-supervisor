import { Skeleton, styled } from '@mui/joy'

const ProductTypeSkeletonContainer = styled('div')`
  width: 100%;
  display: flex;
  margin: 8px 0 20px 0;
  gap: 8px;
`

const CategorySkeletonsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`

export function AppSkeleton() {
  return (
    <div>
      <Skeleton variant="text" width={100} level="body-sm" />
      <Skeleton variant="text" level="h3" sx={{ marginBottom: 2 }} />

      <Skeleton variant="text" width={100} level="body-sm" />

      <ProductTypeSkeletonContainer>
        <Skeleton variant="rectangular" width="50%" height={44} />
        <Skeleton variant="rectangular" width="50%" height={44} />
      </ProductTypeSkeletonContainer>

      <Skeleton variant="text" width={140} level="body-sm" />

      <CategorySkeletonsContainer>
        <Skeleton variant="rectangular" height={58} />
        <Skeleton variant="rectangular" height={58} />
        <Skeleton variant="rectangular" height={58} />
        <Skeleton variant="rectangular" height={58} sx={{ marginTop: 2 }} />
      </CategorySkeletonsContainer>
    </div>
  )
}
