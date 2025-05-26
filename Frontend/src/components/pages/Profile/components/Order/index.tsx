import styles from './styles.module.scss'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/UI/tabs'
import ListOrder from './components/ListOrder'

function Order() {
   return (
      <div className={styles.orderWrap}>
         <Tabs defaultValue="1" className={styles.orderWrap}>
            <TabsList>
               <TabsTrigger value="1">All</TabsTrigger>
               <TabsTrigger value="2">In Processing</TabsTrigger>
               <TabsTrigger value="3">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
               <ListOrder />
            </TabsContent>
            <TabsContent value="2">Content of Tab Pane 2</TabsContent>
            <TabsContent value="3">Content of Tab Pane 4</TabsContent>
         </Tabs>
      </div>
   )
}

export default Order
