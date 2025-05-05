import { TabsContent } from "@/components/ui/tabs";

const OrderTabContent = ({ tab }: { tab: string }) => {
  return <TabsContent value={tab}>{tab}</TabsContent>;
};

export default OrderTabContent;
