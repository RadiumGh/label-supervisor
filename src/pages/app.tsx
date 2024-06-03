import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Tabs, Tab, TabList, TabPanel, styled, tabClasses } from '@mui/joy'
import { Toast } from '../components/toast'
import { CreateCategoryModal, MasterProductModal } from '../components/modals'
import { Products } from './products'
import { MasterProducts } from './master-products'
import { Categories } from './categories'
import { useIsDesktopSize } from '../components/media-query-hooks'
import '../App.css'

// const Container = styled('div')`
//   height: 100%;
//   width: 100%;
//   max-width: min(640px, 100%);
//
//   animation-name: fade-in;
//   animation-duration: 300ms;
//
//   @keyframes fade-in {
//     from {
//       transform: translateY(-10px);
//       opacity: 0.3;
//     }
//
//     to {
//       transform: translateY(0);
//       opacity: 1;
//     }
//   }
// `

const Page = styled('div')`
  padding: 1rem 1rem;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  max-width: 460px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

const StyledTabs = styled(Tabs)`
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 0 10px 5px #47506112;

  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`

const StyledTabList = styled(TabList)`
  padding: 8px;
  gap: 4px;
  width: 100%;
  border-radius: 16px;

  & > button {
    flex-basis: 50%;
  }

  @media (min-width: 700px) {
    padding: 12px 8px;
    width: 220px;

    & > button {
      flex-basis: unset;
      min-height: 46px;
    }
  }
`

const StyledTabPanel = styled(TabPanel)`
  overflow: hidden;
  padding: 0;
`

export function App() {
  const isDesktopSize = useIsDesktopSize()

  const queryClient = useQueryClient()

  const onTabChange = useCallback(
    (newValue: string) => {
      // TODO: Can we do it with refetchOnMount?
      const tabs = ['products', 'master-products', 'categories']

      tabs
        .filter(tab => tab !== newValue)
        .forEach(tab =>
          queryClient.resetQueries({
            queryKey: [tab],
          }),
        )
    },
    [queryClient],
  )

  return (
    <>
      <StyledTabs
        orientation={isDesktopSize ? 'vertical' : 'horizontal'}
        aria-label="App Tabs"
        onChange={(_, newValue) => onTabChange(newValue as string)}
        defaultValue="products"
        sx={{ borderRadius: 'xl' }}
      >
        <StyledTabList
          disableUnderline
          sx={{
            boxShadow: 'sm',
            bgcolor: 'background.level1',

            [`& .${tabClasses.root}`]: {
              textAlign: 'center',
              borderRadius: 'md',
            },

            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },
          }}
        >
          <Tab value="products" disableIndicator>
            Products
          </Tab>

          <Tab value="master-products" disableIndicator>
            Master Products
          </Tab>

          <Tab value="categories" disableIndicator>
            Categories
          </Tab>
        </StyledTabList>

        <StyledTabPanel value="products">
          <Page>
            <Products />
          </Page>
        </StyledTabPanel>

        <StyledTabPanel value="master-products">
          <Page>
            <MasterProducts />
          </Page>
        </StyledTabPanel>

        <StyledTabPanel value="categories">
          <Page>
            <Categories />
          </Page>
        </StyledTabPanel>
      </StyledTabs>

      <MasterProductModal />
      <CreateCategoryModal />

      <Toast />
    </>
  )
}
