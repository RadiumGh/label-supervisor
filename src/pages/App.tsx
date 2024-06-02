import { Tabs, Tab, TabList, TabPanel, styled, tabClasses } from '@mui/joy'
import { Products } from './products'
import { MasterProducts } from './master-products'
import '../App.css'
import { CreateMasterProductModal } from '../components/modals'

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

  display: flex;
  flex-direction: column;
`

const StyledTabPanel = styled(TabPanel)`
  overflow: hidden;
  padding: 0;
`

export function App() {
  return (
    <>
      <Tabs
        orientation="horizontal"
        aria-label="App Tabs"
        defaultValue="products"
        sx={{
          height: '100%',
          borderRadius: 'xl',
          overflow: 'hidden',
          flexDirection: 'column-reverse',
        }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 1,
            gap: 0.5,

            borderRadius: 'xl',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,

            bgcolor: 'background.level1',

            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: 'sm',
              bgcolor: 'background.surface',
            },

            ['& > button']: {
              flexBasis: '50%',
            },
          }}
        >
          <Tab value="products" disableIndicator>
            Products
          </Tab>

          <Tab value="master-products" disableIndicator>
            Master Products
          </Tab>
        </TabList>

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
      </Tabs>

      <CreateMasterProductModal />
    </>
  )

  // <Container>
  //   {/*<Product />*/}
  //   {/*<ProductType />*/}
  //   {/*<PredictedMasterCategories />*/}
  // </Container>
}
